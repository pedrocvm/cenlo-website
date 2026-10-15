export type ProductId = 'food' | 'beauty' | 'fornada'

export type Product = {
  id: ProductId
  anchor: string
  name: string
  segment: string
  hook: string
  lede: string
  facts: { value: string; label: string }[]
  areas: string[]
  notes: { title: string; desc: string }[]
  cta: { label: string; href: string }
  secondary: { label: string; href: string }
  demo?: { place: string; kind: string; url: string }
}

export const products: Product[] = [
  {
    id: 'food',
    anchor: 'food',
    name: 'Cenlo Food',
    segment: 'Restaurantes e delivery',
    hook: 'Todos os pedidos num lugar só, venham de onde vierem.',
    lede: 'WhatsApp, link de pedido, site, mesa, telefone e balcão caem na mesma central. A cozinha recebe a comanda limpa e o dia fecha com números reais, sem comissão por pedido.',
    facts: [
      { value: '6', label: 'canais na mesma central' },
      { value: '9', label: 'áreas no ar hoje' },
      { value: '0 €', label: 'de comissão por pedido' },
    ],
    areas: ['Pedidos', 'Cozinha e comandas', 'Cardápio', 'Entregas e horários', 'Clientes e recompra', 'Relatórios', 'Inteligência', 'Equipe e segurança', 'Mais de uma loja'],
    notes: [
      { title: 'A cozinha lê, não decifra.', desc: 'Hambúrguer ao ponto e sem cebola chega escrito assim, na ordem certa e com o estado à vista.' },
      { title: 'Pizza tem tratamento próprio.', desc: 'Inteira ou meio a meio com até dois sabores, extras por tamanho, convivendo com o resto do cardápio.' },
      { title: 'Os apps de entrega podem ficar.', desc: 'Bolt Food, Uber Eats, Glovo e Wolt trazem cliente novo. O Cenlo Food organiza os canais que são seus.' },
    ],
    cta: { label: 'Fazer o diagnóstico grátis', href: 'https://cenlofood.cenlo.pt/diagnostico' },
    secondary: { label: 'Conhecer o Cenlo Food', href: 'https://cenlofood.cenlo.pt/' },
    demo: { place: 'Bella Napoli', kind: 'pizzaria de demonstração', url: 'https://food.cenlo.pt/demo/food' },
  },
  {
    id: 'beauty',
    anchor: 'beauty',
    name: 'Cenlo Beauty',
    segment: 'Studios de beleza e hora marcada',
    hook: 'A agenda inteira num lugar só, venha a cliente de onde vier.',
    lede: 'Vitrine, WhatsApp, Instagram, telefone, recepção e lista de espera na mesma agenda. A cliente marca sozinha, o tempo reservado é o tempo real do serviço e o mês fecha com a receita de verdade.',
    facts: [
      { value: '6', label: 'portas para a mesma agenda' },
      { value: '10', label: 'áreas no ar hoje' },
      { value: '0 €', label: 'de comissão por marcação' },
    ],
    areas: ['Agenda', 'Vitrine', 'Foto antes', 'Conversas', 'Clientes', 'Serviços', 'Equipe', 'Regras', 'Relatórios', 'Retorno'],
    notes: [
      { title: 'Nunca duas na mesma cadeira.', desc: 'Os horários vêm da agenda, com a duração e a arrumação de cada serviço já reservadas.' },
      { title: 'A foto chega antes do horário.', desc: 'Ela pediu gel e a unha pede o dobro? A foto ajusta o tempo antes de a hora ser fechada.' },
      { title: 'Fresha e Booksy podem ficar.', desc: 'Trazem cliente nova, e a nota que você já tem lá aparece na sua vitrine.' },
    ],
    cta: { label: 'Fazer o diagnóstico grátis', href: 'https://cenlobeauty.cenlo.pt/diagnostico' },
    secondary: { label: 'Conhecer o Cenlo Beauty', href: 'https://cenlobeauty.cenlo.pt/' },
    demo: { place: 'Studio Aurora', kind: 'studio de demonstração', url: 'https://cenlobeauty.cenlo.pt/demo' },
  },
  {
    id: 'fornada',
    anchor: 'fornada-certa',
    name: 'Fornada Certa',
    segment: 'Padarias',
    hook: 'O pão saiu. O aviso chegou. Por SMS.',
    lede: 'A equipe confirma a fornada com um toque e quem está esperando aquele produto recebe um SMS, enviado pelo celular da própria padaria. O cliente não instala app, não cria conta e não abre link.',
    facts: [
      { value: '19,90 €', label: 'por mês, ativação incluída' },
      { value: '1', label: 'toque para avisar a fornada' },
      { value: '0', label: 'meses de fidelização' },
    ],
    areas: ['Hoje', 'Fornadas', 'Clientes', 'Resultados', 'Configuração'],
    notes: [
      { title: 'O cliente responde com um número.', desc: '1 se já comprou, 2 para pausar hoje, 0 para sair dos avisos.' },
      { title: 'Esgotou? A fila para.', desc: 'Marque a fornada como esgotada e os envios que ainda não saíram são interrompidos.' },
      { title: 'Sem rede, sem aviso.', desc: 'Se o celular da loja ficar sem sinal, o painel avisa e nenhuma fornada é publicada.' },
    ],
    cta: { label: 'Começar por 19,90 €/mês', href: 'https://fornadacerta.cenlo.pt/#preco' },
    secondary: { label: 'Conhecer a Fornada Certa', href: 'https://fornadacerta.cenlo.pt/' },
  },
]

