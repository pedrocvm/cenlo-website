import type { Metadata } from 'next'
import Link from 'next/link'
import { pains, flowMini, verticals, pizzaPills } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Cenlo — a central inteligente para negócios locais',
  description: 'O Cenlo organiza atendimento, pedidos, reservas e clientes de negócios locais pelos canais onde o seu cliente já fala consigo. Menos confusão na operação, mais clareza no fecho do dia.',
  alternates: { canonical: 'https://cenlo.pt' },
  openGraph: {
    title: 'Cenlo — a central inteligente para negócios locais',
    description: 'O Cenlo organiza atendimento, pedidos, reservas e clientes de negócios locais pelos canais onde o seu cliente já fala consigo. Menos confusão na operação, mais clareza no fecho do dia.',
    url: 'https://cenlo.pt',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cenlo — a central inteligente para negócios locais',
    description: 'O Cenlo organiza atendimento, pedidos, reservas e clientes de negócios locais pelos canais onde o seu cliente já fala consigo. Menos confusão na operação, mais clareza no fecho do dia.',
  },
}

const orgSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'Cenlo',
      url: 'https://cenlo.pt',
      description: 'Central inteligente de atendimento, pedidos, reservas e clientes para negócios locais em Portugal.',
      contactPoint: { '@type': 'ContactPoint', email: 'ola@cenlo.pt', contactType: 'customer service' },
    },
    {
      '@type': 'WebSite',
      name: 'Cenlo',
      url: 'https://cenlo.pt',
    },
  ],
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
    <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 18, padding: '12px 8px 8px', boxShadow: '0 30px 60px -34px rgba(0,0,0,.45)' }}>
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
          <line key={n.label} x1={n.x} y1={n.y} x2={cx} y2={cy} stroke="var(--line)" strokeWidth={1} strokeDasharray="5 4" />
        ))}
        {nodes.map(n => (
          <circle key={`d-${n.label}`} r={3.5} fill="var(--terra)">
            <animateMotion dur="2s" repeatCount="indefinite" begin={n.delay} path={`M ${n.x} ${n.y} L ${cx} ${cy}`} />
            <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;.08;.88;1" dur="2s" repeatCount="indefinite" begin={n.delay} />
          </circle>
        ))}
        {nodes.map(n => (
          <g key={`n-${n.label}`}>
            <circle cx={n.x} cy={n.y} r={9} fill="var(--bg2)" stroke="var(--line)" strokeWidth={1.5} />
            <circle cx={n.x} cy={n.y} r={3.5} fill="var(--terra)" />
            <text x={n.lx} y={n.ly} textAnchor={n.anchor as 'middle'|'start'|'end'} fontSize={11} fontWeight={500} fill="var(--muted)" fontFamily="var(--font-hanken)">{n.label}</text>
          </g>
        ))}
        <circle cx={cx} cy={cy} r={38} fill="var(--terraBtn)" />
        <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central" fontSize={14} fontWeight={800} fill="white" fontFamily="var(--font-schibsted)">Cenlo</text>
      </svg>
    </div>
  )
}

