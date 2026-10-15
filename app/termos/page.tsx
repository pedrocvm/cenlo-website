import type { Metadata } from 'next'
import { terms } from '@/lib/data'
import LegalPage from '@/components/LegalPage'

const title = 'Termos de Uso · Cenlo'
const description = 'Condições de uso do site da Cenlo e dos pedidos de contato e demonstração dos produtos Cenlo.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: 'https://cenlo.pt/termos' },
  openGraph: { title, description, url: 'https://cenlo.pt/termos', type: 'website' },
}

export default function TermosPage() {
  return <LegalPage eyebrow="Termos" title="Termos de Uso" updated="outubro de 2026" items={terms} />
}
