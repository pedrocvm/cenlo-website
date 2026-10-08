import type { Metadata } from 'next'
import Done from '@/components/food-builder/Done'

export const metadata: Metadata = {
  title: 'Configuração enviada | Cenlo Food Builder',
  robots: { index: false, follow: false },
}

export default function SentPage() {
  return <Done />
}