function BadgeStyle({ status }: { status: 'Disponível' | 'Em breve' }) {
  if (status === 'Disponível') {
    return <span style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--olive)', background: 'var(--oliveBg)', padding: '4px 10px', borderRadius: 7 }}>Disponível</span>
  }
  return <span style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--amber)', background: 'var(--amberBg)', padding: '4px 10px', borderRadius: 7 }}>Em breve</span>
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />

      {/* HERO */}
      <section style={{ position: 'relative', maxWidth: 1160, margin: '0 auto', padding: '64px 24px 40px', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', top: -180, right: -120, width: 560, height: 560, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,106,44,.20),rgba(255,106,44,0) 65%)', pointerEvents: 'none', zIndex: 0 }} />
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,.05) 1px,transparent 1px)', backgroundSize: '34px 34px', maskImage: 'radial-gradient(ellipse 80% 60% at 70% 0%,#000,transparent 70%)', WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 70% 0%,#000,transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
        <div className="grid-two" style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1.05fr .95fr', gap: 54, alignItems: 'center' }}>
          <div className="animate-fade-up">
            <h1 className="hd" style={{ fontSize: 52, margin: 0, fontWeight: 800, fontFamily: 'var(--font-schibsted)' }}>
              Pare de perder pedidos e clientes. Organize a operação num só lugar.
            </h1>
            <p style={{ fontSize: 18.5, color: 'var(--ink2)', marginTop: 20, maxWidth: 520 }}>
              Transforma conversas, pedidos e reservas em operação clara por mensagem, telefone ou presencialmente. Sem trocar a forma como o seu cliente já fala consigo.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 30 }}>
              <Link href="/contacto" className="cta-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: 'var(--terraBtn)', color: '#fff', border: 'none', padding: '15px 24px', borderRadius: 11, fontWeight: 600, fontSize: 16, boxShadow: '0 8px 20px -10px var(--terra)' }}>
                Pedir demonstração
              </Link>
              <Link href="/produtos" className="cta-primary" style={{ background: 'var(--surface)', color: 'var(--ink)', border: '1px solid var(--line)', padding: '15px 22px', borderRadius: 11, fontWeight: 600, fontSize: 16 }}>
                Ver produtos →
              </Link>
            </div>
            <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 10 }}>Demonstração curta, sem compromisso.</p>
            <div style={{ display: 'flex', gap: 22, marginTop: 22, flexWrap: 'wrap' }}>
              <div style={{ fontSize: 13.5, color: 'var(--muted)' }}><strong style={{ color: 'var(--ink)', fontWeight: 600 }}>Menos</strong> pedidos perdidos</div>
              <div style={{ fontSize: 13.5, color: 'var(--muted)' }}><strong style={{ color: 'var(--ink)', fontWeight: 600 }}>Menos</strong> erros na cozinha</div>
              <div style={{ fontSize: 13.5, color: 'var(--muted)' }}><strong style={{ color: 'var(--ink)', fontWeight: 600 }}>Mais</strong> clareza na operação</div>
            </div>
          </div>

          <div className="animate-fade-up-d">
            <CentralDiagram />
          </div>
        </div>
      </section>

      {/* PROBLEMA */}
      <section style={{ background: 'var(--bg2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '64px 24px' }}>
          <div style={{ maxWidth: 640 }}>
            <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--terra)' }}>O dia a dia real</span>
            <h2 style={{ fontSize: 34, marginTop: 12, fontFamily: 'var(--font-schibsted)' }}>Bons negócios não morrem por falta de clientes, morrem por falta de organização.</h2>
            <p style={{ fontSize: 17, color: 'var(--ink2)', marginTop: 14 }}>Pedidos, reservas, orçamentos e clientes passam por mensagens soltas, papéis e memória. No fim do dia, ninguém sabe ao certo o que aconteceu.</p>
          </div>
          <div className="grid-three" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginTop: 36 }}>
            {pains.map(p => (
              <div key={p.tag} style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 13, padding: 18 }}>
                <span style={{ display: 'block', fontSize: 17.5, color: 'var(--ink)', fontWeight: 700, fontFamily: 'var(--font-schibsted)', letterSpacing: '-.01em', marginBottom: 8 }}>{p.tag}</span>
                <span style={{ fontSize: 14.5, color: 'var(--ink2)' }}>{p.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* O QUE É */}
      <section style={{ maxWidth: 1160, margin: '0 auto', padding: '70px 24px' }}>
        <div className="grid-two" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--terra)' }}>O que é a Cenlo</span>
            <h2 style={{ fontSize: 34, marginTop: 12, fontFamily: 'var(--font-schibsted)' }}>Centrais inteligentes para cada tipo de negócio.</h2>
            <p style={{ fontSize: 17, color: 'var(--ink2)', marginTop: 16 }}>A Cenlo organiza atendimento, clientes, pedidos, reservas, marcações, follow-up e operação diária, sem trocar a forma como o seu cliente já fala consigo. O nome diz o que faz: uma central que vive perto do negócio.</p>
            <div style={{ display: 'flex', gap: 14, marginTop: 24 }}>
              <div style={{ flex: 1, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 12, padding: 16 }}>
                <div style={{ fontFamily: 'var(--font-schibsted)', fontWeight: 800, fontSize: 20, color: 'var(--terra)' }}>Central</div>
                <p style={{ fontSize: 14, color: 'var(--ink2)', marginTop: 6 }}>Tudo num só lugar: conversas, pedidos, clientes e números.</p>
              </div>
              <div style={{ flex: 1, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 12, padding: 16 }}>
                <div style={{ fontFamily: 'var(--font-schibsted)', fontWeight: 800, fontSize: 20, color: 'var(--olive)' }}>Local</div>
                <p style={{ fontSize: 14, color: 'var(--ink2)', marginTop: 6 }}>Pensada para quem atende clientes de perto, todos os dias, seja qual for o tamanho da operação.</p>
              </div>
            </div>
          </div>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 16, padding: 8 }}>
            <div style={{ background: 'var(--bg)', border: '1px solid var(--line2)', borderRadius: 12, padding: 22 }}>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 16 }}>Da conversa à operação</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {flowMini.map(f => (
                  <div key={f.n} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <span style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--terraBtn)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{f.n}</span>
                      {f.showLine && <span style={{ width: 2, flex: 1, background: 'var(--line)', minHeight: 14, display: 'block' }} />}
                    </div>
                    <div style={{ paddingBottom: 18 }}>
                      <div style={{ fontWeight: 600, fontSize: 15 }}>{f.title}</div>
                      <div style={{ fontSize: 13.5, color: 'var(--ink2)' }}>{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUTOS */}
      <section style={{ background: 'var(--bg2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '64px 24px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div style={{ maxWidth: 560 }}>
              <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--terra)' }}>Os produtos</span>
              <h2 style={{ fontSize: 34, marginTop: 12, fontFamily: 'var(--font-schibsted)' }}>Tecnologia que organiza o que o seu negócio já faz todos os dias.</h2>
            </div>
            <Link href="/produtos" style={{ background: 'var(--surface)', border: '1px solid var(--line)', padding: '12px 18px', borderRadius: 10, fontWeight: 600, fontSize: 15 }}>Ver produtos →</Link>
          </div>
          <div className="grid-two" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16, marginTop: 34 }}>
            {verticals.map(v => (
              <Link
                key={v.name}
                href={v.href}
                className="card-hover"
                style={{
                  textAlign: 'left',
                  background: 'var(--surface)',
                  border: v.status === 'Disponível' ? '1px solid var(--terra)' : '1px solid var(--line)',
                  borderRadius: 15,
                  padding: 24,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0,
                  opacity: v.status === 'Em breve' ? 0.72 : 1,
                  transition: 'opacity .15s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'var(--font-schibsted)', fontWeight: 800, fontSize: 21, color: '#fff' }}>{v.name}</span>
                  <BadgeStyle status={v.status} />
                </div>
                <p style={{ fontSize: 15, color: 'var(--ink2)', marginTop: 10 }}>{v.desc}</p>
                <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--terra)', marginTop: 14 }}>{v.cta} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* DESTAQUE PIZZA */}
      <section style={{ maxWidth: 1160, margin: '0 auto', padding: '72px 24px 84px' }}>
        <div className="grid-two" style={{ background: 'var(--panel)', color: '#F4EBDC', borderRadius: 22, overflow: 'hidden', display: 'grid', gridTemplateColumns: '1.05fr .95fr' }}>
          <div style={{ padding: '48px 44px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,106,44,.22)', color: '#FFB68F', padding: '6px 13px', borderRadius: 999, fontSize: 13, fontWeight: 600 }}>Primeiro produto disponível</span>
            <h2 style={{ fontSize: 38, color: '#fff', marginTop: 18, fontFamily: 'var(--font-schibsted)' }}>Cenlo Pizza: os pedidos da sua pizzaria, finalmente organizados.</h2>
            <p style={{ fontSize: 17, color: '#C9BCA8', marginTop: 16, maxWidth: 460 }}>Organiza o atendimento em pedidos claros, envia para a cozinha, regista clientes e mostra o que aconteceu no dia. É o primeiro produto disponível de uma família de centrais Cenlo pensadas para cada tipo de negócio local.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 28 }}>
              <Link href="/contacto" className="cta-primary" style={{ background: 'var(--terraBtn)', color: '#fff', border: 'none', padding: '14px 22px', borderRadius: 11, fontWeight: 600, fontSize: 16 }}>Pedir demonstração</Link>
              <Link href="/pizza" className="cta-primary" style={{ background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,.28)', padding: '14px 22px', borderRadius: 11, fontWeight: 600, fontSize: 16 }}>Ver o Cenlo Pizza →</Link>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,.4)', marginTop: 10 }}>Demonstração curta, sem compromisso.</p>
          </div>
          <div className="hide-sm" style={{ background: '#0E0E13', padding: 36, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 12, borderLeft: '1px solid var(--line)' }}>
            {pizzaPills.map(pp => (
              <div key={pp} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(255,255,255,.04)', border: '1px solid var(--line)', borderRadius: 11, padding: '13px 15px' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--olive)', flexShrink: 0, display: 'inline-block' }} />
                <span style={{ fontSize: 14.5, color: '#E8DECE' }}>{pp}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </>
  )
}
