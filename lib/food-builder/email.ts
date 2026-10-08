import type { PriceSuggestion } from './pricing.ts'
import type { ModuleRef, Submission } from './submission.ts'

const esc = (s: string) => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

export function lisbonTime(iso: string) {
  return new Intl.DateTimeFormat('pt-PT', { timeZone: 'Europe/Lisbon', dateStyle: 'long', timeStyle: 'short' }).format(new Date(iso)) + ' (hora de Lisboa)'
}

function byGroup(mods: ModuleRef[]) {
  const groups = new Map<string, ModuleRef[]>()
  for (const m of mods) groups.set(m.group, [...(groups.get(m.group) ?? []), m])
  return [...groups]
}

const euro = (c: number) => `${Math.floor(c / 100)},${String(c % 100).padStart(2, '0')} €`

function suggestionLines(p: PriceSuggestion): string[] {
  const split = p.split ? `${euro(p.split.upfrontCents)} de entrada + ${p.split.restCents.map(euro).join(' + ')}` : null
  return [
    `Mensalidade sugerida: ${euro(p.monthlyCents)} por unidade`,
    `Implantação sugerida: ${euro(p.setupCents)}${p.cashSetupCents !== null ? ` (à vista ${euro(p.cashSetupCents)})` : ''}${split ? ` · em ${p.split!.restCents.length + (p.split!.upfrontCents > 0 ? 1 : 0)}x: ${split}` : ''}`,
    `Plano de referência do diagnóstico: ${p.reference.label} (${euro(p.reference.setupCents)} + ${euro(p.reference.monthlyCents)}/mês)`,
    `Base: ${p.points} pontos (premium 2, opcional 1)${p.source === 'fallback' ? ' · CRM sem resposta, valores de 08/10' : ' · preços do CRM'}`,
  ]
}

