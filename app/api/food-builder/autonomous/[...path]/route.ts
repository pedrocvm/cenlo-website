import { NextRequest, NextResponse } from 'next/server'
const base = process.env.FOOD_OFFER_API_URL || 'https://api-crm.cenlo.pt/crm/public/diagnostics/food/autonomous'
async function proxy(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  const { path } = await ctx.params
  const route = path.join('/')
  const allowed = /^(status|catalog|offers|requests|offers\/[a-f0-9-]{36}(\/events)?)$/.test(route)
  if (!allowed) return NextResponse.json({ message: 'Não encontrado.' }, { status: 404 })
  const body = req.method === 'POST' ? await req.text() : undefined
  if (body && Buffer.byteLength(body) > 16384) return NextResponse.json({ message: 'O pedido é muito grande.' }, { status: 413 })
  const origin = req.headers.get('origin')
  if (origin && !['https://cenlofood.cenlo.pt', 'https://cenlo.pt', req.nextUrl.origin].includes(origin)) return NextResponse.json({ message: 'Origem não permitida.' }, { status: 403 })
  try {
    const result = await fetch(`${base}/${route}`, { method: req.method, headers: { 'content-type': 'application/json', 'x-food-session': req.headers.get('x-food-session') || '' }, body, cache: 'no-store', signal: AbortSignal.timeout(15000) })
    const data = await result.json()
    return NextResponse.json(data, { status: result.status, headers: { 'cache-control': 'no-store' } })
  } catch { return NextResponse.json({ message: 'Não consegui registrar seu pedido agora. Suas escolhas continuam aqui. Tente novamente.' }, { status: 503 }) }
}
export const GET = proxy
export const POST = proxy
