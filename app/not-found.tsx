import type { Metadata } from 'next'
import Link from 'next/link'
import { Arrow } from '@/components/Icons'

export const metadata: Metadata = {
  title: 'Página não encontrada · Cenlo',
  description: 'Esta página não existe ou mudou de lugar. Volte ao início ou conheça os produtos Cenlo.',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <section className="page-hero" style={{ minHeight: '78svh', display: 'flex', alignItems: 'center' }}>
      <div className="hero-glow" aria-hidden="true" />
      <div className="wrap" style={{ position: 'relative' }}>
        <span className="eyebrow eyebrow-dot">Erro 404</span>
        <h1 className="display" style={{ marginTop: 22, maxWidth: 900 }}>Esta página não está na <span className="serif accent">central.</span></h1>
        <p className="lede">O link pode estar errado ou a página mudou de lugar. Os produtos estão todos aqui:</p>
        <div className="hero-ctas">
          <Link href="/" className="btn btn-primary">Voltar ao início <Arrow /></Link>
          <Link href="/produtos" className="btn btn-ghost">Ver os produtos</Link>
        </div>
      </div>
    </section>
  )
}
