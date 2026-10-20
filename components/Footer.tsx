'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from './Logo'
import { usePrivacy } from './PrivacyContext'

export default function Footer() {
  const { openModal } = usePrivacy()
  const path = usePathname()
  if (path.startsWith('/configurar') || path.startsWith('/contratar')) return null

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <div>
            <Link href="/" className="brand" aria-label="Cenlo, início">
              <Logo />
              <span className="brand-word">Cenlo</span>
            </Link>
            <p>Centrais para negócios locais. Feito em Portugal, para quem atende cliente todo dia.</p>
          </div>
          <div className="footer-col">
            <h2>Produtos</h2>
            <ul>
              <li><a href="https://cenlofood.cenlo.pt/">Cenlo Food</a></li>
              <li><a href="https://cenlobeauty.cenlo.pt/">Cenlo Beauty</a></li>
              <li><a href="https://fornadacerta.cenlo.pt/">Fornada Certa</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h2>Cenlo</h2>
            <ul>
              <li><Link href="/produtos">Produtos</Link></li>
              <li><Link href="/demo">Demo ao vivo</Link></li>
              <li><Link href="/sobre">Sobre</Link></li>
              <li><Link href="/contacto">Contato</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h2>Legal</h2>
            <ul>
              <li><button type="button" onClick={openModal}>Privacidade</button></li>
              <li><Link href="/termos">Termos</Link></li>
              <li><a href="mailto:ola@cenlo.pt">ola@cenlo.pt</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-word" aria-hidden="true">cenlo</div>
        <div className="footer-bottom">
          <span>© 2026 Cenlo · central + local</span>
          <span>Feito em Portugal</span>
        </div>
      </div>
    </footer>
  )
}
