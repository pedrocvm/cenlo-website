import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import FoodAcquisition from '@/components/food-builder/FoodAcquisition'
import './site-pizzaria.css'

const PIXEL_ID = '1010704101993887'

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
      <Script id="meta-pixel" strategy="afterInteractive">{
        `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${PIXEL_ID}');fbq('track','PageView');`
      }</Script>
      <noscript>
        <img height={1} width={1} style={{ display: 'none' }} src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`} alt="" />
      </noscript>
      {children}
      <FoodAcquisition />
    </>
  )
}
