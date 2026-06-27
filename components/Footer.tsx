'use client'
import Link from 'next/link'
import Logo from './Logo'
import { usePrivacy } from './PrivacyContext'

export default function Footer() {
  const { openModal } = usePrivacy()

  return (
    <footer style={{ background: 'var(--panel)', color: '#E8DECE', marginTop: 'auto' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '56px 24px 30px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40, justifyContent: 'space-between' }}>
          <div style={{ maxWidth: 340 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <Logo />
              <span style={{ fontFamily: 'var(--font-schibsted)', fontWeight: 800, fontSize: 21, color: '#fff' }}>Cenlo</span>
            </div>
            <p style={{ fontSize: 14.5, color: '#C7BCAB', lineHeight: 1.6 }}>
              Centrais inteligentes para organizar atendimento, clientes e operação diária, e faturar mais. Construído em Portugal, para quem atende clientes todos os dias.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 54, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '.1em', color: '#B7AC9A', marginBottom: 14 }}>Produtos</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 11, fontSize: 14.5 }}>
                <Link href="/pizza" style={{ color: '#E8DECE' }}>Cenlo Pizza</Link>
                <Link href="/produtos" style={{ color: '#E8DECE' }}>Cenlo Food</Link>
                <Link href="/produtos" style={{ color: '#E8DECE' }}>Cenlo Night</Link>
                <Link href="/produtos" style={{ color: '#E8DECE' }}>Cenlo Services</Link>
              </div>
            </div>
            <div>
              <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '.1em', color: '#B7AC9A', marginBottom: 14 }}>Empresa</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 11, fontSize: 14.5 }}>
                <Link href="/sobre" style={{ color: '#E8DECE' }}>Sobre</Link>
                <Link href="/contacto" style={{ color: '#E8DECE' }}>Contacto</Link>
                <button onClick={openModal} style={{ background: 'none', border: 'none', color: '#E8DECE', textAlign: 'left', padding: 0, fontSize: 14.5, cursor: 'pointer' }}>Política de Privacidade</button>
                <a href="#" style={{ color: '#E8DECE' }}>Termos</a>
              </div>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #3A322A', marginTop: 38, paddingTop: 22, display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 13, color: '#B7AC9A' }}>© 2026 Cenlo · central + local</span>
          <span style={{ fontSize: 13, color: '#B7AC9A' }}>Identidade visual provisória, em validação</span>
        </div>
      </div>
    </footer>
  )
}
