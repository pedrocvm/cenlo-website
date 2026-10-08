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

export function renderEmail(s: Submission) {
  const subject = `Nova configuração Cenlo Food | Referência ${s.reference} | ${s.business.name}`
  const when = lisbonTime(s.submittedAt)
  const optional = s.selectedModules.filter(m => !m.required)
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
    `MÓDULOS SELECIONADOS (${optional.length} + base)`,
    ...byGroup(s.selectedModules).flatMap(([g, ms]) => [`  ${g}`, ...ms.map(m => `   ✓ ${m.title}${m.required ? ' (base incluída)' : ''}`)]),
    '',
    `NÃO SELECIONADOS (${s.unselectedModules.length})`,
    ...s.unselectedModules.map(m => `   · ${m.title}`),
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
<div style="font-size:14px;color:#A6A6B3;margin-top:4px">${optional.length} módulo${optional.length === 1 ? '' : 's'} selecionado${optional.length === 1 ? '' : 's'} + base incluída</div>
</div>
<h2 style="${h2}">Contacto</h2>
<table style="width:100%;border-collapse:collapse">${rows.map(([k, v]) => `<tr><td style="${cell};color:#6B6B78;width:150px">${k}</td><td style="${cell}">${v ? esc(v) : '—'}</td></tr>`).join('')}</table>
<p style="margin:14px 0 0"><a href="https://wa.me/${s.contact.whatsappDigits}" style="display:inline-block;background:#C2461A;color:#fff;text-decoration:none;padding:10px 16px;border-radius:8px;font-weight:600;font-size:14px">Abrir conversa no WhatsApp</a></p>
<h2 style="${h2}">Módulos selecionados</h2>
${byGroup(s.selectedModules).map(([g, ms]) => `<div style="margin-bottom:12px"><div style="font-size:13px;color:#6B6B78;margin-bottom:4px">${esc(g)}</div>${ms.map(m => `<div style="font-size:15px;padding:3px 0">✓ <strong>${esc(m.title)}</strong>${m.required ? ' <span style="font-size:12px;color:#C2461A">base incluída</span>' : ''}</div>`).join('')}</div>`).join('')}
<h2 style="${h2}">Não selecionados</h2>
<div style="font-size:14px;color:#6B6B78;line-height:1.7">${s.unselectedModules.length ? s.unselectedModules.map(m => esc(m.title)).join(' · ') : 'Todos os módulos foram selecionados.'}</div>
<h2 style="${h2}">Observações</h2>
<div style="font-size:14px;white-space:pre-wrap;background:#fff;border:1px solid #ECEAF0;border-radius:10px;padding:12px 14px">${s.notes ? esc(s.notes) : '—'}</div>
<h2 style="${h2}">Origem</h2>
<div style="font-size:13px;color:#6B6B78;line-height:1.7">Fonte: ${s.source}<br>Página: ${esc(s.attribution.landingPath ?? '—')}<br>Referrer: ${esc(s.attribution.referrerHost ?? '—')}<br>${utm.length ? utm.map(([k, v]) => `${k}: ${esc(v)}`).join('<br>') : 'Sem parâmetros de campanha'}</div>
<p style="font-size:12px;color:#9B9BAA;margin-top:28px">Dados estruturados (${s.schemaVersion}, catálogo ${s.catalogVersion}) no anexo ${esc(s.reference)}.json. Submission ID ${s.submissionId}.</p>
</div></body></html>`

  return { subject, text, html }
}