export const moments = [
  { time: 'sex · 21:14', place: 'Restaurante', text: 'Três conversas abertas no WhatsApp e um pedido sem endereço. A cozinha está esperando.' },
  { time: 'qui · 15:00', place: 'Studio', text: 'A cliente marcou pelo Instagram ontem à noite. Ninguém viu, e agora tem duas pessoas para a mesma cadeira.' },
  { time: 'sáb · 16:20', place: 'Padaria', text: 'O pão de mistura saiu quentinho. Quem queria só ficou sabendo no dia seguinte.' },
]

export const steps = [
  { n: '01', title: 'O cliente fala do jeito dele', desc: 'Mensagem, link, story, ligação ou balcão. Ninguém precisa baixar app nem criar conta.' },
  { n: '02', title: 'A central organiza', desc: 'Cada pedido, marcação ou fornada ganha um lugar, um estado e um fim. Preço e duração saem do que você publicou, nunca da IA.' },
  { n: '03', title: 'A sua equipe decide', desc: 'Quando alguém da casa entra na conversa, o automático sai daquele atendimento. Você escolhe até onde ele vai.' },
  { n: '04', title: 'O dia fecha com número de verdade', desc: 'Fechamento do dia, histórico de cada cliente e a lista de quem vale chamar de volta.' },
]

export const principles = [
  { title: 'A IA nunca decide preço.', desc: 'O valor vem sempre do cardápio ou do catálogo publicado. Um pedido é um pedido, entre por onde entrar.' },
  { title: 'Quem manda é a sua equipe.', desc: 'Basta alguém da casa responder e o automático sai da conversa. Só volta quando vocês quiserem.' },
  { title: 'Os canais continuam seus.', desc: 'Sem comissão por pedido nem por marcação. O cliente fica no seu histórico, não no de um marketplace.' },
  { title: 'O cliente não instala nada.', desc: 'Link, mensagem ou SMS. Funciona no celular que ele já tem, do jeito que ele já usa.' },
]

export const channels = ['Pedido pelo WhatsApp', 'Marcação pelo Instagram', 'Fornada das 16:20', 'Mesa 7 pelo QR', 'Ligação no balcão', 'Link na bio', 'Lista de espera', 'Pedido pelo site', 'Aviso por SMS']

