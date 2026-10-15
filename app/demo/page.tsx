import type { Metadata } from 'next'
import Link from 'next/link'
import DemoSwitcher from '@/components/DemoSwitcher'
import { Arrow } from '@/components/Icons'

const title = 'Demonstração ao vivo · Cenlo Food e Cenlo Beauty'
const description = 'Teste o Cenlo Food e o Cenlo Beauty agora, com dados de demonstração. Você faz o papel do cliente no WhatsApp e vê o pedido ou a marcação chegar na plataforma.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: 'https://cenlo.pt/demo' },
  openGraph: { title, description, url: 'https://cenlo.pt/demo', type: 'website' },
  twitter: { card: 'summary_large_image', title, description },
}

export default function DemoPage() {
  return (
    <>
      <section className="page-hero" style={{ paddingBottom: 32 }}>
        <div className="hero-glow" aria-hidden="true" />
        <div className="wrap" style={{ position: 'relative' }}>
          <span className="eyebrow eyebrow-dot" data-reveal>Demonstração ao vivo</span>
          <h1 className="h2" style={{ marginTop: 22, fontSize: 'clamp(40px, 5.6vw, 76px)', maxWidth: 900 }} data-split="now">Teste antes de <span className="serif accent">falar com a gente.</span></h1>
          <p className="lede" data-reveal>Você faz o papel do cliente no WhatsApp e vê o pedido ou a marcação chegar na plataforma do outro lado. Dados de demonstração, nada é enviado para ninguém.</p>
        </div>
      </section>
      <section className="sec-tight" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <DemoSwitcher />
          <div className="demo-after" data-reveal>
            <p>Gostou do que viu? Conte como o seu negócio atende hoje.</p>
            <div className="hero-ctas" style={{ marginTop: 0 }}>
              <Link href="/contacto" className="btn btn-primary">Falar com a equipe <Arrow /></Link>
              <Link href="/produtos" className="btn btn-ghost">Ver os produtos</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
