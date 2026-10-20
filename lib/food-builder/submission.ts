import { BUSINESS_TYPES, CATALOG_VERSION, GROUPS, MODULES, type ModuleId, type Tier } from './catalog.ts'

export const SCHEMA_VERSION = 'cenlo_food_builder.submission.v2'
export const SOURCE = 'cenlo_food_builder'
export const MAX_BODY_BYTES = 16_000
export const MIN_FILL_MS = 3_000
const MAX_AGE_MS = 24 * 60 * 60 * 1000

export type ModuleRef = { id: ModuleId; slug: string; title: string; group: string; tier: Tier }

export type Submission = {
  schemaVersion: typeof SCHEMA_VERSION
  catalogVersion: string
  submissionId: string
  reference: string
  source: typeof SOURCE
  submittedAt: string
  contact: { name: string; phone: string; whatsappDigits: string; email: string | null }
  business: { name: string; city: string | null; type: string | null }
  selectedModules: ModuleRef[]
  unselectedModules: ModuleRef[]
  notes: string | null
  attribution: {
    landingPath: string | null
    referrerHost: string | null
    utm: Partial<Record<(typeof UTM_KEYS)[number], string>>
  }
}

export const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_id'] as const

export type FieldError = { field: string; message: string }
export type Result = { ok: true; submission: Submission } | { ok: false; status: number; errors: FieldError[] }

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const REF_ALPHABET = 'ABCDEFGHJKMNPQRSTVWXYZ23456789'

export async function referenceFor(submissionId: string): Promise<string> {
  const bytes = new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(submissionId.toLowerCase())))
  let out = ''
  for (let i = 0; i < 8; i++) out += REF_ALPHABET[bytes[i] % REF_ALPHABET.length]
  return `CFB-${out}`
}

export function normalizePhone(raw: string): { display: string; digits: string } | null {
  const compact = raw.replace(/[\s\-().]/g, '')
  const intl = compact.match(/^(?:\+|00)([1-9]\d{7,14})$/)
  if (intl) return { display: `+${intl[1]}`, digits: intl[1] }
  if (/^[239]\d{8}$/.test(compact)) return { display: `+351${compact}`, digits: `351${compact}` }
  return null
}

function text(v: unknown, max: number): string | null {
  if (typeof v !== 'string') return null
  const t = v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim()
  return t ? t.slice(0, max) : null
}

function ref(id: ModuleId): ModuleRef {
  const m = MODULES.find(x => x.id === id)!
  return { id: m.id, slug: m.slug, title: m.title, group: GROUPS.find(g => g.id === m.group)!.title, tier: m.tier }
}

export async function buildSubmission(input: unknown, now: number = Date.now()): Promise<Result> {
  const errors: FieldError[] = []
  const fail = (status: number, field: string, message: string): Result => ({ ok: false, status, errors: [{ field, message }] })
  if (!input || typeof input !== 'object') return fail(400, 'body', 'Pedido inválido.')
  const b = input as Record<string, unknown>
  const contact = (b.contact ?? {}) as Record<string, unknown>
  const business = (b.business ?? {}) as Record<string, unknown>
  const attribution = (b.attribution ?? {}) as Record<string, unknown>

  if (typeof b.website === 'string' && b.website.trim()) return fail(400, 'body', 'Pedido inválido.')
  if (typeof b.submissionId !== 'string' || !UUID.test(b.submissionId)) return fail(400, 'submissionId', 'Pedido inválido.')
  const startedAt = typeof b.startedAt === 'number' ? b.startedAt : NaN
  if (!Number.isFinite(startedAt) || now - startedAt > MAX_AGE_MS || startedAt > now) return fail(400, 'startedAt', 'A sessão expirou. Atualize a página e tente novamente.')
  if (now - startedAt < MIN_FILL_MS) return fail(429, 'startedAt', 'Aguarde um momento e tente novamente.')

  const name = text(contact.name, 80)
  if (!name || name.length < 2) errors.push({ field: 'name', message: 'Indique o seu nome.' })
  const businessName = text(business.name, 120)
  if (!businessName || businessName.length < 2) errors.push({ field: 'businessName', message: 'Indique o nome do estabelecimento.' })
  const phone = normalizePhone(typeof contact.phone === 'string' ? contact.phone.slice(0, 40) : '')
  if (!phone) errors.push({ field: 'phone', message: 'Indique um telemóvel português (9 dígitos) ou um número internacional com indicativo, por exemplo +34 600 000 000.' })
  const email = text(contact.email, 254)
  if (email && !EMAIL.test(email)) errors.push({ field: 'email', message: 'O e-mail não parece válido.' })
  const city = text(business.city, 80)
  const type = text(business.type, 60)
  if (type && !(BUSINESS_TYPES as readonly string[]).includes(type)) errors.push({ field: 'businessType', message: 'Escolha um tipo de estabelecimento da lista.' })
  if (typeof b.notes === 'string' && b.notes.length > 1500) errors.push({ field: 'notes', message: 'As observações podem ter até 1500 caracteres.' })
  const notes = text(b.notes, 1500)

  const raw = b.moduleIds
  if (!Array.isArray(raw) || raw.length > MODULES.length || raw.some(x => typeof x !== 'string')) {
    errors.push({ field: 'moduleIds', message: 'A configuração é inválida.' })
  } else if (raw.some(x => !MODULES.some(m => m.id === x))) {
    errors.push({ field: 'moduleIds', message: 'A configuração inclui módulos desconhecidos. Atualize a página e tente novamente.' })
  }
  if (errors.length) return { ok: false, status: 400, errors }

  const chosen = new Set<string>(raw as string[])
  const included = (m: (typeof MODULES)[number]) => m.tier === 'base' || chosen.has(m.id)
  const utm: Submission['attribution']['utm'] = {}
  for (const k of UTM_KEYS) {
    const v = text(attribution[k], 120)
    if (v) utm[k] = v
  }
  const landingPath = text(attribution.landingPath, 200)
  const referrerHost = text(attribution.referrerHost, 120)

  return {
    ok: true,
    submission: {
      schemaVersion: SCHEMA_VERSION,
      catalogVersion: CATALOG_VERSION,
      submissionId: (b.submissionId as string).toLowerCase(),
      reference: await referenceFor(b.submissionId as string),
      source: SOURCE,
      submittedAt: new Date(now).toISOString(),
      contact: { name: name!, phone: phone!.display, whatsappDigits: phone!.digits, email },
      business: { name: businessName!, city, type },
      selectedModules: MODULES.filter(included).map(m => ref(m.id)),
      unselectedModules: MODULES.filter(m => !included(m)).map(m => ref(m.id)),
      notes,
      attribution: {
        landingPath: landingPath && landingPath.startsWith('/') ? landingPath.split(/[?#]/)[0] : null,
        referrerHost: referrerHost && /^[a-z0-9.-]+$/i.test(referrerHost) ? referrerHost.toLowerCase() : null,
        utm,
      },
    },
  }
}
