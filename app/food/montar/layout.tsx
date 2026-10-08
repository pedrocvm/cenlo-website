import Link from 'next/link'
import Logo from '@/components/Logo'
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
          <Link href="/food/montar" className="fb-brand" aria-label="Cenlo Food Builder, início">
            <Logo size={28} />
            <span className="fb-brand-word">Cenlo</span>
            <span className="fb-food-tag">FOOD</span>
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
