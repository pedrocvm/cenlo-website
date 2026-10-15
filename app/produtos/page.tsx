import type { Metadata } from 'next'
import Link from 'next/link'
import { products } from '@/lib/data'
import ProductVisual from '@/components/ProductVisual'
import { Arrow } from '@/components/Icons'

const title = 'Produtos · Cenlo Food, Cenlo Beauty e Fornada Certa'
const description = 'Cenlo Food para restaurantes e delivery, Cenlo Beauty para studios de beleza e Fornada Certa para padarias. O que cada um faz, para quem é e como começar.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: 'https://cenlo.pt/produtos' },
  openGraph: { title, description, url: 'https://cenlo.pt/produtos', type: 'website' },
  twitter: { card: 'summary_large_image', title, description },
}

const dots = { food: 'var(--c-food)', beauty: 'var(--c-beauty2)', fornada: 'var(--c-fornada2)' }

const schema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: products.map((p, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: { '@type': 'SoftwareApplication', name: p.name, applicationCategory: 'BusinessApplication', description: p.lede, url: p.secondary.href },
  })),
}

export default function ProdutosPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="page-hero">
        <div className="hero-glow" aria-hidden="true" />
        <div className="wrap" style={{ position: 'relative' }}>
          <span className="eyebrow eyebrow-dot" data-reveal>Produtos</span>
          <h1 className="display" style={{ marginTop: 22, maxWidth: 980 }} data-split="now">Três centrais. <span className="serif accent">Três balcões.</span></h1>
          <p className="lede" data-reveal>Cada produto tem o seu site, o seu cardápio de funções e o seu jeito de começar. Em comum, as mesmas regras: preço que não vem da IA, equipe no comando e cliente que não instala nada.</p>
          <nav className="toc" aria-label="Produtos" data-reveal>
            {products.map(p => (
              <a key={p.id} href={`#${p.anchor}`} className="pchip" style={{ ['--dot' as string]: dots[p.id] }}><i aria-hidden="true" />{p.name}</a>
            ))}
          </nav>
        </div>
      </section>

      <div className="wrap">
        {products.map(p => (
          <section key={p.id} id={p.anchor} className="pdetail" data-p={p.id} aria-labelledby={`t-${p.id}`}>
            <div className="pdetail-side">
              <span className="panel-tag" data-reveal><b>{p.name}</b> {p.segment}</span>
              <h2 id={`t-${p.id}`} data-split>{p.hook}</h2>
              <p className="lede" data-reveal>{p.lede}</p>
              <div className="facts" data-reveal>
                {p.facts.map(f => <div key={f.label}><strong>{f.value}</strong><span>{f.label}</span></div>)}
              </div>
              <div className="panel-ctas" data-reveal>
                <a href={p.cta.href} className="btn btn-primary">{p.cta.label} <Arrow /></a>
                <a href={p.secondary.href} className="btn btn-ghost">Ver o site</a>
              </div>
              {p.demo && <Link href={`/demo?produto=${p.id}`} className="text-link" data-reveal style={{ justifySelf: 'start' }}>Testar a demo ao vivo da {p.demo.place} <Arrow /></Link>}
            </div>
            <div className="pdetail-main">
              <div className="pdetail-media" data-reveal>
                <ProductVisual id={p.id} />
              </div>
              <div data-reveal>
                <span className="how-label">O que já está lá dentro</span>
                <div className="areas" style={{ marginTop: 12 }}>
                  {p.areas.map(a => <span key={a}>{a}</span>)}
                </div>
              </div>
              <div className="notes">
                {p.notes.map(n => (
                  <div key={n.title} className="note" data-reveal>
                    <b>{n.title}</b>
                    <p>{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="sec">
        <div className="wrap">
          <div className="final" data-reveal>
            <span className="eyebrow eyebrow-dot">Ainda em dúvida?</span>
            <h2 className="h2" style={{ marginTop: 20 }} data-split>Conte como o seu negócio atende hoje. A gente indica o caminho.</h2>
            <div className="hero-ctas">
              <Link href="/contacto" className="btn btn-primary">Falar com a equipe <Arrow /></Link>
              <a href="https://wa.me/351912333313?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Cenlo%20e%20quero%20saber%20qual%20produto%20faz%20sentido%20para%20o%20meu%20neg%C3%B3cio." className="btn btn-ghost" target="_blank" rel="noopener noreferrer">Chamar no WhatsApp</a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
