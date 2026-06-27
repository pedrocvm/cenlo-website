import type { Metadata } from 'next'
import Link from 'next/link'
import { pizzaPills, soon, glossary } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Produtos Cenlo — soluções para negócios locais',
  description: 'Centrais inteligentes para cada tipo de negócio. Cenlo Pizza disponível, Cenlo Food, Night e Services em breve.',
  alternates: { canonical: 'https://cenlo.pt/produtos' },
  openGraph: {
    title: 'Produtos Cenlo — soluções para negócios locais',
    description: 'Centrais inteligentes para cada tipo de negócio. Cenlo Pizza disponível, Cenlo Food, Night e Services em breve.',
    url: 'https://cenlo.pt/produtos',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Produtos Cenlo — soluções para negócios locais',
    description: 'Centrais inteligentes para cada tipo de negócio. Cenlo Pizza disponível, Cenlo Food, Night e Services em breve.',
  },
}

export default function ProdutosPage() {
  return (
    <>
      <section style={{ maxWidth: 1160, margin: '0 auto', padding: '64px 24px 40px' }}>
        <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--terra)' }}>Produtos Cenlo</span>
        <h1 className="hd" style={{ fontSize: 46, marginTop: 14, maxWidth: 760, fontFamily: 'var(--font-schibsted)' }}>Uma central feita à medida da realidade de cada negócio.</h1>
        <p style={{ fontSize: 18, color: 'var(--ink2)', marginTop: 16, maxWidth: 600 }}>Todas seguem a mesma ideia: organizar o atendimento, reativar clientes e dar clareza à operação, para vender mais com menos improviso. Cada central nasce do dia a dia real do seu tipo de negócio.</p>
      </section>

      {/* DISPONÍVEL: PIZZA */}
      <section style={{ maxWidth: 1160, margin: '0 auto', padding: '12px 24px 8px' }}>
        <div className="grid-two" style={{ display: 'grid', gridTemplateColumns: '1.1fr .9fr', gap: 0, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 18, overflow: 'hidden' }}>
          <div style={{ padding: 36 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontFamily: 'var(--font-schibsted)', fontWeight: 800, fontSize: 26, color: '#fff' }}>Cenlo Pizza</span>
              <span style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--olive)', background: 'var(--oliveBg)', padding: '4px 10px', borderRadius: 7 }}>Disponível</span>
            </div>
            <p style={{ fontSize: 16.5, color: 'var(--ink2)', marginTop: 14 }}>Central inteligente para a sua pizzaria. Organiza o atendimento, estrutura os pedidos, envia para a cozinha, regista clientes e ajuda a reativar quem já comprou, transformando organização em mais faturação.</p>
            <Link href="/pizza" style={{ display: 'inline-block', marginTop: 22, background: 'var(--terraBtn)', color: '#fff', border: 'none', padding: '13px 22px', borderRadius: 11, fontWeight: 600, fontSize: 15.5 }}>Ver Cenlo Pizza →</Link>
          </div>
          <div className="hide-sm" style={{ background: 'var(--bg2)', borderLeft: '1px solid var(--line)', padding: 30, display: 'flex', flexDirection: 'column', gap: 9, justifyContent: 'center' }}>
            {pizzaPills.map(pp => (
              <div key={pp} style={{ display: 'flex', alignItems: 'center', gap: 11, fontSize: 14, color: 'var(--ink2)' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--olive)', flexShrink: 0, display: 'inline-block' }} />
                {pp}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EM BREVE */}
      <section style={{ maxWidth: 1160, margin: '0 auto', padding: '44px 24px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
          <span style={{ fontFamily: 'var(--font-schibsted)', fontWeight: 700, fontSize: 22 }}>Em breve</span>
          <span style={{ flex: 1, height: 1, background: 'var(--line)', display: 'block' }} />
        </div>
        <div className="grid-three" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
          {soon.map(v => (
            <div key={v.name} style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 15, padding: 24, display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'var(--font-schibsted)', fontWeight: 800, fontSize: 20, color: '#fff' }}>{v.name}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--amber)', background: 'var(--amberBg)', padding: '3px 9px', borderRadius: 7 }}>Em breve</span>
              </div>
              <div style={{ fontSize: 13, color: 'var(--terra)', fontWeight: 600, marginTop: 12 }}>Para</div>
              <p style={{ fontSize: 14, color: 'var(--ink2)', marginTop: 3 }}>{v.para}</p>
              <div style={{ fontSize: 13, color: 'var(--terra)', fontWeight: 600, marginTop: 12 }}>O que resolve</div>
              <p style={{ fontSize: 14, color: 'var(--ink2)', marginTop: 3 }}>{v.resolve}</p>
              <Link href="/contacto" style={{ marginTop: 'auto', paddingTop: 18, background: 'none', border: 'none', textAlign: 'left', fontSize: 14, fontWeight: 600, color: 'var(--terra)', display: 'block' }}>{v.cta} →</Link>
            </div>
          ))}
        </div>
      </section>

      {/* FAMÍLIA / GLOSSÁRIO + POSICIONAMENTO */}
      <section style={{ background: 'var(--bg2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)', marginTop: 36 }}>
        <div style={{ maxWidth: 1160, margin: '0 auto', padding: '60px 24px' }}>
          <div className="grid-two" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 44, alignItems: 'start' }}>
            <div>
              <h2 style={{ fontSize: 30, fontFamily: 'var(--font-schibsted)' }}>O atendimento do seu negócio finalmente sob controlo</h2>
              <p style={{ fontSize: 16.5, color: 'var(--ink2)', marginTop: 14 }}>A Cenlo dá ordem ao atendimento que já acontece todos os dias, onde os clientes já falam consigo. Os apps de entrega podem continuar a existir; a ideia é deixar de depender só deles, reativar quem já é cliente e ter ordem no que é seu.</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 22 }}>
                <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 12, padding: 16 }}>
                  <div style={{ fontWeight: 700, fontSize: 14.5, color: 'var(--olive)' }}>Canal próprio</div>
                  <p style={{ fontSize: 13.5, color: 'var(--ink2)', marginTop: 6 }}>Conversas, clientes e histórico ficam consigo, organizados.</p>
                </div>
                <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 12, padding: 16 }}>
                  <div style={{ fontWeight: 700, fontSize: 14.5, color: '#C0392B' }}>Apps de entrega</div>
                  <p style={{ fontSize: 13.5, color: 'var(--ink2)', marginTop: 6 }}>Bolt Food, Uber Eats, Glovo ou Wolt continuam úteis para alcance, sem serem o único canal.</p>
                </div>
              </div>
            </div>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 15, padding: 24 }}>
              <div style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--terra)' }}>Glossário Cenlo</div>
              <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 0 }}>
                {glossary.map(g => (
                  <div key={g.term} style={{ display: 'flex', gap: 14, padding: '12px 0', borderTop: '1px solid var(--line2)' }}>
                    <span style={{ fontFamily: 'var(--font-schibsted)', fontWeight: 700, fontSize: 15, minWidth: 120 }}>{g.term}</span>
                    <span style={{ fontSize: 14, color: 'var(--ink2)' }}>{g.def}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ maxWidth: 1160, margin: '0 auto', padding: '60px 24px 84px', textAlign: 'center' }}>
        <h2 style={{ fontSize: 32, maxWidth: 560, margin: '0 auto', fontFamily: 'var(--font-schibsted)' }}>Precisa de uma solução à medida? Construímos para o seu negócio.</h2>
        <p style={{ fontSize: 16.5, color: 'var(--ink2)', margin: '12px auto 0', maxWidth: 480 }}>Seja qual for o seu setor, diga-nos o que faz e desenhamos uma central à medida das necessidades da sua empresa.</p>
        <Link href="/contacto" style={{ display: 'inline-block', marginTop: 24, background: 'var(--terraBtn)', color: '#fff', border: 'none', padding: '15px 26px', borderRadius: 11, fontWeight: 600, fontSize: 16 }}>Falar connosco</Link>
      </section>
    </>
  )
}
