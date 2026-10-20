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
  robots: { index: true, follow: true },
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48'%3E%3Crect width='48' height='48' rx='10' fill='%230A0A0D'/%3E%3Cpath d='M35.4 17.1 A13.2 13.2 0 1 0 35.4 30.9' fill='none' stroke='%23F4F1EA' stroke-width='5.1' stroke-linecap='round'/%3E%3Ccircle cx='26.6' cy='24' r='5.7' fill='%23F26522'/%3E%3C/svg%3E",
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
