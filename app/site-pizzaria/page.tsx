import { notFound } from 'next/navigation'
import SitePizzariaLanding from '@/components/site-pizzaria/SitePizzariaLanding'
import { FAQS } from '@/lib/site-pizzaria/content'

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
      offers: { '@type': 'Offer', price: '149.90', priceCurrency: 'EUR', url: 'https://cenlofood.cenlo.pt/site-pizzaria', description: 'Pagamento único. Inclui até 3 ajustes. Domínio, hospedagem e fotos por conta da pizzaria.' },
    },
    {
      '@type': 'FAQPage',
      mainEntity: FAQS.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
    },
  ],
}

export default function SitePizzariaPage() {
  // A page that cannot save leads is not published: production needs the CRM endpoint and token.
  if (isProduction && !(process.env.CENLO_SITE_PIZZARIA_CRM_ENDPOINT && process.env.CENLO_SITE_PIZZARIA_CRM_TOKEN)) notFound()

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <SitePizzariaLanding />
    </>
  )
}
