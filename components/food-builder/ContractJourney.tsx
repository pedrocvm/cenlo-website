'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { consentToken, contactReceived } from './FoodAcquisition'
import { readAttribution } from './CaptureAttribution'

const API = '/api/food-builder/autonomous'
const KEY = 'cenlo-food-contract:v1'
type PlanKey = 'essential' | 'pro' | 'ultra'
const PLANS: PlanKey[] = ['essential', 'pro', 'ultra']
const LABEL: Record<PlanKey, string> = { essential: 'Essential', pro: 'Pro', ultra: 'Ultra' }
const RANK: Record<PlanKey, number> = { essential: 0, pro: 1, ultra: 2 }
const BASE_OF: Record<PlanKey, string | null> = { essential: null, pro: 'Tudo do Essential, mais:', ultra: 'Tudo do Pro, mais:' }
const PLACEMENTS = ['header', 'hero', 'sticky', 'demo', 'solutions', 'plans', 'faq', 'closing']

type Cap = { id: string; label: string; plan: PlanKey; condition?: string }
type Policy = { monthlyStart: string; installmentDue: string[]; taxText: string; subscriptionTerms?: string[] }
type Catalog = { capabilities: Cap[]; plans: Record<PlanKey, { setupCents: number; monthlyCents: number }>; policy: Policy }
type Payment = { cash: { cents: number; savedCents: number } | null; split: { upfrontCents: number; restCents: number[] } | null }
type Offer = { id: string; snapshot: { plan: PlanKey; setupCents: number; monthlyCents: number; payment: Payment; policy: Policy; included: Cap[] } }
type Receipt = { reference: string; kind: 'implementation' | 'evaluation'; units: number; plan: PlanKey }
type Saved = { sessionKey: string; receipt?: Receipt }

/** Whole euros without cents, as the landing writes them: €299, €149,50. Integer cents only. */
function eur(cents: number) {
  const euros = Math.trunc(cents / 100).toLocaleString('pt-BR')
  const rest = Math.abs(cents % 100)
  return `€${euros}${rest ? ',' + String(rest).padStart(2, '0') : ''}`
}

function load(): Saved {
  try {
    const saved = JSON.parse(sessionStorage.getItem(KEY) || 'null') as Saved | null
    if (saved?.sessionKey) return saved
  } catch { /* the page still works without storage */ }
  return { sessionKey: crypto.randomUUID() }
}
function store(s: Saved) { try { sessionStorage.setItem(KEY, JSON.stringify(s)) } catch { /* see load */ } }

async function call<T>(path: string, sessionKey: string, body?: unknown): Promise<T> {
  const res = await fetch(API + path, { method: body ? 'POST' : 'GET', headers: { 'content-type': 'application/json', 'x-food-session': sessionKey }, body: body ? JSON.stringify(body) : undefined })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.message || 'Não conseguimos continuar agora. Tente de novo.')
  return data as T
}

