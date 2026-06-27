import type { Metadata } from 'next'
import { Hanken_Grotesk, Schibsted_Grotesk } from 'next/font/google'
import './globals.css'
import { PrivacyProvider } from '@/components/PrivacyContext'
import PrivacyModal from '@/components/PrivacyModal'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-hanken',
  display: 'swap',
})

const schibsted = Schibsted_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-schibsted',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Cenlo — Central inteligente para negócios',
  description: 'A Cenlo organiza atendimento, clientes, pedidos e operação diária para quem atende clientes todos os dias. Sem trocar a forma como o seu cliente já fala consigo.',
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Crect width='24' height='24' rx='5' fill='%23FF6A2C'/%3E%3Cpath d='M17.6 7.6 A 7 7 0 1 0 17.6 16.4' fill='none' stroke='%23ffffff' stroke-width='3' stroke-linecap='round'/%3E%3Ccircle cx='13.4' cy='12' r='2.4' fill='%23ffffff'/%3E%3C/svg%3E",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt" className={`${hanken.variable} ${schibsted.variable}`}>
      <body style={{ fontFamily: 'var(--font-hanken), system-ui, sans-serif' }}>
        <PrivacyProvider>
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Header />
            <main style={{ flex: 1 }}>{children}</main>
            <Footer />
          </div>
          <PrivacyModal />
        </PrivacyProvider>
      </body>
    </html>
  )
}
