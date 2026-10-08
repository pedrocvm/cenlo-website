# Cenlo Food — continuidade do funil, preview de 9 de outubro

Implementação local, sem publicação em produção e sem alteração de campanhas. O funil publicado continua na versão anterior até uma publicação coordenada de Website, landing estática Food e CRM.

## Percurso

Anúncio → `/diagnostico` → recomendação personalizada e gravações reais → plano, valores e condições → pedir demonstração, esclarecer dúvida ou solicitar implantação.

O configurador é uma opção de ajuste após a recomendação (`Ajustar no configurador`), e continua acessível diretamente para quem já sabe o que procura. As respostas acompanham o lead. Os recursos básicos incluídos são identificados como direitos do plano, não como respostas inventadas. Os extras dependem de seleção explícita.

O diagnóstico mantém quatro etapas, agora com seis perguntas nucleares obrigatórias: negócio, unidades, formatos de atendimento, canais, prioridade e sistema atual. Perguntas condicionais de compatibilidade continuam obrigatórias quando aplicáveis. Tempo de atividade e funcionalidades adicionais são opcionais. As respostas podem ser retomadas ou reiniciadas. Não há promessa de um minuto nem cálculo fictício de pedidos perdidos.

A entrada com `?segmento=pizzaria` adapta a mensagem sem preencher o tipo de negócio pelo visitante. Sem esse parâmetro ou resposta prévia, a entrada é genérica.

A recomendação distingue factos declarados de recursos sugeridos. Os destaques e vídeos são ordenados pela prioridade; apenas recursos da oferta são apresentados. Para WhatsApp: atendimento → pedido na conversa → cozinha. As gravações existentes continuam a ser carregadas ao abrir a demonstração. Não foram criadas novas gravações de produto.

O Clube permanece em destaque, depois dos próximos passos; só lidera o bloco comercial quando a prioridade declarada é retorno/fidelização. Preços, prazo real da promoção, benefício permanente aceite no prazo e snapshots anteriores não foram alterados.

## Contactos e CRM

- Demonstração: nome, negócio e WhatsApp; email opcional. Pedro combina o contacto e o horário. Não há agendamento automático nem demonstração já realizada.
- Dúvida: os mesmos dados essenciais, mais a pergunta. Não exige dados de decisor/prazo.
- Implantação: revisão explícita da oferta, valores, forma de pagamento e confirmação. Continua sem cobrança ou ativação automática.
- O servidor grava pedido, snapshot, tarefa, nota e encaminhamento interno antes de devolver sucesso. WhatsApp só fica disponível depois da gravação.
- Reenvios e cliques concorrentes recuperam o mesmo registo. Diferentes intenções para a mesma oferta e contacto idêntico permanecem na mesma oportunidade. Um telefone partilhado não funde empresas ou ofertas diferentes.
- O CRM recebe respostas, prioridade, composição, plano, origem e intenção. A tarefa contém abertura e condução comercial contextualizadas. Nenhum bot foi ativado e não há mensagens automáticas novas para clientes.
- `commercialAcceptance` explicita, nos novos snapshots de contacto, se houve pedido de implantação. Campos opcionais não atribuem um decisor fictício.

## Mensuração

A integração antiga carregava um Pixel fixo (`2329285277604829`) no diagnóstico, sem o mecanismo de consentimento já existente no projeto. O adaptador Food agora reutiliza esse mecanismo e consulta o Pixel configurado pelo CRM. A configuração pública inspecionada indicava `1010704101993887`. Nenhuma configuração da Meta foi alterada.

| Evento | Gatilho | Meta |
|---|---|---|
| `food_funnel_viewed` | Página observada com permissão de medição | `PageView`, só com autorização Meta |
| `diagnostic_started` | Começar diagnóstico | Sem Lead |
| `diagnostic_step_completed` | Etapa válida concluída | Sem Lead |
| `food_diagnostic_completed` | Diagnóstico convertido em oferta, registo operacional existente | Sem Lead |
| `diagnostic_result_viewed` | Recomendação visível após diagnóstico e consentimento | `DiagnosticCompleted`, sem Lead |
| `food_offer_viewed` | Oferta apresentada, incluindo quando o consentimento chega depois | Sem Lead |
| `food_configurator_opened` | Abrir ajuste da composição | Sem Lead |
| `food_demo_opened` | Abrir gravação demonstrativa | Não significa demonstração comercial realizada |
| `food_review_started` | Escolher um próximo passo comercial | Sem Lead |
| `food_contact_received` | Contacto válido persistido com consentimento; intenção explícita | `Lead` apenas no primeiro contacto da oportunidade |
| `food_demonstration_requested` | Pedido de demonstração gravado | Registo operacional; sem segunda conversão |
| `food_question_received` | Dúvida gravada | Registo operacional; sem segunda conversão |
| `food_implementation_received` | Pedido de implantação gravado | Não significa pagamento/ativação |
| `food_whatsapp_opened` | Abrir ligação WhatsApp | Não significa mensagem ou conversa recebida |

