import type { Metadata } from 'next'
import { privacy } from '@/lib/data'
import LegalPage from '@/components/LegalPage'

const title = 'Política de Privacidade · Cenlo'
const description = 'Como a Cenlo coleta, usa e protege os dados que você envia por este site ao pedir contato ou demonstração.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: 'https://cenlo.pt/politica-de-privacidade' },
  openGraph: { title, description, url: 'https://cenlo.pt/politica-de-privacidade', type: 'website' },
}

export default function PoliticaPrivacidadePage() {
  return <LegalPage eyebrow="Privacidade" title="Política de Privacidade" updated="outubro de 2026" items={privacy} />
}
