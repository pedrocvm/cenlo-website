// Presentation only: never adds modules, changes prices or assumes answers.
const order: Record<string, string[]> = {
  atendimento: ['whatsapp-assistant', 'conversation-order', 'kitchen-display', 'orders-core'],
  erros: ['orders-core', 'kitchen-display', 'auto-printing'],
  cozinha: ['kitchen-display', 'auto-printing', 'orders-core'],
  entregas: ['delivery-zones', 'delivery-radius', 'customer-updates', 'cenlo-delivery'],
  salao: ['table-service', 'counter-phone', 'orders-core'],
  retorno: ['loyalty', 'customer-reactivation', 'customer-crm'],
  direto: ['online-ordering', 'ordering-site', 'orders-core'],
  movimento: ['online-ordering', 'orders-core', 'whatsapp-assistant'],
}
export const recommendationOrder = (priority: string) => order[priority] || ['orders-core', 'whatsapp-assistant', 'kitchen-display']
export function diagnosticFacts(answers?: Record<string, unknown>) {
  if (!answers) return []
  const maps: Record<string, Record<string, string>> = {
    f1: { pizzaria: 'Pizzaria', hamburgueria: 'Hamburgueria', restaurante: 'Restaurante', asiatico: 'Cozinha asiática', cafe: 'Café, padaria ou pastelaria', delivery: 'Cozinha de entregas', outro: 'Outro negócio' },
    f6: { whatsapp: 'WhatsApp', telefone: 'Telefone', instagram: 'Instagram', apps: 'Aplicações de entrega', site: 'Site próprio', balcao: 'Balcão ou sala', mesa: 'Mesa' },
    f8: { atendimento: 'Responder melhor no WhatsApp e telefone', erros: 'Reduzir erros e retrabalho', cozinha: 'Passagem dos pedidos para a cozinha', entregas: 'Organização das entregas', salao: 'Atendimento na sala', retorno: 'Clientes que compram e não voltam', direto: 'Depender menos das aplicações de entrega', movimento: 'Pouco movimento', sem_prioridade: 'Ainda sem prioridade definida' },
    f3: { uma: 'Uma unidade', varias: 'Mais de uma unidade' },
    f15: { nenhum: 'Sem sistema de pedidos ou caixa', caixa: 'Sistema de caixa', varios: 'Mais de um sistema', pedidos: 'Sistema de pedidos', completo: 'Sistema de gestão', outro: 'Outro sistema', nao_sei: 'Sistema por identificar' },
  }
  const labels: Record<string, string> = { f1: 'O seu negócio', f8: 'A sua prioridade', f3: 'Unidades indicadas', f6: 'Canais indicados', f15: 'Organização atual' }
  return Object.entries(maps).flatMap(([id, values]) => {
    const raw = answers[id]; const list = Array.isArray(raw) ? raw : [raw]
    const known = list.filter((v): v is string => typeof v === 'string').map(v => values[v]).filter(Boolean)
    return known.length ? [{ label: labels[id], value: known.join(' · ') }] : []
  })
}
