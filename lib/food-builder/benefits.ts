// Benefits describe existing capabilities; availability remains governed by the commercial catalog.
export const MODULE_BENEFITS: Record<string, string> = {
  'orders-core': 'Reúna os pedidos em um só lugar e acompanhe o que falta preparar, entregar ou concluir.',
  'whatsapp-assistant': 'Organize as conversas e deixe sua equipe assumir o atendimento com o histórico à mão.',
  'conversation-order': 'Leve a escolha do cliente até o pedido pela conversa. O atendimento é validado com seu cardápio antes de ativar.',
  'kitchen-display': 'Mostre à cozinha o que preparar e em qual ordem, com cada pedido na etapa certa.',
  'auto-printing': 'Leve os pedidos para a impressora da cozinha, reduzindo a necessidade de copiar comandas à mão.',
  'online-ordering': 'Dê ao cliente um link para escolher os itens e enviar o pedido, sem depender de uma troca de mensagens.',
  'ordering-site': 'Tenha um endereço próprio para apresentar seu restaurante e levar o visitante até o pedido.',
  'counter-phone': 'Registre os pedidos do balcão e do telefone no mesmo fluxo dos pedidos online.',
  'scheduled-orders': 'Receba pedidos para mais tarde e organize a capacidade de cada horário com antecedência.',
  'table-service': 'O cliente pede pelo QR da mesa e a comanda chega à cozinha, reduzindo as idas e vindas do atendimento.',
  'delivery-zones': 'Defina onde você entrega e quanto cobra em cada área, com regras claras para o cliente.',
  'delivery-radius': 'Ajuste a taxa à distância da entrega para atender perto e longe com regras diferentes.',
  'cenlo-delivery': 'Organize as saídas e acompanhe seus entregadores, do pedido pronto à entrega confirmada.',
  'customer-updates': 'Deixe o cliente acompanhar o pedido e reduza as interrupções para perguntar se já saiu.',
  'promotions': 'Crie ofertas para os produtos e momentos que você quer destacar, com prazo e condições definidos.',
  'customer-crm': 'Conheça o histórico e os pedidos favoritos de cada cliente para atender com mais contexto.',
  'customer-reactivation': 'Identifique quem deixou de comprar e prepare o convite para voltar, com regras de envio a validar.',
  'loyalty': 'Dê ao cliente motivos para voltar, com pontos, metas e recompensas que fazem sentido para seu negócio.',
  'cenlo-intelligence': 'Transforme o histórico da operação em sinais que ajudam a decidir onde concentrar sua atenção.',
  'forecasting': 'Use o histórico disponível para antecipar a procura e apoiar o planejamento da equipe e da produção.',
  'insights-recommendations': 'Perceba mudanças nos produtos e nas vendas para decidir o que merece uma ação.',
  'reports': 'Veja o que vende, como o movimento evolui e quais produtos pesam no resultado.',
  'closings-summaries': 'Feche o dia com os principais números reunidos, sem precisar buscar tudo em telas diferentes.',
  'multi-store': 'Organize as pessoas e os acessos por unidade. O escopo das lojas é alinhado antes da implantação.',
  'team-permissions': 'Dê a cada pessoa o acesso necessário para trabalhar, mantendo as funções da equipe organizadas.',
  'audit-trail': 'Consulte quem alterou o quê e quando para esclarecer dúvidas e acompanhar mudanças na operação.',
  'help-training': 'Ajude quem está começando com guias e orientações, sem repetir toda a explicação a cada pessoa nova.',
  'menu-import': 'Parta do seu cardápio para montar os itens com ajuda da IA e revise tudo antes de publicar.',
}

export const MODULE_EXAMPLES: Record<string, { title: string; text: string }[]> = {
  'delivery-radius': [
    { title: 'Quem está perto paga pela faixa mais próxima', text: 'Você pode definir uma faixa até 3 km e outra até 6 km, cada uma com a taxa escolhida pelo restaurante. Ao informar o endereço, o cliente recebe a taxa da faixa correspondente.' },
    { title: 'Sua equipe sabe até onde pode entregar', text: 'A última faixa define o limite de atendimento. Se você já trabalha com zonas, o raio atende os endereços que não pertencem a uma zona configurada.' },
  ],
  'multi-store': [
    { title: 'Duas lojas, sem misturar a operação', text: 'Imagine uma unidade no Centro e outra em um bairro vizinho. Cada uma mantém seus pedidos, cardápio, clientes e equipe, dentro da mesma organização.' },
    { title: 'Quem trabalha nas duas encontra a unidade certa', text: 'Um responsável com acesso a mais de uma loja usa o seletor de unidade para abrir a operação desejada. Os acessos e o escopo de cada loja são alinhados na implantação.' },
  ],
  'audit-trail': [
    { title: 'Um pedido foi cancelado. O que aconteceu?', text: 'Em vez de perguntar a toda a equipe, a gestão consulta o registro para identificar a ação, quem a realizou e quando aconteceu.' },
    { title: 'Uma informação mudou. Qual era o valor anterior?', text: 'Nas alterações registradas com antes e depois, você compara os valores e entende o que foi modificado. Isso ajuda a esclarecer divergências com base no histórico.' },
  ],
}
