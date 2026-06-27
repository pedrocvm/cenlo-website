import Link from 'next/link'
import FaqAccordion from '@/components/FaqAccordion'
import { pizzaFor, pizzaProblems, pizzaSteps, pizzaFeatures, benefits, pizzaNot, demoSteps } from '@/lib/data'

export const metadata = {
  title: 'Cenlo Pizza — Software de pedidos para pizzarias',
  description: 'O Cenlo Pizza transforma o atendimento em pedidos claros, envia-os para a cozinha, regista clientes e ajuda a reativar quem já comprou.',
}

function MockupFrame({ title, caption, glyph }: { title: string; caption: string; glyph: string }) {
  return (
    <figure style={{ margin: 0, position: 'relative', background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 14, overflow: 'hidden', boxShadow: '0 24px 50px -38px rgba(0,0,0,.45)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '11px 14px', background: 'var(--surface2)', borderBottom: '1px solid var(--line2)' }}>
        <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#FF5F57', display: 'inline-block' }} />
        <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#FEBC2E', display: 'inline-block' }} />
        <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#28C840', display: 'inline-block' }} />
        <span style={{ marginLeft: 8, fontSize: 12, color: 'var(--muted)' }}>app.cenlo.pt · {title}</span>
      </div>
      <div style={{ aspectRatio: '16/10', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, background: 'var(--bg)', textAlign: 'center', padding: 24 }}>
        <span style={{ width: 42, height: 42, borderRadius: 11, background: 'var(--terraBg)', color: 'var(--terra)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontFamily: 'var(--font-schibsted)', fontWeight: 800 }}>{glyph}</span>
        <span style={{ fontWeight: 600, fontSize: 15, color: 'var(--ink)' }}>{title} · captura em preparação</span>
        <span style={{ fontSize: 12.5, color: 'var(--muted)', maxWidth: 280 }}>Imagem temporária — substituir por captura real</span>
      </div>
      <figcaption style={{ padding: '12px 16px', borderTop: '1px solid var(--line2)', fontSize: 13.5, color: 'var(--ink2)' }}>
        <strong style={{ color: 'var(--ink)' }}>{title}</strong> · {caption}
      </figcaption>
    </figure>
  )
}

export default function PizzaPage() {
  return (
    <>
      {/* HERO */}
      <section style={{ position: 'relative', maxWidth: 1160, margin: '0 auto', padding: '60px 24px 40px', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', top: -160, right: -100, width: 520, height: 520, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,106,44,.18),rgba(255,106,44,0) 65%)', pointerEvents: 'none', zIndex: 0 }} />
        <div className="grid-two" style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1.05fr .95fr', gap: 50, alignItems: 'center' }}>
          <div>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--oliveBg)', color: 'var(--olive)', padding: '6px 13px', borderRadius: 999, fontSize: 13, fontWeight: 700 }}>Já em operação</span>
            <h1 className="hd" style={{ fontSize: 50, marginTop: 18, fontFamily: 'var(--font-schibsted)' }}>O software de pedidos da sua pizzaria, finalmente organizado.</h1>
            <p style={{ fontSize: 18.5, color: 'var(--ink2)', marginTop: 18, maxWidth: 520 }}>O Cenlo Pizza transforma o atendimento em pedidos claros, envia-os para a cozinha, regista clientes e ajuda a reativar quem já comprou, para a sua pizzaria vender mais com menos improviso.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 28 }}>
              <Link href="/contacto" style={{ background: 'var(--terraBtn)', color: '#fff', border: 'none', padding: '15px 24px', borderRadius: 11, fontWeight: 600, fontSize: 16, boxShadow: '0 8px 20px -10px var(--terra)' }}>Pedir demonstração</Link>
              <a href="#como-funciona" style={{ background: 'var(--surface)', border: '1px solid var(--line)', padding: '15px 22px', borderRadius: 11, fontWeight: 600, fontSize: 16, display: 'inline-flex', alignItems: 'center' }}>Ver como funciona</a>
            </div>
          </div>

          {/* Dashboard mockup */}
          <div style={{ position: 'relative' }}>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 18, boxShadow: '0 30px 60px -34px rgba(0,0,0,.45)', overflow: 'hidden' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', borderBottom: '1px solid var(--line2)', background: 'var(--surface2)' }}>
                <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--terra)', display: 'inline-block' }} />
                <span style={{ fontWeight: 600, fontSize: 13.5 }}>Cenlo Pizza · Dashboard</span>
                <span style={{ marginLeft: 'auto', display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 11.5, color: 'var(--olive)', fontWeight: 600 }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--olive)', display: 'inline-block' }} className="animate-dot-pulse" />
                  WhatsApp ligado
                </span>
              </div>
              <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 9 }}>
                {[
                  { id: '#1042', desc: 'Margherita M · ½ Pepperoni ½ Funghi', status: 'Em preparação', statusColor: 'var(--amber)', statusBg: 'var(--amberBg)' },
                  { id: '#1041', desc: '2× Diavola · entrega', status: 'Pronto', statusColor: 'var(--olive)', statusBg: 'var(--oliveBg)' },
                  { id: '#1040', desc: 'Quattro Formaggi · recolha', status: 'Entregue', statusColor: 'var(--ink2)', statusBg: 'var(--bg2)' },
                ].map(o => (
                  <div key={o.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg)', border: '1px solid var(--line2)', borderRadius: 11, padding: '12px 14px' }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>Pedido {o.id}</div>
                      <div style={{ fontSize: 12, color: 'var(--muted)' }}>{o.desc}</div>
                    </div>
                    <span style={{ fontSize: 10.5, fontWeight: 700, color: o.statusColor, background: o.statusBg, padding: '3px 8px', borderRadius: 6 }}>{o.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARA QUEM É */}
      <section style={{ background: 'var(--bg2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '56px 24px' }}>
          <h2 style={{ fontSize: 30, fontFamily: 'var(--font-schibsted)' }}>Para quem é</h2>
          <div className="grid-three" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginTop: 24 }}>
            {pizzaFor.map(f => (
              <div key={f} style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 12, padding: 18, fontSize: 15, color: 'var(--ink2)', display: 'flex', gap: 10 }}>
                <span style={{ color: 'var(--terra)', fontWeight: 700 }}>→</span>
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEMAS */}
      <section style={{ maxWidth: 1160, margin: '0 auto', padding: '60px 24px' }}>
        <div style={{ maxWidth: 560 }}><h2 style={{ fontSize: 32, fontFamily: 'var(--font-schibsted)' }}>Problemas que o Cenlo Pizza resolve</h2></div>
        <div className="grid-two" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 14, marginTop: 28 }}>
          {pizzaProblems.map(p => (
            <div key={p} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 12, padding: 18 }}>
              <span style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--terraBg)', color: 'var(--terra)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0, fontSize: 14 }}>!</span>
              <span style={{ fontSize: 15, color: 'var(--ink2)' }}>{p}</span>
            </div>
          ))}
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="como-funciona" style={{ background: 'var(--panel)', color: '#F4EBDC' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '64px 24px' }}>
          <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: '#FFB68F' }}>Da conversa à cozinha</span>
          <h2 style={{ fontSize: 34, color: '#fff', marginTop: 12, maxWidth: 560, fontFamily: 'var(--font-schibsted)' }}>Como funciona, passo a passo</h2>
          <div className="grid-four" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginTop: 36 }}>
            {pizzaSteps.map(s => (
              <div key={s.n} style={{ background: 'rgba(255,255,255,.04)', border: '1px solid var(--line)', borderRadius: 14, padding: 20 }}>
                <span style={{ display: 'flex', width: 34, height: 34, borderRadius: 9, background: 'var(--terraBtn)', color: '#fff', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontFamily: 'var(--font-schibsted)' }}>{s.n}</span>
                <div style={{ fontWeight: 600, fontSize: 15.5, marginTop: 14, color: '#fff' }}>{s.title}</div>
                <p style={{ fontSize: 13.5, color: '#C9BCA8', marginTop: 6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 22, background: 'rgba(255,106,44,.14)', border: '1px solid rgba(255,106,44,.3)', borderRadius: 12, padding: '16px 18px', fontSize: 14.5, color: '#FFB68F' }}>
            <strong style={{ color: '#fff' }}>Importante:</strong> o preço é sempre calculado pelo sistema a partir do menu configurado, nunca pela IA. O Cenlo organiza a operação, não substitui as pessoas da equipa.
          </div>
        </div>
      </section>

      {/* RECURSOS */}
      <section style={{ maxWidth: 1160, margin: '0 auto', padding: '64px 24px' }}>
        <div style={{ maxWidth: 560 }}>
          <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--terra)' }}>Recursos</span>
          <h2 style={{ fontSize: 32, marginTop: 12, fontFamily: 'var(--font-schibsted)' }}>Tudo o que mantém a operação no sítio</h2>
        </div>
        <div className="grid-three" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14, marginTop: 30 }}>
          {pizzaFeatures.map(f => (
            <div key={f.i} style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 14, padding: 20 }}>
              <div style={{ width: 34, height: 34, borderRadius: 9, background: 'var(--terraBg)', color: 'var(--terra)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontFamily: 'var(--font-schibsted)' }}>{f.i}</div>
              <div style={{ fontWeight: 600, fontSize: 17.5, marginTop: 14 }}>{f.title}</div>
              <p style={{ fontSize: 14, color: 'var(--ink2)', marginTop: 6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SCREENSHOTS */}
      <section style={{ background: 'var(--bg2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '60px 24px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div style={{ maxWidth: 520 }}>
              <h2 style={{ fontSize: 32, fontFamily: 'var(--font-schibsted)' }}>A dashboard por dentro</h2>
              <p style={{ fontSize: 16, color: 'var(--ink2)', marginTop: 10 }}>Pré-visualização da app. Capturas reais em preparação, com dados de demonstração.</p>
            </div>
          </div>
          <div className="grid-two" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 14, marginTop: 28 }}>
            <MockupFrame title="Pedidos" caption="o dia inteiro com estado e valor, num só ecrã." glyph="P" />
            <MockupFrame title="Clientes" caption="histórico e recompra construídos a partir do WhatsApp." glyph="C" />
          </div>
          <div className="grid-two" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 14 }}>
            <MockupFrame title="Conversas" caption="a mensagem vira pedido estruturado, pronto a confirmar." glyph="❯" />
            <MockupFrame title="Cozinha" caption="pedidos em colunas, sem cópias à mão." glyph="▢" />
          </div>
        </div>
      </section>

      {/* BENEFÍCIOS */}
      <section style={{ maxWidth: 1160, margin: '0 auto', padding: '60px 24px' }}>
        <h2 style={{ fontSize: 32, maxWidth: 520, fontFamily: 'var(--font-schibsted)' }}>Benefícios para quem está ao balcão</h2>
        <div className="grid-three" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginTop: 28 }}>
          {benefits.map(b => (
            <div key={b.who} style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 15, padding: 24 }}>
              <div style={{ fontFamily: 'var(--font-schibsted)', fontWeight: 800, fontSize: 18, color: 'var(--terra)' }}>{b.who}</div>
              <ul style={{ margin: '14px 0 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {b.items.map(it => (
                  <li key={it} style={{ fontSize: 14.5, color: 'var(--ink2)', display: 'flex', gap: 9 }}>
                    <span style={{ color: 'var(--olive)', fontWeight: 700 }}>✓</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* O QUE NÃO É */}
      <section style={{ maxWidth: 1160, margin: '0 auto', padding: '8px 24px 56px' }}>
        <div style={{ background: 'var(--panel)', color: '#F4EBDC', borderRadius: 18, padding: 40 }}>
          <h2 style={{ fontSize: 28, color: '#fff', fontFamily: 'var(--font-schibsted)' }}>O que o Cenlo Pizza não é</h2>
          <div className="grid-two" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12, marginTop: 22 }}>
            {pizzaNot.map(n => (
              <div key={n} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: 15, color: '#C9BCA8' }}>
                <span style={{ color: '#FFB68F', fontWeight: 700 }}>✕</span>
                <span>{n}</span>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 15.5, color: '#E8DECE', marginTop: 22, borderTop: '1px solid var(--line)', paddingTop: 18, maxWidth: 620 }}>É uma central para organizar o canal próprio da pizzaria, as conversas, os pedidos, a cozinha e os clientes que já são seus.</p>
        </div>
      </section>

      {/* DEMO */}
      <section style={{ background: 'var(--bg2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '56px 24px' }}>
          <div className="grid-two" style={{ display: 'grid', gridTemplateColumns: '1.2fr .8fr', gap: 40, alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: 30, fontFamily: 'var(--font-schibsted)' }}>Veja a Cenlo Pizza na sua operação</h2>
              <p style={{ fontSize: 16.5, color: 'var(--ink2)', marginTop: 14 }}>O Cenlo Pizza está a organizar pizzarias em Portugal, com acompanhamento próximo desde o início. Marcamos uma demonstração curta, vemos como a sua pizzaria atende hoje e mostramos como fica organizado.</p>
              <Link href="/contacto" style={{ display: 'inline-block', marginTop: 22, background: 'var(--terraBtn)', color: '#fff', border: 'none', padding: '14px 24px', borderRadius: 11, fontWeight: 600, fontSize: 16 }}>Pedir demonstração</Link>
            </div>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 15, padding: 22, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {demoSteps.map(d => (
                <div key={d.n} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <span style={{ width: 26, height: 26, borderRadius: '50%', background: 'var(--oliveBg)', color: 'var(--olive)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{d.n}</span>
                  <span style={{ fontSize: 14.5, color: 'var(--ink2)' }}>{d.t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: 820, margin: '0 auto', padding: '60px 24px' }}>
        <h2 style={{ fontSize: 32, textAlign: 'center', fontFamily: 'var(--font-schibsted)' }}>Perguntas frequentes</h2>
        <FaqAccordion />
      </section>

      {/* CTA */}
      <section style={{ maxWidth: 1160, margin: '0 auto', padding: '8px 24px 84px' }}>
        <div style={{ position: 'relative', background: 'var(--panel)', border: '1px solid var(--line)', borderRadius: 24, padding: '58px 44px', overflow: 'hidden' }}>
          <div aria-hidden="true" style={{ position: 'absolute', top: -120, right: -60, width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,106,44,.26),rgba(255,106,44,0) 68%)', pointerEvents: 'none' }} />
          <div style={{ position: 'relative', maxWidth: 580 }}>
            <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--terra)' }}>Cenlo Pizza</span>
            <h2 style={{ fontSize: 38, color: '#fff', marginTop: 14, fontFamily: 'var(--font-schibsted)' }}>Menos pedidos perdidos no WhatsApp. Mais controlo na cozinha.</h2>
            <p style={{ fontSize: 17, color: 'var(--ink2)', marginTop: 14, maxWidth: 500 }}>Veja a Cenlo a organizar a sua pizzaria numa demonstração curta, com o seu menu e o seu fluxo.</p>
            <Link href="/contacto" style={{ display: 'inline-block', marginTop: 28, background: 'var(--terraBtn)', color: '#fff', border: 'none', padding: '15px 28px', borderRadius: 11, fontWeight: 600, fontSize: 16 }}>Pedir demonstração</Link>
          </div>
        </div>
      </section>
    </>
  )
}
