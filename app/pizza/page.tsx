import type { Metadata } from 'next'
import Link from 'next/link'
import FaqAccordion from '@/components/FaqAccordion'
import { pizzaFor, pizzaProblems, pizzaSteps, pizzaFeatures, benefits, pizzaNot, demoSteps, faqs, pizzaE2ESteps } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Cenlo Pizza — pedidos por WhatsApp para pizzarias em Portugal',
  description: 'Organize os pedidos da sua pizzaria pelo WhatsApp, reduza erros, evite pedidos perdidos e dê mais clareza à cozinha e ao atendimento.',
  alternates: { canonical: 'https://cenlo.pt/pizza' },
  openGraph: {
    title: 'Cenlo Pizza — pedidos por WhatsApp para pizzarias em Portugal',
    description: 'Organize os pedidos da sua pizzaria pelo WhatsApp, reduza erros, evite pedidos perdidos e dê mais clareza à cozinha e ao atendimento.',
    url: 'https://cenlo.pt/pizza',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cenlo Pizza — pedidos por WhatsApp para pizzarias em Portugal',
    description: 'Organize os pedidos da sua pizzaria pelo WhatsApp, reduza erros, evite pedidos perdidos e dê mais clareza à cozinha e ao atendimento.',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Cenlo Pizza',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web',
  description: 'Central de pedidos por WhatsApp para pizzarias. Organiza atendimento, estrutura pedidos, envia para a cozinha e regista clientes.',
  url: 'https://cenlo.pt/pizza',
  offers: { '@type': 'Offer', availability: 'https://schema.org/InStock' },
}

/* ── DOM Mockups (replace placeholders with real-looking demo UI) ── */

function ChromeBar({ title }: { title: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '11px 14px', background: 'var(--surface2)', borderBottom: '1px solid var(--line2)' }}>
      <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#FF5F57', display: 'inline-block' }} />
      <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#FEBC2E', display: 'inline-block' }} />
      <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#28C840', display: 'inline-block' }} />
      <span style={{ marginLeft: 8, fontSize: 12, color: 'var(--muted)' }}>app.cenlo.pt · {title}</span>
    </div>
  )
}

