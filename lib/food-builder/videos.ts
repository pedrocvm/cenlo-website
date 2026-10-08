import type { ModuleId } from './catalog'
export type ModuleVideo = { src: string; title: string; seconds: number; width: number; height: number; hasAudio?: boolean }
export const MODULE_VIDEOS: Partial<Record<ModuleId, ModuleVideo[]>> = {
  "orders-core": [
    {
      "src": "/food-builder/videos/demo-orders-core.mp4",
      "title": "Dos filtros ao pedido registrado no painel",
      "seconds": 53,
      "width": 1280,
      "height": 720,
      "hasAudio": true
    }
  ],
  "whatsapp-assistant": [
    {
      "src": "/food-builder/videos/demo-whatsapp-assistant.mp4",
      "title": "O assistente responde, confirma o pedido e envia à cozinha",
      "seconds": 40,
      "width": 720,
      "height": 1280,
      "hasAudio": true
    }
  ],
  "kitchen-display": [
    {
      "src": "/food-builder/videos/demo-kitchen-display.mp4",
      "title": "Acompanhe as etapas, mova o pedido e confira os detalhes",
      "seconds": 50,
      "width": 1280,
      "height": 720,
      "hasAudio": true
    }
  ],
  "auto-printing": [
    {
      "src": "/food-builder/videos/demo-auto-printing.mp4",
      "title": "Prepare a impressão automática dos pedidos",
      "seconds": 49,
      "width": 1280,
      "height": 720,
      "hasAudio": true
    }
  ],
  "ordering-site": [
    {
      "src": "/food-builder/videos/demo-ordering-site.mp4",
      "title": "Da escolha no cardápio ao pedido recebido pela loja",
      "seconds": 49,
      "width": 1280,
      "height": 720,
      "hasAudio": true
    }
  ],
  "counter-phone": [
    {
      "src": "/food-builder/videos/demo-counter-phone.mp4",
      "title": "Registre o pedido, a entrega e o pagamento",
      "seconds": 40,
      "width": 1280,
      "height": 720,
      "hasAudio": true
    }
  ],
  "scheduled-orders": [
    {
      "src": "/food-builder/videos/demo-scheduled-orders.mp4",
      "title": "Configure horários, capacidade e datas especiais",
      "seconds": 59,
      "width": 1280,
      "height": 720,
      "hasAudio": true
    }
  ],
  "table-service": [
    {
      "src": "/food-builder/videos/demo-table-service.mp4",
      "title": "Do pedido na mesa à cozinha e ao fechamento da conta",
      "seconds": 52,
      "width": 1280,
      "height": 720,
      "hasAudio": true
    }
  ],
  "delivery-zones": [
    {
      "src": "/food-builder/videos/demo-delivery-zones.mp4",
      "title": "Configure taxas, zonas e condições de entrega",
      "seconds": 47,
      "width": 1280,
      "height": 720,
      "hasAudio": true
    }
  ],
  "cenlo-delivery": [
    {
      "src": "/food-builder/videos/demo-cenlo-delivery.mp4",
      "title": "Da saída automática às entregas acompanhadas no painel",
      "seconds": 53,
      "width": 1280,
      "height": 720,
      "hasAudio": true
    }
  ],
  "customer-updates": [
    {
      "src": "/food-builder/videos/entregas-44-cliente-ao-vivo.mp4",
      "title": "O cliente acompanha a entrega pelo celular",
      "seconds": 45,
      "width": 780,
      "height": 1688,
      "hasAudio": false
    }
  ],
  "promotions": [
    {
      "src": "/food-builder/videos/demo-promotions.mp4",
      "title": "Crie a promoção e veja o desconto no pedido do cliente",
      "seconds": 47,
      "width": 1280,
      "height": 720,
      "hasAudio": true
    }
  ],
  "customer-crm": [
    {
      "src": "/food-builder/videos/demo-customer-crm.mp4",
      "title": "Conheça os hábitos e identifique quem chamar de volta",
      "seconds": 55,
      "width": 1280,
      "height": 720,
      "hasAudio": true
    }
  ],
  "customer-reactivation": [
    {
      "src": "/food-builder/videos/demo-customer-reactivation.mp4",
      "title": "Encontre quem deixou de pedir e conheça as opções de reativação",
      "seconds": 34,
      "width": 1280,
      "height": 720,
      "hasAudio": true
    }
  ],
  "loyalty": [
    {
      "src": "/food-builder/videos/demo-loyalty.mp4",
      "title": "Da escolha da meta ao registro no clube e à reserva da recompensa",
      "seconds": 37,
      "width": 1280,
      "height": 800,
      "hasAudio": false
    }
  ],
  "cenlo-intelligence": [
    {
      "src": "/food-builder/videos/demo-cenlo-intelligence.mp4",
      "title": "Entenda padrões, oportunidades e qualidade dos dados",
      "seconds": 50,
      "width": 1280,
      "height": 720,
      "hasAudio": true
    }
  ],
  "forecasting": [
    {
      "src": "/food-builder/videos/demo-forecasting.mp4",
      "title": "Veja as previsões e o histórico necessário para calculá-las",
      "seconds": 31,
      "width": 1280,
      "height": 720,
      "hasAudio": true
    }
  ],
  "insights-recommendations": [
    {
      "src": "/food-builder/videos/demo-insights-recommendations.mp4",
      "title": "Dos números do período aos pontos que merecem atenção",
      "seconds": 55,
      "width": 1280,
      "height": 720,
      "hasAudio": true
    }
  ],
  "reports": [
    {
      "src": "/food-builder/videos/demo-reports.mp4",
      "title": "Explore resultados, produtos e fechamentos da operação",
      "seconds": 55,
      "width": 1280,
      "height": 720,
      "hasAudio": true
    }
  ],
  "closings-summaries": [
    {
      "src": "/food-builder/videos/demo-closings-summaries.mp4",
      "title": "Receba o resumo da operação no fechamento do dia",
      "seconds": 48,
      "width": 1280,
      "height": 720,
      "hasAudio": true
    }
  ],
  "team-permissions": [
    {
      "src": "/food-builder/videos/demo-team-permissions.mp4",
      "title": "Escolha os acessos e convide sua equipe",
      "seconds": 46,
      "width": 1280,
      "height": 720,
      "hasAudio": true
    }
  ],
  "help-training": [
    {
      "src": "/food-builder/videos/demo-orders-core.mp4",
      "title": "Dos filtros ao pedido registrado no painel",
      "seconds": 53,
      "width": 1280,
      "height": 720,
      "hasAudio": true
    }
  ]
}
export const videosFor = (id: ModuleId) => MODULE_VIDEOS[id] ?? []
