import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  const { nome, negocio, cidade, segmento, telefone, email, mensagem } = await req.json()

  if (!nome?.trim() || !telefone?.trim()) {
    return NextResponse.json({ error: 'Campos obrigatórios em falta' }, { status: 400 })
  }

  const { error } = await resend.emails.send({
    from: 'Cenlo Website <ola@cenlo.pt>',
    to: 'ola@cenlo.pt',
    subject: `Pedido de demonstração — ${nome}`,
    text: [
      `Nome: ${nome}`,
      `Negócio: ${negocio || '—'}`,
      `Cidade: ${cidade || '—'}`,
      `Segmento: ${segmento || '—'}`,
      `Telefone: ${telefone}`,
      `Email: ${email || '—'}`,
      `Mensagem: ${mensagem || '—'}`,
    ].join('\n'),
  })

  if (error) {
    console.error('Resend error:', error)
    return NextResponse.json({ error: 'Falha ao enviar' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
