import type { Metadata } from 'next'
import Link from 'next/link'
import { privacy } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Política de Privacidade — Cenlo',
  description: 'Como a Cenlo recolhe, usa e protege os dados que nos confia ao pedir uma demonstração ou ao falar connosco.',
  alternates: { canonical: 'https://cenlo.pt/politica-de-privacidade' },
  openGraph: {
    title: 'Política de Privacidade — Cenlo',
    description: 'Como a Cenlo recolhe, usa e protege os dados que nos confia ao pedir uma demonstração ou ao falar connosco.',
    url: 'https://cenlo.pt/politica-de-privacidade',
    type: 'website',
  },
}

export default function PoliticaPrivacidadePage() {
  return (
    <section style={{ maxWidth: 820, margin: '0 auto', padding: '72px 24px 84px' }}>
      <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--terra)' }}>Privacidade</span>
      <h1 className="hd" style={{ fontSize: 40, marginTop: 14, fontFamily: 'var(--font-schibsted)' }}>Política de Privacidade</h1>
      <p style={{ fontSize: 13.5, color: 'var(--muted)', marginTop: 14 }}>Última atualização: junho de 2026</p>

      <div style={{ marginTop: 30, display: 'flex', flexDirection: 'column', gap: 24 }}>
        {privacy.map(s => (
          <div key={s.t}>
            <h2 style={{ fontSize: 18, color: 'var(--ink)', fontWeight: 700, marginBottom: 8, fontFamily: 'var(--font-schibsted)' }}>{s.t}</h2>
            <p style={{ fontSize: 15.5, color: 'var(--ink2)', lineHeight: 1.6 }}>{s.d}</p>
          </div>
        ))}
      </div>

      <p style={{ fontSize: 14.5, color: 'var(--muted)', borderTop: '1px solid var(--line2)', paddingTop: 20, marginTop: 30 }}>
        Dúvidas sobre os seus dados? Escreva para{' '}
        <a href="mailto:ola@cenlo.pt" style={{ color: 'var(--terra)', fontWeight: 600 }}>ola@cenlo.pt</a>.
      </p>

      <div style={{ marginTop: 28 }}>
        <Link href="/contacto" style={{ display: 'inline-block', background: 'var(--terraBtn)', color: '#fff', border: 'none', padding: '13px 22px', borderRadius: 11, fontWeight: 600, fontSize: 15.5 }}>Pedir demonstração</Link>
      </div>
    </section>
  )
}
