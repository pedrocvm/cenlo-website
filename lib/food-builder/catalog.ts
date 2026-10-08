export const CATALOG_VERSION = '2026-10-08.3'

export const GROUPS = [
  { id: 'operations', title: 'Atendimento e operação', intro: 'Do primeiro contacto ao pedido pronto: tudo entra no mesmo sítio e chega à cozinha sem ser copiado à mão.' },
  { id: 'channels', title: 'Canais e formatos de venda', intro: 'O cliente pede onde lhe dá jeito: na página da marca, ao balcão, por telefone, para mais tarde ou à mesa. A operação vê tudo no mesmo ecrã.' },
  { id: 'delivery', title: 'Entregas e experiência do cliente', intro: 'Regras de entrega claras, estafetas organizados e o cliente a saber em que ponto está o pedido sem ter de perguntar.' },
  { id: 'revenue', title: 'Receita e relacionamento', intro: 'Quem já comprou é a forma mais barata de vender outra vez. Estes módulos ajudam a conhecer, recuperar e recompensar os seus clientes.' },
  { id: 'intelligence', title: 'Inteligência e gestão', intro: 'Os pedidos do dia a dia transformados em números, padrões e alertas que ajudam a decidir o que fazer a seguir.' },
  { id: 'structure', title: 'Estrutura e controlo', intro: 'Para operações com várias pessoas ou várias lojas: acessos certos para cada função, registo do que muda e apoio para quem está a começar.' },
] as const

export type GroupId = (typeof GROUPS)[number]['id']

export type IconName =
  | 'orders' | 'chat' | 'kitchen' | 'printer' | 'globe' | 'counter' | 'calendar' | 'table'
  | 'map' | 'radius' | 'scooter' | 'bell' | 'tag' | 'users' | 'refresh' | 'star'
  | 'spark' | 'trend' | 'bulb' | 'chart' | 'receipt' | 'stores' | 'shield' | 'history' | 'help'

export type Tier = 'base' | 'premium' | 'optional'

export const TIER_LABELS: Record<Tier, string> = {
  base: 'Incluído na base',
  premium: 'Premium',
  optional: 'Opcional',
}

export type Module = {
  id: string
  slug: string
  group: GroupId
  title: string
  icon: IconName
  tier: Tier
  promise: string
  summary: string
  problem: string[]
  flow: string[]
  deliverables: { title: string; text: string }[]
  fit: string[]
  productArea?: string
}

