# Publicação do funil Food — 9 de outubro de 2026

Publicação autorizada por Pedro e concluída em produção. Sem alteração de campanhas, orçamentos, preços, publicação comercial, janela do Clube ou provedores. Sem novas migrações. Nenhum bot foi habilitado.

| Serviço | Código | Publicação |
|---|---|---|
| API CRM | edcb3fc | VM /opt/cenlo-crm; API healthy; https://api-crm.cenlo.pt |
| CRM público | edcb3fc | dpl_7dkuJDi38foLcW8WaK1kdFsictmG; promovido; https://crm.cenlo.pt |
| Website/configurador | 2274b82 | dpl_GqdQiAw2AtPQRP3W1B6XuJnaGhhr; promovido; https://cenlo.pt |
| LP Food e Beauty | diagnóstico de 2274b82; scripts Food cfabab2 | dpl_FHbUHcUx4uS49ttmuSz1jvya2Qyj; promovido; https://cenlofood.cenlo.pt |

Entrada: https://cenlofood.cenlo.pt/diagnostico?segmento=pizzaria
Configurador: https://cenlofood.cenlo.pt/configurar

As duas ações da oferta abrem WhatsApp, sem formulário intermédio, com mensagens distintas e o resumo imutável partilhável. Clique não é pedido confirmado, reserva do Clube, conversa recebida, pagamento, ativação nem conversão Lead. O contacto deve enviar a mensagem; o WhatsApp não a envia automaticamente.

## Evidência

Builds de produção concluídos e versões promovidas. API healthy e login CRM HTTP 200. Diagnóstico público e scripts Food conferidos byte a byte contra os ficheiros publicados. HTML público do diagnóstico Beauty inalterado. Publicação comercial e snapshot completos idênticos antes/depois, incluindo a promoção.

Oferta de verificação isTest: a78b3ff1-84ce-4e21-8480-02a72863763f. Ambas as intenções retornaram URLs wa.me para o número configurado de Pedro, com referência correta e link público. Resumo público HTTP 200. Nenhum contacto, pedido, tarefa, notificação, mensagem, cobrança ou ativação foi criado por esta conferência; apenas a oferta e os seus eventos operacionais de teste. Evidência em FOOD_PRODUCTION_EVIDENCE_2026-10-09.json.

Isto confirma a publicação e as rotas alteradas; não equivale a um novo ciclo T01–T32, validação em iPhone físico ou comprovação de entrega real à Meta.

O cliente de consentimento atualizado é exclusivo do Food (`shared/food-acquisition-core.js`). O cliente shared/acquisition.js e todos os ficheiros Beauty do projeto estático foram preservados. Diagnóstico e scripts estáticos estão espelhados em deploy/food-lp no repositório Website. Não basta publicar só o Next para atualizar /diagnostico.

## Reversão

Backup CRM anterior: /opt/cenlo-crm/backups/cenlo_crm-20261009T001714Z.dump; 9.767.942 bytes; restauração validada com 119 tabelas e cópia externa concluída. Imagem anterior preservada: cenlo-crm-api:before-food-funnel-20261009. Não restaurar o banco nem apagar registos numa reversão normal.

Versões anteriores para promoção na Vercel:
- Website: dpl_2V9NURq8EJhQ1UBWtDxvZVP4gndh.
- LP Food/Beauty completa: dpl_H9kM6ugYz1D1HHbk4fPFBkdqoVUq.
- CRM: dpl_6qi1b2Uxc9gsmXYB8HyfgEQHmbHS.

Manter preferencialmente a API nova, compatível com os dados anteriores e kind=demonstration. Se for indispensável reverter a API, o código anterior é 1ed2aab e a imagem anterior foi preservada; aplicar leitor compatível para demonstrações antes de retirar esta versão. Nunca reiniciar o prazo promocional, republicar a grade comercial, eliminar volumes ou alterar os agentes. A publicação recriou apenas o serviço api na VM; não recriou os workers WhatsApp/MCP.
