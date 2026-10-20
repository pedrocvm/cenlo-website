import { notFound } from 'next/navigation'
import SitePizzariaLanding from '@/components/site-pizzaria/SitePizzariaLanding'
import { COMMERCIAL_TERMS_CONFIRMED, FAQS, PENDING_TERMS } from '@/lib/site-pizzaria/content'

const isProduction = process.env.VERCEL_ENV === 'production'

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: 'Site para pizzaria',
      provider: { '@type': 'Organization', name: 'Cenlo', url: 'https://cenlo.pt' },
      areaServed: 'PT',
      serviceType: 'Criação e configuração de site com cardápio e pedido pelo WhatsApp',
      offers: { '@type': 'Offer', price: '149.90', priceCurrency: 'EUR', url: 'https://cenlofood.cenlo.pt/site-pizzaria' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQS.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    },
  ],
}

export default function SitePizzariaPage() {
  // The offer cannot go live while its terms are open: production answers 404 until Pedro confirms them.
  if (isProduction && !COMMERCIAL_TERMS_CONFIRMED) notFound()

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <SitePizzariaLanding qaPending={COMMERCIAL_TERMS_CONFIRMED ? [] : [...PENDING_TERMS]} />
    </>
  )
}