const modules = [
  {
    id: 'orders-core',
    slug: 'nucleo-de-pedidos',
    group: 'operations',
    title: 'Núcleo de Pedidos',
    icon: 'orders',
    tier: 'base',
    promise: 'Todos os pedidos num só ecrã, do momento em que entram até serem entregues.',
    summary: 'Centraliza os pedidos de todos os canais com cliente, origem, valores e estado. É a base de qualquer configuração Cenlo Food.',
    problem: [
      'Quando os pedidos chegam por mensagens, chamadas e papéis soltos, alguém tem de os juntar à mão. É aí que se perdem moradas, se trocam sabores e se esquece um pedido que ficou numa conversa por responder.',
      'Sem um registo único, também não há forma fiável de saber quantos pedidos houve, quanto se faturou ou o que foi alterado depois de confirmado.',
    ],
    flow: [
      'O pedido entra pelo canal que o cliente escolheu: WhatsApp, página de pedidos, balcão, telefone ou mesa.',
      'Fica registado com referência, cliente, tipo (entrega, recolha ou mesa), itens e total, com a origem identificada.',
      'A equipa acompanha o estado: Recebido, Em preparação, Pronto, Saiu para entrega e Entregue.',
      'Se for preciso alterar um pedido, a alteração exige um motivo e fica guardada no histórico do pedido.',
    ],
    deliverables: [
      { title: 'Lista de pedidos com filtros', text: 'Filtre por estado e por tipo, procure por nome ou telefone e veja de onde veio cada pedido: WhatsApp, Site, Pedidos online, Balcão ou Telefone.' },
      { title: 'Indicadores do dia', text: 'Pedidos em curso, pedidos de hoje, faturação e ticket médio do dia no topo da lista.' },
      { title: 'Detalhe completo do pedido', text: 'Cliente e entrega, itens, pagamento, taxa de entrega, contribuinte e promoção aplicada, com o histórico de estados.' },
      { title: 'Alterações rastreáveis', text: 'Cada edição pede um motivo e mostra o que mudou entre versões do pedido.' },
      { title: 'Página inicial da operação', text: 'Pedidos por hora, conversas a precisar de resposta e os últimos pedidos, num resumo para quem gere o turno.' },
    ],
    fit: [
      'Qualquer operação Cenlo Food: é a base sobre a qual os outros módulos funcionam.',
      'Negócios que hoje dependem de cadernos, folhas de cálculo ou capturas de ecrã para saber o que há para fazer.',
    ],
  },
  {
    id: 'whatsapp-assistant',
    slug: 'assistente-whatsapp',
    group: 'operations',
    title: 'Assistente de WhatsApp',
    icon: 'chat',
    tier: 'base',
    promise: 'O cliente faz o pedido a conversar no WhatsApp e o pedido chega estruturado à operação.',
    summary: 'Um assistente que conhece o seu cardápio, monta o pedido com o cliente, confirma o resumo e passa a conversa a uma pessoa quando é preciso.',
    problem: [
      'Nas horas de maior movimento, responder a cada mensagem, confirmar sabores, calcular a entrega e copiar tudo para a cozinha ocupa uma pessoa inteira. Quando ninguém consegue responder, o cliente desiste.',
      'E quando o pedido é passado à mão da conversa para a cozinha, os erros aparecem: o tamanho errado, a morada incompleta, o extra esquecido.',
    ],
    flow: [
      'O cliente escreve para o número da loja como sempre fez.',
      'O assistente consulta o cardápio, os preços, o horário e as zonas de entrega da loja e vai montando o pedido com o cliente.',
      'Antes de confirmar, envia o resumo do pedido com os valores calculados pelo Cenlo, não pelo assistente.',
      'Confirmado o pedido, ele entra em Pedidos e na Cozinha. Se o cliente pedir uma pessoa, reclamar ou houver uma dúvida de alergia, a conversa passa para a equipa.',
    ],
    deliverables: [
      { title: 'Atendimento com o seu cardápio', text: 'O assistente trabalha com os produtos, tamanhos, extras, horários e zonas configurados na loja, e pode ajustar um pedido já confirmado.' },
      { title: 'Valores sempre calculados pelo sistema', text: 'Os preços e totais vêm do motor de preços do Cenlo. O assistente só mostra valores que o sistema forneceu.' },
      { title: 'Passagem para uma pessoa com contexto', text: 'Quando a conversa passa para a equipa, aparece o motivo e o histórico completo. A equipa responde na mesma conversa, a partir do Cenlo.' },
      { title: 'Caixa de conversas', text: 'Conversas em aberto, a precisar de atenção e todas as anteriores, com o pedido detetado e a ficha do cliente ao lado.' },
    ],
    fit: [
      'Negócios onde o WhatsApp já é o principal canal de pedidos.',
      'Equipas pequenas que perdem pedidos nas horas de ponta por não conseguirem responder a tempo.',
    ],
  },
  {
    id: 'kitchen-display',
    slug: 'kds-cozinha',
    group: 'operations',
    title: 'Ecrã de Cozinha (KDS)',
    icon: 'kitchen',
    tier: 'base',
    promise: 'A cozinha vê cada pedido confirmado, por etapa, sem ninguém ter de o ditar.',
    summary: 'Um quadro de produção com colunas por estado e o tempo de espera de cada pedido sempre visível.',
    problem: [
      'Quando os pedidos chegam à cozinha por papel ou de viva voz, perde-se a noção de há quanto tempo cada um está à espera e em que ponto está.',
      'Alterações e cancelamentos que chegam depois de a preparação começar são os que mais custam, e são os mais fáceis de não chegarem à cozinha.',
    ],
    flow: [
      'O pedido confirmado aparece na coluna Recebido.',
      'A equipa move-o para Em preparação, Pronto e Saiu para entrega, arrastando o cartão ou pelo teclado.',
      'O tempo decorrido em cada cartão muda de cor aos 20 e aos 40 minutos.',
      'Se o cliente cancelar ou alterar, a cozinha recebe um aviso destacado para confirmar que viu.',
    ],
    deliverables: [
      { title: 'Quadro por etapas', text: 'Colunas Recebido, Em preparação, Pronto e Saiu para entrega, com o número de pedidos ativos.' },
      { title: 'Tempo de espera visível', text: 'Cada cartão mostra há quanto tempo o pedido entrou e muda de cor quando começa a atrasar.' },
      { title: 'Filtros e modo foco', text: 'Separe entregas, recolhas e mesas, e use o Modo foco para trabalhar só com o quadro.' },
      { title: 'Avisos de cancelamento e alteração', text: 'Pedidos cancelados ou alterados aparecem com um alerta que a cozinha tem de confirmar.' },
    ],
    fit: [
      'Cozinhas com vários pedidos em simultâneo nas horas de ponta.',
      'Operações onde quem atende e quem prepara não estão no mesmo sítio.',
    ],
  },
  {
    id: 'auto-printing',
    slug: 'impressao-automatica',
    group: 'operations',
    title: 'Impressão Automática',
    icon: 'printer',
    tier: 'optional',
    promise: 'A comanda sai na impressora da cozinha assim que o pedido é confirmado.',
    summary: 'O Cenlo Print Agent liga o Cenlo à impressora térmica da loja, com fila, monitorização e recuperação de falhas.',
    problem: [
      'Muitas cozinhas trabalham com papel e não querem deixar de o fazer. Imprimir à mão cada pedido que chega por mensagem é mais um passo que falha quando há pressa.',
      'Pior do que uma comanda que não sai é uma comanda que sai duas vezes e é preparada em dobro.',
    ],
    flow: [
      'Instala o Cenlo Print Agent no computador da loja (Windows ou macOS) e associa-o ao Cenlo com um código.',
      'Faz uma impressão de teste a partir das definições de impressão.',
      'Cada pedido confirmado gera uma comanda. Alterações imprimem só o que mudou e cancelamentos imprimem um aviso.',
      'No Cenlo vê o estado do computador, o último teste e a fila de impressão, e pode reimprimir quando for preciso.',
    ],
    deliverables: [
      { title: 'Cenlo Print Agent', text: 'Aplicação para o computador da loja que recebe os trabalhos e imprime em impressoras térmicas.' },
      { title: 'Comandas de pedido, alteração e cancelamento', text: 'A cozinha recebe em papel o pedido inicial, só as alterações quando existem e o aviso de cancelamento.' },
      { title: 'Fila guardada e recuperação', text: 'Os trabalhos ficam guardados no computador e são retomados se o agente for reiniciado.' },
      { title: 'Sem impressões duplicadas', text: 'Quando não há certeza de que algo foi impresso, o agente não reimprime sozinho: fica à espera de uma decisão da equipa.' },
      { title: 'Estado à vista', text: 'Computador ligado ou offline, último teste e trabalhos a precisar de atenção, nas definições do Cenlo.' },
    ],
    fit: [
      'Cozinhas que trabalham com comandas em papel.',
      'Operações onde ninguém pode ficar dedicado a imprimir pedidos durante o serviço.',
    ],
  },
  {
    id: 'ordering-site',
    slug: 'site-de-pedidos',
    group: 'channels',
    title: 'Site de Pedidos',
    icon: 'globe',
    tier: 'premium',
    promise: 'Um canal próprio da marca onde o cliente vê o cardápio e faz o pedido diretamente.',
    summary: 'Página de pedidos online e site da marca, ligados ao cardápio e aos pedidos do Cenlo, sem uma operação à parte.',
    problem: [
      'Um site que não está ligado ao resto da operação passa a ser mais um sítio onde atualizar preços e mais um canal de onde copiar pedidos.',
      'Sem um canal próprio, a marca depende de mensagens para tudo, mesmo para o cliente que só quer escolher e pedir.',
    ],
    flow: [
      'O cliente abre a página de pedidos da loja, escolhe os produtos, tamanhos e extras e vê o total.',
      'Indica se quer entrega ou levantamento. Na entrega, a morada define a cobertura e a taxa.',
      'O pedido entra diretamente no Cenlo, com origem identificada.',
      'O cliente recebe uma página para acompanhar o pedido, onde pode alterar ou cancelar enquanto a preparação não começou.',
    ],
    deliverables: [
      { title: 'Página de pedidos online', text: 'Cardápio por categorias, escolha de tamanhos e adicionais, carrinho, entrega ou levantamento e possibilidade de agendar.' },
      { title: 'Acompanhamento do pedido', text: 'Página privada com o estado do pedido, onde o cliente pode pedir alterações ou cancelar antes da preparação.' },
      { title: 'Site da marca', text: 'Site de uma página com o cardápio, editado no Cenlo com pré-visualização ao vivo em computador e telemóvel.' },
      { title: 'Um só cardápio', text: 'Produtos e preços vêm do cardápio do Cenlo. O que muda lá, muda no canal.' },
    ],
    fit: [
      'Marcas que querem um canal direto para divulgar nas redes sociais, na bio do Instagram ou no Google.',
      'Negócios com clientes que preferem escolher com calma em vez de conversar.',
    ],
  },
  {
    id: 'counter-phone',
    slug: 'balcao-e-telefone',
    group: 'channels',
    title: 'Balcão e Telefone',
    icon: 'counter',
    tier: 'base',
    promise: 'Pedidos feitos ao balcão ou por telefone entram no mesmo sistema que os digitais.',
    summary: 'Registo manual de pedidos com o mesmo cardápio, regras de entrega e pagamento dos outros canais.',
    problem: [
      'Se os pedidos digitais estão organizados mas os de telefone continuam num bloco de notas, a cozinha volta a ter duas filas e o dono volta a ter números incompletos.',
    ],
    flow: [
      'Em Pedidos, a equipa carrega em Novo pedido e indica a origem: Balcão ou Telefone.',
      'Regista o telemóvel do cliente e escolhe os itens do cardápio, incluindo variações e meio a meio.',
      'Escolhe recolha ou entrega. Na entrega, o código postal define a zona e a taxa.',
      'Indica o pagamento e se o pedido é para agora ou agendado. O pedido segue para a cozinha como os outros.',
    ],
    deliverables: [
      { title: 'Novo pedido em poucos toques', text: 'Pesquisa de itens, categorias e montagem de produtos com variações, extras e meio a meio.' },
      { title: 'Entrega com as mesmas regras', text: 'A zona e a taxa de entrega são calculadas a partir do código postal, como nos canais digitais.' },
      { title: 'Pagamento e contribuinte', text: 'Dinheiro com troco, cartão ou MB WAY, e NIF opcional.' },
      { title: 'Origem identificada', text: 'Os pedidos aparecem marcados como Balcão ou Telefone na lista e nos relatórios.' },
    ],
    fit: [
      'Negócios onde o telefone e o balcão ainda são uma parte relevante das vendas.',
      'Operações que querem ver todos os pedidos e números num só sítio.',
    ],
  },
  {
    id: 'scheduled-orders',
    slug: 'pedidos-agendados',
    group: 'channels',
    title: 'Pedidos Agendados',
    icon: 'calendar',
    tier: 'optional',
    promise: 'Aceite encomendas para mais tarde sem as misturar com a produção do momento.',
    summary: 'Pedidos para uma data e hora futuras ficam à parte e só entram na cozinha quando chega a altura.',
    problem: [
      'Uma encomenda para sábado que aparece na cozinha na quarta-feira atrapalha quem está a preparar os pedidos de agora. E uma encomenda esquecida até à hora de entrega é um cliente perdido.',
    ],
    flow: [
      'O cliente escolhe uma data e hora no WhatsApp ou na página de pedidos, ou a equipa agenda um pedido manual.',
      'O pedido fica no separador Agendados, agrupado em Atrasados, Hoje, Amanhã e Próximos dias.',
      'Na altura certa, o pedido é libertado para a cozinha. A equipa também pode reagendar ou enviá-lo de imediato.',
    ],
    deliverables: [
      { title: 'Separador de agendados', text: 'Vista própria na Cozinha com os pedidos futuros e os que estão quase a entrar.' },
      { title: 'Regras de agendamento', text: 'Recolha e entrega agendadas, antecedência mínima, limite de pedidos por dia ou intervalo e dias encerrados.' },
      { title: 'Encomendas grandes com confirmação', text: 'Pedidos acima de um limite ficam a aguardar confirmação da loja.' },
      { title: 'Reagendar ou antecipar', text: 'Ações para mudar a hora ou enviar o pedido para a cozinha imediatamente.' },
    ],
    fit: [
      'Negócios com encomendas para eventos, almoços de empresa ou fins de semana.',
      'Pastelarias, padarias e cozinhas que preparam por encomenda.',
    ],
  },
  {
    id: 'table-service',
    slug: 'atendimento-de-mesa',
    group: 'channels',
    title: 'Atendimento de Mesa',
    icon: 'table',
    tier: 'premium',
    productArea: 'table_service',
    promise: 'O cliente vê o cardápio e pede à mesa pelo telemóvel, e a equipa mantém o controlo.',
    summary: 'Sessões por mesa com código QR, cardápio no telemóvel, pedidos aprovados pela equipa e botão para chamar o empregado.',
    problem: [
      'Na sala, o tempo perde-se à espera de alguém para pedir, para trazer água ou para pedir a conta. E os pedidos de sala costumam viver num sistema diferente dos de entrega.',
    ],
    flow: [
      'Cada mesa tem o seu código QR. O cliente lê o código e a equipa admite o telemóvel na mesa.',
      'O cliente consulta o cardápio e faz o pedido. A equipa aprova antes de seguir para a cozinha.',
      'Na cozinha, o pedido aparece identificado com o número da mesa.',
      'O cliente pode chamar o empregado indicando o motivo: problema com um item, água, conta ou ajuda.',
    ],
    deliverables: [
      { title: 'Vista da sala', text: 'Mesas e sessões abertas, fechadas pela equipa ou automaticamente no fecho do dia.' },
      { title: 'Códigos QR por mesa', text: 'Códigos prontos a imprimir e aparência da página da mesa ajustada à marca.' },
      { title: 'Pedido à mesa com aprovação', text: 'O cliente pede pelo telemóvel e a equipa confirma antes de o pedido chegar à cozinha.' },
      { title: 'Chamar o empregado', text: 'Pedidos de atenção com motivo, para a equipa saber o que levar antes de ir à mesa.' },
    ],
    fit: [
      'Restaurantes com sala e serviço à mesa.',
      'Espaços que querem acelerar o pedido sem deixar de ter a equipa a controlar o que entra na cozinha.',
    ],
  },
  {
    id: 'delivery-zones',
    slug: 'entregas-por-zonas',
    group: 'delivery',
    title: 'Entregas por Zonas',
    icon: 'map',
    tier: 'base',
    promise: 'Cada zona com a sua taxa, definida por código postal.',
    summary: 'Configure as zonas que serve e a taxa de cada uma. O Cenlo aplica-as em todos os canais.',
    problem: [
      'Calcular a taxa de entrega de cabeça, mensagem a mensagem, leva a valores diferentes para a mesma rua e a entregas aceites fora da área.',
    ],
    flow: [
      'Cria as zonas de entrega no cardápio, com nome, taxa, códigos postais e tempo de deslocação.',
      'Quando o cliente indica a morada, o código postal define a zona e a taxa.',
      'Com a validação automática ligada, o site e o WhatsApp pedem o código postal e confirmam a zona sozinhos.',
    ],
    deliverables: [
      { title: 'Zonas com taxa própria', text: 'Lista de zonas com o valor de entrega de cada uma, editável a qualquer momento.' },
      { title: 'Códigos postais', text: 'Zonas definidas por código postal com quatro ou sete dígitos. O mais específico prevalece.' },
      { title: 'Validação automática', text: 'O site e o assistente confirmam a zona e a taxa antes de fechar o pedido.' },
      { title: 'Pedido mínimo', text: 'Valor mínimo de encomenda para entrega definido nas definições de entrega e pagamentos.' },
    ],
    fit: [
      'Negócios que entregam numa cidade ou região conhecida, dividida por bairros ou freguesias.',
    ],
  },
  {
    id: 'delivery-radius',
    slug: 'entregas-por-raio',
    group: 'delivery',
    title: 'Entregas por Raio',
    icon: 'radius',
    tier: 'optional',
    promise: 'A cobertura e a taxa definidas pela distância real até à morada do cliente.',
    summary: 'Faixas de distância a partir da morada da loja, com uma taxa por faixa e um raio máximo de entrega.',
    problem: [
      'Quando a área de entrega não segue os códigos postais, ou as zonas ficam demasiado grandes, a distância é a regra mais justa para a loja e para o cliente.',
    ],
    flow: [
      'Indica a morada da loja e localiza-a no mapa.',
      'Cria faixas de distância, por exemplo até 3 km e até 6 km, cada uma com a sua taxa. A última faixa é o raio máximo.',
      'Quando o cliente indica a morada, o Cenlo mede a distância e aplica a faixa correspondente.',
    ],
    deliverables: [
      { title: 'Localização da loja', text: 'Morada da loja localizada no mapa como ponto de partida.' },
      { title: 'Faixas de distância', text: 'Taxa por faixa de quilómetros, com o raio máximo de entrega.' },
      { title: 'Junto com as zonas', text: 'O raio aplica-se às moradas que não pertencem a nenhuma zona configurada.' },
    ],
    fit: [
      'Negócios em zonas suburbanas ou rurais, onde os códigos postais cobrem áreas muito grandes.',
      'Operações que querem cobrar a entrega de acordo com a distância.',
    ],
  },
  {
    id: 'cenlo-delivery',
    slug: 'cenlo-delivery',
    group: 'delivery',
    title: 'Cenlo Delivery',
    icon: 'scooter',
    tier: 'premium',
    productArea: 'delivery_management',
    promise: 'Os seus estafetas ligados aos pedidos, da atribuição à entrega.',
    summary: 'Atribuição de entregas, aplicação para estafetas no telemóvel e um painel para acompanhar as saídas em tempo real.',
    problem: [
      'Sem ligação entre a cozinha e os estafetas, alguém tem de avisar quando o pedido está pronto, ditar a morada e perguntar se já foi entregue.',
    ],
    flow: [
      'A loja atribui a entrega a um estafeta, ou organiza as saídas no painel de entregas.',
      'O estafeta vê no telemóvel as entregas a preparar, prontas para sair e em curso, com morada, mapa e contacto do cliente.',
      'Marca a saída e a entrega. O estado do pedido atualiza-se no Cenlo.',
      'No painel, a loja acompanha as saídas em curso e cada paragem.',
    ],
    deliverables: [
      { title: 'Aplicação do estafeta', text: 'Entregas por estado, abrir no mapa, ligar ao cliente, marcar a saída e a entrega.' },
      { title: 'Atribuição de estafetas', text: 'Escolha quem leva cada pedido a partir do Cenlo.' },
      { title: 'Painel de entregas ao vivo', text: 'Saídas em curso, paragens, regras de despacho, estafetas e mapa.' },
      { title: 'Acompanhamento no mapa', text: 'Localização das entregas em curso e acompanhamento para o cliente.' },
    ],
    fit: [
      'Negócios com estafetas próprios.',
      'Operações com várias entregas em simultâneo que querem organizar as saídas.',
    ],
  },
  {
    id: 'customer-updates',
    slug: 'atualizacoes-automaticas',
    group: 'delivery',
    title: 'Atualizações Automáticas',
    icon: 'bell',
    tier: 'base',
    promise: 'O cliente sabe em que ponto está o pedido sem ter de perguntar.',
    summary: 'Mensagens automáticas no WhatsApp quando o pedido entra em preparação, fica pronto, sai para entrega e é entregue.',
    problem: [
      'A pergunta "Então, o meu pedido?" chega sempre na pior altura. Cada resposta interrompe quem está a atender ou a preparar.',
    ],
    flow: [
      'A equipa move o pedido na Cozinha, como já faz.',
      'O cliente recebe no WhatsApp a mensagem correspondente: em preparação, pronto, saiu para entrega ou entregue.',
      'Nos pedidos feitos pela página de pedidos, a mensagem inclui o link de acompanhamento.',
      'Depois da entrega, a mensagem pode convidar a deixar uma avaliação no Google.',
    ],
    deliverables: [
      { title: 'Mensagens por estado', text: 'Em preparação, pronto, saiu para entrega, entregue e cancelado, enviadas pelo WhatsApp da loja.' },
      { title: 'Link de acompanhamento', text: 'Página com a linha do tempo do pedido, para pedidos feitos online com autorização do cliente.' },
      { title: 'Controlo do aviso de pronto', text: 'A mensagem de pedido pronto pode ser desligada nas definições.' },
    ],
    fit: [
      'Negócios com muitas entregas e recolhas, onde as perguntas sobre o estado do pedido ocupam a equipa.',
    ],
  },
  {
    id: 'promotions',
    slug: 'promocoes',
    group: 'revenue',
    title: 'Promoções',
    icon: 'tag',
    tier: 'premium',
    promise: 'Campanhas com regras que o próprio sistema aplica, em todos os canais.',
    summary: 'Entrega grátis, percentagem, valor fixo e leve X pague Y, com produtos, canais e datas definidos.',
    problem: [
      'Uma promoção anunciada nas redes sociais mas aplicada à mão gera descontos esquecidos, valores diferentes de pedido para pedido e discussões com clientes.',
    ],
    flow: [
      'Escolhe o benefício: entrega grátis, percentagem, valor fixo ou leve X, pague Y.',
      'Define o que participa (tudo, categorias, produtos ou sabores), onde vale e quando vale.',
      'O Cenlo aplica a promoção no cálculo do pedido nos canais escolhidos.',
      'A promoção passa por Agendada, Ativa, Pausada e Encerrada, e fica registada em cada pedido.',
    ],
    deliverables: [
      { title: 'Quatro tipos de benefício', text: 'Entrega grátis, desconto em percentagem, desconto de valor fixo e leve X, pague Y.' },
      { title: 'Canais à escolha', text: 'Site, link de pedidos, assistente de WhatsApp, mesa, balcão e telefone.' },
      { title: 'Limites e condições', text: 'Desconto máximo, subtotal mínimo, número de utilizações por pedido e combinação com outras promoções.' },
      { title: 'Calendário', text: 'Datas de início e fim, com promoções agendadas para entrarem sozinhas.' },
    ],
    fit: [
      'Negócios que fazem campanhas regulares, como dias da semana mais fracos ou datas especiais.',
    ],
  },
  {
    id: 'customer-crm',
    slug: 'crm-de-clientes',
    group: 'revenue',
    title: 'CRM de Clientes',
    icon: 'users',
    tier: 'base',
    promise: 'Cada cliente com o seu histórico, frequência, ticket e pedido habitual.',
    summary: 'A base de clientes é construída a partir dos pedidos, sem ninguém ter de a preencher.',
    problem: [
      'A maior parte dos negócios de comida conhece os clientes de cara, mas não sabe quantos tem, quem deixou de aparecer ou o que cada um costuma pedir.',
    ],
    flow: [
      'Cada pedido associa-se ao cliente pelo número de telefone.',
      'A ficha reúne o histórico de pedidos, o total gasto e os favoritos.',
      'O Cenlo calcula os hábitos do cliente: de quanto em quanto tempo pede, os dias e o horário habitual.',
      'A equipa pode corrigir o pedido habitual, e o assistente passa a usar essa correção.',
    ],
    deliverables: [
      { title: 'Lista de clientes', text: 'Clientes registados, novos nos últimos 30 dias, número de pedidos, ticket médio e último contacto.' },
      { title: 'Ficha do cliente', text: 'Histórico de pedidos, total histórico, favoritos e pedido habitual.' },
      { title: 'Hábitos do cliente', text: 'Frequência de compra, pedidos por dia da semana e horário habitual.' },
      { title: 'Hábitos da loja', text: 'Itens mais pedidos e dias e horários de pico para toda a base.' },
    ],
    fit: [
      'Negócios com clientes recorrentes que querem conhecê-los melhor.',
      'Quem quer preparar campanhas a partir de dados reais.',
    ],
  },
  {
    id: 'customer-reactivation',
    slug: 'reativacao-de-clientes',
    group: 'revenue',
    title: 'Reativação de Clientes',
    icon: 'refresh',
    tier: 'premium',
    promise: 'Saiba quem deixou de comprar e traga-o de volta com o pedido de sempre.',
    summary: 'Lista de clientes a reativar, mensagem sugerida com o pedido habitual e envio manual ou automático.',
    problem: [
      'Um cliente que pedia todas as semanas e deixou de pedir raramente avisa. Sem uma lista, só se nota quando já passou demasiado tempo.',
    ],
    flow: [
      'O Cenlo identifica os clientes que não pedem há mais de 14 dias.',
      'No separador A reativar, a equipa vê o potencial de retorno e uma mensagem sugerida com o pedido habitual de cada cliente.',
      'Pode reativar um cliente de cada vez ou preparar uma campanha para vários.',
      'Com a reativação automática ligada, o Cenlo envia a mensagem depois de um número de dias sem pedidos, no máximo uma vez por período de inatividade.',
    ],
    deliverables: [
      { title: 'Lista de clientes a reativar', text: 'Clientes sem pedidos recentes, com o potencial de retorno.' },
      { title: 'Mensagem com o pedido habitual', text: 'Sugestão de mensagem personalizada com o que o cliente costuma pedir.' },
      { title: 'Campanha para vários clientes', text: 'Preparação de uma campanha de reativação para um grupo de clientes.' },
      { title: 'Reativação automática', text: 'Envio automático configurável, sem repetir a mensagem ao mesmo cliente no mesmo período.' },
    ],
    fit: [
      'Negócios com uma base de clientes recorrentes.',
      'Operações com dias mais fracos que querem estimular a recompra.',
    ],
  },
  {
    id: 'loyalty',
    slug: 'fidelizacao',
    group: 'revenue',
    title: 'Fidelização',
    icon: 'star',
    tier: 'premium',
    productArea: 'loyalty',
    promise: 'Um clube próprio da marca para recompensar quem volta.',
    summary: 'Programa de pontos com recompensas, missões e campanhas, materiais QR e NFC e resultados medidos.',
    problem: [
      'Cartões de carimbos perdem-se, não dizem nada sobre o cliente e não se ligam ao resto da operação.',
    ],
    flow: [
      'O cliente entra no clube da marca e passa a acumular pontos nas compras.',
      'Compras feitas fora do Cenlo podem ser registadas com o código QR do talão.',
      'A loja define recompensas, missões e campanhas.',
      'Nos resultados, acompanha os pontos emitidos e reservados e o envolvimento dos clientes.',
    ],
    deliverables: [
      { title: 'Clube da marca', text: 'Página pública do clube, com a identidade da sua marca.' },
      { title: 'Recompensas, missões e campanhas', text: 'Mecanismos para incentivar a próxima compra.' },
      { title: 'Materiais QR e NFC', text: 'Materiais para divulgar o clube na loja.' },
      { title: 'Simulador de margem', text: 'Ferramenta para avaliar o custo das recompensas antes de as lançar.' },
    ],
    fit: [
      'Marcas com clientes frequentes que querem dar-lhes um motivo para voltar.',
      'Negócios com várias unidades que querem um programa comum.',
    ],
  },
  {
    id: 'cenlo-intelligence',
    slug: 'cenlo-intelligence',
    group: 'intelligence',
    title: 'Cenlo Intelligence',
    icon: 'spark',
    tier: 'optional',
    productArea: 'intelligence',
    promise: 'Padrões de compra e comportamento dos clientes, explicados em linguagem simples.',
    summary: 'Análise da base ativa, clientes em risco, recompra próxima e clientes inativos a partir do histórico real.',
    problem: [
      'Os dados existem nos pedidos, mas ninguém tem tempo para os analisar. O resultado é decidir por intuição, mesmo quando os números diziam outra coisa.',
    ],
    flow: [
      'O Cenlo analisa o histórico de pedidos e clientes da loja.',
      'Na visão geral, resume o que está a acontecer: clientes ativos, a afastar-se e inativos.',
      'Na vista de clientes, cada cliente tem segmento, risco, cadência e a próxima janela provável de compra.',
      'Um separador de qualidade dos dados mostra se há histórico suficiente para confiar nas análises.',
    ],
    deliverables: [
      { title: 'Resumo do momento', text: 'Base ativa, clientes em risco, recompra próxima e clientes inativos.' },
      { title: 'Análise por cliente', text: 'Segmento, risco, cadência e próxima janela de compra.' },
      { title: 'Produtos', text: 'Tendências dos produtos ao longo do tempo.' },
      { title: 'Qualidade dos dados', text: 'Indicação clara de quando ainda não há dados suficientes.' },
    ],
    fit: [
      'Negócios com algum histórico de pedidos que querem perceber o comportamento dos clientes.',
    ],
  },
  {
    id: 'forecasting',
    slug: 'previsoes',
    group: 'intelligence',
    title: 'Previsões',
    icon: 'trend',
    tier: 'optional',
    promise: 'Uma estimativa dos próximos dias para preparar equipa e stock.',
    summary: 'Previsão de pedidos e de faturação a partir do histórico, com o nível de confiança à vista.',
    problem: [
      'Preparar a mais desperdiça produto. Preparar a menos deixa clientes à espera. Sem previsão, a decisão depende da memória de quem está no turno.',
    ],
    flow: [
      'O Cenlo testa vários modelos de previsão com o histórico da loja e escolhe o que melhor acertou no passado.',
      'Mostra a previsão de pedidos e de faturação para os próximos dias.',
      'Indica a confiança da previsão e avisa quando os dados ainda são insuficientes.',
    ],
    deliverables: [
      { title: 'Previsão de pedidos', text: 'Estimativa de pedidos para os próximos dias.' },
      { title: 'Previsão de faturação', text: 'Estimativa de faturação para o mesmo período.' },
      { title: 'Confiança à vista', text: 'Comparação com uma referência simples e indicação do nível de confiança.' },
    ],
    fit: [
      'Operações com variações fortes entre dias e semanas.',
      'Negócios que preparam massa, produto ou equipa com antecedência.',
    ],
  },
  {
    id: 'insights-recommendations',
    slug: 'insights-e-recomendacoes',
    group: 'intelligence',
    title: 'Insights e Recomendações',
    icon: 'bulb',
    tier: 'optional',
    promise: 'Alertas com evidência sobre o que mudou e o que vale a pena fazer.',
    summary: 'Sinais como um produto que deixou de vender ou um dia consistentemente fraco, com a evidência e uma sugestão de ação.',
    problem: [
      'Um produto popular que deixou de sair, por estar esgotado ou escondido no cardápio, pode passar semanas sem ninguém notar.',
    ],
    flow: [
      'O Cenlo verifica regras sobre os dados da loja: quebras de faturação, dias fracos, conversas abandonadas, clientes recorrentes em risco e produtos parados.',
      'Cada insight mostra a evidência que o originou.',
      'As recomendações sugerem uma ação, como uma promoção no dia mais fraco ou reforçar a equipa num pico previsto.',
      'A equipa marca como visto, resolve, regista como feito ou ignora.',
    ],
    deliverables: [
      { title: 'Insights com evidência', text: 'Cada alerta mostra os números que o justificam e um atalho para agir.' },
      { title: 'Recomendações acionáveis', text: 'Sugestões ligadas a previsões, dias fracos e clientes a lembrar.' },
      { title: 'Seguimento', text: 'Estados para registar o que foi visto, feito ou ignorado.' },
    ],
    fit: [
      'Donos e gestores que não têm tempo para analisar relatórios e querem saber o que merece atenção.',
    ],
  },
  {
    id: 'reports',
    slug: 'relatorios',
    group: 'intelligence',
    title: 'Relatórios e Desempenho',
    icon: 'chart',
    tier: 'optional',
    productArea: 'reports',
    promise: 'Vendas, pedidos, ticket e recorrência por período, comparados com o anterior.',
    summary: 'Indicadores comerciais e operacionais com evolução diária e produtos mais vendidos.',
    problem: [
      'Saber se a semana correu melhor do que a anterior não devia exigir exportar folhas de cálculo.',
    ],
    flow: [
      'Escolhe o período.',
      'O Cenlo compara com o período anterior e mostra a evolução diária de faturação ou de pedidos.',
      'Os produtos mais vendidos aparecem por item, categoria, variação ou opção.',
    ],
    deliverables: [
      { title: 'Visão geral do período', text: 'Faturação, pedidos e ticket médio comparados com o período anterior.' },
      { title: 'Evolução diária', text: 'Gráfico dia a dia de faturação ou de pedidos.' },
      { title: 'Produtos', text: 'Mais vendidos por item, categoria, variação e opção.' },
      { title: 'Indicadores operacionais', text: 'Clientes novos e recorrentes, conversas abandonadas, atendimento humano e cancelamentos.' },
    ],
    fit: [
      'Qualquer operação que queira acompanhar o desempenho sem montar relatórios à mão.',
    ],
  },
  {
    id: 'closings-summaries',
    slug: 'fechos-e-resumos',
    group: 'intelligence',
    title: 'Fechos e Resumos',
    icon: 'receipt',
    tier: 'base',
    promise: 'O resumo do dia chega ao seu WhatsApp à hora do fecho.',
    summary: 'Fecho diário automático, resumo semanal e histórico de fechos para consulta.',
    problem: [
      'No fim de um dia longo, ninguém quer fazer contas. Mas sem esse registo diário é impossível perceber a evolução do negócio.',
    ],
    flow: [
      'À hora do fecho definida, o Cenlo fecha o dia.',
      'O resumo do dia é enviado para os números de WhatsApp indicados pelo dono, até cinco.',
      'Ao fim da semana, chega um resumo semanal.',
      'Com o módulo Relatórios e Desempenho, os fechos ficam guardados para consulta e podem ser recalculados.',
    ],
    deliverables: [
      { title: 'Fecho diário automático', text: 'O registo oficial de cada dia de operação.' },
      { title: 'Resumo no WhatsApp', text: 'Envio do resumo do dia para até cinco números.' },
      { title: 'Resumo semanal', text: 'O balanço da semana com uma explicação escrita.' },
      { title: 'Histórico de fechos', text: 'Lista de fechos com o estado de cada dia, disponível com o módulo Relatórios e Desempenho.' },
    ],
    fit: [
      'Donos que não estão sempre na loja e querem saber como correu o dia.',
    ],
  },
  {
    id: 'multi-store',
    slug: 'multi-loja',
    group: 'structure',
    title: 'Multi-loja',
    icon: 'stores',
    tier: 'premium',
    productArea: 'organization',
    promise: 'Várias unidades na mesma organização, cada uma com os seus dados.',
    summary: 'Organize as lojas sob a mesma estrutura, compare unidades e mantenha a operação de cada uma separada.',
    problem: [
      'Com mais de uma loja, juntar os números de cada uma e manter a operação separada passa a ser trabalho de escritório.',
    ],
    flow: [
      'A organização reúne as unidades da marca.',
      'Cada loja tem os seus pedidos, cardápio, clientes e equipa.',
      'A equipa troca de loja no menu e a gestão vê a visão geral e compara unidades.',
    ],
    deliverables: [
      { title: 'Organização com várias unidades', text: 'Criação de novas unidades a partir da gestão da equipa.' },
      { title: 'Dados separados por loja', text: 'A operação de cada unidade não se mistura com as outras.' },
      { title: 'Visão da organização', text: 'Indicadores por unidade, relatório e inteligência ao nível da organização.' },
      { title: 'Troca rápida de loja', text: 'Seletor de unidade para quem trabalha em mais de uma loja.' },
    ],
    fit: [
      'Marcas com duas ou mais unidades, ou a preparar a abertura da próxima.',
    ],
  },
  {
    id: 'team-permissions',
    slug: 'equipa-e-permissoes',
    group: 'structure',
    title: 'Equipa e Permissões',
    icon: 'shield',
    tier: 'base',
    promise: 'Cada pessoa da equipa vê e faz apenas o que a sua função precisa.',
    summary: 'Convites, funções definidas para a loja e para a organização, e gestão de acessos.',
    problem: [
      'Partilhar a mesma palavra-passe por toda a equipa significa não saber quem fez o quê e dar a todos acesso a tudo.',
    ],
    flow: [
      'O responsável convida cada pessoa para a loja.',
      'Atribui uma função: Responsável, Gestor, Operador, Cozinha, Analista, Leitor ou Estafeta.',
      'Cada função vê apenas as áreas de que precisa.',
      'Quando alguém sai, o acesso é desativado.',
    ],
    deliverables: [
      { title: 'Convites individuais', text: 'Cada pessoa entra com o seu próprio acesso.' },
      { title: 'Funções por loja', text: 'Sete funções pensadas para a operação, da gestão à cozinha e às entregas.' },
      { title: 'Funções na organização', text: 'Proprietário, Administrador e Membro.' },
      { title: 'Gestão de acessos', text: 'Desativar pessoas e transferir a propriedade.' },
    ],
    fit: [
      'Operações com mais de uma pessoa a usar o Cenlo, sobretudo com cozinha e estafetas.',
    ],
  },
  {
    id: 'audit-trail',
    slug: 'auditoria',
    group: 'structure',
    title: 'Auditoria',
    icon: 'history',
    tier: 'optional',
    productArea: 'audit',
    promise: 'Quem fez o quê, e quando, com os valores antes e depois.',
    summary: 'Trilha de alterações das ações relevantes na plataforma, para consulta pela gestão.',
    problem: [
      'Quando um pedido aparece cancelado ou um preço muda sem explicação, a gestão precisa de saber o que aconteceu sem acusar ninguém.',
    ],
    flow: [
      'As ações relevantes ficam registadas: entradas na conta, publicação do cardápio, cancelamentos e edições de pedidos, entregas e alterações à organização.',
      'Na trilha de alterações, a gestão vê quem fez cada ação, quando e o que mudou.',
    ],
    deliverables: [
      { title: 'Trilha de alterações', text: 'Lista das ações relevantes com autor e data.' },
      { title: 'Antes e depois', text: 'Os valores anteriores e novos de cada alteração.' },
      { title: 'Registo de segurança', text: 'O registo técnico de acessos e segurança existe sempre. Este módulo dá à gestão a consulta da trilha.' },
    ],
    fit: [
      'Operações com equipas maiores ou várias lojas.',
      'Negócios que precisam de rastreabilidade em cancelamentos e alterações.',
    ],
  },
  {
    id: 'help-training',
    slug: 'ajuda-e-formacao',
    group: 'structure',
    title: 'Ajuda e Formação',
    icon: 'help',
    tier: 'base',
    promise: 'Guias e vídeos para que cada pessoa nova aprenda a usar o Cenlo sozinha.',
    summary: 'Centro de ajuda com vídeos tutoriais, ajuda por página e glossário dentro da plataforma.',
    problem: [
      'A rotatividade nas equipas de restauração é alta. Explicar o sistema a cada pessoa nova tira tempo a quem já está sobrecarregado.',
    ],
    flow: [
      'A pessoa abre Ajuda e guias no Cenlo.',
      'Escolhe o tema e vê o vídeo com a transcrição.',
      'Em cada página, o botão de ajuda explica o que ali se faz.',
    ],
    deliverables: [
      { title: 'Vídeos tutoriais', text: 'Mais de vinte vídeos, da cozinha às entregas, da impressão à equipa, com transcrição.' },
      { title: 'Ajuda desta página', text: 'Explicação contextual em cada área da plataforma.' },
      { title: 'Lista de objetivos', text: 'Passos para pôr a operação a funcionar.' },
      { title: 'Glossário', text: 'O significado dos termos usados no Cenlo.' },
    ],
    fit: [
      'Equipas com entradas frequentes de pessoas novas.',
      'Donos que querem formar a equipa sem estarem presentes.',
    ],
  },
] as const satisfies readonly Module[]

export type ModuleId = (typeof modules)[number]['id']
export const MODULES: readonly (Module & { id: ModuleId })[] = modules
export const CORE_MODULE_ID = 'orders-core' satisfies ModuleId
export const CORE_MODULE = MODULES.find(m => m.id === CORE_MODULE_ID)!
export const BASE_MODULES = MODULES.filter(m => m.tier === 'base')

export function moduleBySlug(slug: string) {
  return MODULES.find(m => m.slug === slug)
}

export const BUSINESS_TYPES = [
  'Pizzaria',
  'Hamburgueria',
  'Restaurante',
  'Sushi e cozinha asiática',
  'Café, pastelaria ou padaria',
  'Take-away ou dark kitchen',
  'Outro',
] as const
