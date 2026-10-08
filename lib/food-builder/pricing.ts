import { MODULES } from './catalog.ts'
import type { Submission } from './submission.ts'

/**
 * Internal price suggestion for Pedro's e-mail. Never shown to the visitor.
 * Prices and setup terms come from the CRM (Diagnósticos › Preços e condições);
 * the fallback is what Pedro set on 2026-10-08. Money is integer cents.
 */

export type PlanKey = 'essential' | 'pro' | 'ultra'
export type FoodPricing = {
  plans: { key: PlanKey; label: string; setupCents: number; monthlyCents: number }[]
  terms: { installments: number; upfrontPercent: number; cashDiscountPercent: number }
  source: 'crm' | 'fallback'
}

export const FALLBACK_PRICING: FoodPricing = {
  plans: [
    { key: 'essential', label: 'Essential', setupCents: 24900, monthlyCents: 4990 },
    { key: 'pro', label: 'Pro', setupCents: 39900, monthlyCents: 7990 },
    { key: 'ultra', label: 'Ultra', setupCents: 59900, monthlyCents: 11990 },
  ],
  terms: { installments: 3, upfrontPercent: 50, cashDiscountPercent: 20 },
  source: 'fallback',
}

const DEFAULT_PRICING_URL = 'https://api-crm.cenlo.pt/crm/public/diagnostics/food/pricing'

const isCents = (n: unknown): n is number => Number.isInteger(n) && (n as number) >= 0 && (n as number) <= 1_000_000

export async function loadFoodPricing(timeoutMs = 2000, url = process.env.FOOD_PRICING_URL || DEFAULT_PRICING_URL): Promise<FoodPricing> {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(timeoutMs), cache: 'no-store' })
    if (!res.ok) return FALLBACK_PRICING
    const body = (await res.json()) as { plans?: { key?: string; label?: string; setupCents?: unknown; monthlyCents?: unknown }[]; terms?: Record<string, unknown> }
    const plans = (['essential', 'pro', 'ultra'] as const).map(key => {
      const p = body.plans?.find(x => x.key === key)
      return p && isCents(p.setupCents) && isCents(p.monthlyCents) ? { key, label: String(p.label ?? key), setupCents: p.setupCents, monthlyCents: p.monthlyCents } : null
    })
    const t = body.terms ?? {}
    const terms = { installments: t.installments, upfrontPercent: t.upfrontPercent, cashDiscountPercent: t.cashDiscountPercent }
    if (plans.some(p => !p) || !Object.values(terms).every(v => Number.isInteger(v) && (v as number) >= 0 && (v as number) <= 100)) return FALLBACK_PRICING
    return { plans: plans as FoodPricing['plans'], terms: terms as FoodPricing['terms'], source: 'crm' }
  } catch {
    // ponytail: CRM down or slow → the e-mail still goes out with Pedro's 2026-10-08 values, flagged as fallback
    return FALLBACK_PRICING
  }
}

const ULTRA_MODULES = ['loyalty', 'cenlo-delivery', 'multi-store']
const PRO_MODULES = ['ordering-site', 'table-service', 'customer-reactivation', 'promotions', 'reports', 'insights-recommendations']
const MAX_POINTS = MODULES.reduce((sum, m) => sum + (m.tier === 'premium' ? 2 : m.tier === 'optional' ? 1 : 0), 0)

export type PriceSuggestion = {
  points: number
  monthlyCents: number
  setupCents: number
  cashSetupCents: number | null
  split: { upfrontCents: number; restCents: number[] } | null
  reference: { key: PlanKey; label: string; setupCents: number; monthlyCents: number }
  source: FoodPricing['source']
}

const roundMonthly = (c: number) => Math.round(c / 1000) * 1000 - 10
const roundSetup = (c: number) => Math.round(c / 5000) * 5000 - 100
const clamp = (c: number, min: number, max: number) => Math.min(max, Math.max(min, c))

export function suggestPrice(s: Submission, pricing: FoodPricing): PriceSuggestion {
  const chosen = s.selectedModules.filter(m => m.tier !== 'base')
  const points = chosen.reduce((sum, m) => sum + (m.tier === 'premium' ? 2 : 1), 0)
  const [low, , high] = pricing.plans
  const at = (min: number, max: number) => min + Math.round(((max - min) * Math.min(points, MAX_POINTS)) / MAX_POINTS)
  const monthlyCents = clamp(points === 0 ? low!.monthlyCents : roundMonthly(at(low!.monthlyCents, high!.monthlyCents)), low!.monthlyCents, high!.monthlyCents)
  const setupCents = clamp(points === 0 ? low!.setupCents : roundSetup(at(low!.setupCents, high!.setupCents)), low!.setupCents, high!.setupCents)

  const { installments, upfrontPercent, cashDiscountPercent } = pricing.terms
  const cashSetupCents = cashDiscountPercent > 0 ? setupCents - Math.round((setupCents * cashDiscountPercent) / 100) : null
  let split: PriceSuggestion['split'] = null
  if (installments > 1 && upfrontPercent < 100) {
    const upfrontCents = Math.round((setupCents * upfrontPercent) / 100)
    const parts = installments - (upfrontCents > 0 ? 1 : 0)
    const remaining = setupCents - upfrontCents
    const each = Math.floor(remaining / parts)
    split = { upfrontCents, restCents: Array.from({ length: parts }, (_, i) => each + (i < remaining - each * parts ? 1 : 0)) }
  }

  const ids = chosen.map(m => m.id as string)
  const refKey: PlanKey = ids.some(id => ULTRA_MODULES.includes(id)) ? 'ultra' : ids.some(id => PRO_MODULES.includes(id)) ? 'pro' : 'essential'
  const reference = pricing.plans.find(p => p.key === refKey)!
  return { points, monthlyCents, setupCents, cashSetupCents, split, reference, source: pricing.source }
}
