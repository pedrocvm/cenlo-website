# Cenlo Food — demonstrações, movimento e conversa com contexto

Publicação de 8 de outubro de 2026.

## Entrega

- Accordions do configurador, oferta e recibo expandem/recolhem em 300/240 ms, aceitam interrupção e respeitam movimento reduzido.
- Demonstrações dos 22 módulos com mídia passam a ter aproximadamente 30–60 segundos por módulo. Foram usados vídeos existentes; nenhuma captura do produto foi criada.
- WhatsApp: gravação do pedido do João, com resposta automática, confirmação e chegada à cozinha. Fidelidade: sequência única de 37 segundos.
- Reprodução automática sem som quando a demonstração entra em vista, pausa ao sair, controles de som e reprodução, progresso e avanço entre módulos. Ao terminar, há uma contagem de cinco segundos com opção de permanecer.
- Raio, multiloja e auditoria continuam com imagens e exemplos, conforme autorização do usuário.
- “Conversar sobre minha solução” pede nome, restaurante e WhatsApp, salva seleção/diagnóstico/pendências/oferta anterior no CRM e somente depois abre o WhatsApp do Pedro com mensagem preenchida e link autenticado para a conversa no CRM. O cliente confirma o envio no WhatsApp.
- O CRM cria uma oportunidade e tarefa manuais, nota interna e evento `food_evaluation_received`. Reenvios equivalentes recuperam o registro. Não se registra pedido de implantação, pagamento ou ativação.
- A nota contém a referência comercial publicada e os dados enviados; a IA acrescenta avaliação qualitativa do valor e sugestões de abertura, condução e fechamento. A IA não recalcula nem publica preços e não envia mensagens. Se indisponível, as orientações baseadas nas regras continuam registradas com a origem identificada.

## Publicações e commits

- Website: `34b9256`, `d92cafb`, branch `codex/food-autonomous-p0`.
- Vercel: `dpl_6sJ2mWygRJBVXK1mwa24iZN5h9fh`, estado `READY`, alias confirmado `https://cenlo.pt`.
- Deploy imutável: https://cenlo-next-bydzcnmrt-pedrocvms-projects.vercel.app
- Rota Food existente continua por proxy: https://cenlofood.cenlo.pt/configurar/rever
- Assistente: https://cenlofood.cenlo.pt/configurar/assistente-whatsapp#demonstracao
- CRM/API: `72858d4`, `600c4c5`, branch `codex/food-autonomous-p0`; VM em `600c4c5`, serviço API `running healthy`.
- Nova configuração exclusiva: `FOOD_EVALUATION_BRIEF_AI=true`. Reutiliza o provedor e as credenciais internas já existentes. Flags antigas de bots e do Beauty não foram alteradas.
- Não houve migração de banco. Registro reaproveita leads, tarefas, notas, handoffs e eventos existentes. Backup anterior: `/opt/cenlo-crm/backups/cenlo_crm-20261008T191352Z.dump`.

## Verificação e limites

Por instrução do usuário, não foram executados testes funcionais, jornadas, envios de mensagens ou novas capturas. O build Next/TypeScript concluiu no deploy; a compilação TypeScript da API concluiu localmente. Na imagem de produção o compilador de desenvolvimento não existe, portanto a tentativa de compilar dentro dela não foi usada como evidência. Publicação confirmada pelos resultados do Vercel e pelo estado saudável do serviço na VM.

Não foi criado um lead real ou de teste para exercitar a geração da nota pela IA. A configuração exclusiva e a presença da credencial interna foram conferidas sem expor valores. Esta entrega não é uma nova certificação dos testes T01–T32 nem uma declaração de liberação geral do P0.

## Reversão

1. Website: promover o deployment anterior `https://cenlo-next-99xadi02z-pedrocvms-projects.vercel.app` no projeto Vercel `cenlo-next` (versão `423eb39`).
2. Para interromper somente a nova análise interna, definir `FOOD_EVALUATION_BRIEF_AI=false` em `.env.prod` e recriar apenas a API.
3. Para reverter a API inteira: no checkout da VM, selecionar `3ad04e0`, reconstruir `api` e executar `docker compose -f docker-compose.prod.yml up -d --no-deps --wait api`.
4. Preservar registros criados. Nenhuma remoção de dados ou migração reversa é necessária. Não restaurar o backup sobre a base ativa como parte desta reversão de código.

A proveniência e os intervalos dos vídeos estão em `food-module-video-refresh.json`; os arquivos originais continuam preservados.
