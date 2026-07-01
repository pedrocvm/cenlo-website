export const pains = [
  { tag: 'Pedidos perdidos nas mensagens', text: 'A Cenlo estrutura cada conversa num pedido claro, sem nada por anotar.' },
  { tag: 'Equipa a copiar tudo à mão', text: 'O pedido chega pronto à operação, sem retrabalho nem enganos.' },
  { tag: 'Reservas que se perdem nas mensagens', text: 'Cada marcação fica registada e visível para a equipa.' },
  { tag: 'Clientes antigos esquecidos', text: 'Histórico organizado para reativar quem já é cliente e voltar a faturar.' },
  { tag: 'Orçamentos parados sem resposta', text: 'Os pedidos ficam à vista, prontos para retomar e fechar.' },
  { tag: 'Fim do dia sem saber os números', text: 'Fecho diário com o que realmente aconteceu e quanto rendeu.' },
]

export const flowMini = [
  { n: '1', title: 'O cliente fala', desc: 'WhatsApp, mensagem ou contacto direto, como já é hábito.', showLine: true },
  { n: '2', title: 'A Cenlo organiza', desc: 'Entende e estrutura o que foi pedido.', showLine: true },
  { n: '3', title: 'A operação recebe', desc: 'Pedido, reserva ou marcação aparece claro para a equipa.', showLine: true },
  { n: '4', title: 'O dono acompanha', desc: 'Estados, clientes e números num só lugar.', showLine: false },
]

export const verticals = [
  { name: 'Cenlo Pizza', status: 'Disponível' as const, desc: 'Central inteligente para a sua pizzaria. Organiza o atendimento, estrutura pedidos, envia para a cozinha, regista clientes e reativa quem já comprou.', cta: 'Ver Cenlo Pizza', href: '/pizza' },
  { name: 'Cenlo Food', status: 'Em breve' as const, desc: 'Atendimento, pedidos e operação para restaurantes, hamburguerias, sushi, cafés e pastelarias.', cta: 'Quero saber quando estiver disponível', href: '/contacto' },
  { name: 'Cenlo Night', status: 'Em breve' as const, desc: 'Reservas, listas, atendimento e operação para discotecas, bares e espaços noturnos.', cta: 'Falar sobre este segmento', href: '/contacto' },
  { name: 'Cenlo Services', status: 'Em breve' as const, desc: 'Orçamentos, marcações, follow-up e atendimento para empresas de serviços.', cta: 'Falar sobre este segmento', href: '/contacto' },
]

export const pizzaPills = [
  'Atendimento organizado no WhatsApp',
  'Pedidos claros enviados para a cozinha',
  'Clientes e histórico sempre à mão',
  'Fecho diário com os números reais',
]

export const soon = [
  { name: 'Cenlo Food', para: 'Restaurantes, hamburguerias, sushi, cafés, pastelarias e outros negócios de comida.', resolve: 'Pedidos dispersos, atendimento manual, cozinha desorganizada, falta de histórico de clientes e pouca clareza dos números do dia.', cta: 'Quero saber quando estiver disponível' },
  { name: 'Cenlo Night', para: 'Discotecas, bares, lounges e eventos.', resolve: 'Reservas, listas, atendimento por mensagem, comunicação com clientes e organização operacional em noites movimentadas.', cta: 'Falar sobre este segmento' },
  { name: 'Cenlo Services', para: 'Empresas de serviços, salões, clínicas, oficinas, estética, manutenção e prestadores.', resolve: 'Pedidos de orçamento, marcações, mensagens perdidas, follow-up manual, histórico de clientes e organização do atendimento.', cta: 'Falar sobre este segmento' },
]

export const glossary = [
  { term: 'Cenlo Pizza', def: 'Central de atendimento, pedidos e clientes para pizzarias. Disponível.' },
  { term: 'Cenlo Food', def: 'Atendimento e pedidos para negócios de comida. Em breve.' },
  { term: 'Cenlo Night', def: 'Reservas e listas para espaços noturnos. Em breve.' },
  { term: 'Cenlo Services', def: 'Orçamentos e marcações para serviços. Em breve.' },
]

export const pizzaFor = [
  'Pizzarias onde já houve pedidos perdidos nas mensagens',
  'Donos que gerem a operação por mensagem, papel ou memória',
  'Operações com entrega e recolha em simultâneo',
  'Quem quer fechar o dia sabendo o que vendeu, sem reconstituir tudo da memória',
  'Pizzarias nos apps de entrega que querem organizar também o canal próprio',
]