function MockupCaption({ title, caption }: { title: string; caption: string }) {
  return (
    <figcaption style={{ padding: '10px 14px', borderTop: '1px solid var(--line2)', fontSize: 13, color: 'var(--ink2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10 }}>
      <span><strong style={{ color: 'var(--ink)' }}>{title}</strong> · {caption}</span>
      <span style={{ fontSize: 11, color: 'var(--muted)', flexShrink: 0 }}>Dados de demonstração</span>
    </figcaption>
  )
}

function frameStyle(): React.CSSProperties {
  return { margin: 0, position: 'relative', background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 14, overflow: 'hidden', boxShadow: '0 24px 50px -38px rgba(0,0,0,.45)' }
}

function PedidosMockup() {
  const orders = [
    { id: '#1042', desc: 'Margherita M · ½ Pepperoni ½ Funghi · entrega', status: 'Em preparação', sc: 'var(--amber)', sb: 'var(--amberBg)' },
    { id: '#1041', desc: '2× Diavola M · entrega Rua das Flores 12',       status: 'Pronto',        sc: 'var(--olive)', sb: 'var(--oliveBg)' },
    { id: '#1040', desc: 'Quattro Formaggi G · recolha',                   status: 'Entregue',     sc: 'var(--muted)', sb: 'var(--bg2)' },
    { id: '#1039', desc: '½ Pepperoni ½ Funghi M · recolha',               status: 'Entregue',     sc: 'var(--muted)', sb: 'var(--bg2)' },
  ]
  return (
    <figure style={frameStyle()}>
      <ChromeBar title="Pedidos" />
      <div style={{ padding: '14px 14px 10px', background: 'var(--bg)', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {orders.map(o => (
          <div key={o.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--surface)', border: '1px solid var(--line2)', borderRadius: 10, padding: '11px 13px' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 13.5 }}>Pedido {o.id}</div>
              <div style={{ fontSize: 11.5, color: 'var(--muted)', marginTop: 2 }}>{o.desc}</div>
            </div>
            <span style={{ fontSize: 10.5, fontWeight: 700, color: o.sc, background: o.sb, padding: '3px 8px', borderRadius: 6, flexShrink: 0, marginLeft: 8 }}>{o.status}</span>
          </div>
        ))}
      </div>
      <MockupCaption title="Pedidos" caption="o dia inteiro com estado e valor, num só ecrã." />
    </figure>
  )
}

function ClientesMockup() {
  const clients = [
    { name: 'Maria C.',  orders: 8,  label: 'Cliente recorrente', last: 'há 3 dias' },
    { name: 'João S.',   orders: 12, label: 'Cliente recorrente', last: 'ontem' },
    { name: 'Ana R.',    orders: 3,  label: 'Novo este mês',       last: 'esta semana' },
  ]
  return (
    <figure style={frameStyle()}>
      <ChromeBar title="Clientes" />
      <div style={{ padding: '14px 14px 10px', background: 'var(--bg)', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {clients.map(c => (
          <div key={c.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--surface)', border: '1px solid var(--line2)', borderRadius: 10, padding: '11px 13px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--terraBg)', color: 'var(--terra)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{c.name[0]}</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13.5 }}>{c.name}</div>
                <div style={{ fontSize: 11.5, color: 'var(--muted)' }}>{c.label} · última compra {c.last}</div>
              </div>
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink2)', flexShrink: 0, marginLeft: 8 }}>{c.orders} ped.</span>
          </div>
        ))}
      </div>
      <MockupCaption title="Clientes" caption="histórico e recompra construídos a partir do WhatsApp." />
    </figure>
  )
}

function ConversasMockup() {
  return (
    <figure style={frameStyle()}>
      <ChromeBar title="Conversas" />
      <div style={{ padding: 14, background: 'var(--bg)', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ alignSelf: 'flex-start', maxWidth: '80%', background: '#fff', border: '1px solid var(--line2)', padding: '8px 11px', borderRadius: '12px 12px 12px 3px', fontSize: 13, color: '#23201C' }}>Boa noite! Queria uma Diavola grande e duas Margherita médias</div>
        <div style={{ alignSelf: 'flex-end', maxWidth: '80%', background: '#DDF3D8', padding: '8px 11px', borderRadius: '12px 12px 3px 12px', fontSize: 13, color: '#23201C' }}>Anotado! Entrega ou recolha?</div>
        <div style={{ alignSelf: 'flex-start', maxWidth: '80%', background: '#fff', border: '1px solid var(--line2)', padding: '8px 11px', borderRadius: '12px 12px 12px 3px', fontSize: 13, color: '#23201C' }}>Entrega, Rua das Flores 12</div>
        <div style={{ background: 'var(--surface2)', border: '1px solid var(--line)', borderRadius: 10, padding: '10px 12px', marginTop: 4 }}>
          <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--terra)', marginBottom: 6 }}>Pedido #1043 · estruturado</div>
          <div style={{ fontSize: 12.5, color: 'var(--ink2)', display: 'flex', flexDirection: 'column', gap: 4 }}>
            <span>Diavola G · €10,50</span>
            <span>2× Margherita M · €17,00</span>
            <span style={{ color: 'var(--ink)', fontWeight: 600 }}>Entrega · Rua das Flores 12</span>
          </div>
        </div>
      </div>
      <MockupCaption title="Conversas" caption="a mensagem vira pedido estruturado, pronto a confirmar." />
    </figure>
  )
}

function CozinhaMockup() {
  return (
    <figure style={frameStyle()}>
      <ChromeBar title="Cozinha" />
      <div style={{ padding: 14, background: 'var(--bg)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--amber)', marginBottom: 8 }}>Em preparação</div>
          {[
            { id: '#1042', items: ['Margherita M', '½ Pep ½ Funghi M'] },
            { id: '#1043', items: ['Diavola G', '2× Margherita M'] },
          ].map(o => (
            <div key={o.id} style={{ background: 'var(--surface)', border: '1px solid var(--line2)', borderRadius: 9, padding: '10px 12px', marginBottom: 8 }}>
              <div style={{ fontWeight: 600, fontSize: 12.5, marginBottom: 5 }}>Pedido {o.id}</div>
              {o.items.map(it => <div key={it} style={{ fontSize: 12, color: 'var(--ink2)' }}>· {it}</div>)}
            </div>
          ))}
        </div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--olive)', marginBottom: 8 }}>Pronto</div>
          {[
            { id: '#1041', items: ['2× Diavola M'] },
          ].map(o => (
            <div key={o.id} style={{ background: 'var(--oliveBg)', border: '1px solid rgba(52,211,153,.2)', borderRadius: 9, padding: '10px 12px', marginBottom: 8 }}>
              <div style={{ fontWeight: 600, fontSize: 12.5, marginBottom: 5 }}>Pedido {o.id}</div>
              {o.items.map(it => <div key={it} style={{ fontSize: 12, color: 'var(--ink2)' }}>· {it}</div>)}
            </div>
          ))}
        </div>
      </div>
      <MockupCaption title="Cozinha" caption="pedidos em colunas, sem cópias à mão." />
    </figure>
  )
}

