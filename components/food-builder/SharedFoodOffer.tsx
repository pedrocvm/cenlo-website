'use client'

import { useEffect, useState } from 'react'
import ModuleIcon from './ModuleIcon'

type SharedOffer = {
  reference: string; isTest: boolean; expiresAt: string | null
  snapshot: {
    label: string; setupCents: number; monthlyCents: number
    composition: { moduleIds: string[]; units: number }
    included: { id: string; label: string; condition?: string }[]
    policy: { monthlyStart: string; validityText: string; taxText: string }
    payment: { cash: { cents: number; discountPercent: number } | null; split: { upfrontCents: number; restCents: number[] } | null }
  }
}
const money = (cents: number) => new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(cents / 100)

// Public read-only snapshot. Never restores the owner's session or exposes contacts/answers.
export default function SharedFoodOffer({ id }: { id: string }) {
  const [offer, setOffer] = useState<SharedOffer | null>(null)
  const [error, setError] = useState('')
  useEffect(() => {
    const controller = new AbortController()
    fetch(`/api/food-builder/autonomous/offers/${encodeURIComponent(id)}`, { signal: controller.signal, cache: 'no-store' })
      .then(async res => { if (!res.ok) throw new Error('Não foi possível carregar esta solução.'); return res.json() })
      .then(setOffer).catch(e => { if (e.name !== 'AbortError') setError(e.message) })
    return () => controller.abort()
  }, [id])
  if (error) return <section className="fr"><h1>Solução indisponível</h1><p role="alert">{error} A referência enviada pelo WhatsApp permite identificar a oferta.</p></section>
  if (!offer) return <p role="status">A carregar a solução escolhida…</p>
  const s = offer.snapshot
  return <section className="fr">
    {offer.isTest && <p className="fr-test">Ambiente de teste · sem cobrança ou ativação.</p>}
    <header className="fr-hero"><div><span className="fr-kicker">Solução partilhada</span><h1>Cenlo Food {s.label}</h1><p>A composição e os valores da oferta consultada. Esta página não confirma contratação nem reserva benefícios.</p></div></header>
    <section className="fr-plan">
      <div className="fr-prices"><div className="fr-price"><div className="fr-price-label">Implantação · à vista</div><strong>{money(s.payment.cash?.cents ?? s.setupCents)}</strong>{s.payment.split && <p>Em prestações: {money(s.setupCents)} no total.</p>}</div><div className="fr-price"><div className="fr-price-label">Mensalidade por unidade</div><strong>{money(s.monthlyCents)}<small>/mês</small></strong><p>{s.policy.monthlyStart}</p></div></div>
      <p>{s.policy.taxText}</p><p>{s.policy.validityText}</p>
      {offer.expiresAt && <p>Validade desta versão: {new Date(offer.expiresAt).toLocaleDateString('pt-PT')}.</p>}
    </section>
    <section className="fr-scope"><h2>Recursos da solução</h2><ul className="fr-features">{s.included.map(item => <li key={item.id}><ModuleIcon name="orders" /><div><h3>{item.label}</h3><span className="fr-included">{s.composition.moduleIds.includes(item.id) ? 'Na composição escolhida' : 'Incluído no plano'}</span>{item.condition && <p>{item.condition}</p>}</div></li>)}</ul></section>
    <p className="fr-reference">Referência: {offer.reference}</p>
  </section>
}
