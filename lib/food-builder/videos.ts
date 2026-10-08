import type { ModuleId } from './catalog'
export type ModuleVideo = { src: string; title: string; seconds: number; width: number; height: number }
export const MODULE_VIDEOS: Partial<Record<ModuleId, ModuleVideo[]>> = {
  "orders-core": [
    {
      "src": "/food-builder/videos/e02-filtros.mp4",
      "title": "Encontre o pedido pelo estado, canal ou cliente",
      "seconds": 14,
      "width": 2000,
      "height": 1250
    },
    {
      "src": "/food-builder/videos/e02-novo.mp4",
      "title": "Registre um pedido com os itens e a entrega",
      "seconds": 22,
      "width": 2000,
      "height": 1250
    }
  ],
  "whatsapp-assistant": [
    {
      "src": "/food-builder/videos/e05-abrir.mp4",
      "title": "Abra a conversa que precisa de atenção",
      "seconds": 7,
      "width": 2000,
      "height": 1250
    },
    {
      "src": "/food-builder/videos/e05-responder.mp4",
      "title": "Responda com o histórico à mão",
      "seconds": 9,
      "width": 2000,
      "height": 1250
    },
    {
      "src": "/food-builder/videos/e05-retomar.mp4",
      "title": "Retome o atendimento após a intervenção humana",
      "seconds": 5,
      "width": 2000,
      "height": 1250
    }
  ],
  "kitchen-display": [
    {
      "src": "/food-builder/videos/e03-arrastar.mp4",
      "title": "Mova o pedido para a próxima etapa",
      "seconds": 5,
      "width": 2000,
      "height": 1250
    },
    {
      "src": "/food-builder/videos/e03-detalhe.mp4",
      "title": "Consulte o detalhe e inicie o preparo",
      "seconds": 8,
      "width": 2000,
      "height": 1250
    }
  ],
  "auto-printing": [
    {
      "src": "/food-builder/videos/e20-associar.mp4",
      "title": "Associe o computador à impressão da cozinha",
      "seconds": 8,
      "width": 2000,
      "height": 1250
    }
  ],
  "ordering-site": [
    {
      "src": "/food-builder/videos/e08-aparencia.mp4",
      "title": "Ajuste a aparência do site",
      "seconds": 10,
      "width": 2000,
      "height": 1250
    },
    {
      "src": "/food-builder/videos/e08-publicar.mp4",
      "title": "Guarde e publique as alterações",
      "seconds": 8,
      "width": 2000,
      "height": 1250
    },
    {
      "src": "/food-builder/videos/e06-c-escolher.mp4",
      "title": "Veja o cliente escolher os itens no celular",
      "seconds": 9,
      "width": 780,
      "height": 1688
    }
  ],
  "counter-phone": [
    {
      "src": "/food-builder/videos/e02-novo.mp4",
      "title": "Do telefone ao pedido registrado no painel",
      "seconds": 22,
      "width": 2000,
      "height": 1250
    }
  ],
  "scheduled-orders": [
    {
      "src": "/food-builder/videos/e19-ligar.mp4",
      "title": "Defina a capacidade para pedidos agendados",
      "seconds": 7,
      "width": 2000,
      "height": 1250
    },
    {
      "src": "/food-builder/videos/e19-data.mp4",
      "title": "Ajuste o atendimento em datas especiais",
      "seconds": 8,
      "width": 2000,
      "height": 1250
    }
  ],
  "table-service": [
    {
      "src": "/food-builder/videos/e07-c-pedir.mp4",
      "title": "O cliente escolhe os itens na mesa",
      "seconds": 20,
      "width": 780,
      "height": 1688
    },
    {
      "src": "/food-builder/videos/e07-c-enviar.mp4",
      "title": "A comanda segue para a cozinha",
      "seconds": 7,
      "width": 780,
      "height": 1688
    },
    {
      "src": "/food-builder/videos/e07-c-chamar.mp4",
      "title": "O cliente chama o atendimento e pede a conta",
      "seconds": 10,
      "width": 780,
      "height": 1688
    }
  ],
  "delivery-zones": [
    {
      "src": "/food-builder/videos/e18-nova-zona.mp4",
      "title": "Cadastre uma área com sua taxa de entrega",
      "seconds": 9,
      "width": 2000,
      "height": 1250
    }
  ],
  "cenlo-delivery": [
    {
      "src": "/food-builder/videos/e04-regras.mp4",
      "title": "Defina como organizar as saídas",
      "seconds": 12,
      "width": 2000,
      "height": 1250
    },
    {
      "src": "/food-builder/videos/e04-e-iniciar.mp4",
      "title": "O entregador inicia a saída",
      "seconds": 8,
      "width": 780,
      "height": 1688
    },
    {
      "src": "/food-builder/videos/e04-e-entregar.mp4",
      "title": "A entrega é confirmada pelo celular",
      "seconds": 8,
      "width": 780,
      "height": 1688
    }
  ],
  "customer-updates": [
    {
      "src": "/food-builder/videos/entregas-44-cliente-ao-vivo.mp4",
      "title": "O cliente acompanha a entrega pelo celular",
      "seconds": 45,
      "width": 780,
      "height": 1688
    }
  ],
  "promotions": [
    {
      "src": "/food-builder/videos/e11-beneficio.mp4",
      "title": "Defina o benefício da promoção",
      "seconds": 11,
      "width": 2000,
      "height": 1250
    },
    {
      "src": "/food-builder/videos/e11-c-pedido.mp4",
      "title": "Veja o desconto aparecer no pedido",
      "seconds": 12,
      "width": 780,
      "height": 1688
    },
    {
      "src": "/food-builder/videos/e11-pausar.mp4",
      "title": "Pause a promoção quando precisar",
      "seconds": 5,
      "width": 2000,
      "height": 1250
    }
  ],
  "customer-crm": [
    {
      "src": "/food-builder/videos/e12-busca.mp4",
      "title": "Encontre o cliente na sua base",
      "seconds": 8,
      "width": 2000,
      "height": 1250
    },
    {
      "src": "/food-builder/videos/e12-ficha-rolar.mp4",
      "title": "Consulte o histórico e os hábitos do cliente",
      "seconds": 6,
      "width": 2000,
      "height": 1250
    }
  ],
  "customer-reactivation": [
    {
      "src": "/food-builder/videos/e16-reativacao.mp4",
      "title": "Confira a configuração de reativação",
      "seconds": 8,
      "width": 2000,
      "height": 1250
    },
    {
      "src": "/food-builder/videos/e12-reativar.mp4",
      "title": "Encontre clientes a reativar e uma mensagem sugerida",
      "seconds": 9,
      "width": 2000,
      "height": 1250
    }
  ],
  "loyalty": [
    {
      "src": "/food-builder/videos/clube-m-meta-definir.mp4",
      "title": "O cliente escolhe uma recompensa como meta",
      "seconds": 8,
      "width": 780,
      "height": 1688
    },
    {
      "src": "/food-builder/videos/clube-c15-recebimento.mp4",
      "title": "Registre um atendimento no clube",
      "seconds": 18,
      "width": 2000,
      "height": 1250
    },
    {
      "src": "/food-builder/videos/clube-m-reservar.mp4",
      "title": "O cliente reserva sua recompensa",
      "seconds": 11,
      "width": 780,
      "height": 1688
    }
  ],
  "cenlo-intelligence": [
    {
      "src": "/food-builder/videos/e14-clientes.mp4",
      "title": "Consulte a análise da sua base de clientes",
      "seconds": 6,
      "width": 2000,
      "height": 1250
    },
    {
      "src": "/food-builder/videos/e14-qualidade.mp4",
      "title": "Entenda a qualidade dos dados da operação",
      "seconds": 6,
      "width": 2000,
      "height": 1250
    }
  ],
  "forecasting": [
    {
      "src": "/food-builder/videos/e14-previsoes.mp4",
      "title": "Consulte as previsões e a disponibilidade de dados",
      "seconds": 6,
      "width": 2000,
      "height": 1250
    }
  ],
  "insights-recommendations": [
    {
      "src": "/food-builder/videos/e13-insights.mp4",
      "title": "Leia os insights a partir dos relatórios",
      "seconds": 6,
      "width": 2000,
      "height": 1250
    }
  ],
  "reports": [
    {
      "src": "/food-builder/videos/e13-evolucao.mp4",
      "title": "Compare a evolução dos pedidos",
      "seconds": 6,
      "width": 2000,
      "height": 1250
    },
    {
      "src": "/food-builder/videos/e13-produtos.mp4",
      "title": "Confira o desempenho dos produtos",
      "seconds": 7,
      "width": 2000,
      "height": 1250
    }
  ],
  "closings-summaries": [
    {
      "src": "/food-builder/videos/e13-fechamentos.mp4",
      "title": "Consulte os fechamentos do período",
      "seconds": 7,
      "width": 2000,
      "height": 1250
    },
    {
      "src": "/food-builder/videos/e21-numero.mp4",
      "title": "Defina quem recebe o resumo do dia",
      "seconds": 8,
      "width": 2000,
      "height": 1250
    }
  ],
  "team-permissions": [
    {
      "src": "/food-builder/videos/e22-convidar.mp4",
      "title": "Convide uma pessoa com unidade e função definidas",
      "seconds": 13,
      "width": 2000,
      "height": 1250
    }
  ],
  "help-training": [
    {
      "src": "/food-builder/videos/e02-novo.mp4",
      "title": "Exemplo do conteúdo de formação: registrar um pedido",
      "seconds": 22,
      "width": 2000,
      "height": 1250
    }
  ]
}
export const videosFor = (id: ModuleId) => MODULE_VIDEOS[id] ?? []
