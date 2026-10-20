import type { Metadata } from 'next'
import FoodAcquisition from '@/components/food-builder/FoodAcquisition'
import CaptureAttribution from '@/components/food-builder/CaptureAttribution'
import './contratar.css'

export const metadata: Metadata = {
  title: 'Começar com o Cenlo Food',
  description: 'Revise o plano, escolha como pagar a implantação e envie o pedido de contratação do Cenlo Food.',
  robots: { index: false, follow: false },
}

export default function ContractLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="ct">
      <CaptureAttribution /><FoodAcquisition />
      <header className="ct-header">
        <div className="ct-header-in">
          <a href="https://cenlofood.cenlo.pt/" className="ct-brand" aria-label="Cenlo Food, voltar para a página">
            <svg width="28" height="28" viewBox="0 0 48 48" aria-hidden="true">
              <path d="M35.4 17.1 A13.2 13.2 0 1 0 35.4 30.9" fill="none" stroke="#29221E" strokeWidth="5.1" strokeLinecap="round" />
              <circle cx="26.6" cy="24" r="5.7" fill="#F26522" />
            </svg>
            <span>Cenlo <b>Food</b></span>
          </a>
          <a href="https://cenlofood.cenlo.pt/#planos" className="ct-back">Voltar aos planos</a>
        </div>
      </header>
      {children}
      <footer className="ct-footer">
        <div className="ct-footer-in">
          <span>Um produto Cenlo · Feito em Portugal</span>
          <nav aria-label="Rodapé">
            <a href="https://cenlo.pt/termos">Termos</a>
            <a href="https://cenlo.pt/politica-de-privacidade">Privacidade</a>
          </nav>
        </div>
      </footer>
    </div>
  )
}