export function renderEmail(s: Submission, suggestion?: PriceSuggestion) {
  const subject = `Nova configuração Cenlo Food | Referência ${s.reference} | ${s.business.name}`
  const when = lisbonTime(s.submittedAt)
  const premium = s.selectedModules.filter(m => m.tier === 'premium')
  const optional = s.selectedModules.filter(m => m.tier === 'optional')
  const base = s.selectedModules.filter(m => m.tier === 'base')
  const utm = Object.entries(s.attribution.utm)

  const rows: [string, string | null][] = [
    ['Nome', s.contact.name],
    ['Contacto', s.contact.phone],
    ['E-mail', s.contact.email],
    ['Estabelecimento', s.business.name],
    ['Cidade', s.business.city],
    ['Tipo', s.business.type],
  ]

  const text = [
    `Nova configuração Cenlo Food Builder`,
    `Referência: ${s.reference}`,
    `Enviada em: ${when}`,
    '',
    ...rows.map(([k, v]) => `${k}: ${v ?? '—'}`),
    `WhatsApp: https://wa.me/${s.contact.whatsappDigits}`,
    '',
    ...(suggestion ? ['SUGESTÃO DE VALORES (INTERNA, NÃO MOSTRADA AO CLIENTE)', ...suggestionLines(suggestion).map(l => `   ${l}`), ''] : []),
    `PREMIUM ESCOLHIDOS (${premium.length})`,
    ...(premium.length ? premium.map(m => `   ★ ${m.title}`) : ['   —']),
    '',
    `OPCIONAIS ESCOLHIDOS (${optional.length})`,
    ...(optional.length ? optional.map(m => `   ✓ ${m.title}`) : ['   —']),
    '',
    `BASE INCLUÍDA (${base.length})`,
    ...byGroup(base).map(([g, ms]) => `   ${g}: ${ms.map(m => m.title).join(', ')}`),
    '',
    `NÃO SELECIONADOS (${s.unselectedModules.length})`,
    ...s.unselectedModules.map(m => `   · ${m.title} (${m.tier === 'premium' ? 'premium' : 'opcional'})`),
    '',
    'OBSERVAÇÕES',
    s.notes ?? '—',
    '',
    'ORIGEM',
    `Fonte: ${s.source}`,
    `Página: ${s.attribution.landingPath ?? '—'}`,
    `Referrer: ${s.attribution.referrerHost ?? '—'}`,
    ...(utm.length ? utm.map(([k, v]) => `${k}: ${v}`) : ['Sem parâmetros de campanha']),
    '',
    `JSON (${s.schemaVersion}) em anexo.`,
  ].join('\n')

  const cell = 'padding:8px 0;border-bottom:1px solid #ECEAF0;font-size:14px;vertical-align:top'
  const h2 = 'font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#C2461A;margin:28px 0 10px'

  const html = `<!doctype html><html lang="pt-PT"><body style="margin:0;background:#F6F5F8;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#16161D">
<div style="max-width:640px;margin:0 auto;padding:28px 20px">
<div style="background:#0B0B0F;color:#F4F3F7;border-radius:14px;padding:22px 24px">
<div style="font-size:12px;letter-spacing:.12em;color:#FF6A2C;font-weight:700">CENLO FOOD BUILDER</div>
<div style="font-size:22px;font-weight:700;margin-top:6px">${esc(s.business.name)}</div>
<div style="font-size:14px;color:#A6A6B3;margin-top:6px">Referência <strong style="color:#F4F3F7">${esc(s.reference)}</strong> · ${esc(when)}</div>
<div style="font-size:14px;color:#A6A6B3;margin-top:4px">${premium.length} premium · ${optional.length} opciona${optional.length === 1 ? 'l' : 'is'} · base com ${base.length} módulos</div>
</div>
<h2 style="${h2}">Contacto</h2>
<table style="width:100%;border-collapse:collapse">${rows.map(([k, v]) => `<tr><td style="${cell};color:#6B6B78;width:150px">${k}</td><td style="${cell}">${v ? esc(v) : '—'}</td></tr>`).join('')}</table>
<p style="margin:14px 0 0"><a href="https://wa.me/${s.contact.whatsappDigits}" style="display:inline-block;background:#C2461A;color:#fff;text-decoration:none;padding:10px 16px;border-radius:8px;font-weight:600;font-size:14px">Abrir conversa no WhatsApp</a></p>
${suggestion ? `<div style="margin-top:20px;border:1px solid #F3C9B6;background:#FFF6F1;border-radius:12px;padding:14px 16px"><div style="font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#C2461A;font-weight:700">Sugestão de valores · só para você</div><div style="font-size:22px;font-weight:700;margin-top:6px">${euro(suggestion.monthlyCents)}<span style="font-size:14px;font-weight:500;color:#6B6B78">/mês por unidade</span> · ${euro(suggestion.setupCents)} <span style="font-size:14px;font-weight:500;color:#6B6B78">de implantação</span></div>${suggestionLines(suggestion).slice(1).map(l => `<div style="font-size:13px;color:#3A3A46;margin-top:4px">${esc(l)}</div>`).join('')}<div style="font-size:12px;color:#9B9BAA;margin-top:8px">O cliente não vê estes valores. Faixas: mensalidade do Essential ao Ultra, implantação idem.</div></div>` : ''}
<h2 style="${h2}">Premium escolhidos</h2>
${premium.length ? premium.map(m => `<div style="font-size:15px;padding:4px 0">★ <strong>${esc(m.title)}</strong> <span style="font-size:12px;color:#6B6B78">${esc(m.group)}</span></div>`).join('') : '<div style="font-size:14px;color:#6B6B78">Nenhum.</div>'}
<h2 style="${h2}">Opcionais escolhidos</h2>
${optional.length ? optional.map(m => `<div style="font-size:15px;padding:4px 0">✓ <strong>${esc(m.title)}</strong></div>`).join('') : '<div style="font-size:14px;color:#6B6B78">Nenhum.</div>'}
<h2 style="${h2}">Base incluída</h2>
<div style="font-size:14px;color:#3A3A46;line-height:1.7">${byGroup(base).map(([g, ms]) => `<span style="color:#6B6B78">${esc(g)}:</span> ${ms.map(m => esc(m.title)).join(', ')}`).join('<br>')}</div>
<h2 style="${h2}">Não selecionados</h2>
<div style="font-size:14px;color:#6B6B78;line-height:1.7">${s.unselectedModules.length ? s.unselectedModules.map(m => `${esc(m.title)}${m.tier === 'premium' ? ' ★' : ''}`).join(' · ') : 'Todos os módulos premium e opcionais foram escolhidos.'}</div>
<h2 style="${h2}">Observações</h2>
<div style="font-size:14px;white-space:pre-wrap;background:#fff;border:1px solid #ECEAF0;border-radius:10px;padding:12px 14px">${s.notes ? esc(s.notes) : '—'}</div>
<h2 style="${h2}">Origem</h2>
<div style="font-size:13px;color:#6B6B78;line-height:1.7">Fonte: ${s.source}<br>Página: ${esc(s.attribution.landingPath ?? '—')}<br>Referrer: ${esc(s.attribution.referrerHost ?? '—')}<br>${utm.length ? utm.map(([k, v]) => `${k}: ${esc(v)}`).join('<br>') : 'Sem parâmetros de campanha'}</div>
<p style="font-size:12px;color:#9B9BAA;margin-top:28px">Dados estruturados (${s.schemaVersion}, catálogo ${s.catalogVersion}) no anexo ${esc(s.reference)}.json. Submission ID ${s.submissionId}.</p>
</div></body></html>`

  return { subject, text, html }
}
