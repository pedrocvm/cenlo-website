import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'

const title = 'Contato · Fale com a equipe Cenlo'
const description = 'Conte como o seu negócio atende hoje e a gente indica o produto certo: Cenlo Food, Cenlo Beauty ou Fornada Certa. Responde uma pessoa da equipe.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: 'https://cenlo.pt/contacto' },
  openGraph: { title, description, url: 'https://cenlo.pt/contacto', type: 'website' },
  twitter: { card: 'summary_large_image', title, description },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: title,
  url: 'https://cenlo.pt/contacto',
  description,
}

const wa = 'https://wa.me/351912333313?text=Ol%C3%A1!%20Vim%20pelo%20site%20da%20Cenlo%20e%20quero%20falar%20com%20a%20equipe.'

export default function ContactoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <section className="page-hero">
        <div className="hero-glow" aria-hidden="true" />
        <div className="wrap contact" style={{ position: 'relative' }}>
          <div>
            <span className="eyebrow eyebrow-dot" data-reveal>Contato</span>
            <h1 className="h2" style={{ marginTop: 22, fontSize: 'clamp(40px, 5.4vw, 72px)' }} data-split="now">Conte como o seu negócio atende hoje.</h1>
            <p className="lede" data-reveal>A gente lê, entende a sua rotina e indica o produto certo. Normalmente respondemos no mesmo dia útil, e do outro lado está uma pessoa da equipe.</p>
            <div className="contact-ways" data-reveal>
              <a href={wa} target="_blank" rel="noopener noreferrer" className="way">
                <span className="way-ic" style={{ background: '#25D366' }} aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="#fff"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.15c-1.52 0-3.01-.41-4.31-1.18l-.31-.18-3.2.84.85-3.12-.2-.32a8.2 8.2 0 0 1-1.26-4.39c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.69 8.24-8.23 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z" /></svg>
                </span>
                <span><b>WhatsApp</b><span>+351 912 333 313</span></span>
              </a>
              <a href="mailto:ola@cenlo.pt" className="way">
                <span className="way-ic" style={{ background: 'rgba(242,101,34,.16)', color: 'var(--c-orange2)', fontWeight: 700 }} aria-hidden="true">@</span>
                <span><b>ola@cenlo.pt</b><span>Para qualquer assunto</span></span>
              </a>
            </div>
          </div>
          <div className="form-card" data-reveal>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}
