import Link from 'next/link'
import BuilderNav from '@/components/food-builder/BuilderNav'
import Summary from '@/components/food-builder/Summary'
import CaptureAttribution from '@/components/food-builder/CaptureAttribution'
import './builder.css'

export default function FoodBuilderLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="fb">
      <CaptureAttribution />
      <header className="fb-header">
        <div className="fb-header-in">
          <Link href="/configurar" className="fb-brand" aria-label="Cenlo Food, configurador">
            <svg width="30" height="30" viewBox="0 0 48 48" aria-hidden="true">
              <path d="M35.4 17.1 A13.2 13.2 0 1 0 35.4 30.9" fill="none" stroke="#F4F3F7" strokeWidth="5.1" strokeLinecap="round" />
              <circle cx="26.6" cy="24" r="5.7" fill="#FF6A2C" />
            </svg>
            <span className="fb-brand-word">Cenlo<span style={{ color: 'var(--terra)' }}> Food</span></span>
          </Link>
          <BuilderNav />
        </div>
      </header>
      <Summary>{children}</Summary>
      <footer className="fb-footer">
        <div className="fb-footer-in">
          <span>© 2026 Cenlo · Construído em Portugal</span>
          <nav aria-label="Rodapé">
            <a href="https://cenlofood.cenlo.pt">Cenlo Food</a>
            <a href="https://cenlo.pt/politica-de-privacidade">Política de privacidade</a>
            <a href="https://cenlo.pt/termos">Termos</a>
          </nav>
        </div>
      </footer>
    </div>
  )
}