export default function PizzaPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />

      {/* HERO */}
      <section style={{ position: 'relative', maxWidth: 1160, margin: '0 auto', padding: '60px 24px 40px', overflow: 'hidden' }}>
        <div aria-hidden="true" style={{ position: 'absolute', top: -160, right: -100, width: 520, height: 520, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,106,44,.18),rgba(255,106,44,0) 65%)', pointerEvents: 'none', zIndex: 0 }} />
        <div className="grid-two" style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1.05fr .95fr', gap: 50, alignItems: 'center' }}>
          <div>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--oliveBg)', color: 'var(--olive)', padding: '6px 13px', borderRadius: 999, fontSize: 13, fontWeight: 700 }}>Já em operação</span>
            <h1 className="hd" style={{ fontSize: 50, marginTop: 18, fontFamily: 'var(--font-schibsted)' }}>Os pedidos da sua pizzaria, finalmente organizados.</h1>
            <p style={{ fontSize: 18.5, color: 'var(--ink2)', marginTop: 18, maxWidth: 520 }}>Recebe o pedido no WhatsApp, estrutura-o, manda-o para a cozinha e regista o cliente — com menos enganos e menos pedidos perdidos.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 28 }}>
              <Link href="/contacto" className="cta-primary" style={{ background: 'var(--terraBtn)', color: '#fff', border: 'none', padding: '15px 24px', borderRadius: 11, fontWeight: 600, fontSize: 16, boxShadow: '0 8px 20px -10px var(--terra)' }}>Pedir demonstração</Link>
              <a href="#como-funciona" className="cta-primary" style={{ background: 'var(--surface)', border: '1px solid var(--line)', padding: '15px 22px', borderRadius: 11, fontWeight: 600, fontSize: 16, display: 'inline-flex', alignItems: 'center' }}>Ver como funciona</a>
            </div>
            <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 10 }}>Demonstração curta, sem compromisso.</p>
          </div>

          {/* Conversa → pedido estruturado */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 18, boxShadow: '0 30px 60px -34px rgba(0,0,0,.45)', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '13px 16px', borderBottom: '1px solid var(--line2)', background: 'var(--surface2)' }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#25D366', display: 'inline-block' }} />
              <span style={{ fontWeight: 600, fontSize: 14 }}>WhatsApp · O Tasco da Rua Nova</span>
              <span style={{ marginLeft: 'auto', fontSize: 11.5, color: 'var(--muted)' }}>há 1 min</span>
            </div>
            <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 9, background: 'var(--bg)' }}>
              <div style={{ alignSelf: 'flex-start', maxWidth: '78%', background: '#fff', border: '1px solid var(--line2)', padding: '9px 12px', borderRadius: '13px 13px 13px 4px', fontSize: 13.5, color: '#23201C' }}>Olá! Queria pedir para entrega — prato do dia e uma laranjada natural, por favor</div>
              <div style={{ alignSelf: 'flex-end', maxWidth: '78%', background: '#DDF3D8', padding: '9px 12px', borderRadius: '13px 13px 4px 13px', fontSize: 13.5, color: '#23201C' }}>Claro! Qual a morada de entrega?</div>
              <div style={{ alignSelf: 'flex-start', maxWidth: '78%', background: '#fff', border: '1px solid var(--line2)', padding: '9px 12px', borderRadius: '13px 13px 13px 4px', fontSize: 13.5, color: '#23201C' }}>Av. República 28, 2.º Dto</div>
            </div>
            <div style={{ padding: '14px 16px', borderTop: '1px dashed var(--line)', background: 'var(--surface2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--terra)' }}>Pedido #1042 · estruturado</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--amber)', background: 'var(--amberBg)', padding: '3px 8px', borderRadius: 6 }}>Em preparação</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7, fontSize: 13.5 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Prato do dia</span><span style={{ color: 'var(--muted)' }}>€8,50</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Laranjada natural</span><span style={{ color: 'var(--muted)' }}>€2,50</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--line2)', paddingTop: 7, marginTop: 2, fontWeight: 700 }}><span>Total · entrega</span><span>€11,00</span></div>
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

      {/* E2E: DO GOOGLE À COZINHA */}
      <section style={{ background: 'var(--bg2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '64px 24px' }}>
          <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--terra)' }}>Do pedido direto à cozinha</span>
          <h2 style={{ fontSize: 34, marginTop: 12, fontFamily: 'var(--font-schibsted)', maxWidth: 560 }}>Do Google à cozinha da sua pizzaria.</h2>
          <p style={{ fontSize: 17, color: 'var(--ink2)', marginTop: 16, maxWidth: 600 }}>O cliente que prefere pedir direto tem um caminho claro: do Google ao WhatsApp, sem comissão. O Cenlo organiza esses pedidos e todos os outros que já chegam à sua pizzaria.</p>
          <div className="grid-four" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14, marginTop: 36 }}>
            {pizzaE2ESteps.map(s => (
              <div key={s.n} style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 14, padding: 20 }}>
                <span style={{ display: 'flex', width: 30, height: 30, borderRadius: 8, background: 'var(--terraBg)', color: 'var(--terra)', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, fontFamily: 'var(--font-schibsted)' }}>{s.n}</span>
                <div style={{ fontWeight: 600, fontSize: 15.5, marginTop: 14 }}>{s.title}</div>
                <p style={{ fontSize: 13.5, color: 'var(--ink2)', marginTop: 6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 22, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 12, padding: '16px 18px', fontSize: 14.5, color: 'var(--ink2)' }}>
            O cliente faz cada passo com um clique. Quando o pedido entra no Cenlo, a central organiza-o e encaminha-o para a cozinha. A recompra fica ao critério do dono: o Cenlo prepara a informação, e é o dono que decide quando e a quem contactar.
          </div>
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

      {/* DASHBOARD POR DENTRO — DOM mockups */}
      <section style={{ background: 'var(--bg2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '60px 24px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div style={{ maxWidth: 520 }}>
              <h2 style={{ fontSize: 32, fontFamily: 'var(--font-schibsted)' }}>A dashboard por dentro</h2>
              <p style={{ fontSize: 16, color: 'var(--ink2)', marginTop: 10 }}>Pré-visualização da interface com dados de demonstração.</p>
            </div>
          </div>
          <div className="grid-two" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 14, marginTop: 28 }}>
            <PedidosMockup />
            <ClientesMockup />
          </div>
          <div className="grid-two" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 14 }}>
            <ConversasMockup />
            <CozinhaMockup />
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
              <Link href="/contacto" className="cta-primary" style={{ display: 'inline-block', marginTop: 22, background: 'var(--terraBtn)', color: '#fff', border: 'none', padding: '14px 24px', borderRadius: 11, fontWeight: 600, fontSize: 16 }}>Pedir demonstração</Link>
              <p style={{ fontSize: 13, color: 'var(--muted)', marginTop: 8 }}>Demonstração curta, sem compromisso.</p>
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
            <Link href="/contacto" className="cta-primary" style={{ display: 'inline-block', marginTop: 28, background: 'var(--terraBtn)', color: '#fff', border: 'none', padding: '15px 28px', borderRadius: 11, fontWeight: 600, fontSize: 16 }}>Pedir demonstração</Link>
          </div>
        </div>
      </section>

      {/* Sticky CTA — mobile only, via CSS class */}
      <div className="pizza-sticky-cta">
        <Link
          href="/contacto"
          style={{ background: 'var(--terraBtn)', color: '#fff', padding: '12px 28px', borderRadius: 10, fontWeight: 700, fontSize: 15, display: 'inline-block' }}
        >Pedir demonstração</Link>
        <span style={{ fontSize: 12, color: 'var(--muted)' }}>Sem compromisso</span>
      </div>
      {/* Spacer so fixed sticky CTA doesn't cover last section on mobile */}
      <div className="pizza-sticky-spacer" aria-hidden="true" />
    </>
  )
}
