import type { Metadata } from 'next'
import Link from 'next/link'
import { values, beforeAfter } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Sobre a Cenlo — tecnologia para negócios locais',
  description: 'A Cenlo nasceu para organizar o atendimento e operação de quem atende clientes todos os dias, a começar pelo WhatsApp.',
  alternates: { canonical: 'https://cenlo.pt/sobre' },
  openGraph: {
    title: 'Sobre a Cenlo — tecnologia para negócios locais',
    description: 'A Cenlo nasceu para organizar o atendimento e operação de quem atende clientes todos os dias, a começar pelo WhatsApp.',
    url: 'https://cenlo.pt/sobre',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sobre a Cenlo — tecnologia para negócios locais',
    description: 'A Cenlo nasceu para organizar o atendimento e operação de quem atende clientes todos os dias, a começar pelo WhatsApp.',
  },
}

function CentralDiagram() {
  const cx = 210, cy = 155
  const nodes = [
    { x: 210, y: 38,  label: 'WhatsApp', lx: 210, ly: 18,  anchor: 'middle', delay: '0s' },
    { x: 322, y: 114, label: 'Pedido',   lx: 368, ly: 118, anchor: 'start',  delay: '0.6s' },
    { x: 282, y: 244, label: 'Reserva',  lx: 282, ly: 268, anchor: 'middle', delay: '1.2s' },
    { x: 138, y: 244, label: 'Mensagem', lx: 138, ly: 268, anchor: 'middle', delay: '1.8s' },
    { x: 98,  y: 114, label: 'Telefone', lx: 52,  ly: 118, anchor: 'end',    delay: '2.4s' },
  ]
  return (
    <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 16, padding: '12px 8px 8px' }}>
      <svg viewBox="0 0 420 295" style={{ width: '100%', height: 'auto' }} aria-hidden="true">
        <defs>
          <style>{`
            @keyframes cPulse { 0% { r:40; opacity:.35 } 100% { r:64; opacity:0 } }
            .cPulse { animation: cPulse 2.6s ease-out infinite; }
          `}</style>
        </defs>

        <circle cx={cx} cy={cy} r={40} fill="none" stroke="var(--terra)" strokeWidth={1.5} className="cPulse" />
        <circle cx={cx} cy={cy} r={40} fill="none" stroke="var(--terra)" strokeWidth={1.5} className="cPulse" style={{ animationDelay: '1.3s' }} />

        {nodes.map(n => (
          <line key={n.label} x1={n.x} y1={n.y} x2={cx} y2={cy}
            stroke="var(--line)" strokeWidth={1} strokeDasharray="5 4" />
        ))}

        {nodes.map(n => (
          <circle key={`d-${n.label}`} r={3.5} fill="var(--terra)">
            <animateMotion dur="2s" repeatCount="indefinite" begin={n.delay}
              path={`M ${n.x} ${n.y} L ${cx} ${cy}`} />
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.08;.88;1"
              dur="2s" repeatCount="indefinite" begin={n.delay} />
          </circle>
        ))}

        {nodes.map(n => (
          <g key={`n-${n.label}`}>
            <circle cx={n.x} cy={n.y} r={9} fill="var(--bg2)" stroke="var(--line)" strokeWidth={1.5} />
            <circle cx={n.x} cy={n.y} r={3.5} fill="var(--terra)" />
            <text x={n.lx} y={n.ly} textAnchor={n.anchor as 'middle' | 'start' | 'end'}
              fontSize={11} fontWeight={500} fill="var(--muted)" fontFamily="var(--font-hanken)">{n.label}</text>
          </g>
        ))}

        <circle cx={cx} cy={cy} r={38} fill="var(--terraBtn)" />
        <text x={cx} y={cy - 3} textAnchor="middle" fontSize={14} fontWeight={800}
          fill="white" fontFamily="var(--font-schibsted)">Cenlo</text>
        <text x={cx} y={cy + 13} textAnchor="middle" fontSize={9} fill="rgba(255,255,255,.6)"
          fontFamily="var(--font-hanken)">central</text>
      </svg>
    </div>
  )
}