Pixel e CAPI usam `Lead` + `food-contact:<id do primeiro pedido>` para desduplicação. A resposta só contém o identificador quando há um facto consentido correspondente. Contactos seguintes na mesma oportunidade não geram outro Lead. O CAPI mantém a intenção em `contact_intent`; o registo interno mantém todas as intenções. A autorização Meta é independente da autorização de medição. Expiração ou retirada de consentimento não bloqueiam o pedido; a retirada elimina eventos pendentes da sessão.

UTMs preservadas: source, medium, campaign, content, term e id. Não há dados de contacto em parâmetros analíticos, nem tokens Meta no frontend. `fbclid`/`fbp`/`fbc` continuam sob a integração de consentimento existente. O histórico de eventos não foi reescrito. Os eventos legados de diagnóstico permanecem disponíveis no CRM; foram acrescentadas métricas de contactos Food e de cada intenção.

Os pedidos de teste, localhost e hosts de preview não carregam o Pixel. A qualificação comercial, demonstração realizada, contratação, pagamento e ativação continuam a depender de factos posteriores reais — não são inferidos destes cliques.

## Copy sugerida — manter o UGC

Texto principal: **Tem uma pizzaria e os pedidos chegam pelo WhatsApp? Conheça o Cenlo Food: atendimento, pedidos e cozinha numa operação organizada. Responda a algumas perguntas, veja a solução recomendada em funcionamento e consulte os valores, sem deixar contacto.**

Título: **Do WhatsApp à cozinha, com pedidos organizados.**

Fecho/legenda final: **Descubra a solução para a sua pizzaria e consulte os valores.**

CTA da página: **Encontrar a minha solução.**

Ajustar apenas abertura, legendas e fecho compatíveis do UGC existente. Retirar “diagnóstico de 1 minuto”, a promessa de quantificar encomendas perdidas e “pedido real” se não estiver comprovado no material. Não é necessária nova gravação para esta proposta de copy.

Destino recomendado para este anúncio: `https://cenlofood.cenlo.pt/diagnostico?segmento=pizzaria`.

Parâmetros sugeridos para configurar posteriormente no anúncio, sem os aplicar nesta tarefa:

```
utm_source={{site_source_name}}&utm_medium=paid_social&utm_campaign=cenlofood_diagnostico&utm_id={{campaign.id}}&utm_term={{adset.id}}&utm_content={{ad.id}}
```

## Preview e validação

Preview local: `http://127.0.0.1:3037/diagnostico?segmento=pizzaria&test=1`.

O gateway local serve a landing estática e encaminha o Website em desenvolvimento e a API isolada. A base `cenlo_funnel_test` é exclusivamente local. Os dados, condições marcadas TESTE, contactos fictícios e pedidos desse ambiente não são produção. Nenhum envio Meta, email, WhatsApp, cobrança ou ativação foi executado.

Validações e evidências detalhadas ficam também no repositório CRM em `docs/FOOD_FUNNEL_VALIDATION_2026-10-09.md`. Passaram 13 verificações de integração e 5 cenários de navegador (dois percursos completos e três prioridades). Foram verificados os tipos do Website, API e interface CRM. Não foi executado um novo build de produção nem publicada uma versão para tráfego.

## Ficheiros principais

Website: `FoodOfferJourney.tsx`, `OfferValue.tsx`, `FoodAcquisition.tsx`, `recommendation.ts`, `CaptureAttribution`/contrato de UTMs, layout e CSS do configurador, `deploy/food-lp/food/diagnostico.html`, `public/shared/acquisition.js`, `public/shared/food-acquisition.js` e gateway de preview.

CRM: contrato v5 do diagnóstico, serviços `food-offers.ts`, `food-evaluation.ts`, `acquisition/food-contact.ts`, configuração de eventos, métricas e relatório de aquisição, cartão `FoodRequest.tsx`, scripts de validação e fixture local.

## Publicação futura e reversão

Não há migração de base de dados. `kind` já é texto; o novo valor `demonstration`, os campos opcionais e os atributos JSON são adições compatíveis. A versão do questionário passa a v5 sem retirar IDs ou respostas antigas.

Para publicar depois de rever: primeiro a API/CRM compatível, depois Website e a landing Food estática com os dois ficheiros `/shared` fornecidos nesta alteração. O domínio Food precisa servir esses ficheiros ou encaminhá-los para o Website. Não basta publicar apenas o Next: a rota `/diagnostico` é atendida pelo projeto estático Food.

Não executar uma nova publicação comercial para esta mudança: isso não é necessário e poderia substituir a promoção ativa. Não republicar ou reiniciar o prazo do Clube. Confirmar a configuração ativa da aquisição, o consentimento e a entrega da Meta no ambiente autorizado antes de considerar a mensuração de produção validada.

Reversão: reverter os commits desta tarefa e voltar às versões anteriores do Website e da landing. Se já houver contactos `demonstration`, manter o leitor/API compatível para conservar a identificação correta desses contactos; uma reversão total para código antigo chamaria esses registos de “dúvida”. Não apagar pedidos, ofertas, tarefas nem eventos. O preview pode ser parado sem efeito na produção.

Limitações: dispositivos móveis foram emulados em Chromium, não iPhone físico/Safari. A aceitação real pela Meta e o ajuste do anúncio não foram executados. A conversão comercial só pode ser avaliada depois de publicação autorizada e tráfego real; nenhuma melhoria percentual é prometida.
