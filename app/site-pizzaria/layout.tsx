import type { Metadata, Viewport } from 'next'
import './site-pizzaria.css'

const title = 'Site para pizzaria por €149,90 | Cenlo Food'
const description = 'Tenha um site para sua pizzaria com cardápio, fotos, preços, endereço, horário, mapa e pedido preparado para o WhatsApp. Veja o exemplo e peça o seu.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: 'https://cenlofood.cenlo.pt/site-pizzaria' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Cenlo Food',
    url: 'https://cenlofood.cenlo.pt/site-pizzaria',
    title,
    description,
    images: [{
      url: 'https://cenlofood.cenlo.pt/food/assets/video-site-pedido-poster.jpg',
      width: 1600,
      height: 1000,
      alt: 'Site de demonstração de uma pizzaria no celular',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['https://cenlofood.cenlo.pt/food/assets/video-site-pedido-poster.jpg'],
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#FBF8F3',
  colorScheme: 'light',
}

export default function SitePizzariaLayout({ children }: { children: React.ReactNode }) {
  return children
}