export const pizzaProblems = [
  'Pedido perdido no meio da conversa.',
  'Cliente que envia o pedido incompleto.',
  'Colaborador que copia tudo manualmente.',
  'Cozinha que recebe o pedido confuso.',
  'Dono que só repara nos erros ao fim do dia.',
  'Cliente antigo esquecido, sem recompra.',
  'Falta de histórico de pedidos e clientes.',
  'Falta de números simples sobre o dia.',
]

export const pizzaSteps = [
  { n: '1', title: 'O cliente fala', desc: 'Pede pelo WhatsApp, como já é hábito.' },
  { n: '2', title: 'A Cenlo entende', desc: 'Organiza e estrutura o pedido.' },
  { n: '3', title: 'Valida o menu', desc: 'Tamanhos, sabores, extras e entrega.' },
  { n: '4', title: 'Aparece na dashboard', desc: 'Pedido claro, pronto a confirmar.' },
  { n: '5', title: 'A cozinha recebe', desc: 'Sem ruído nem cópia à mão.' },
  { n: '6', title: 'O dono acompanha', desc: 'Estados, clientes e números.' },
  { n: '7', title: 'Apoia a recompra', desc: 'Ajuda no follow-up manual com clientes.' },
]

export const pizzaFeatures = [
  { i: '01', title: 'Atendimento organizado no WhatsApp', desc: 'Conversas estruturadas, sem perder pedidos.' },
  { i: '02', title: 'Gestão de pedidos', desc: 'Cada pedido com estado claro, do início ao fim.' },
  { i: '03', title: 'Painel de cozinha', desc: 'A cozinha vê o que preparar, sem dúvidas.' },
  { i: '04', title: 'Menu estruturado', desc: 'Tamanhos, sabores e extras configurados pela pizzaria.' },
  { i: '05', title: 'Clientes e histórico', desc: 'Quem pede, o que pede e quando voltou.' },
  { i: '06', title: 'Fecho diário', desc: 'Os números do dia, sem fechar a caixa.' },
]

export const benefits = [
  { who: 'Para o dono', items: ['Vê os números do dia sem fechar a caixa', 'Clientes e histórico registados', 'Menos erros, menos retrabalho'] },
  { who: 'Para o atendimento', items: ['Conversas organizadas, não perdidas', 'Pedido estruturado sem copiar à mão', 'Passagem para um humano quando é preciso'] },
  { who: 'Para a cozinha', items: ['Pedido claro, sem dúvidas', 'Estados de preparação visíveis', 'Menos confusão nas horas de ponta'] },
]

export const pizzaNot = [
  'Não é mais um chatbot genérico.',
  'Não é um marketplace.',
  'Não é um sistema de caixa.',
  'Não é só um menu digital.',
]

export const demoSteps = [
  { n: '1', t: 'Marcamos uma conversa curta sobre a sua pizzaria.' },
  { n: '2', t: 'Mostramos a central com o menu e o fluxo da sua operação.' },
  { n: '3', t: 'Acompanhamos os primeiros dias de perto.' },
]

export const pizzaE2ESteps = [
  { n: 'A', title: 'O cliente encontra a pizzaria no Google', desc: 'O perfil da pizzaria aparece quando alguém pesquisa pizza perto de si. Um perfil bem preenchido é o que faz o cliente clicar.' },
  { n: 'B', title: 'Abre o site e escolhe o pedido', desc: 'O site da pizzaria mostra o menu. O cliente escolhe e monta o pedido pelo telemóvel.' },
  { n: 'C', title: 'Pede pelo WhatsApp com um clique', desc: 'O site monta o pedido e abre o WhatsApp com tudo preenchido. O cliente clica em enviar.' },
  { n: 'D', title: 'O pedido entra no Cenlo, vai para a cozinha', desc: 'O pedido aparece na dashboard e segue para o painel de cozinha. O cliente fica registado para recompra futura.' },
]

export const faqs = [
  { q: 'Funciona com o WhatsApp da pizzaria?', a: 'Sim. O Cenlo Pizza trabalha sobre o canal de WhatsApp da própria pizzaria, o mesmo onde os clientes já falam consigo.' },
  { q: 'Preciso de trocar o meu sistema atual?', a: 'Não é o objetivo. O Cenlo organiza o atendimento e os pedidos do seu canal próprio; pode conviver com a forma como já trabalha hoje.' },
  { q: 'Serve para uma pizzaria pequena?', a: 'Sim. Foi pensado para qualquer pizzaria que atende por mensagem. Quanto mais o atendimento depende de mensagens soltas, mais cedo se nota a diferença.' },
  { q: 'Dá para usar em conjunto com apps de entrega?', a: 'Dá. Os apps de entrega podem continuar a existir. O Cenlo serve para organizar o canal próprio, que é seu.' },
  { q: 'A IA calcula os preços?', a: 'Não. O preço é sempre calculado pelo sistema a partir do menu configurado pela pizzaria, nunca pela IA.' },
  { q: 'A cozinha vê os pedidos onde?', a: 'Num painel de cozinha próprio, com o pedido estruturado e o estado de preparação, sem cópias à mão.' },
  { q: 'O cliente recebe confirmação?', a: 'O atendimento confirma o pedido na conversa, com o pedido já estruturado pela central, de forma clara para o cliente.' },
  { q: 'Como começa a demonstração?', a: 'Marcamos uma conversa curta, configuramos o menu e o fluxo da sua pizzaria e acompanhamos os primeiros dias de perto.' },
]

