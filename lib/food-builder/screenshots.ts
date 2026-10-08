import type { ModuleId } from './catalog'

export type Shot = {
  src: string
  width: number
  height: number
  device: 'desktop' | 'mobile'
  alt: string
  caption: string
}

const dir = '/food-builder/screens'
const desktop = (file: string, alt: string, caption: string, width = 1600, height = 1000): Shot => ({ src: `${dir}/${file}`, width, height, device: 'desktop', alt, caption })
const mobile = (file: string, alt: string, caption: string, width = 390, height = 844): Shot => ({ src: `${dir}/${file}`, width, height, device: 'mobile', alt, caption })

const S = {
  orders: desktop('orders-list.webp', 'Lista de pedidos do Cenlo Food com indicadores do dia, filtros por estado e tipo e a origem de cada pedido', 'Pedidos: indicadores do dia, filtros por estado e tipo e a origem de cada pedido (WhatsApp, Balcão, Telefone).'),
  home: desktop('dashboard-home.webp', 'Página inicial do Cenlo Food com pedidos em curso, conversas em aberto e pedidos por hora', 'Início: pedidos em curso, conversas a precisar de resposta e pedidos por hora.'),
  kitchen: desktop('kitchen-board.webp', 'Ecrã de cozinha com colunas Recebido, Em preparação, Pronto e Saiu para entrega', 'Cozinha: cada pedido na sua etapa, com o tempo decorrido em destaque.'),
  conversations: desktop('conversations-handoff.webp', 'Caixa de conversas com uma conversa em atendimento humano e a ficha do cliente ao lado', 'Conversas: a equipa assume a conversa com o histórico completo e a ficha do cliente ao lado.'),
  customers: desktop('customers-list.webp', 'Lista de clientes com indicadores, hábitos dos clientes e separadores Todos, Recentes e A reativar', 'Clientes: base construída a partir dos pedidos, com hábitos de compra e o separador A reativar.'),
  intelligence: desktop('intelligence-recommendations.webp', 'Cenlo Intelligence com o resumo de clientes ativos e recomendações', 'Cenlo Intelligence: o que está a acontecer, em linguagem simples, e recomendações para agir.'),
  insights: desktop('reports-insights.webp', 'Relatórios no separador Insights com produtos que deixaram de vender e a respetiva evidência', 'Insights: um produto que deixou de vender, com a evidência e um atalho para o cardápio.'),
  zones: desktop('menu-zones.webp', 'Cardápio com sabores, tamanhos e lista de zonas de entrega com a taxa de cada zona', 'Cardápio: zonas de entrega com a taxa de cada uma, ao lado de sabores, tamanhos e extras.'),
  manual: desktop('manual-order.webp', 'Formulário de novo pedido com origem Balcão ou Telefone, cliente, itens e entrega', 'Novo pedido: origem Balcão ou Telefone, cliente, itens do cardápio e recolha ou entrega.'),
  online: desktop('online-ordering.webp', 'Página pública de pedidos online com cardápio, carrinho e escolha entre entrega e levantamento', 'Pedidos online no computador: cardápio, carrinho e cálculo da entrega a partir da morada.', 1440, 900),
  onlineMenu: mobile('online-ordering-menu-mobile.webp', 'Página de pedidos online no telemóvel com o cardápio por categorias', 'No telemóvel: cardápio por categorias com fotografias.'),
  onlineItem: mobile('online-ordering-item-mobile.webp', 'Escolha de tamanho, meio a meio e adicionais de uma pizza na página de pedidos', 'Escolha de tamanho, meio a meio e adicionais antes de adicionar ao carrinho.'),
  tracking: mobile('order-tracking-mobile.webp', 'Página de acompanhamento do pedido com a linha do tempo dos estados', 'Acompanhamento: o cliente vê o estado do pedido e pode alterar ou cancelar antes da preparação.', 780, 1688),
  siteEditor: desktop('site-editor.webp', 'Editor do site da marca com pré-visualização ao vivo', 'Site: edição com pré-visualização ao vivo, em computador e telemóvel.'),
  sitePublic: desktop('site-public.webp', 'Site público de uma pizzaria de demonstração com botão Fazer pedido', 'O site da marca, com o cardápio e o pedido a um toque.'),
  mesaHome: mobile('mesa-home-mobile.webp', 'Página da mesa no telemóvel com os botões Ver o cardápio e Chamar o empregado', 'À mesa: o cliente abre o cardápio ou chama o empregado.'),
  mesaMenu: mobile('mesa-menu-mobile.webp', 'Cardápio da mesa no telemóvel com a comanda', 'Cardápio da mesa, com a comanda sempre à mão.'),
} satisfies Record<string, Shot>

export const SCREENSHOTS: Partial<Record<ModuleId, Shot[]>> = {
  'orders-core': [S.orders, S.home],
  'whatsapp-assistant': [S.conversations],
  'kitchen-display': [S.kitchen],
  'ordering-site': [S.online, S.onlineMenu, S.onlineItem, S.siteEditor, S.sitePublic],
  'counter-phone': [S.manual, S.orders],
  'table-service': [S.mesaHome, S.mesaMenu],
  'delivery-zones': [S.zones],
  'delivery-radius': [S.online],
  'customer-updates': [S.tracking, S.conversations],
  'customer-crm': [S.customers],
  'customer-reactivation': [S.customers],
  'cenlo-intelligence': [S.intelligence],
  'insights-recommendations': [S.insights, S.intelligence],
}

export const HERO_SHOTS = { main: S.kitchen, side: S.onlineMenu }

export function shotsFor(id: ModuleId): Shot[] {
  return SCREENSHOTS[id] ?? []
}
