import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { nome, negocio, cidade, segmento, telefone, email, mensagem } = await req.json()

  if (!nome?.trim() || !telefone?.trim()) {
    return NextResponse.json({ error: 'Campos obrigatórios em falta' }, { status: 400 })
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY não está configurada no ambiente')
    return NextResponse.json({ error: 'Serviço de email não configurado' }, { status: 500 })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  const { error } = await resend.emails.send({
    from: 'Cenlo Website <ola@cenlo.pt>',
    to: 'website@cenlo.pt',
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
