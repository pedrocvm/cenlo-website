import { NextRequest, NextResponse } from 'next/server'
import { legacySubmit } from './legacy'
// Old clients cannot silently turn a configuration into a confirmed order.
// Confirmed offers use the same persistent CRM service as the diagnostic.
export async function POST(req: NextRequest) {
  const origin = req.headers.get('origin')
  if (origin && ![req.nextUrl.origin, 'https://cenlo.pt', 'https://cenlofood.cenlo.pt'].includes(origin)) return NextResponse.json({ error: 'Origem não permitida.' }, { status: 403 })
  const raw = await req.clone().text()
  if (Buffer.byteLength(raw) > 16384) return NextResponse.json({ error: 'O pedido é muito grande.' }, { status: 413 })
  let body: Record<string, unknown>
  try { body = JSON.parse(raw) } catch { return NextResponse.json({ error: 'Pedido inválido.' }, { status: 400 }) }
  if (!body.offerId) {
    try {
      const status = await fetch(`${process.env.FOOD_OFFER_API_URL || 'https://api-crm.cenlo.pt/crm/public/diagnostics/food/autonomous'}/status`, { cache: 'no-store', signal: AbortSignal.timeout(5000) })
      if (status.ok && (await status.json()).enabled === false) return legacySubmit(req)
    } catch { return NextResponse.json({ error: 'Não foi possível conferir as condições.' }, { status: 503 }) }
  }
  if (!body.offerId || body.confirmation !== true) return NextResponse.json({ error: 'Confira a oferta e os valores antes de enviar seu pedido.', reviewUrl: '/configurar/rever' }, { status: 409 })
  try {
    const res = await fetch(`${process.env.FOOD_OFFER_API_URL || 'https://api-crm.cenlo.pt/crm/public/diagnostics/food/autonomous'}/requests`, { method: 'POST', headers: { 'content-type': 'application/json', 'x-food-session': typeof body.sessionKey === 'string' ? body.sessionKey : '' }, body: raw, cache: 'no-store', signal: AbortSignal.timeout(15000) })
    return NextResponse.json(await res.json(), { status: res.status })
  } catch { return NextResponse.json({ error: 'Não consegui registrar seu pedido agora. Suas escolhas continuam aqui.' }, { status: 503 }) }
}
