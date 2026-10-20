import { randomUUID } from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export const runtime = 'nodejs'

const WINDOW_MS = 10 * 60 * 1000
const MAX_ATTEMPTS = 6
const attempts = new Map<string, { count: number; resetAt: number }>()

function clean(value: unknown, max = 160) {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

function requesterIp(request: NextRequest) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  )
}

function isRateLimited(ip: string) {
  const now = Date.now()
  const current = attempts.get(ip)

  if (!current || current.resetAt <= now) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }

  if (current.count >= MAX_ATTEMPTS) return true

  current.count += 1
  attempts.set(ip, current)
  return false
}

function normalizeAttribution(value: unknown) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}

  const allowed = new Set([
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_content',
    'utm_term',
    'utm_id',
    'fbclid',
    'gclid',
  ])

  return Object.fromEntries(
    Object.entries(value)
      .filter(([key, item]) => allowed.has(key) && typeof item === 'string')
      .map(([key, item]) => [key, clean(item, 180)]),
  )
}

async function forwardToCrm(payload: Record<string, unknown>) {
  const endpoint = process.env.CENLO_SITE_PIZZARIA_CRM_ENDPOINT
  if (!endpoint) return { attempted: false, ok: false }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(process.env.CENLO_SITE_PIZZARIA_CRM_TOKEN
        ? { Authorization: `Bearer ${process.env.CENLO_SITE_PIZZARIA_CRM_TOKEN}` }
        : {}),
    },
    body: JSON.stringify(payload),
    cache: 'no-store',
    signal: AbortSignal.timeout(8_000),
  })

  if (!response.ok) throw new Error(`CRM respondeu ${response.status}`)
  return { attempted: true, ok: true }
}

async function sendNotification(payload: Record<string, unknown>) {
  if (!process.env.RESEND_API_KEY) return { attempted: false, ok: false }

  const resend = new Resend(process.env.RESEND_API_KEY)
  const attribution = payload.attribution as Record<string, string>
  const { error } = await resend.emails.send({
    from: 'Cenlo Website <ola@cenlo.pt>',
    to: process.env.CENLO_SITE_PIZZARIA_NOTIFICATION_EMAIL || 'website@cenlo.pt',
    subject: `Novo pedido de site para pizzaria — ${payload.business}`,
    text: [
      'Oferta: Site para pizzaria por €149,90',
      `Referência: ${payload.reference}`,
      `Nome: ${payload.firstName}`,
      `Pizzaria: ${payload.business}`,
      `WhatsApp: ${payload.phone}`,
      `Instagram ou cardápio: ${payload.currentLink || '—'}`,
      `Consentimento: ${payload.consent ? 'sim' : 'não'}`,
      `Página: ${payload.pageUrl || '—'}`,
      `Origem: ${payload.referrer || '—'}`,
      `Fuso horário: ${payload.timezone || '—'}`,
      `Dispositivo: ${payload.device || '—'}`,
      `Campanha: ${Object.keys(attribution).length ? JSON.stringify(attribution) : '—'}`,
      `Recebido em: ${payload.createdAt}`,
    ].join('\n'),
  })

  if (error) throw new Error(error.message)
  return { attempted: true, ok: true }
}

export async function POST(request: NextRequest) {
  const ip = requesterIp(request)
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: 'Muitas tentativas seguidas. Aguarde alguns minutos e tente novamente.' },
      { status: 429 },
    )
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Pedido inválido.' }, { status: 400 })
  }

  // Honeypot preenchido. Responde como sucesso para não ensinar o robô a contornar a proteção.
  if (clean(body.website, 80)) {
    return NextResponse.json({ ok: true, reference: `SPZ-${Date.now().toString(36).toUpperCase()}` })
  }

  const firstName = clean(body.firstName, 60)
  const business = clean(body.business, 120)
  const phone = clean(body.phone, 24)
  const currentLink = clean(body.currentLink, 220)
  const consent = body.consent === true
  const digits = phone.replace(/\D/g, '')

  if (firstName.length < 2) {
    return NextResponse.json({ ok: false, field: 'firstName', error: 'Informe o seu primeiro nome.' }, { status: 422 })
  }
  if (business.length < 2) {
    return NextResponse.json({ ok: false, field: 'business', error: 'Informe o nome da pizzaria.' }, { status: 422 })
  }
  if (digits.length < 6 || digits.length > 18) {
    return NextResponse.json({ ok: false, field: 'phone', error: 'Informe um número de WhatsApp válido.' }, { status: 422 })
  }
  if (!consent) {
    return NextResponse.json({ ok: false, field: 'consent', error: 'Confirme a autorização para receber a resposta no WhatsApp.' }, { status: 422 })
  }

  const reference = `SPZ-${randomUUID().split('-')[0].toUpperCase()}`
  const payload = {
    reference,
    offer: 'site-pizzaria-14990',
    landingVersion: '1.0.0',
    firstName,
    business,
    phone,
    currentLink: currentLink || null,
    consent,
    pageUrl: clean(body.pageUrl, 500) || null,
    referrer: clean(body.referrer, 500) || null,
    timezone: clean(body.timezone, 80) || null,
    device: clean(request.headers.get('user-agent'), 500) || null,
    attribution: normalizeAttribution(body.attribution),
    createdAt: new Date().toISOString(),
  }

  let crm = { attempted: false, ok: false }
  let email = { attempted: false, ok: false }
  const failures: string[] = []

  try {
    crm = await forwardToCrm(payload)
  } catch (error) {
    failures.push(`CRM: ${error instanceof Error ? error.message : 'falha desconhecida'}`)
  }

  try {
    email = await sendNotification(payload)
  } catch (error) {
    failures.push(`Email: ${error instanceof Error ? error.message : 'falha desconhecida'}`)
  }

  if (!crm.ok && !email.ok) {
    console.error('Não foi possível registrar o pedido de site para pizzaria', {
      reference,
      attempted: { crm: crm.attempted, email: email.attempted },
      failures,
    })
    return NextResponse.json(
      { ok: false, error: 'Não foi possível registrar o pedido agora. Seus dados continuam preenchidos. Tente novamente.' },
      { status: 503 },
    )
  }

  return NextResponse.json(
    {
      ok: true,
      reference,
      delivery: crm.ok ? 'crm' : 'email',
    },
    { status: 201 },
  )
}