export default function SobrePage() {
  return (
    <>
      <section style={{ maxWidth: 1160, margin: '0 auto', padding: '64px 24px 56px' }}>
        <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--terra)' }}>Sobre a Cenlo</span>
        <h1 className="hd" style={{ fontSize: 52, marginTop: 14, fontFamily: 'var(--font-schibsted)', maxWidth: 760 }}>Construído em Portugal, para quem atende clientes todos os dias.</h1>
        <p style={{ fontSize: 20, color: 'var(--ink2)', marginTop: 22, maxWidth: 680 }}>A Cenlo nasceu para resolver isso, a começar pelos canais onde esses negócios já falam com os clientes: WhatsApp, mensagens e contacto direto.</p>
        <div style={{ borderLeft: '3px solid var(--terra)', padding: '6px 0 6px 24px', marginTop: 36, display: 'flex', flexDirection: 'column', gap: 18, maxWidth: 700 }}>
          <p style={{ fontSize: 17, color: 'var(--ink2)' }}>A Cenlo nasce de uma observação simples: muitos negócios atendem, vendem e acompanham clientes todos os dias, mas ainda operam no improviso.</p>
          <p style={{ fontSize: 17, color: 'var(--ink2)' }}>O nome vem de <strong style={{ color: 'var(--ink)' }}>central + local</strong>: uma central inteligente que vive perto do negócio, não um sistema pesado e distante. Em vez de pedir para mudar tudo, a Cenlo organiza o que já existe.</p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 32 }}>
          <Link href="/contacto" className="cta-primary" style={{ background: 'var(--terraBtn)', color: '#fff', border: 'none', padding: '15px 24px', borderRadius: 11, fontWeight: 600, fontSize: 16, boxShadow: '0 8px 20px -10px var(--terra)' }}>Pedir demonstração</Link>
          <Link href="/produtos" className="cta-primary" style={{ background: 'var(--surface)', color: 'var(--ink)', border: '1px solid var(--line)', padding: '15px 22px', borderRadius: 11, fontWeight: 600, fontSize: 16 }}>Conhecer produtos →</Link>
        </div>
      </section>

      <section style={{ background: 'var(--bg2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', marginTop: 30 }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '56px 24px' }}>
          <h2 style={{ fontSize: 28, fontFamily: 'var(--font-schibsted)' }}>O que defende a Cenlo</h2>
          <div className="grid-three" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginTop: 24 }}>
            {values.map(v => (
              <div key={v.t} className="card-hover" style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 14, padding: 22 }}>
                <div style={{ fontWeight: 700, fontSize: 17.5, color: 'var(--terra)' }}>{v.t}</div>
                <p style={{ fontSize: 14.5, color: 'var(--ink2)', marginTop: 8 }}>{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1160, margin: '0 auto', padding: '60px 24px' }}>
        <div className="grid-two" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: 28, fontFamily: 'var(--font-schibsted)' }}>Antes e depois da operação</h2>
            <p style={{ fontSize: 16, color: 'var(--ink2)', marginTop: 12 }}>A diferença não é tecnológica. É de organização.</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {beforeAfter.map(ba => (
              <div key={ba.before} style={{ display: 'grid', gridTemplateColumns: '1fr 24px 1fr', gap: 10, alignItems: 'center' }}>
                <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 10, padding: '12px 14px', fontSize: 13.5, color: 'var(--muted)' }}>{ba.before}</div>
                <span style={{ textAlign: 'center', color: 'var(--terra)', fontWeight: 700 }}>→</span>
                <div style={{ background: 'var(--oliveBg)', border: '1px solid var(--line)', borderRadius: 10, padding: '12px 14px', fontSize: 13.5, color: 'var(--ink)', fontWeight: 600 }}>{ba.after}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px 80px' }}>
        <div style={{ background: 'var(--panel)', color: '#F4EBDC', borderRadius: 20, padding: 48, textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-schibsted)', fontSize: 26, color: '#fff', maxWidth: 680, margin: '0 auto', lineHeight: 1.25 }}>
            &ldquo;Quem atende clientes todos os dias não precisa de mais tecnologia. Precisa de ordem no que já faz, para fechar mais negócio e trazer clientes de volta.&rdquo;
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', marginTop: 28 }}>
            <Link href="/produtos" className="cta-primary" style={{ background: 'var(--terraBtn)', color: '#fff', border: 'none', padding: '14px 24px', borderRadius: 11, fontWeight: 600, fontSize: 16 }}>Conhecer produtos</Link>
            <Link href="/contacto" className="cta-primary" style={{ background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,.4)', padding: '14px 22px', borderRadius: 11, fontWeight: 600, fontSize: 16 }}>Falar connosco</Link>
          </div>
        </div>
      </section>
    </>
  )
}
