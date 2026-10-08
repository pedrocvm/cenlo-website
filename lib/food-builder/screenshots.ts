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
  orderDetail: desktop('order-detail.webp', 'Detalhe de um pedido com estado, cliente e entrega, itens, totais, histórico de estado e impressão da cozinha', 'Detalhe do pedido: estado, cliente e entrega, itens, totais e o histórico de cada mudança de estado.'),
  printing: desktop('printing-settings.webp', 'Definições de impressão da cozinha com o estado da impressão automática, a lista de configuração e o computador de impressão', 'Impressão da cozinha: estado da impressão automática, passos de configuração e associação do computador.'),
  scheduled: desktop('kitchen-scheduled.webp', 'Separador Agendados da cozinha com pedidos de hoje e de amanhã e a hora a que entram na cozinha', 'Agendados: cada pedido futuro com a hora a que entra na cozinha, para enviar já, reagendar ou cancelar.'),
  scheduling: desktop('scheduling-settings.webp', 'Definições de pedidos agendados com recolha e entrega agendadas, tempos de preparação e antecedência mínima', 'Regras de agendamento: recolha e entrega, antecedência mínima, preparação e capacidade por período.'),
  tables: desktop('tables-floor.webp', 'Vista da sala com mesas disponíveis e em atendimento e o painel A chamar', 'Sala: mesas em atendimento e disponíveis, com o painel de quem está a chamar a equipa.'),
  deliveries: desktop('deliveries-live.webp', 'Painel de entregas ao vivo com saídas à espera de recolha atribuídas a estafetas', 'Entregas ao vivo: saídas agrupadas por estafeta, com as regras de despacho ativas no topo.'),
  driver: mobile('driver-app-mobile.webp', 'Aplicação do estafeta no telemóvel com a próxima saída e três entregas por ordem', 'Aplicação do estafeta: a próxima saída com as paragens por ordem.', 780, 1688),
  radius: desktop('zones-radius.webp', 'Zonas de entrega com taxa e entrega por raio de distância com faixas de quilómetros', 'Zonas de entrega e entrega por raio: morada da loja localizada e uma taxa por faixa de distância.'),
  promotions: desktop('promotions-list.webp', 'Lista de promoções com benefício, tipo, canais, vigência e estado', 'Promoções: benefício, canais onde vale, vigência e estado de cada campanha.'),
  promotionForm: desktop('promotion-wizard.webp', 'Formulário de nova promoção com benefício, o que participa, onde vale, quando vale e como aparece', 'Nova promoção: benefício, o que participa, onde vale, quando vale e como aparece ao cliente.'),
  customer: desktop('customer-detail.webp', 'Ficha de cliente com histórico de pedidos, favoritos, pedido habitual e pedidos por dia da semana', 'Ficha do cliente: histórico, favoritos, pedido habitual e os dias em que costuma pedir.'),
  reactivate: desktop('customers-reactivate.webp', 'Separador A reativar com clientes sem compras recentes, potencial de retorno e campanha de reativação', 'A reativar: quem deixou de comprar, há quantos dias, o potencial de retorno e a mensagem sugerida.'),
  forecast: desktop('intelligence-forecast.webp', 'Previsões de pedidos e de faturação para a próxima semana e o próximo mês', 'Previsões: pedidos esperados por dia, dia de pico e nível de confiança.'),
  reports: desktop('reports-overview.webp', 'Relatórios com resumo do período, faturação, pedidos, ticket médio e evolução diária', 'Relatórios: o período comparado com o anterior e a evolução dia a dia.'),
  closings: desktop('reports-closings.webp', 'Lista de fechos diários com estado, faturação, pedidos e indicadores de cada dia', 'Fechos diários: o registo de cada dia com faturação, pedidos e clientes.'),
  summaries: desktop('summaries-settings.webp', 'Definição do resumo do dia no WhatsApp com números, hora do fecho e exemplo da mensagem', 'Resumo do dia no WhatsApp: números que recebem, hora do fecho e exemplo da mensagem.'),
  team: desktop('team.webp', 'Gestão da equipa com membros, papel na organização e acesso por unidade', 'Equipa: cada pessoa com a sua função em cada unidade.'),
  audit: desktop('audit.webp', 'Trilha de alterações da auditoria com filtros e ações registadas por utilizador e hora', 'Auditoria: quem fez o quê, e quando, com filtros por âmbito, tipo de ação e datas.', 1600, 830),
  guides: desktop('guides.webp', 'Ajuda e guias com o próximo passo, objetivos com progresso e guias por secção', 'Ajuda e guias: o próximo passo, objetivos com progresso e guias por secção.'),
  loyalty: desktop('loyalty-overview.webp', 'Visão geral do clube de fidelidade com clientes no clube, pontos emitidos, recompensas utilizadas e próximas ações', 'Clube de fidelidade: clientes no clube, pontos emitidos, últimas compras com pontos e próximas ações.'),
  onlineAdmin: desktop('online-ordering-admin.webp', 'Administração da página de pedidos online com aparência e pré-visualização no telemóvel', 'Pedidos online no Cenlo: aparência da página e pré-visualização tal como o cliente a vê.'),
} satisfies Record<string, Shot>

export const SCREENSHOTS: Partial<Record<ModuleId, Shot[]>> = {
  'orders-core': [S.orders, S.orderDetail, S.home],
  'whatsapp-assistant': [S.conversations],
  'kitchen-display': [S.kitchen],
  'auto-printing': [S.printing, S.orderDetail],
  'ordering-site': [S.online, S.onlineMenu, S.onlineItem, S.onlineAdmin, S.siteEditor, S.sitePublic],
  'counter-phone': [S.manual, S.orders],
  'scheduled-orders': [S.scheduled, S.scheduling],
  'table-service': [S.tables, S.mesaHome, S.mesaMenu],
  'delivery-zones': [S.zones, S.radius],
  'delivery-radius': [S.radius, S.online],
  'cenlo-delivery': [S.deliveries, S.driver],
  'customer-updates': [S.tracking, S.conversations],
  'promotions': [S.promotions, S.promotionForm],
  'customer-crm': [S.customer, S.customers],
  'customer-reactivation': [S.reactivate],
  'loyalty': [S.loyalty],
  'cenlo-intelligence': [S.intelligence],
  'forecasting': [S.forecast],
  'insights-recommendations': [S.insights, S.intelligence],
  'reports': [S.reports, S.insights],
  'closings-summaries': [S.summaries, S.closings],
  'multi-store': [S.team],
  'team-permissions': [S.team],
  'audit-trail': [S.audit],
  'help-training': [S.guides],
}

export const HERO_SHOTS = { main: S.kitchen, side: S.onlineMenu }

export function shotsFor(id: ModuleId): Shot[] {
  return SCREENSHOTS[id] ?? []
}
