import { NextRequest, NextResponse } from 'next/server'
import { validateLead, type SitePizzariaLead } from '@/lib/site-pizzaria/lead'

export const runtime = 'nodejs'

const WINDOW_MS = 10 * 60 * 1000
const MAX_ATTEMPTS = 6
// ponytail: per-instance memory. It blunts bursts and double submits on a warm instance; the CRM dedupes by submissionId for real.
const attempts = new Map<string, { count: number; resetAt: number }>()
const accepted = new Map<string, { reference: string; leadEventId?: string; at: number }>()
const UNAVAILABLE = 'Não foi possível registrar o pedido agora. Seus dados continuam preenchidos. Tente de novo em instantes.'

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

/** The CRM saves the lead and tells Pedro on WhatsApp. There is no other place a request can land. */
async function saveInCrm(lead: SitePizzariaLead & { device: string | null }, consentToken: string | undefined) {
  const endpoint = process.env.CENLO_SITE_PIZZARIA_CRM_ENDPOINT
  const token = process.env.CENLO_SITE_PIZZARIA_CRM_TOKEN
  if (!endpoint || !token) throw new Error('CRM não configurado')

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Idempotency-Key': lead.submissionId, Authorization: `Bearer ${token}` },
    body: JSON.stringify({ ...lead, ...(consentToken ? { consentToken } : {}) }),
    cache: 'no-store',
    signal: AbortSignal.timeout(8_000),
  })
  if (!response.ok) throw new Error(`CRM respondeu ${response.status}`)
  const receipt = await response.json().catch(() => ({})) as { leadEventId?: unknown }
  return { leadEventId: typeof receipt.leadEventId === 'string' ? receipt.leadEventId : undefined }
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
    return NextResponse.json({ ok: true, reference: 'SPZ-RECEBIDO' }, { status: 201 })
  }

  const result = validateLead(body, new Date())
  if ('error' in result) return NextResponse.json({ ok: false, ...result.error, error: result.error.message }, { status: 422 })
  const lead = { ...result.lead, device: request.headers.get('user-agent')?.slice(0, 500) || null }

  const previous = accepted.get(lead.submissionId)
  if (previous) return NextResponse.json({ ok: true, reference: previous.reference, replay: true, ...(previous.leadEventId ? { leadEventId: previous.leadEventId } : {}) }, { status: 200 })
  const consentToken = typeof body.consentToken === 'string' && body.consentToken.length <= 4000 ? body.consentToken : undefined

  let leadEventId: string | undefined
  try {
    ;({ leadEventId } = await saveInCrm(lead, consentToken))
  } catch (error) {
    console.error('site-pizzaria: lead não registrado no CRM', { reference: lead.reference, error: error instanceof Error ? error.message : 'falha' })
    return NextResponse.json({ ok: false, error: UNAVAILABLE }, { status: 503 })
  }

  for (const [key, value] of accepted) if (Date.now() - value.at > 60 * 60 * 1000) accepted.delete(key)
  accepted.set(lead.submissionId, { reference: lead.reference, leadEventId, at: Date.now() })
  return NextResponse.json({ ok: true, reference: lead.reference, ...(leadEventId ? { leadEventId } : {}) }, { status: 201 })
}
