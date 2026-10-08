import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { GROUPS, MODULES } from './catalog.ts'
import { SCREENSHOTS } from './screenshots.ts'
import { buildSubmission, normalizePhone, referenceFor } from './submission.ts'
import { renderEmail } from './email.ts'

const expectedByGroup: Record<string, string[]> = {
  operations: ['orders-core', 'whatsapp-assistant', 'kitchen-display', 'auto-printing'],
  channels: ['ordering-site', 'counter-phone', 'scheduled-orders', 'table-service'],
  delivery: ['delivery-zones', 'delivery-radius', 'cenlo-delivery', 'customer-updates'],
  revenue: ['promotions', 'customer-crm', 'customer-reactivation', 'loyalty'],
  intelligence: ['cenlo-intelligence', 'forecasting', 'insights-recommendations', 'reports', 'closings-summaries'],
  structure: ['multi-store', 'team-permissions', 'audit-trail', 'help-training'],
}

test('catalog: 25 modules in the expected six groups, stable unique ids and slugs', () => {
  assert.equal(MODULES.length, 25)
  assert.deepEqual(GROUPS.map(g => g.id), Object.keys(expectedByGroup))
  for (const g of GROUPS) assert.deepEqual(MODULES.filter(m => m.group === g.id).map(m => m.id), expectedByGroup[g.id])
  assert.equal(new Set(MODULES.map(m => m.id)).size, 25)
  assert.equal(new Set(MODULES.map(m => m.slug)).size, 25)
  for (const m of MODULES) assert.match(m.slug, /^[a-z0-9]+(-[a-z0-9]+)*$/)
})

const premiumIds = ['ordering-site', 'table-service', 'cenlo-delivery', 'promotions', 'customer-reactivation', 'loyalty', 'multi-store']
const optionalIds = ['auto-printing', 'scheduled-orders', 'delivery-radius', 'cenlo-intelligence', 'forecasting', 'insights-recommendations', 'reports', 'audit-trail']

test('catalog: tiers match the commercial definition and every module has full detail content', () => {
  assert.deepEqual(MODULES.filter(m => m.tier === 'premium').map(m => m.id), premiumIds)
  assert.deepEqual(MODULES.filter(m => m.tier === 'optional').map(m => m.id), optionalIds)
  assert.equal(MODULES.filter(m => m.tier === 'base').length, 10)
  for (const id of ['orders-core', 'whatsapp-assistant', 'kitchen-display', 'counter-phone', 'delivery-zones', 'customer-updates', 'customer-crm', 'closings-summaries', 'team-permissions', 'help-training'])
    assert.equal(MODULES.find(m => m.id === id)?.tier, 'base', id)
  for (const m of MODULES) {
    for (const k of ['problem', 'flow', 'deliverables', 'fit'] as const) assert.ok(m[k].length > 0, `${m.id}.${k}`)
    assert.ok(m.promise && m.summary, m.id)
  }
})

test('catalog: no pricing, plans or money in user-facing copy', () => {
  const copy = JSON.stringify([GROUPS, MODULES])
  assert.equal(copy.match(/.{0,40}(€|euros?\b|mensalidade|\/m[eê]s|\bplanos?\b|grátis durante|desde \d).{0,20}/i)?.[0], undefined)
})

function webpSize(path: string) {
  const b = readFileSync(path)
  assert.equal(b.toString('ascii', 0, 4), 'RIFF')
  assert.equal(b.toString('ascii', 8, 12), 'WEBP')
  const chunk = b.toString('ascii', 12, 16)
  if (chunk === 'VP8X') return { width: 1 + b.readUIntLE(24, 3), height: 1 + b.readUIntLE(27, 3) }
  if (chunk === 'VP8L') {
    const bits = b.readUInt32LE(21)
    return { width: 1 + (bits & 0x3fff), height: 1 + ((bits >> 14) & 0x3fff) }
  }
  return { width: b.readUInt16LE(26) & 0x3fff, height: b.readUInt16LE(28) & 0x3fff }
}

test('screenshots: every manifest entry exists with the declared dimensions and a caption', () => {
  const ids = new Set(MODULES.map(m => m.id as string))
  for (const [id, shots] of Object.entries(SCREENSHOTS)) {
    assert.ok(ids.has(id), `unknown module ${id}`)
    for (const s of shots!) {
      const size = webpSize(fileURLToPath(new URL(`../../public${s.src}`, import.meta.url)))
      assert.deepEqual(size, { width: s.width, height: s.height }, s.src)
      assert.ok(s.alt.length > 10 && s.caption.length > 10, s.src)
    }
  }
})

test('phone: Portuguese national and international numbers', () => {
  assert.deepEqual(normalizePhone('912 345 678'), { display: '+351912345678', digits: '351912345678' })
  assert.deepEqual(normalizePhone('253-123-456'), { display: '+351253123456', digits: '351253123456' })
  assert.deepEqual(normalizePhone('+351 912 345 678'), { display: '+351912345678', digits: '351912345678' })
  assert.deepEqual(normalizePhone('0034 600 000 000'), { display: '+34600000000', digits: '34600000000' })
  assert.deepEqual(normalizePhone('+55 (11) 98765-4321'), { display: '+5511987654321', digits: '5511987654321' })
  for (const bad of ['', '12345', '812345678', '+0 123 456 789', '91234567a', '+351 9123456789012345']) assert.equal(normalizePhone(bad), null, bad)
})

