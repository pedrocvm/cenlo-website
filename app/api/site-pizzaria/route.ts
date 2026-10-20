import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { validateLead, type SitePizzariaLead } from '@/lib/site-pizzaria/lead'

export const runtime = 'nodejs'

const WINDOW_MS = 10 * 60 * 1000
const MAX_ATTEMPTS = 6
// ponytail: per-instance memory. It blunts bursts and double submits on a warm instance; the CRM dedupes by submissionId for real.
const attempts = new Map<string, { count: number; resetAt: number }>()
const accepted = new Map<string, { reference: string; delivery: 'crm' | 'email'; at: number }>()

const isProduction = process.env.VERCEL_ENV === 'production'

function requesterIp(request: NextRequest) {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown'
}

function isRateLimited(ip: string) {
  const now = Date.now()
  const current = attempts.get(ip)
  if (!current || current.resetAt <= now) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }
  current.count += 1
  return current.count > MAX_ATTEMPTS
}

async function forwardToCrm(lead: SitePizzariaLead & { device: string | null }) {
  const endpoint = process.env.CENLO_SITE_PIZZARIA_CRM_ENDPOINT
  if (!endpoint) return false

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Idempotency-Key': lead.submissionId,
      ...(process.env.CENLO_SITE_PIZZARIA_CRM_TOKEN ? { Authorization: `Bearer ${process.env.CENLO_SITE_PIZZARIA_CRM_TOKEN}` } : {}),
    },
    body: JSON.stringify(lead),
    cache: 'no-store',
    signal: AbortSignal.timeout(8_000),
  })
  if (!response.ok) throw new Error(`CRM respondeu ${response.status}`)
  return true
}

async function sendNotification(lead: SitePizzariaLead & { device: string | null }, delivery: 'crm' | 'email') {
  if (!process.env.RESEND_API_KEY) return false

  const { error } = await new Resend(process.env.RESEND_API_KEY).emails.send({
    from: 'Cenlo Website <ola@cenlo.pt>',
    to: process.env.CENLO_SITE_PIZZARIA_NOTIFICATION_EMAIL || 'website@cenlo.pt',
    subject: `${delivery === 'email' ? '[sem CRM] ' : ''}Pedido de site para pizzaria · ${lead.business}`,
    text: [
      'Oferta: site para pizzaria por €149,90',
      `Referência: ${lead.reference}`,
      `Gravado no CRM: ${delivery === 'crm' ? 'sim' : 'NÃO (só este e-mail)'}`,
      `Nome: ${lead.firstName}`,
      `Pizzaria: ${lead.business}`,
      `WhatsApp: ${lead.phone}`,
      `Instagram ou cardápio: ${lead.currentLink || '—'}`,
      `Consentimento: ${lead.consentText}`,
      `Página: ${lead.pageUrl || '—'}`,
      `Origem: ${lead.referrer || '—'}`,
      `Campanha: ${Object.keys(lead.attribution).length ? JSON.stringify(lead.attribution) : '—'}`,
      `Fuso horário: ${lead.timezone || '—'}`,
      `Dispositivo: ${lead.device || '—'}`,
      `Recebido em: ${lead.createdAt}`,
    ].join('\n'),
  })
  if (error) throw new Error(error.message)
  return true
}

export async function POST(request: NextRequest) {
  if (isRateLimited(requesterIp(request))) {
    return NextResponse.json({ ok: false, error: 'Muitas tentativas seguidas. Aguarde alguns minutos e tente de novo.' }, { status: 429 })
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Não conseguimos ler o pedido. Tente de novo.' }, { status: 400 })
  }

  // Honeypot filled: answer like a success so the bot learns nothing.
  if (typeof body.website === 'string' && body.website.trim()) {
    return NextResponse.json({ ok: true, reference: 'SPZ-RECEBIDO', delivery: 'email' }, { status: 201 })
  }

  const result = validateLead(body, new Date())
  if ('error' in result) return NextResponse.json({ ok: false, ...result.error, error: result.error.message }, { status: 422 })
  const lead = { ...result.lead, device: request.headers.get('user-agent')?.slice(0, 500) || null }

  const previous = accepted.get(lead.submissionId)
  if (previous) return NextResponse.json({ ok: true, reference: previous.reference, delivery: previous.delivery, replay: true }, { status: 200 })

  // Production promises a CRM lead. Without its endpoint the page refuses honestly instead of parking leads in an inbox.
  if (isProduction && !process.env.CENLO_SITE_PIZZARIA_CRM_ENDPOINT) {
    console.error('site-pizzaria: CENLO_SITE_PIZZARIA_CRM_ENDPOINT ausente em produção', { reference: lead.reference })
    return NextResponse.json({ ok: false, error: 'Não foi possível registrar o pedido agora. Seus dados continuam preenchidos. Tente de novo em instantes.' }, { status: 503 })
  }

  const failures: string[] = []
  let delivery: 'crm' | 'email' | null = null
  try {
    if (await forwardToCrm(lead)) delivery = 'crm'
  } catch (error) {
    failures.push(`CRM: ${error instanceof Error ? error.message : 'falha'}`)
  }

  if (!delivery && isProduction) {
    console.error('site-pizzaria: CRM recusou o lead', { reference: lead.reference, failures })
    return NextResponse.json({ ok: false, error: 'Não foi possível registrar o pedido agora. Seus dados continuam preenchidos. Tente de novo em instantes.' }, { status: 503 })
  }

  try {
    if (await sendNotification(lead, delivery ?? 'email')) delivery ??= 'email'
  } catch (error) {
    failures.push(`E-mail: ${error instanceof Error ? error.message : 'falha'}`)
  }

  if (!delivery) {
    console.error('site-pizzaria: lead não registrado', { reference: lead.reference, failures })
    return NextResponse.json({ ok: false, error: 'Não foi possível registrar o pedido agora. Seus dados continuam preenchidos. Tente de novo em instantes.' }, { status: 503 })
  }

  for (const [key, value] of accepted) if (Date.now() - value.at > 60 * 60 * 1000) accepted.delete(key)
  accepted.set(lead.submissionId, { reference: lead.reference, delivery, at: Date.now() })
  console.info('site-pizzaria: lead registrado', { reference: lead.reference, delivery, failures })
  return NextResponse.json({ ok: true, reference: lead.reference, delivery }, { status: 201 })
}
