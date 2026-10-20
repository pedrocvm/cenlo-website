import SitePizzariaLanding from '@/components/site-pizzaria/SitePizzariaLanding'

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      name: 'Criação de site para pizzaria',
      provider: { '@type': 'Organization', name: 'Cenlo', url: 'https://cenlo.pt' },
      areaServed: 'PT',
      serviceType: 'Criação e configuração de site para pizzaria',
      offers: {
        '@type': 'Offer',
        price: '149.90',
        priceCurrency: 'EUR',
        url: 'https://cenlofood.cenlo.pt/site-pizzaria',
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        ['O cliente precisa instalar um aplicativo?', 'Não. O site abre no navegador do celular e o pedido é preparado para envio pelo WhatsApp.'],
        ['O cliente precisa criar uma conta?', 'Não. Ele consulta o cardápio e monta o pedido sem criar cadastro.'],
        ['Como o pedido chega ao WhatsApp?', 'O cliente escolhe os itens, confere o carrinho e toca no botão. O WhatsApp abre com o pedido preenchido para ele enviar.'],
        ['Posso usar o número de WhatsApp atual?', 'Sim. O botão do site pode ser ligado ao número que a pizzaria já usa.'],
      ].map(([name, text]) => ({
        '@type': 'Question',
        name,
        acceptedAnswer: { '@type': 'Answer', text },
      })),
    },
  ],
}

export default function SitePizzariaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SitePizzariaLanding />
    </>
  )
}