const now = Date.UTC(2026, 9, 8, 10, 0, 0)
const id = '3f2b8c1e-7a4d-4e2b-9c11-2d5e6f7a8b9c'
function input(over: Record<string, unknown> = {}) {
  return {
    submissionId: id,
    startedAt: now - 60_000,
    website: '',
    contact: { name: 'Marta Silva', phone: '912 345 678', email: '' },
    business: { name: 'Casa <Teste>', city: 'Braga', type: 'Pizzaria' },
    notes: 'Fazemos 60 pedidos <b>por noite</b>.',
    moduleIds: ['loyalty', 'ordering-site', 'forecasting'],
    attribution: { utm_source: 'whatsapp', landingPath: '/food/montar?utm_source=whatsapp', referrerHost: 'l.instagram.com' },
    ...over,
  }
}

test('submission: base modules are always selected, chosen modules added, the rest unselected', async () => {
  const r = await buildSubmission(input(), now)
  assert.ok(r.ok)
  const s = r.submission
  assert.equal(s.source, 'cenlo_food_builder')
  assert.equal(s.schemaVersion, 'cenlo_food_builder.submission.v2')
  assert.match(s.reference, /^CFB-[A-Z0-9]{8}$/)
  assert.equal(s.reference, await referenceFor(id))
  assert.equal(s.submittedAt, '2026-10-08T10:00:00.000Z')
  assert.deepEqual(s.selectedModules.filter(m => m.tier !== 'base').map(m => m.id), ['ordering-site', 'loyalty', 'forecasting'])
  assert.equal(s.selectedModules.filter(m => m.tier === 'base').length, 10)
  assert.equal(s.selectedModules.length + s.unselectedModules.length, 25)
  assert.ok(s.unselectedModules.every(m => m.tier !== 'base'))
  assert.ok(s.unselectedModules.some(m => m.id === 'promotions' && m.tier === 'premium'))
  assert.equal(s.contact.phone, '+351912345678')
  assert.equal(s.contact.email, null)
  assert.equal(s.attribution.landingPath, '/food/montar')
  assert.deepEqual(s.attribution.utm, { utm_source: 'whatsapp' })
})

test('submission: rejects untrusted input', async () => {
  const cases: [Record<string, unknown>, number, string][] = [
    [{ moduleIds: ['loyalty', 'made-up'] }, 400, 'moduleIds'],
    [{ moduleIds: 'loyalty' }, 400, 'moduleIds'],
    [{ website: 'http://spam' }, 400, 'body'],
    [{ startedAt: now - 500 }, 429, 'startedAt'],
    [{ startedAt: now - 2 * 24 * 3600_000 }, 400, 'startedAt'],
    [{ submissionId: 'not-a-uuid' }, 400, 'submissionId'],
    [{ contact: { name: ' ', phone: '912345678' } }, 400, 'name'],
    [{ contact: { name: 'Ana', phone: '12' } }, 400, 'phone'],
    [{ contact: { name: 'Ana', phone: '912345678', email: 'x@' } }, 400, 'email'],
    [{ business: { name: 'Loja', type: 'Ourivesaria' } }, 400, 'businessType'],
    [{ business: { name: '' } }, 400, 'businessName'],
    [{ notes: 'x'.repeat(1501) }, 400, 'notes'],
  ]
  for (const [over, status, field] of cases) {
    const r = await buildSubmission(input(over), now)
    assert.ok(!r.ok, JSON.stringify(over))
    assert.equal(r.status, status, JSON.stringify(over))
    assert.ok(r.errors.some(e => e.field === field), `${JSON.stringify(over)} -> ${JSON.stringify(r.errors)}`)
  }
  assert.ok(!(await buildSubmission(null, now)).ok)
})

test('email: subject, reference, all modules and escaped visitor text', async () => {
  const r = await buildSubmission(input(), now)
  assert.ok(r.ok)
  const { subject, html, text } = renderEmail(r.submission)
  assert.equal(subject, `Nova configuração Cenlo Food | Referência ${r.submission.reference} | Casa <Teste>`)
  for (const m of MODULES) {
    assert.ok(text.includes(m.title), m.title)
    assert.ok(html.includes(m.title), m.title)
  }
  assert.ok(html.includes('Casa &lt;Teste&gt;') && !html.includes('<b>por noite</b>'))
  assert.ok(text.includes('8 de outubro de 2026') && text.includes('11:00'), 'Lisbon local time (WEST, UTC+1)')
  assert.ok(html.includes('https://wa.me/351912345678'))
  assert.ok(text.includes('utm_source: whatsapp'))
  assert.match(text, /PREMIUM ESCOLHIDOS \(2\)\n   ★ Site de Pedidos\n   ★ Fidelização/)
  assert.match(text, /OPCIONAIS ESCOLHIDOS \(1\)\n   ✓ Previsões/)
  assert.match(text, /BASE INCLUÍDA \(10\)/)
  assert.match(text, /· Promoções \(premium\)/)
})
