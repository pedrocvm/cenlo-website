/** The real site sold by this offer: the Bella Napoli example built on the Cenlo site template. */
export const EXAMPLE_URL = 'https://bellanapoli.cenlo.pt/'
export const WHATSAPP_NUMBER = '351912333313'

/** Pedro, 20/10/2026: only the site, one-off payment, up to 3 adjustments; domain, hosting and images are the client's. */
export const OFFER_TERMS = [
  'Pagamento único de €149,90',
  'Inclui até 3 ajustes',
  'Domínio, hospedagem e fotos por conta da pizzaria',
] as const

/** Visible FAQ and FAQPage JSON-LD share this list, so they cannot drift apart. */
export const FAQS: { q: string; a: string }[] = [
  {
    q: 'O que os €149,90 cobrem?',
    a: 'A criação do site, em pagamento único, com até 3 ajustes depois de você ver o site pronto. Domínio, hospedagem e fotos ficam por conta da pizzaria.',
  },
  {
    q: 'O cliente precisa instalar um aplicativo ou criar conta?',
    a: 'Não. O site abre no navegador do celular. O cliente consulta o cardápio e monta o pedido sem cadastro.',
  },
  {
    q: 'Como o pedido chega à pizzaria?',
    a: 'O cliente escolhe os itens, confere o carrinho e toca em "Enviar pedido pelo WhatsApp". O WhatsApp abre com o pedido escrito e ele só chega à pizzaria quando o cliente toca em enviar.',
  },
  {
    q: 'Posso usar o número de WhatsApp que a pizzaria já tem?',
    a: 'Sim. O botão do site abre a conversa com o número que você já usa para atender.',
  },
  {
    q: 'O site recebe pagamento online?',
    a: 'Não. O site monta o pedido e o pagamento é combinado entre o cliente e a pizzaria, como já acontece no WhatsApp.',
  },
  {
    q: 'O site aparece no Google?',
    a: 'O site tem um endereço próprio, que você pode colocar no perfil da pizzaria no Google, no Instagram e no WhatsApp. Ter um site não garante uma posição nas buscas.',
  },
  {
    q: 'O atendimento automático do Cenlo Food está incluído?',
    a: 'Não. Nesta oferta o cliente monta o pedido no site e envia pelo WhatsApp. A central de pedidos, a cozinha e o atendimento automático fazem parte do Cenlo Food completo, contratado à parte.',
  },
]