export const values = [
  { t: 'Organização', d: 'Tirar o atendimento do improviso e dar-lhe estrutura.' },
  { t: 'Proximidade', d: 'Pensado para quem atende clientes todos os dias, com acompanhamento próximo.' },
  { t: 'Foco na faturação', d: 'A organização existe para um fim: fechar mais negócio e trazer de volta quem já é cliente.' },
]

export const beforeAfter = [
  { before: 'Mensagens soltas e contactos perdidos', after: 'Atendimento estruturado num só lugar' },
  { before: 'Anotações à mão e de memória', after: 'Tudo registado e visível para a equipa' },
  { before: 'Clientes antigos esquecidos', after: 'Histórico e reativação à mão' },
  { before: 'Fim do dia sem números', after: 'Fecho diário com os dados reais' },
]

export const terms = [
  { t: 'Aceitação dos termos', d: 'Ao aceder e utilizar o site da Cenlo, concorda com estes termos. Se não concordar, pedimos que não utilize o site nem os formulários disponibilizados.' },
  { t: 'O que a Cenlo oferece', d: 'A Cenlo desenvolve centrais inteligentes de atendimento e operação para negócios locais. Este site serve para apresentar os produtos e permitir o pedido de demonstração. O acesso aos produtos é feito mediante acordo comercial próprio.' },
  { t: 'Utilização do site', d: 'O site destina-se a fins informativos e ao contacto comercial. Compromete-se a fornecer informação verdadeira nos formulários e a não utilizar o site para fins ilícitos, fraudulentos ou que prejudiquem o funcionamento do serviço.' },
  { t: 'Pedidos de demonstração', d: 'O envio de um pedido de demonstração não constitui qualquer contrato nem obrigação de fornecimento. A Cenlo entra em contacto para avaliar, em conjunto, se o produto faz sentido para o seu negócio.' },
  { t: 'Propriedade intelectual', d: 'A marca Cenlo, os textos, o design e o software associados são propriedade da Cenlo. Não é permitida a reprodução, cópia ou utilização sem autorização escrita.' },
  { t: 'Limitação de responsabilidade', d: 'O site é disponibilizado "tal como está". A Cenlo procura manter a informação atualizada e o serviço disponível, mas não garante ausência de erros ou interrupções, dentro dos limites permitidos por lei.' },
  { t: 'Alterações', d: 'A Cenlo pode atualizar estes termos a qualquer momento. A versão em vigor é sempre a publicada nesta página, com a data da última atualização.' },
  { t: 'Lei aplicável', d: 'Estes termos regem-se pela lei portuguesa. Qualquer litígio será resolvido pelos tribunais competentes em Portugal.' },
]

export const privacy = [
  { t: 'Quem somos', d: 'A Cenlo desenvolve centrais inteligentes de atendimento e operação para quem atende clientes todos os dias. Esta política explica como tratamos os dados que nos confia.' },
  { t: 'Que dados recolhemos', d: 'Apenas os dados que nos envia ao pedir uma demonstração ou ao falar connosco: nome, nome do negócio, cidade, segmento, telefone, email e a mensagem que escrever.' },
  { t: 'Para que usamos os dados', d: 'Usamos os seus dados exclusivamente para responder ao seu pedido, preparar a demonstração e acompanhar o contacto. Não os usamos para mais nada sem o seu conhecimento.' },
  { t: 'Partilha com terceiros', d: 'Não vendemos nem partilhamos os seus dados com terceiros para fins comerciais. Podem ser usadas ferramentas de apoio (por exemplo, email) apenas para o contacto consigo.' },
  { t: 'Os seus direitos', d: 'Pode pedir, a qualquer momento, o acesso, a correção ou a eliminação dos seus dados. Basta escrever para ola@cenlo.pt e tratamos do pedido.' },
  { t: 'Conservação', d: 'Guardamos os dados apenas durante o tempo necessário para o contacto e o eventual início de uma relação comercial. Depois disso, são eliminados a seu pedido.' },
]
