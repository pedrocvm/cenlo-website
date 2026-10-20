export const OFFER = 'site-pizzaria-14990'
export const LANDING_VERSION = '2.0.0'
export const CONSENT_TEXT = 'Autorizo a Cenlo a falar comigo pelo WhatsApp sobre este pedido.'

const ATTRIBUTION_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'utm_id', 'fbclid', 'gclid'] as const
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/

export type LeadField = 'firstName' | 'business' | 'phone' | 'consent' | 'submissionId'
export type LeadError = { field: LeadField; message: string }

export type SitePizzariaLead = {
  submissionId: string
  reference: string
  offer: typeof OFFER
  landingVersion: string
  firstName: string
  business: string
  phone: string
  currentLink: string | null
  consent: true
  consentText: string
  pageUrl: string | null
  referrer: string | null
  timezone: string | null
  attribution: Partial<Record<(typeof ATTRIBUTION_KEYS)[number], string>>
  campaignId: string | null
  createdAt: string
}

function clean(value: unknown, max: number) {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

export function referenceFor(submissionId: string) {
  return `SPZ-${submissionId.slice(0, 8).toUpperCase()}`
}

/** The server's word on a lead. The browser repeats these checks only to answer sooner. */
export function validateLead(body: Record<string, unknown>, now: Date): { lead: SitePizzariaLead } | { error: LeadError } {
  const submissionId = clean(body.submissionId, 36).toLowerCase()
  const firstName = clean(body.firstName, 60)
  const business = clean(body.business, 120)
  const phone = clean(body.phone, 24)
  const digits = phone.replace(/\D/g, '')

  if (!UUID.test(submissionId)) return { error: { field: 'submissionId', message: 'Recarregue a página e tente novamente.' } }
  if (firstName.length < 2) return { error: { field: 'firstName', message: 'Escreva o seu primeiro nome.' } }
  if (business.length < 2) return { error: { field: 'business', message: 'Escreva o nome da pizzaria.' } }
  if (digits.length < 9 || digits.length > 15 || /[^\d\s()+.-]/.test(phone)) {
    return { error: { field: 'phone', message: 'Confira o número de WhatsApp. Ex.: 912 345 678 ou +351 912 345 678.' } }
  }
  if (body.consent !== true) return { error: { field: 'consent', message: 'Marque a autorização para a gente responder no WhatsApp.' } }

  const source = body.attribution && typeof body.attribution === 'object' && !Array.isArray(body.attribution)
    ? body.attribution as Record<string, unknown>
    : {}
  const attribution = Object.fromEntries(
    ATTRIBUTION_KEYS.map(key => [key, clean(source[key], 180)]).filter(([, v]) => v),
  ) as SitePizzariaLead['attribution']

  return {
    lead: {
      submissionId,
      reference: referenceFor(submissionId),
      offer: OFFER,
      landingVersion: LANDING_VERSION,
      firstName,
      business,
      phone,
      currentLink: clean(body.currentLink, 220) || null,
      consent: true,
      consentText: CONSENT_TEXT,
      pageUrl: clean(body.pageUrl, 500) || null,
      referrer: clean(body.referrer, 500) || null,
      timezone: clean(body.timezone, 80) || null,
      attribution,
      campaignId: attribution.utm_id || attribution.utm_campaign || null,
      createdAt: now.toISOString(),
    },
  }
}
