import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Página não encontrada — Cenlo',
  description: 'A página que procura não existe ou foi movida. Volte ao início ou conheça os produtos Cenlo.',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <section
      style={{
        position: 'relative',
        maxWidth: 1160,
        margin: '0 auto',
        padding: '110px 24px 120px',
        overflow: 'hidden',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: -160,
          right: -100,
          width: 520,
          height: 520,
          borderRadius: '50%',
          background: 'radial-gradient(circle,rgba(255,106,44,.18),rgba(255,106,44,0) 65%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 620 }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'var(--terraBg)',
            color: 'var(--terra)',
            padding: '6px 13px',
            borderRadius: 999,
            fontSize: 13,
            fontWeight: 700,
          }}
        >
          Erro 404
        </span>
        <h1
          className="hd"
          style={{ fontSize: 50, marginTop: 18, fontFamily: 'var(--font-schibsted)' }}
        >
          Esta página não está na central.
        </h1>
        <p style={{ fontSize: 18.5, color: 'var(--ink2)', marginTop: 18, maxWidth: 520 }}>
          O link pode estar errado ou a página pode ter sido movida. Vamos levá-lo de volta ao que
          interessa.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 28 }}>
          <Link
            href="/"
            style={{
              background: 'var(--terraBtn)',
              color: '#fff',
              border: 'none',
              padding: '15px 24px',
              borderRadius: 11,
              fontWeight: 600,
              fontSize: 16,
              boxShadow: '0 8px 20px -10px var(--terra)',
            }}
          >
            Voltar ao início
          </Link>
          <Link
            href="/produtos"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--line)',
              padding: '15px 22px',
              borderRadius: 11,
              fontWeight: 600,
              fontSize: 16,
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            Ver produtos →
          </Link>
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 18,
            marginTop: 30,
            paddingTop: 22,
            borderTop: '1px solid var(--line)',
            fontSize: 14.5,
          }}
        >
          <Link href="/pizza" style={{ color: 'var(--ink2)' }}>
            Cenlo Pizza
          </Link>
          <Link href="/sobre" style={{ color: 'var(--ink2)' }}>
            Sobre
          </Link>
          <Link href="/contacto" style={{ color: 'var(--ink2)' }}>
            Contacto
          </Link>
        </div>
      </div>
    </section>
  )
}