export const values = [
  { t: 'Perto do balcão', d: 'Cada produto nasce de uma sexta à noite na cozinha, de uma semana cheia no studio ou de uma fornada que saiu sem ninguém saber. Não de uma planilha.' },
  { t: 'Regra antes de IA', d: 'A inteligência ajuda a entender o cliente. Preço, duração e disponibilidade vêm de regras que você controla.' },
  { t: 'Sem prender ninguém', d: 'Sem comissão por pedido, com gente acompanhando os primeiros dias e com os dados de cada negócio isolados dos outros.' },
]

export const terms = [
  { t: 'Aceitação dos termos', d: 'Ao acessar e usar o site da Cenlo, você concorda com estes termos. Se não concordar, pedimos que não use o site nem os formulários disponíveis.' },
  { t: 'O que a Cenlo oferece', d: 'A Cenlo desenvolve centrais de atendimento e operação para negócios locais: Cenlo Food, Cenlo Beauty e Fornada Certa. Este site apresenta esses produtos e permite pedir contato ou demonstração. O acesso a cada produto segue as condições comerciais próprias de cada um.' },
  { t: 'Uso do site', d: 'O site serve para informação e contato comercial. Você se compromete a fornecer informações verdadeiras nos formulários e a não usar o site para fins ilícitos, fraudulentos ou que prejudiquem o funcionamento do serviço.' },
  { t: 'Pedidos de contato e demonstração', d: 'Enviar um pedido de contato ou de demonstração não cria contrato nem obrigação de fornecimento. A Cenlo entra em contato para avaliar, junto com você, se o produto faz sentido para o seu negócio.' },
  { t: 'Propriedade intelectual', d: 'A marca Cenlo, as marcas dos produtos, os textos, o design e o software associados pertencem à Cenlo. Não é permitida a reprodução, cópia ou uso sem autorização por escrito.' },
  { t: 'Limitação de responsabilidade', d: 'O site é disponibilizado "tal como está". A Cenlo procura manter a informação atualizada e o serviço disponível, mas não garante ausência de erros ou interrupções, dentro dos limites permitidos por lei.' },
  { t: 'Alterações', d: 'A Cenlo pode atualizar estes termos a qualquer momento. A versão em vigor é sempre a publicada nesta página, com a data da última atualização.' },
  { t: 'Lei aplicável', d: 'Estes termos seguem a lei portuguesa. Qualquer litígio será resolvido pelos tribunais competentes em Portugal.' },
]

export const privacy = [
  { t: 'Quem somos', d: 'A Cenlo desenvolve centrais de atendimento e operação para negócios locais. Esta política explica como tratamos os dados que você nos envia por este site.' },
  { t: 'Quais dados coletamos', d: 'Apenas o que você envia ao pedir contato ou demonstração: nome, nome do negócio, cidade, tipo de negócio, telefone, email e a mensagem que escrever.' },
  { t: 'Para que usamos os dados', d: 'Usamos os seus dados só para responder ao seu pedido, preparar a demonstração e acompanhar o contato. Não usamos para mais nada sem o seu conhecimento.' },
  { t: 'Compartilhamento com terceiros', d: 'Não vendemos nem compartilhamos os seus dados com terceiros para fins comerciais. Usamos ferramentas de apoio, como o envio de email, apenas para falar com você.' },
  { t: 'Os seus direitos', d: 'Você pode pedir, a qualquer momento, acesso, correção ou eliminação dos seus dados. Basta escrever para ola@cenlo.pt.' },
  { t: 'Conservação', d: 'Guardamos os dados apenas pelo tempo necessário para o contato e para o eventual início de uma relação comercial. Depois disso, eliminamos a seu pedido.' },
  { t: 'Produtos Cenlo', d: 'Cenlo Food, Cenlo Beauty e Fornada Certa têm políticas de privacidade próprias para os dados tratados dentro de cada produto, publicadas nos respectivos sites.' },
]
