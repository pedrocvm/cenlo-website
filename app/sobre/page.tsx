import type { Metadata } from 'next'
import Link from 'next/link'
import { values } from '@/lib/data'
import { Arrow } from '@/components/Icons'

const title = 'Sobre a Cenlo · Central + local'
const description = 'A Cenlo nasceu em Portugal para tirar o atendimento de negócios locais da memória. Hoje são três produtos: Cenlo Food, Cenlo Beauty e Fornada Certa.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: 'https://cenlo.pt/sobre' },
  openGraph: { title, description, url: 'https://cenlo.pt/sobre', type: 'website' },
  twitter: { card: 'summary_large_image', title, description },
}

export default function SobrePage() {
  return (
    <>
      <section className="page-hero">
        <div className="hero-glow" aria-hidden="true" />
        <div className="wrap" style={{ position: 'relative' }}>
          <span className="eyebrow eyebrow-dot" data-reveal>Sobre</span>
          <h1 className="display" style={{ marginTop: 22, maxWidth: 1000 }} data-split="now">Feita em Portugal para quem atende cliente <span className="serif accent">todo dia.</span></h1>
        </div>
      </section>

      <section className="sec-tight">
        <div className="wrap story">
          <p className="word" aria-label="Cenlo: central mais local" data-reveal>cen<span>·</span>lo</p>
          <div className="story-body">
            <p data-reveal>O nome junta <strong>central</strong> e <strong>local</strong>. Uma central que vive perto do negócio, não um sistema pesado e distante que pede para mudar tudo.</p>
            <p data-reveal>A gente começou olhando para o lugar onde o atendimento realmente acontece: a conversa no WhatsApp às nove da noite, o caderno da recepção, a fornada que sai quando a fila já foi embora. <strong>O cliente estava lá. O que faltava era um lugar para cada pedido.</strong></p>
            <p data-reveal>Daí vieram o Cenlo Food, o Cenlo Beauty e a Fornada Certa. Três produtos diferentes, porque restaurante, studio e padaria não trabalham igual. Mas com a mesma ideia: organizar o que o negócio já faz, sem trocar o jeito que o cliente já fala com ele.</p>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">No que a gente acredita</span>
            <h2 className="h2" data-split>Tecnologia que some e deixa o balcão funcionar.</h2>
          </div>
          <div className="values">
            {values.map(v => (
              <article key={v.t} className="value" data-reveal>
                <h3>{v.t}</h3>
                <p>{v.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="final" data-reveal>
            <span className="eyebrow eyebrow-dot">Próximo passo</span>
            <h2 className="h2" style={{ marginTop: 20 }} data-split>Veja os produtos ou fale direto com a gente.</h2>
            <div className="hero-ctas">
              <Link href="/produtos" className="btn btn-primary">Ver os produtos <Arrow /></Link>
              <Link href="/contacto" className="btn btn-ghost">Falar com a equipe</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
