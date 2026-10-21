import type { Metadata } from 'next'
import Link from 'next/link'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { channels, moments, principles, products } from '@/lib/data'
import HeroCentral from '@/components/home/HeroCentral'
import HowItWorks from '@/components/home/HowItWorks'
import ProductVisual from '@/components/ProductVisual'
import { Arrow, ArrowOut } from '@/components/Icons'

const title = 'Cenlo | Software de gestão e atendimento para negócios locais'
const description = 'Software para gerir atendimento, pedidos e marcações em Portugal. Conheça o Cenlo Food para restaurantes e o Cenlo Beauty para salões e studios de beleza.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: 'https://cenlo.pt' },
  openGraph: { title, description, url: 'https://cenlo.pt', type: 'website' },
  twitter: { card: 'summary_large_image', title, description },
}

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      name: 'Cenlo',
      url: 'https://cenlo.pt',
      description: 'Centrais de atendimento e operação para negócios locais em Portugal.',
      email: 'ola@cenlo.pt',
      contactPoint: { '@type': 'ContactPoint', email: 'ola@cenlo.pt', telephone: '+351912333313', contactType: 'sales' },
      brand: products.map(p => ({ '@type': 'Brand', name: p.name })),
    },
    { '@type': 'WebSite', name: 'Cenlo', url: 'https://cenlo.pt', inLanguage: 'pt-BR' },
  ],
}

const dots = { food: 'var(--c-food)', beauty: 'var(--c-beauty2)', fornada: 'var(--c-fornada2)' }
const hasFilm = existsSync(path.join(process.cwd(), 'public/media/cenlo-central.mp4'))

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="hero">
        <div className="hero-glow" aria-hidden="true" data-parallax="-12" />
        <div className="hero-grid-bg" aria-hidden="true" />
        <div className="wrap hero-in">
          <div>
            <span className="eyebrow eyebrow-dot" data-reveal>Centrais para negócios locais</span>
            <h1 className="display" data-split="now">Da mensagem solta ao <span className="serif accent">pedido pronto.</span></h1>
            <p className="lede" data-reveal>
              O pedido do restaurante, a marcação do studio e o aviso da padaria entram num lugar só, com preço certo e hora certa. Sem mudar o jeito que o seu cliente já fala com você.
            </p>
            <div className="hero-ctas" data-reveal>
              <Link href="#produtos" className="btn btn-primary">Conhecer os produtos <Arrow /></Link>
              <Link href="/contacto" className="btn btn-ghost">Falar com a equipe</Link>
            </div>
            <div className="hero-products" data-reveal>
              {products.map(p => (
                <Link key={p.id} href={`#${p.anchor}`} className="pchip" style={{ ['--dot' as string]: dots[p.id] }}>
                  <i aria-hidden="true" />{p.name}
                </Link>
              ))}
            </div>
          </div>
          <div data-reveal>
            <HeroCentral />
          </div>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...channels, ...channels].map((c, i) => <span key={i}>{c}</span>)}
        </div>
      </div>

      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">O problema</span>
            <h2 className="h2" data-split>O problema quase nunca é falta de cliente.</h2>
          </div>
          <div className="moments">
            {moments.map(m => (
              <article key={m.time} className="moment" data-reveal>
                <div className="moment-time"><span>{m.time}</span><span>{m.place}</span></div>
                <p>{m.text}</p>
              </article>
            ))}
          </div>
          <p className="punch" data-reveal>
            Cada um desses momentos depende da memória de alguém. <strong>A Cenlo tira isso da memória e coloca num lugar com hora, estado e fim.</strong>
          </p>
        </div>
      </section>

      <section id="produtos" className="sec" style={{ paddingTop: 0, scrollMarginTop: 'var(--header)' }}>
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Os produtos</span>
            <h2 className="h2" data-split>Uma central para cada tipo de balcão.</h2>
            <p className="lede" data-reveal>Três produtos no ar hoje, cada um feito a partir da rotina de quem opera aquele negócio. Escolha o seu.</p>
          </div>
          <div className="stack">
            {products.map(p => (
              <div key={p.id} id={p.anchor} className="panel-slot" style={{ scrollMarginTop: 'calc(var(--header) + 18px)' }}>
                <article className="panel" data-p={p.id}>
                  <div className="panel-text">
                    <span className="panel-tag"><b>{p.name}</b> {p.segment}</span>
                    <h3>{p.hook}</h3>
                    <p>{p.lede}</p>
                    <div className="facts">
                      {p.facts.map(f => <div key={f.label}><strong>{f.value}</strong><span>{f.label}</span></div>)}
                    </div>
                    <div className="panel-ctas">
                      <a href={p.cta.href} className="btn btn-primary">{p.cta.label} <Arrow /></a>
                      <a href={p.secondary.href} className="btn btn-line">{p.secondary.label}</a>
                    </div>
                    {p.demo && <Link href={`/demo?produto=${p.id}`} className="text-link panel-demo">Testar a demo ao vivo <Arrow /></Link>}
                  </div>
                  <div className="panel-media">
                    <ProductVisual id={p.id} />
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="como-funciona" className="sec" style={{ scrollMarginTop: 'var(--header)' }}>
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Como funciona</span>
            <h2 className="h2" data-split>O mesmo caminho, do primeiro toque ao fechamento.</h2>
            <p className="lede" data-reveal>Restaurante, studio ou padaria: muda o que entra, não a forma de trabalhar.</p>
          </div>
          <HowItWorks />
        </div>
      </section>

      {hasFilm && (
        <section className="sec-tight">
          <div className="wrap">
            <div className="film" data-reveal>
              <video autoPlay muted loop playsInline preload="metadata" poster="/media/cenlo-central-poster.jpg" aria-label="Animação: mensagens de vários canais entram na Cenlo e saem como pedido, marcação e aviso de fornada">
                <source src="/media/cenlo-central.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="film-cap"><span>Seis portas de entrada. Uma central.</span><span className="mono">10 s</span></div>
          </div>
        </section>
      )}

      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Regras que não se negociam</span>
            <h2 className="h2" data-split>Valem para os três produtos, em qualquer plano.</h2>
          </div>
          <div className="principles">
            {principles.map((p, i) => (
              <article key={p.title} className="principle" data-reveal>
                <span className="k">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sec-tight" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="final" data-reveal>
            <span className="eyebrow eyebrow-dot">Comece por aqui</span>
            <h2 className="h2" style={{ marginTop: 20 }} data-split>Qual é o seu balcão?</h2>
            <div className="doors">
              {products.map(p => (
                <a key={p.id} href={p.secondary.href} className="door" style={{ ['--acc' as string]: dots[p.id] }}>
                  <small>{p.segment}</small>
                  <b>{p.name} <ArrowOut /></b>
                </a>
              ))}
            </div>
            <p className="final-foot">Prefere conversar antes? <Link href="/contacto" className="text-link">Fale com uma pessoa da equipe</Link>.</p>
          </div>
        </div>
      </section>
    </>
  )
}