export default function ContractJourney() {
  const params = useSearchParams()
  const asked = params.get('plano') as PlanKey | null
  const initialPlan: PlanKey = asked && PLANS.includes(asked) ? asked : 'pro'
  const via = PLACEMENTS.includes(params.get('via') || '') ? params.get('via')! : 'direct'
  const [saved, setSaved] = useState<Saved | null>(null)
  const [isTest, setIsTest] = useState(false)
  const [catalog, setCatalog] = useState<Catalog | null>(null)
  const [plan, setPlan] = useState<PlanKey>(initialPlan)
  const [moreUnits, setMoreUnits] = useState(false)
  const [units, setUnits] = useState(2)
  const [offer, setOffer] = useState<Offer | null>(null)
  const [payment, setPayment] = useState<'split' | 'cash'>('split')
  const [contact, setContact] = useState({ name: '', business: '', phone: '', email: '' })
  const [decision, setDecision] = useState<'' | 'self' | 'together' | 'research'>('')
  const [trap, setTrap] = useState('')
  const [confirmed, setConfirmed] = useState(false)
  const [loadError, setLoadError] = useState('')
  const [sendError, setSendError] = useState('')
  const [sending, setSending] = useState(false)
  const started = useRef(false)

  const event = (name: string, props: Record<string, unknown>) => { if (!isTest) window.CenloAcquisition?.event(name, props) }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- the tab's session and the host only exist after hydration.
    const s = load(); store(s); setSaved(s)
    setIsTest(!['cenlofood.cenlo.pt', 'cenlo.pt', 'www.cenlo.pt'].includes(location.hostname) || params.get('test') === '1')
    call<{ snapshot: Catalog }>('/catalog', s.sessionKey).then(r => setCatalog(r.snapshot)).catch(e => setLoadError(e.message))
  }, [params])

  useEffect(() => {
    if (!saved || started.current || saved.receipt) return
    started.current = true
    event('food_contract_started', { plan: initialPlan })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saved, isTest])

  const moduleIds = (p: PlanKey) => catalog ? catalog.capabilities.filter(c => RANK[c.plan] <= RANK[p]).map(c => c.id) : []
  const composition = (p: PlanKey, n: number) => ({ moduleIds: moduleIds(p), preferences: [], units: n, integration: 'none', priority: 'sem_prioridade' })
  const journey = () => [`landing:${via}`, `plan:${initialPlan}`, ...(plan !== initialPlan ? [`plan:${plan}`] : []), 'contract:review']

  useEffect(() => {
    if (!catalog || !saved || moreUnits) return
    let live = true
    call<{ state: string; offer?: Offer }>('/offers', saved.sessionKey, { sessionKey: saved.sessionKey, entry: 'landing', composition: composition(plan, 1), isTest, attribution: readAttribution(), journey: journey() })
      .then(r => { if (!live) return; if (r.offer) setOffer(r.offer); else setLoadError('Esse plano precisa de uma avaliação antes de mostrar o valor. Fale com a gente pelo WhatsApp.') })
      .catch(e => { if (live) setLoadError(e.message) })
    return () => { live = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catalog, saved, plan, moreUnits, isTest])

  function choosePlan(p: PlanKey) {
    if (p === plan) return
    setPlan(p); setConfirmed(false); setLoadError('')
    event('food_plan_selected', { plan: p, placement: 'contract' })
  }

  const valid = contact.name.trim().length >= 2 && contact.business.trim().length >= 2 && contact.phone.replace(/\D/g, '').length >= 8
    && (!contact.email.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email.trim())) && (moreUnits || !!decision)
  // An offer belongs to one plan; while the next one loads, nothing from the previous plan is shown.
  const current = offer?.snapshot.plan === plan ? offer : null
  const ready = valid && confirmed && !sending && (moreUnits ? !!catalog && units >= 2 : !!current)

  async function send() {
    if (!ready || !saved) return
    setSending(true); setSendError('')
    const person = { name: contact.name.trim(), business: contact.business.trim(), phone: contact.phone.trim(), email: contact.email.trim() }
    try {
      const r = moreUnits
        ? await call<{ saved: boolean; reference: string; leadEventId?: string }>('/evaluations', saved.sessionKey, { submissionId: crypto.randomUUID(), sessionKey: saved.sessionKey, entry: 'landing', attribution: readAttribution(), isTest, composition: composition(plan, units), contact: person, consentToken: consentToken(), question: '', confirmation: true, website: trap, journey: journey() })
        : await call<{ saved: boolean; reference: string; leadEventId?: string }>('/requests', saved.sessionKey, { submissionId: crypto.randomUUID(), offerId: current!.id, sessionKey: saved.sessionKey, kind: 'implementation', payment, contact: person, decision, consentToken: consentToken(), confirmation: true, website: trap })
      if (!r.saved) throw new Error('')
      const kind = moreUnits ? 'evaluation' : 'implementation'
      if (!isTest && r.leadEventId) contactReceived(r.leadEventId, kind)
      const next = { ...saved, receipt: { reference: r.reference, kind, units: moreUnits ? units : 1, plan } as Receipt }
      store(next); setSaved(next); window.scrollTo({ top: 0 })
    } catch (e) {
      setSendError((e as Error).message || 'Não conseguimos registrar seu pedido agora. Seus dados continuam aqui. Tente de novo.')
    } finally { setSending(false) }
  }

  if (saved?.receipt) return <Done receipt={saved.receipt} isTest={isTest} />

  const s = current?.snapshot
  const policy = s?.policy ?? catalog?.policy
  const monthly = s?.monthlyCents ?? catalog?.plans[plan].monthlyCents ?? 0
  const own = catalog?.capabilities.filter(c => c.plan === plan) ?? []
  const included = s?.included ?? catalog?.capabilities.filter(c => RANK[c.plan] <= RANK[plan]) ?? []
  const split = s?.payment.split, cash = s?.payment.cash
  const schedule = !s ? [] : payment === 'cash' && cash
    ? [{ when: 'Mês 1', total: cash.cents, note: policy?.installmentDue[0] }, { when: 'A partir do mês 2', total: monthly, note: 'Só a mensalidade.' }]
    : split
      ? [{ when: 'Mês 1', total: split.upfrontCents, note: policy?.installmentDue[0] },
        ...split.restCents.map((c, i) => ({ when: `Mês ${i + 2}`, total: c + monthly, note: `${eur(c)} da implantação e ${eur(monthly)} de mensalidade.` })),
        { when: `A partir do mês ${split.restCents.length + 2}`, total: monthly, note: 'Só a mensalidade.' }]
      : []

  return (
    <main id="main" className="ct-main">
      {isTest && <p className="ct-test">Ambiente de teste: nada é cobrado nem ativado.</p>}
      <h1 className="ct-title">Começar com o Cenlo Food</h1>
      <p className="ct-lede">Confira o plano, escolha como pagar a implantação e deixe seus dados. Depois de enviar, a gente confere a configuração com você e combina o início. Nada é cobrado agora.</p>
      {loadError && !catalog && <p className="ct-alert" role="alert">{loadError}</p>}

      <section className="ct-step" aria-labelledby="ct-plan">
        <h2 id="ct-plan"><span>1</span> Seu plano</h2>
        <div className="ct-plans" role="radiogroup" aria-label="Plano">
          {PLANS.map(p => (
            <button key={p} type="button" role="radio" aria-checked={plan === p} className="ct-plan" onClick={() => choosePlan(p)} disabled={!catalog}>
              <span className="ct-plan-name">{LABEL[p]}{p === 'pro' && <em>Recomendado</em>}</span>
              <strong>{catalog ? eur(catalog.plans[p].monthlyCents) : '…'}</strong>
              <small>por mês, por unidade</small>
            </button>
          ))}
        </div>
        {catalog && (
          <div className="ct-scope">
            <p className="ct-scope-title">{BASE_OF[plan] ?? 'O que entra no Essential:'}</p>
            <ul>{own.slice(0, plan === 'essential' ? 8 : 8).map(c => <li key={c.id}>{c.label}{c.condition && <small>{c.condition}</small>}</li>)}</ul>
            <details className="ct-more">
              <summary>Ver tudo o que está incluído ({included.length})</summary>
              <ul>{included.map(c => <li key={c.id}>{c.label}{c.condition && <small>{c.condition}</small>}</li>)}</ul>
            </details>
          </div>
        )}
      </section>

      <section className="ct-step" aria-labelledby="ct-setup">
        <h2 id="ct-setup"><span>2</span> Implantação</h2>
        <p className="ct-hint">A implantação é a mesma em qualquer plano. Cobre a configuração, o cardápio inicial, os canais contratados, as regras, os testes, o treinamento e a entrada em operação.</p>
        <fieldset className="ct-units">
          <legend>Quantas unidades?</legend>
          <label><input type="radio" name="units" checked={!moreUnits} onChange={() => { setMoreUnits(false); setLoadError('') }} /> Uma</label>
          <label><input type="radio" name="units" checked={moreUnits} onChange={() => setMoreUnits(true)} /> Mais de uma</label>
          {moreUnits && <label className="ct-count">Quantas<input type="number" min={2} max={200} inputMode="numeric" value={units} onChange={e => setUnits(Math.max(2, Math.min(200, Math.trunc(Number(e.target.value) || 2))))} /></label>}
        </fieldset>
        {moreUnits ? (
          <p className="ct-note">Com {units} unidades, a mensalidade do {LABEL[plan]} fica {eur(monthly * units)} por mês ({eur(monthly)} por unidade). A implantação de mais de uma unidade a gente avalia com você antes de fechar o valor.</p>
        ) : !s ? (
          <div className="ct-skel" aria-busy="true">{loadError ? <p role="alert">{loadError}</p> : 'Carregando os valores…'}</div>
        ) : (
          <>
            <div className="ct-pay" role="radiogroup" aria-label="Como pagar a implantação">
              {split && (
                <label className={payment === 'split' ? 'is-on' : ''}>
                  <input type="radio" name="payment" checked={payment === 'split'} onChange={() => setPayment('split')} />
                  <span><b>Parcelada</b><strong>{eur(s.setupCents)}</strong><small>{eur(split.upfrontCents)} para começar e {split.restCents.length} de {eur(split.restCents[0]!)}</small></span>
                </label>
              )}
              {cash && (
                <label className={payment === 'cash' ? 'is-on' : ''}>
                  <input type="radio" name="payment" checked={payment === 'cash'} onChange={() => setPayment('cash')} />
                  <span><b>À vista</b><strong>{eur(cash.cents)}</strong><small>Pagamento único, {eur(cash.savedCents)} a menos</small></span>
                </label>
              )}
            </div>
            <h3 className="ct-sub">Como fica o pagamento</h3>
            <ol className="ct-schedule">
              {schedule.map(r => <li key={r.when}><span>{r.when}</span><strong>{eur(r.total)}</strong>{r.note && <small>{r.note}</small>}</li>)}
            </ol>
          </>
        )}
        <p className="ct-hint">Quer ajustar recurso por recurso? <Link href="/configurar">Abrir o configurador</Link></p>
      </section>

      <section className="ct-step" aria-labelledby="ct-data">
        <h2 id="ct-data"><span>3</span> Seus dados</h2>
        <div className="ct-fields">
          <label>Seu nome<input autoComplete="name" value={contact.name} onChange={e => setContact({ ...contact, name: e.target.value })} /></label>
          <label>Nome do restaurante<input autoComplete="organization" value={contact.business} onChange={e => setContact({ ...contact, business: e.target.value })} /></label>
          <label>WhatsApp<input type="tel" autoComplete="tel" value={contact.phone} onChange={e => setContact({ ...contact, phone: e.target.value })} /><small>É por aqui que a gente fala com você.</small></label>
          <label><span>E-mail <i>(opcional)</i></span><input type="email" autoComplete="email" value={contact.email} onChange={e => setContact({ ...contact, email: e.target.value })} /></label>
          <input className="ct-trap" tabIndex={-1} autoComplete="off" aria-hidden="true" value={trap} onChange={e => setTrap(e.target.value)} />
        </div>
        {!moreUnits && (
          <fieldset className="ct-units">
            <legend>Quem decide a contratação?</legend>
            {([['self', 'Eu decido'], ['together', 'Decido com outra pessoa'], ['research', 'Estou vendo para quem decide']] as const).map(([v, label]) => (
              <label key={v}><input type="radio" name="decision" checked={decision === v} onChange={() => setDecision(v)} /> {label}</label>
            ))}
          </fieldset>
        )}
      </section>

      <section className="ct-step" aria-labelledby="ct-review">
        <h2 id="ct-review"><span>4</span> Revisar e enviar</h2>
        <dl className="ct-summary">
          <div><dt>Plano</dt><dd>{LABEL[plan]}</dd></div>
          <div><dt>Mensalidade</dt><dd>{eur(monthly)} por unidade{moreUnits ? `, ${eur(monthly * units)} com ${units} unidades` : ''}</dd></div>
          <div><dt>Implantação</dt><dd>{moreUnits ? 'Avaliada com você' : s ? (payment === 'cash' && cash ? `${eur(cash.cents)} à vista` : `${eur(s.setupCents)} parcelada`) : '…'}</dd></div>
          {!moreUnits && schedule[0] && <div><dt>Primeiro pagamento</dt><dd>{eur(schedule[0].total)}, só depois de combinarmos a implantação</dd></div>}
        </dl>
        {policy?.subscriptionTerms?.length ? <ul className="ct-terms">{policy.subscriptionTerms.map(t => <li key={t}>{t}</li>)}</ul> : null}
        {policy && <p className="ct-hint">{policy.taxText}</p>}
        <label className="ct-confirm"><input type="checkbox" checked={confirmed} onChange={e => setConfirmed(e.target.checked)} />
          <span>Entendi que este é um pedido de contratação. A conta só é ativada depois de conferirmos a configuração e fazermos a implantação, e nada é cobrado agora.</span></label>
        {sendError && <p className="ct-alert" role="alert">{sendError} <a href="https://wa.me/351912333313" target="_blank" rel="noopener noreferrer">Falar no WhatsApp</a></p>}
        <button type="button" className="ct-send" disabled={!ready} onClick={send}>{sending ? 'Enviando…' : moreUnits ? 'Enviar pedido de avaliação' : 'Enviar pedido de contratação'}</button>
        {!valid && <p className="ct-hint">Preencha nome, restaurante e WhatsApp{moreUnits ? '' : ' e diga quem decide'} para enviar.</p>}
      </section>
    </main>
  )
}

