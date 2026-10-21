import type { Metadata, Viewport } from 'next'
import SitePizzariaTracking from '@/components/site-pizzaria/SitePizzariaTracking'
import './site-pizzaria.css'

const title = 'Site para pizzaria por €149,90 | Cenlo Food'
const description = 'Site para a sua pizzaria com cardápio, fotos, preços, endereço, horário e mapa. O cliente monta o pedido e o WhatsApp abre com tudo escrito. Teste o exemplo e peça o seu.'
const url = 'https://cenlofood.cenlo.pt/site-pizzaria'
const image = { url: 'https://cenlofood.cenlo.pt/site-pizzaria/og.jpg', width: 1200, height: 630, alt: 'Site de pizzaria no celular, com cardápio e pedido pelo WhatsApp, por €149,90' }

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: url },
  openGraph: { type: 'website', locale: 'pt_BR', siteName: 'Cenlo Food', url, title, description, images: [image] },
  twitter: { card: 'summary_large_image', title, description, images: [image.url] },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#FFFCF8',
  colorScheme: 'light',
}

export default function SitePizzariaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <SitePizzariaTracking />
    </>
  )
}
