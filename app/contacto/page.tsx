import type { Metadata } from 'next'
import ContactForm from '@/components/ContactForm'

const contactSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contacto Cenlo — Pedir demonstração',
  url: 'https://cenlo.pt/contacto',
  description: 'Peça uma demonstração do Cenlo Pizza. Marcamos uma conversa curta e mostramos como organizar os pedidos da sua pizzaria pelo WhatsApp.',
}

export const metadata: Metadata = {
  title: 'Contacto Cenlo — pedir demonstração',
  description: 'Peça uma demonstração do Cenlo. Marcamos uma conversa curta e mostramos como organizar os pedidos da sua pizzaria pelo WhatsApp, sem compromisso.',
  alternates: { canonical: 'https://cenlo.pt/contacto' },
  openGraph: {
    title: 'Contacto Cenlo — pedir demonstração',
    description: 'Peça uma demonstração do Cenlo. Marcamos uma conversa curta e mostramos como organizar os pedidos da sua pizzaria pelo WhatsApp, sem compromisso.',
    url: 'https://cenlo.pt/contacto',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contacto Cenlo — pedir demonstração',
    description: 'Peça uma demonstração do Cenlo. Marcamos uma conversa curta e mostramos como organizar os pedidos da sua pizzaria pelo WhatsApp, sem compromisso.',
  },
}

export default function ContactoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }} />
      <section style={{ maxWidth: 980, margin: '0 auto', padding: '64px 24px 84px' }}>
        <div className="grid-two" style={{ display: 'grid', gridTemplateColumns: '.85fr 1.15fr', gap: 48, alignItems: 'start' }}>
          <div>
            <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--terra)' }}>Contacto</span>
            <h1 className="hd" style={{ fontSize: 40, marginTop: 14, fontFamily: 'var(--font-schibsted)' }}>Vamos organizar a sua operação? Marque uma demonstração curta.</h1>
            <p style={{ fontSize: 16.5, color: 'var(--ink2)', marginTop: 16 }}>Se a sua operação ainda depende de mensagens soltas, pedidos anotados à mão ou conversas perdidas no WhatsApp, fale connosco.</p>

            <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 12 }}>
              <a href="https://wa.me/351912333313?text=Ol%C3%A1%2C%20quero%20pedir%20uma%20demonstra%C3%A7%C3%A3o%20do%20Cenlo." target="_blank" rel="noopener noreferrer" className="card-hover" style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 12, padding: '14px 16px' }}>
                <span style={{ width: 34, height: 34, borderRadius: 9, background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="#fff" aria-hidden="true">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.15c-1.52 0-3.01-.41-4.31-1.18l-.31-.18-3.2.84.85-3.12-.2-.32a8.2 8.2 0 0 1-1.26-4.39c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.69 8.24-8.23 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z" />
                  </svg>
                </span>
                <span>
                  <span style={{ display: 'block', fontWeight: 600, fontSize: 14.5 }}>WhatsApp</span>
                  <span style={{ fontSize: 13, color: 'var(--muted)' }}>Falar diretamente connosco</span>
                </span>
              </a>

              <a href="mailto:ola@cenlo.pt" className="card-hover" style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 12, padding: '14px 16px' }}>
                <span style={{ width: 34, height: 34, borderRadius: 9, background: 'var(--terraBg)', color: 'var(--terra)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, flexShrink: 0 }}>@</span>
                <span>
                  <span style={{ display: 'block', fontWeight: 600, fontSize: 14.5 }}>ola@cenlo.pt</span>
                  <span style={{ fontSize: 13, color: 'var(--muted)' }}>Geral · respondemos a cada pedido</span>
                </span>
              </a>

            </div>
          </div>

          <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 18, padding: 30 }}>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}
