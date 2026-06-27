import type { Metadata } from 'next'
import Link from 'next/link'
import { pains, flowMini, verticals, pizzaPills } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Cenlo — central de pedidos por WhatsApp para negócios locais',
  description: 'O Cenlo ajuda pizzarias e negócios locais a organizar pedidos e atendimento pelo WhatsApp, com menos pedidos perdidos, menos erros e mais clareza na operação.',
  alternates: { canonical: 'https://cenlo.pt' },
  openGraph: {
    title: 'Cenlo — central de pedidos por WhatsApp para negócios locais',
    description: 'O Cenlo ajuda pizzarias e negócios locais a organizar pedidos e atendimento pelo WhatsApp, com menos pedidos perdidos, menos erros e mais clareza na operação.',
    url: 'https://cenlo.pt',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cenlo — central de pedidos por WhatsApp para negócios locais',
    description: 'O Cenlo ajuda pizzarias e negócios locais a organizar pedidos e atendimento pelo WhatsApp, com menos pedidos perdidos, menos erros e mais clareza na operação.',
  },
}

const orgSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'Cenlo',
      url: 'https://cenlo.pt',
      description: 'Central de pedidos por WhatsApp para negócios locais em Portugal.',
      contactPoint: { '@type': 'ContactPoint', email: 'ola@cenlo.pt', contactType: 'customer service' },
    },
    {
      '@type': 'WebSite',
      name: 'Cenlo',
      url: 'https://cenlo.pt',
    },
  ],
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
              A central inteligente para negócios locais que atendem pelo WhatsApp.
            </h1>
            <p style={{ fontSize: 18.5, color: 'var(--ink2)', marginTop: 20, maxWidth: 520 }}>
              O Cenlo organiza os pedidos que chegam pelo WhatsApp para a sua pizzaria perder menos pedido, errar menos pedido e operar com mais clareza.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 30 }}>
              <Link href="/contacto" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: 'var(--terraBtn)', color: '#fff', border: 'none', padding: '15px 24px', borderRadius: 11, fontWeight: 600, fontSize: 16, boxShadow: '0 8px 20px -10px var(--terra)' }}>
                Pedir demonstração
              </Link>
              <Link href="/pizza" style={{ background: 'var(--surface)', color: 'var(--ink)', border: '1px solid var(--line)', padding: '15px 22px', borderRadius: 11, fontWeight: 600, fontSize: 16 }}>
                Ver como funciona →
              </Link>
            </div>
            <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 10 }}>Demonstração curta, sem compromisso.</p>
            <div style={{ display: 'flex', gap: 22, marginTop: 22, flexWrap: 'wrap' }}>
              <div style={{ fontSize: 13.5, color: 'var(--muted)' }}><strong style={{ color: 'var(--ink)', fontWeight: 600 }}>Menos</strong> pedidos perdidos</div>
              <div style={{ fontSize: 13.5, color: 'var(--muted)' }}><strong style={{ color: 'var(--ink)', fontWeight: 600 }}>Menos</strong> erros na cozinha</div>
              <div style={{ fontSize: 13.5, color: 'var(--muted)' }}><strong style={{ color: 'var(--ink)', fontWeight: 600 }}>Mais</strong> clareza na operação</div>
            </div>
          </div>

          {/* Hero mockup: conversa → pedido */}
          <div style={{ position: 'relative' }} className="animate-fade-up-d">
            <div style={{ position: 'absolute', top: -14, right: -6, zIndex: 2, background: 'var(--terraBtn)', color: '#fff', fontSize: 11, fontWeight: 600, padding: '5px 10px', borderRadius: 7 }}>Cenlo Pizza</div>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 18, boxShadow: '0 30px 60px -34px rgba(0,0,0,.45)', overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '13px 16px', borderBottom: '1px solid var(--line2)', background: 'var(--surface2)' }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#25D366', display: 'inline-block' }} />
                <span style={{ fontWeight: 600, fontSize: 14 }}>WhatsApp · Bella Napoli</span>
                <span style={{ marginLeft: 'auto', fontSize: 11.5, color: 'var(--muted)' }}>há 1 min</span>
              </div>
              <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 9, background: 'var(--bg)' }}>
                <div style={{ alignSelf: 'flex-start', maxWidth: '78%', background: '#fff', border: '1px solid var(--line2)', padding: '9px 12px', borderRadius: '13px 13px 13px 4px', fontSize: 13.5, color: '#23201C' }}>Boa noite! Queria uma Margherita média e meia Pepperoni meia Funghi 🍕</div>
                <div style={{ alignSelf: 'flex-end', maxWidth: '78%', background: '#DDF3D8', padding: '9px 12px', borderRadius: '13px 13px 4px 13px', fontSize: 13.5, color: '#23201C' }}>Anotado! Entrega ou recolha?</div>
                <div style={{ alignSelf: 'flex-start', maxWidth: '78%', background: '#fff', border: '1px solid var(--line2)', padding: '9px 12px', borderRadius: '13px 13px 13px 4px', fontSize: 13.5, color: '#23201C' }}>Entrega, Rua das Flores 12</div>
              </div>
              <div style={{ padding: '14px 16px', borderTop: '1px dashed var(--line)', background: 'var(--surface2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--terra)' }}>Pedido #1042 · estruturado</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--amber)', background: 'var(--amberBg)', padding: '3px 8px', borderRadius: 6 }}>Em preparação</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 7, fontSize: 13.5 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Pizza Margherita · M</span><span style={{ color: 'var(--muted)' }}>€8,50</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>½ Pepperoni · ½ Funghi · M</span><span style={{ color: 'var(--muted)' }}>€9,90</span></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--line2)', paddingTop: 7, marginTop: 2, fontWeight: 700 }}><span>Total · entrega</span><span>€18,40</span></div>
                </div>
              </div>
            </div>
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
      <section style={{ maxWidth: 1160, margin: '0 auto', padding: '72px 24px' }}>
        <div className="grid-two" style={{ background: 'var(--panel)', color: '#F4EBDC', borderRadius: 22, overflow: 'hidden', display: 'grid', gridTemplateColumns: '1.05fr .95fr' }}>
          <div style={{ padding: '48px 44px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,106,44,.22)', color: '#FFB68F', padding: '6px 13px', borderRadius: 999, fontSize: 13, fontWeight: 600 }}>Em destaque</span>
            <h2 style={{ fontSize: 38, color: '#fff', marginTop: 18, fontFamily: 'var(--font-schibsted)' }}>Cenlo Pizza: os pedidos da sua pizzaria, finalmente organizados.</h2>
            <p style={{ fontSize: 17, color: '#C9BCA8', marginTop: 16, maxWidth: 460 }}>Organiza o atendimento em pedidos claros, envia para a cozinha, regista clientes e mostra o que aconteceu no dia. Para a sua pizzaria perder menos pedido, errar menos e operar com mais clareza.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 28 }}>
              <Link href="/contacto" style={{ background: 'var(--terraBtn)', color: '#fff', border: 'none', padding: '14px 22px', borderRadius: 11, fontWeight: 600, fontSize: 16 }}>Pedir demonstração</Link>
              <Link href="/pizza" style={{ background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,.28)', padding: '14px 22px', borderRadius: 11, fontWeight: 600, fontSize: 16 }}>Ver o Cenlo Pizza →</Link>
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,.4)', marginTop: 10 }}>Mostramos em poucos minutos se faz sentido para a sua pizzaria.</p>
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

      {/* CTA FINAL */}
      <section style={{ maxWidth: 1160, margin: '0 auto', padding: '20px 24px 84px' }}>
        <div style={{ position: 'relative', background: 'var(--panel)', border: '1px solid var(--line)', borderRadius: 24, padding: '60px 44px', overflow: 'hidden' }}>
          <div aria-hidden="true" style={{ position: 'absolute', top: -140, left: -60, width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,106,44,.28),rgba(255,106,44,0) 68%)', pointerEvents: 'none' }} />
          <div aria-hidden="true" style={{ position: 'absolute', bottom: -160, right: -40, width: 380, height: 380, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,106,44,.16),rgba(255,106,44,0) 70%)', pointerEvents: 'none' }} />
          <div className="grid-two" style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1.05fr .95fr', gap: 44, alignItems: 'center' }}>
            <div style={{ maxWidth: 560 }}>
              <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--terra)' }}>Pronto quando estiver</span>
              <h2 style={{ fontSize: 38, color: '#fff', marginTop: 14, fontFamily: 'var(--font-schibsted)' }}>Vamos organizar a sua operação juntos?</h2>
              <p style={{ fontSize: 17, color: 'var(--ink2)', marginTop: 14, maxWidth: 480 }}>Marcamos uma demonstração curta e mostramos a Cenlo a trabalhar com o fluxo real do seu negócio.</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 28 }}>
                <Link href="/contacto" style={{ background: 'var(--terraBtn)', color: '#fff', border: 'none', padding: '15px 26px', borderRadius: 11, fontWeight: 600, fontSize: 16 }}>Pedir demonstração</Link>
                <Link href="/produtos" style={{ background: 'transparent', color: '#fff', border: '1px solid var(--line)', padding: '15px 24px', borderRadius: 11, fontWeight: 600, fontSize: 16 }}>Ver produtos</Link>
              </div>
              <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 10 }}>Demonstração curta, sem compromisso.</p>
            </div>
            <div className="hide-sm" style={{ background: 'rgba(11,11,15,.55)', border: '1px solid var(--line)', borderRadius: 16, padding: 22, backdropFilter: 'blur(4px)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <span style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--muted)' }}>Fecho do dia</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--olive)', background: 'var(--oliveBg)', padding: '3px 8px', borderRadius: 6 }}>Hoje</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[
                  { val: '48', label: 'Pedidos', color: '#fff' },
                  { val: '€612', label: 'Faturação', color: 'var(--terra)' },
                  { val: '9', label: 'Clientes reativados', color: 'var(--olive)' },
                  { val: '€12,70', label: 'Ticket médio', color: '#fff' },
                ].map(s => (
                  <div key={s.label} style={{ background: 'var(--surface)', border: '1px solid var(--line2)', borderRadius: 12, padding: 14 }}>
                    <div style={{ fontFamily: 'var(--font-schibsted)', fontWeight: 800, fontSize: 26, color: s.color }}>{s.val}</div>
                    <div style={{ fontSize: 12.5, color: 'var(--muted)', marginTop: 2 }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--muted)' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--terra)', flexShrink: 0, display: 'inline-block' }} />
                Imagem ilustrativa, dados de demonstração
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