function Done({ receipt, isTest }: { receipt: Receipt; isTest: boolean }) {
  return (
    <main id="main" className="ct-main ct-done">
      {isTest && <p className="ct-test">Ambiente de teste: nada é cobrado nem ativado.</p>}
      <div className="ct-check" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none"><path d="m8 16 5.5 5.5L25 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
      <h1 className="ct-title">{receipt.kind === 'evaluation' ? 'Pedido de avaliação recebido.' : 'Pedido de contratação recebido.'}</h1>
      <p className="ct-lede">Referência {receipt.reference}. Plano {LABEL[receipt.plan]}{receipt.units > 1 ? `, ${receipt.units} unidades` : ''}.</p>
      <h2 className="ct-sub">O que acontece agora</h2>
      <ol className="ct-next">
        <li>O Pedro confere os dados e fala com você pelo WhatsApp.</li>
        <li>{receipt.kind === 'evaluation' ? 'Vocês conversam sobre as unidades e fecham o valor da implantação.' : 'Vocês conferem juntos a configuração e combinam o início da implantação.'}</li>
        <li>A conta é ativada depois da implantação.</li>
      </ol>
      <p className="ct-hint">Nenhum pagamento foi feito nesta etapa.</p>
      <a className="ct-send" href="https://cenlofood.cenlo.pt/">Voltar para a página do Cenlo Food</a>
    </main>
  )
}
