import type { Metadata, Viewport } from 'next'
import { Hanken_Grotesk, Instrument_Serif, JetBrains_Mono, Schibsted_Grotesk } from 'next/font/google'
import './globals.css'
import { PrivacyProvider } from '@/components/PrivacyContext'
import PrivacyModal from '@/components/PrivacyModal'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MainShell from '@/components/MainShell'
import Motion from '@/components/motion/Motion'

const hanken = Hanken_Grotesk({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-hanken', display: 'swap' })
const schibsted = Schibsted_Grotesk({ subsets: ['latin'], weight: ['500', '600', '700', '800'], variable: '--font-schibsted', display: 'swap' })
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-mono', display: 'swap' })
const serif = Instrument_Serif({ subsets: ['latin'], weight: '400', style: 'italic', variable: '--font-serif', display: 'swap' })

const description = 'A Cenlo cria centrais para negócios locais: Cenlo Food para restaurantes e delivery, Cenlo Beauty para studios de beleza e Fornada Certa para padarias.'

export const metadata: Metadata = {
  metadataBase: new URL('https://cenlo.pt'),
  title: { default: 'Cenlo · Centrais para negócios locais', template: '%s' },
  description,
  openGraph: { type: 'website', locale: 'pt_BR', siteName: 'Cenlo', description },
  twitter: { card: 'summary_large_image' },
  verification: { google: 'Ddn-tK87l-pIHq5Vzqi7DvgD3MTTAbjIT-tlsE3d3CA' },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48 96x96' },
      { url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
    ],
    apple: { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
  },
}

export const viewport: Viewport = { themeColor: '#0A0A0D', colorScheme: 'dark' }

const motionBoot = "if(!matchMedia('(prefers-reduced-motion: reduce)').matches){var d=document.documentElement;d.classList.add('js-motion');setTimeout(function(){if(!d.dataset.motion)d.classList.remove('js-motion')},3000)}"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${hanken.variable} ${schibsted.variable} ${mono.variable} ${serif.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionBoot }} />
      </head>
      <body>
        <PrivacyProvider>
          <a href="#main" className="skip">Pular para o conteúdo</a>
          <Header />
          <MainShell>{children}</MainShell>
          <Footer />
          <PrivacyModal />
          <Motion />
        </PrivacyProvider>
      </body>
    </html>
  )
}
