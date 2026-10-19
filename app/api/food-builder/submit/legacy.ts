import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'
import { buildSubmission, MAX_BODY_BYTES } from '@/lib/food-builder/submission'
import { renderEmail } from '@/lib/food-builder/email'
import { loadFoodPricing, suggestPrice } from '@/lib/food-builder/pricing'

// ponytail: per-instance limiter, resets on cold start; loose limit because cenlofood.cenlo.pt proxies here and may share an IP. Move to a shared store if abuse shows up
const hits = new Map<string, number[]>()
function limited(ip: string, now: number) {
  const recent = (hits.get(ip) ?? []).filter(t => now - t < 10 * 60 * 1000)
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) hits.clear()
  return recent.length > 20
}

export async function legacySubmit(req: NextRequest) {
  const now = Date.now()
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown'
  if (limited(ip, now)) return NextResponse.json({ error: 'Demasiados envios. Aguarde alguns minutos e tente novamente.' }, { status: 429 })

  const raw = await req.text()
  if (raw.length > MAX_BODY_BYTES) return NextResponse.json({ error: 'Pedido demasiado grande.' }, { status: 413 })
  let body: unknown
  try {
    body = JSON.parse(raw)
  } catch {
    return NextResponse.json({ error: 'Pedido inválido.' }, { status: 400 })
  }

  const result = await buildSubmission(body, now)
  if (!result.ok) return NextResponse.json({ error: result.errors[0].message, errors: result.errors }, { status: result.status })
  const s = result.submission

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY não está configurada no ambiente')
    return NextResponse.json({ error: 'O envio está temporariamente indisponível.' }, { status: 503 })
  }

  const { subject, text, html } = renderEmail(s, suggestPrice(s, await loadFoodPricing()))
  const resend = new Resend(process.env.RESEND_API_KEY)
  const { data, error } = await resend.emails.send(
    {
      from: 'Cenlo Food Builder <ola@cenlo.pt>',
      to: process.env.FOOD_BUILDER_TO || 'ola@cenlo.pt',
      replyTo: s.contact.email ?? undefined,
      subject,
      text,
      html,
      attachments: [{ filename: `${s.reference}.json`, content: Buffer.from(JSON.stringify(s, null, 2)).toString('base64'), contentType: 'application/json' }],
      tags: [{ name: 'source', value: s.source }],
    },
    { idempotencyKey: `food-builder/${s.submissionId}` },
  )

  if (error || !data?.id) {
    console.error('Resend error (food builder):', s.reference, error)
    return NextResponse.json({ error: 'Não foi possível enviar a configuração. Tente novamente.' }, { status: 502 })
  }

  return NextResponse.json({ ok: true, reference: s.reference })
}
