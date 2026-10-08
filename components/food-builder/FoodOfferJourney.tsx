'use client'
/* eslint-disable react-hooks/set-state-in-effect -- Restore this tab's saved external session after hydration. */
import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { BASE_SELECTION_IDS, readSelection, replaceSelection, mergeSelectionIntoComposition } from './selection'
import ModuleIcon from './ModuleIcon'
import AnimatedDetails from './AnimatedDetails'
import OfferValue from './OfferValue'
import LoyaltyGift, { type LoyaltyPromotion } from './LoyaltyGift'
import { GROUPS, MODULES } from '@/lib/food-builder/catalog'
import { MODULE_BENEFITS } from '@/lib/food-builder/benefits'
import { diagnosticFacts } from '@/lib/food-builder/recommendation'
import { consentToken, contactReceived } from './FoodAcquisition'
import { readAttribution } from './CaptureAttribution'

const KEY = 'cenlo-food-autonomous:v1'
const API = '/api/food-builder/autonomous'
const money = (n: number) => new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(n / 100)
type Cap = { id: string; label: string; plan: string; state: string; condition?: string }
type Composition = { moduleIds: string[]; preferences: string[]; units: number; integration: string; priority: string }
type Snapshot = { state: string; label: string; plan: string; version: string; setupCents: number; monthlyCents: number; sessions: number; reason: string; removalExplanation: string; composition: Composition; included: Cap[]; promotion?: LoyaltyPromotion; benefits?: { baseIds: string[]; courtesyIds: string[] }; conditions: { id: string; text: string; state: string }[]; payment: { cash: { cents: number; discountPercent: number } | null; split: { upfrontCents: number; restCents: number[] } | null }; policy: { monthlyStart: string; installmentDue: string[]; validityText: string; taxText: string } }
type Offer = { id: string; reference: string; snapshot: Snapshot; expiresAt: string | null; isTest: boolean }
type Receipt = { saved: boolean; id: string; reference: string; kind: string; leadEventId?: string; whatsappUrl: string; snapshot: { offer: Snapshot; promotion?: LoyaltyPromotion & { status: 'reserved'; reservedAt: string }; payment: { totalCents: number; amounts: number[]; due: string[]; option: string } } }
type EvaluationReceipt = { saved: boolean; id: string; reference: string; whatsappUrl: string }
type Journey = { selectionSyncVersion?: number; compositionEdited?: boolean; evaluationSubmissionId?: string; evaluationReceipt?: EvaluationReceipt; evaluation?: { reasons: string[]; composition: Composition }; sessionKey: string; entry: 'diagnostic' | 'builder'; previousOfferId?: string; builderSelection?: string; answers?: Record<string, unknown>; composition?: Composition; offer?: Offer; receipt?: Receipt; payment?: 'cash' | 'split'; isTest: boolean; attribution: Record<string, string>; submissionId?: string; contact?: { name: string; business: string; phone: string; email: string }; decision?: string; desiredStart?: string; question?: string }
function load(): Journey | null { try { return JSON.parse(sessionStorage.getItem(KEY) || 'null') } catch { return null } }
function save(j: Journey) { try { sessionStorage.setItem(KEY, JSON.stringify(j)) } catch { /* This tab still works without storage. */ } }

function OfferBenefits({ snapshot: s }: { snapshot: Snapshot }) {
  if (!s.benefits) return null
  const extras = s.included.filter(c => s.benefits!.courtesyIds.includes(c.id) && c.id !== s.promotion?.moduleId)
  const items = extras.length ? extras : s.included.filter(c => s.benefits!.baseIds.includes(c.id))
  if (!items.length) return null
  const item = (c: Cap) => <li key={c.id}><ModuleIcon name={MODULES.find(m => m.id === c.id)?.icon || 'orders'} /><span>{c.label}</span><span aria-hidden="true">✓</span></li>
  return <section className="fo-gift" aria-label="Benefícios incluídos no plano">
    <div className="fo-gift-heading"><span className="fo-gift-icon" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d="M5 15h22v13H5zM3 10h26v5H3zM16 10v18" /><path d="M16 10C6 10 7 3 11 4c3 .5 5 6 5 6Zm0 0c10 0 9-7 5-6-3 .5-5 6-5 6Z" /></svg></span><div><span className="fc-kicker">{extras.length ? 'Cortesias para sua operação' : 'Sua base completa, incluída'}</span><h2>{extras.length ? 'Escolheu. E ganhou mais.' : 'Mais recursos. Nenhum adicional.'}</h2></div><span className="fo-gift-badge">{extras.length ? "+" : ""}{items.length} benefícios</span></div>
    <p>{extras.length ? `Além da sua seleção, recebe estes recursos do ${s.label} sem pagar a mais. Eles já ficam registados na sua oferta.` : `Todos os recursos básicos fazem parte do seu ${s.label}, incluindo atendimento, cozinha, auditoria e formação.`}</p>
    <ul className="fo-gift-items">{items.slice(0, 4).map(item)}</ul>
    {items.length > 4 && <AnimatedDetails className="fo-gift-more"><summary>Ver mais {items.length - 4} benefícios incluídos <span aria-hidden="true">+</span></summary><ul className="fo-gift-items">{items.slice(4).map(item)}</ul></AnimatedDetails>}
    <div className="fo-gift-footer"><span><strong>Sem acréscimo à mensalidade</strong><small>Recursos do plano, sujeitos às condições de implantação abaixo.</small></span><strong>{money(s.monthlyCents)}<small>/mês por unidade</small></strong></div>
  </section>
}

function FoodReceipt({ receipt, offerReference, isTest, onWhatsApp, onResumeOffer }: { receipt: Receipt; offerReference?: string; isTest: boolean; onWhatsApp: () => void; onResumeOffer: () => void }) {
  const s = receipt.snapshot.offer
  const payment = receipt.snapshot.payment
  const cash = payment.option === 'cash'
  const question = receipt.kind !== 'implementation'
  const demonstration = receipt.kind === 'demonstration'
  return <section className="fr" aria-labelledby="offer-heading">
    {isTest && <p className="fr-test"><span /> Ambiente de teste <small>Sem cobrança ou ativação.</small></p>}
    <header className="fr-hero">
      <div className="fr-check" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none"><path d="m8 16 5.5 5.5L25 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
      <div><span className="fr-kicker">Tudo registado por aqui</span><h1 id="offer-heading">{demonstration ? 'Pedido de demonstração recebido.' : question ? 'Sua dúvida foi recebida.' : 'Seu pedido foi recebido.'}</h1><p>{demonstration ? 'Pedro vai entrar em contacto para combinar uma demonstração. Ainda não há horário marcado.' : question ? 'Pedro vai conferir sua dúvida e retornar com o próximo passo.' : 'Sua escolha está salva. Agora, vamos organizar o próximo passo consigo.'}</p></div>
    </header>

    <div className="fr-grid">
      <div className="fr-main">
        <section className="fr-plan" aria-labelledby="fr-plan-title">
          <div className="fr-plan-heading"><div><span className="fr-kicker">Sua solução</span><h2 id="fr-plan-title">Cenlo Food <span>{s.label}</span></h2></div><span className="fr-saved">✓ Oferta registada</span></div>
          <div className="fr-prices">
            <div className="fr-price fr-price-setup"><div className="fr-price-label">Implantação <span>{cash ? 'À vista' : 'Em prestações'}</span></div><strong>{money(payment.totalCents)}</strong><p>{cash && s.payment.cash ? <><s>{money(s.setupCents)}</s><span className="fr-discount">{s.payment.cash.discountPercent}% de desconto</span></> : 'Pagamento conforme as prestações abaixo'}</p></div>
            <div className="fr-price"><div className="fr-price-label">Mensalidade <span>Por unidade</span></div><strong>{money(s.monthlyCents)}<small>/mês</small></strong><p>{s.policy.monthlyStart}</p></div>
          </div>
          <div className="fr-schedule"><h3>{question ? 'Condições consultadas · ainda não aceites' : 'Quando será pago'}</h3><ol>{payment.amounts.map((amount, i) => <li key={i}><span className="fr-step-number">{String(i + 1).padStart(2, '0')}</span><span>{payment.due[i]}</span><strong>{money(amount)}</strong></li>)}</ol></div>
          <p className="fr-unpaid"><span aria-hidden="true">○</span> Nenhum pagamento realizado nesta etapa.</p>
        </section>

        {question && s.promotion && <section className="fl-expired"><h2>O presente ainda não está reservado.</h2><p>O seu contacto foi registado. Para garantir o Clube de Fidelização, é preciso enviar o pedido de implantação dentro do prazo da oferta.</p><button type="button" className="fb-btn fb-btn-primary" onClick={onResumeOffer}>Voltar à oferta e conferir o prazo</button></section>}
        {receipt.snapshot.promotion && <LoyaltyGift promotion={receipt.snapshot.promotion} now={0} reserved />}
        <OfferBenefits snapshot={s} />
          <section className="fr-scope" aria-labelledby="fr-scope-title"><div className="fr-section-heading"><div><span className="fr-kicker">O que escolheu</span><h2 id="fr-scope-title">Sua operação, conectada.</h2></div><span>{s.included.length} recursos incluídos</span></div>
          <ul className="fr-features">{s.included.map(c => <li key={c.id}><ModuleIcon name={MODULES.find(m => m.id === c.id)?.icon || 'orders'} /><div><h3>{c.label}</h3>{c.condition ? <p>{c.condition}</p> : <span className="fr-included">{s.benefits?.baseIds.includes(c.id) ? 'Básico incluído' : s.composition.moduleIds.includes(c.id) ? 'Escolhido por si' : 'Incluído sem custo adicional'}</span>}</div></li>)}</ul>
          <div className="fr-support"><ModuleIcon name="users" /><p><strong>Acompanhamento inicial</strong><span>{s.sessions} {s.sessions === 1 ? 'sessão estratégica' : 'sessões estratégicas'} de 1 hora, no total. Formação operacional incluída na implantação.</span></p></div>
        </section>

        <AnimatedDetails className="fr-details"><summary><ModuleIcon name="calendar" /><span>Preparação e condições de implantação<small>O que vamos organizar juntos</small></span><b aria-hidden="true">+</b></summary><div className="fr-details-body"><ul>{s.conditions.map(c => <li key={c.id}>{c.text}</li>)}</ul><p>A Cenlo configura a unidade e os recursos contratados, prepara os acessos e treina a equipa. O restaurante fornece ementa, horários, regras de entrega e um responsável pela implantação. Os testes e o início são combinados consigo.</p></div></AnimatedDetails>
        <AnimatedDetails className="fr-details"><summary><ModuleIcon name="receipt" /><span>Condições e referência da oferta<small>Consulte os detalhes que ficaram registados</small></span><b aria-hidden="true">+</b></summary><div className="fr-details-body"><p>{s.policy.taxText}</p><p>{s.policy.validityText}</p><p>{s.reason}</p><p>{s.removalExplanation}</p><p className="fr-reference">Pedido {receipt.reference}<br />Oferta {offerReference}<br />Publicação {s.version}</p></div></AnimatedDetails>
        <button className="fr-print" onClick={() => window.print()}><ModuleIcon name="printer" /> Guardar resumo sem dados pessoais <span aria-hidden="true">↗</span></button>
      </div>

      <aside className="fr-next" aria-labelledby="fr-next-title"><span className="fr-kicker">E agora?</span><h2 id="fr-next-title">Vamos ao próximo passo.</h2><p>Pedro vai conferir os dados e falar consigo {demonstration ? 'para combinar uma demonstração.' : question ? 'para esclarecer sua dúvida.' : 'para organizar a implantação.'}</p><ol className="fr-progress"><li className="is-complete"><span aria-hidden="true">✓</span><div><strong>{demonstration ? 'Demonstração solicitada' : question ? 'Dúvida registada' : 'Pedido recebido'}</strong><small>{question ? 'Contexto e oferta consultada estão guardados. Sem aceitação comercial.' : 'Oferta e pagamento escolhidos estão guardados.'}</small></div></li><li><span aria-hidden="true">2</span><div><strong>Conferência com Pedro</strong><small>{demonstration ? 'Combinar o foco e o horário da demonstração.' : question ? 'Esclarecer o que falta para decidir.' : 'Alinhar os dados e combinar o início.'}</small></div></li></ol><a className="fr-whatsapp" href={receipt.whatsappUrl} target="_blank" rel="noreferrer" onClick={onWhatsApp}><ModuleIcon name="chat" /> Continuar no WhatsApp <span aria-hidden="true">↗</span></a><p className="fr-reassurance">Pode fechar esta página. Seu pedido continua salvo, mesmo sem enviar uma mensagem.</p><div className="fr-request-reference"><span>Referência do pedido</span><code>{receipt.reference}</code></div></aside>
    </div>
  </section>
}

export default function FoodOfferJourney({ entry = 'builder' }: { entry?: 'builder' | 'diagnostic' }) {
  const router = useRouter()
  const pathname = usePathname()
  const [journey, setJourney] = useState<Journey | null>(null)
  const [caps, setCaps] = useState<Cap[]>([])
  const [campaign, setCampaign] = useState<LoyaltyPromotion | null>(null)
  const [serverClock, setServerClock] = useState<{ time: number; measuredAt: number } | null>(null)
  const [serverNow, setServerNow] = useState(0)
  const [promotionRejected, setPromotionRejected] = useState(false)
  const [composition, setComposition] = useState<Composition>({ moduleIds: BASE_SELECTION_IDS, preferences: [], units: 1, integration: 'none', priority: 'pedidos' })
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [, setReasons] = useState<string[]>([])
  const [editing, setEditing] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [review, setReview] = useState<null | 'implementation' | 'question' | 'demonstration'>(null)
  const [confirmed, setConfirmed] = useState(false)
  const [changedConfirmed, setChangedConfirmed] = useState(false)
  const [evaluationContact, setEvaluationContact] = useState(false)
  const cartToggle = useRef<HTMLButtonElement>(null)
  const init = useRef(false)
  const viewedOffers = useRef(new Set<string>())
  const lock = useRef(false)
  const ref = useRef<Journey | null>(null)
  function update(value: Partial<Journey>) {
    const next = { ...ref.current!, ...value }; ref.current = next; setJourney(next); save(next); return next
  }
  function editComposition(next: Composition) {
    next = { ...next, moduleIds: [...new Set([...BASE_SELECTION_IDS, ...next.moduleIds])] }
    replaceSelection(next.moduleIds)
    setComposition(next)
    update({ composition: next, compositionEdited: true })
    setChangedConfirmed(false)
  }
  async function call(path: string, body?: unknown, session = ref.current?.sessionKey) {
    const res = await fetch(API + path, { method: body ? 'POST' : 'GET', headers: { 'content-type': 'application/json', 'x-food-session': session || '' }, body: body ? JSON.stringify(body) : undefined })
    const data = await res.json()
    if (!res.ok) throw Object.assign(new Error(data.message || 'Não foi possível continuar. Tente novamente.'), { code: data.code })
    return data
  }
  function event(name: string, j = ref.current) {
    if (!j?.offer) return
    if (!j.isTest) window.CenloAcquisition?.event(name)
  }
  async function issue(j: Journey, c?: Composition, confirmedRevision = false) {
    if (lock.current) return
    lock.current = true; setBusy(true); setError(''); setReasons([])
    try {
      const result = await call('/offers', { sessionKey: j.sessionKey, entry: j.entry, ...(j.answers ? { answers: j.answers } : {}), ...(c ? { composition: c } : j.entry === 'diagnostic' ? {} : { composition }),
        ...((j.offer || j.previousOfferId) ? { previousId: j.offer?.id || j.previousOfferId } : {}), revisionConfirmed: confirmedRevision, isTest: j.isTest, attribution: j.attribution })
      replaceSelection(result.state === 'evaluation' ? result.composition.moduleIds : result.offer.snapshot.composition.moduleIds)
      if (result.state === 'evaluation') {
        update({ compositionEdited: false, evaluationReceipt: undefined, evaluationSubmissionId: undefined, evaluation: { reasons: result.reasons, composition: result.composition }, composition: result.composition, builderSelection: JSON.stringify(readSelection()) })
        setComposition(result.composition); setEditing(false); setReasons([])
        router.push('/configurar/avaliacao'); window.scrollTo({ top: 0, behavior: 'instant' }); return
      }
      update({ compositionEdited: false, evaluation: undefined, offer: result.offer, composition: result.offer.snapshot.composition, receipt: undefined, previousOfferId: undefined, submissionId: undefined, builderSelection: JSON.stringify(readSelection()) })
      setComposition(result.offer.snapshot.composition); setPromotionRejected(false); setEditing(false); setReview(null); setConfirmed(false)
      if (pathname === '/configurar/avaliacao') router.replace('/configurar/oferta')
      window.scrollTo({ top: 0, behavior: 'instant' })
    } catch (e) { setError((e as Error).message); if (!j.offer) setEditing(true) }
    finally { lock.current = false; setBusy(false) }
  }
  useEffect(() => {
    if (init.current) return
    init.current = true
    const old = load()
    const j: Journey = old || { sessionKey: crypto.randomUUID(), entry, isTest: new URLSearchParams(location.search).get('test') === '1', attribution: Object.fromEntries(Object.entries(readAttribution()).filter(([,v]) => typeof v === 'string').map(([k,v]) => [k.replace(/^utm_/, ''), v!])) }
    ref.current = j; setJourney(j); save(j)
    const editRequested = new URLSearchParams(location.search).get('editar') === '1'
    const savedComposition = j.composition || j.offer?.snapshot.composition
    // Existing journeys get synchronized once; later manual changes remain the draft.
    const hadBuilderChanges = j.builderSelection !== undefined && j.builderSelection !== JSON.stringify(readSelection())
    if (savedComposition && (j.builderSelection === undefined || (j.selectionSyncVersion !== 1 && !hadBuilderChanges))) {
      replaceSelection(savedComposition.moduleIds)
      j.builderSelection = JSON.stringify(readSelection())
      save(j)
    }
    j.selectionSyncVersion = 1
    save(j)
    const currentSelection = readSelection()
    const changedInBuilder = j.builderSelection !== undefined && j.builderSelection !== JSON.stringify(currentSelection) && !j.receipt
    const draft = savedComposition ? changedInBuilder
      ? { ...savedComposition, moduleIds: mergeSelectionIntoComposition(savedComposition.moduleIds, currentSelection) }
      : { ...savedComposition, moduleIds: [...new Set([...BASE_SELECTION_IDS, ...savedComposition.moduleIds])] } : { ...composition, moduleIds: [...BASE_SELECTION_IDS, ...currentSelection] }
    if (j.evaluation && pathname === '/configurar/avaliacao') { setComposition(draft); setEditing(false) }
    else if (j.offer) {
      setComposition(draft)
      setEditing(changedInBuilder || !!j.compositionEdited || editRequested || !!j.evaluation)
    }
    else if (savedComposition && (editRequested || j.compositionEdited || j.evaluation || j.previousOfferId)) {
      setComposition(draft); setEditing(true)
    }
    else if (j.entry === 'diagnostic' && j.answers && Array.isArray(j.answers.f16) && j.answers.f16.includes('demo')) { setComposition(draft); setEditing(true) }
    else if (j.entry === 'diagnostic' && j.answers) void issue(j)
    else { setComposition(draft); setEditing(true) }
    void call('/catalog', undefined, j.sessionKey).then(d => {
      const published = d.snapshot.capabilities as Cap[]
      setCaps(published)
      setCampaign(d.snapshot.promotion || null)
      if (d.serverNow) setServerClock({ time: Date.parse(d.serverNow), measuredAt: performance.now() })
      // Retry only an unissued evaluation whose old blockers have been released.
      // Confirmed offers and requests always keep their frozen version.
      if (d.snapshot.selectionPolicy === 'complete-essential' && j.evaluation && !j.offer && !j.previousOfferId && !j.evaluationReceipt && !editRequested && !j.compositionEdited && !changedInBuilder && draft.units === 1 && draft.integration === 'none' && draft.moduleIds.every(id => published.some(c => c.id === id && c.state !== 'evaluation'))) void issue(j, draft)
    }).catch(e => setError(e.message))
    // Restore a frozen offer, never recalculate it on refresh.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    const id = journey?.offer?.id
    const observe = () => {
      if (!id || editing || journey?.receipt || journey?.isTest || viewedOffers.current.has(id)) return
      if (window.CenloAcquisition?.event('food_offer_viewed')) {
        viewedOffers.current.add(id)
        if (journey.entry === 'diagnostic') window.CenloAcquisition.event('diagnostic_result_viewed')
      }
    }
    observe(); window.addEventListener('cenlo-acquisition-change', observe)
    return () => window.removeEventListener('cenlo-acquisition-change', observe)
  }, [journey?.offer?.id, journey?.receipt, journey?.isTest, journey?.entry, editing])
  useEffect(() => {
    if (editing && journey?.sessionKey && !journey.isTest) window.CenloAcquisition?.event('food_configurator_opened')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editing, journey?.sessionKey])
  useEffect(() => {
    if (!serverClock) return
    const tick = () => setServerNow(serverClock.time + performance.now() - serverClock.measuredAt)
    tick()
    const timer = window.setInterval(tick, 1000)
    const resync = () => {
      if (document.visibilityState !== 'visible') return
      void call('/catalog').then(d => {
        if (d.serverNow) setServerClock({ time: Date.parse(d.serverNow), measuredAt: performance.now() })
        setCampaign(d.snapshot.promotion || null)
      }).catch(() => {})
    }
    document.addEventListener('visibilitychange', resync)
    return () => { window.clearInterval(timer); document.removeEventListener('visibilitychange', resync) }
    // The display clock is anchored to server time; request acceptance is checked on the server.
  }, [serverClock])
  if (!journey) return <p role="status">A carregar suas escolhas…</p>
  const s = journey.receipt?.snapshot.offer || journey.offer?.snapshot
  const promotionExpired = !!s?.promotion && (promotionRejected || (!!serverNow && serverNow >= Date.parse(s.promotion.endsAt)))
  const promotionChecking = !!s?.promotion && !serverNow
  const campaignActive = !!campaign && serverNow >= Date.parse(campaign.startsAt) && serverNow < Date.parse(campaign.endsAt)
  const availableGift = campaignActive && s && s.plan === 'essential' && s.composition.units === 1 && s.composition.integration === 'none' && s.composition.moduleIds.every(id => BASE_SELECTION_IDS.includes(id) || id === 'loyalty') ? campaign : null
  const cash = journey.payment !== 'split'
  const total = s ? (cash ? s.payment.cash?.cents ?? s.setupCents : s.setupCents) : 0
  const amounts = s ? cash ? [total] : [...(s.payment.split?.upfrontCents ? [s.payment.split.upfrontCents] : []), ...(s.payment.split?.restCents || [])] : []
  const contact = journey.contact || { name: '', business: '', phone: '', email: '' }
  const received = journey.receipt
  const removed = journey.offer?.snapshot.composition.moduleIds.filter(id => !composition.moduleIds.includes(id)) || []
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!confirmed || !review || !journey?.offer || lock.current || promotionExpired || promotionChecking) return
    lock.current = true; setBusy(true); setError('')
    const next = update({ submissionId: journey.submissionId || crypto.randomUUID() })
    try {
      const receipt = await call('/requests', { submissionId: next.submissionId, offerId: next.offer!.id, sessionKey: next.sessionKey, kind: review, payment: next.payment || 'cash', contact,
        ...(next.decision ? { decision: next.decision } : {}), ...(next.desiredStart ? { desiredStart: next.desiredStart } : {}), consentToken: next.isTest ? undefined : consentToken(), confirmation: true, ...(review === 'question' ? { question: next.question || '' } : {}), website: '' })
      update({ receipt }); if (!next.isTest && receipt.leadEventId) contactReceived(receipt.leadEventId); setReview(null); setConfirmed(false); window.scrollTo({ top: 0, behavior: 'instant' })
    } catch (e) { if ((e as Error & { code?: string }).code === 'promotion_expired') { setPromotionRejected(true); setReview(null); setConfirmed(false) } setError((e as Error).message) }
    finally { lock.current = false; setBusy(false) }
  }
  async function openWhatsApp(intent: 'implementation' | 'demonstration') {
    if (!ref.current?.offer || lock.current) return
    lock.current = true; setBusy(true); setError('')
    try {
      const current = ref.current
      const result = await call(`/offers/${current.offer!.id}/whatsapp`, { sessionKey: current.sessionKey, intent, payment: current.payment || 'cash' })
      const url = new URL(result.whatsappUrl)
      // Local offers only exist in this preview; keep their link on the local host.
      if (result.isTest && ['localhost', '127.0.0.1'].includes(location.hostname)) {
        url.searchParams.set('text', (url.searchParams.get('text') || '').replace(`https://cenlofood.cenlo.pt${result.offerPath}`, `${location.origin}${result.offerPath}`))
      }
      event('food_whatsapp_opened', current)
      window.location.assign(url.toString())
    } catch (e) { setError((e as Error).message) }
    finally { lock.current = false; setBusy(false) }
  }
  async function requestEvaluation(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!journey?.evaluation || lock.current) return
    lock.current = true; setBusy(true); setError('')
    const next = update({ evaluationSubmissionId: journey.evaluationSubmissionId || crypto.randomUUID() })
    try {
      const evaluationReceipt = await call('/evaluations', {
        submissionId: next.evaluationSubmissionId, sessionKey: next.sessionKey, entry: next.entry,
        composition: next.evaluation!.composition, answers: next.answers, attribution: next.attribution, isTest: next.isTest,
        consentToken: next.isTest ? undefined : consentToken(), contact, question: next.question || '', confirmation: true, website: '',
        ...((next.offer?.id || next.previousOfferId) ? { previousOfferId: next.offer?.id || next.previousOfferId } : {}),
      })
      update({ evaluationReceipt }); if (!next.isTest && evaluationReceipt.leadEventId) contactReceived(evaluationReceipt.leadEventId)
      window.location.assign(evaluationReceipt.whatsappUrl)
    } catch (e) { setError((e as Error).message) }
    finally { lock.current = false; setBusy(false) }
  }
  if (journey.evaluation && pathname === '/configurar/avaliacao') {
    const chosen = journey.evaluation.composition
    const friendly: Record<string, { title: string; text: string }> = {
      'auto-printing': { title: 'Impressão dos pedidos', text: 'Vamos conferir a impressora e o computador da sua operação para definir como conectar a impressão.' },
      'customer-reactivation': { title: 'Recompra automática', text: 'Antes de ativar os envios, precisamos confirmar as regras para começar e interromper as mensagens corretamente.' },
      'conversation-order': { title: 'Pedidos pela conversa', text: 'Precisamos conferir o atendimento com a sua ementa antes de confirmar essa função na proposta.' },
      'multi-store': { title: 'Mais de uma unidade', text: 'Vamos entender como suas lojas trabalham para definir o escopo da implantação.' },
    }
    const pending = caps.filter(c => chosen.moduleIds.includes(c.id) && c.state === 'evaluation')
    const details = pending.map(c => friendly[c.id] || { title: c.label, text: c.condition || 'Vamos confirmar os detalhes deste recurso para a sua operação.' })
    if (chosen.units !== 1 && !pending.some(c => c.id === 'multi-store')) details.push(friendly['multi-store'])
    if (chosen.integration !== 'none') details.push({ title: 'Conexão com outro sistema', text: 'Vamos conferir qual sistema utiliza e se a conexão atende ao que precisa.' })
    return <section className="fr fe" aria-labelledby="offer-heading">
      <header className="fr-hero"><div className="fr-check"><ModuleIcon name="chat" /></div><div><span className="fr-kicker">Próximo passo · Sua solução</span><h1 id="offer-heading">Vamos acertar os últimos detalhes.</h1><p>Alguns itens precisam de uma conferência com a sua operação. Não precisa começar de novo.</p></div></header>
      <OfferValue offered={false} selected={caps.filter(c => chosen.moduleIds.includes(c.id))} priority={chosen.priority} diagnostic={journey.entry === 'diagnostic'} onDemo={() => event('food_demo_opened')} />
      <div className="fe-layout"><section className="fe-content"><span className="fr-kicker">Para preparar uma proposta que faça sentido</span><h2>O que falta confirmar</h2><ul className="fe-checklist">{details.length ? details.map((d,i) => <li key={d.title}><span className="fe-number">{String(i+1).padStart(2,'0')}</span><div><h3>{d.title}</h3><p>{d.text}</p></div></li>) : <li><ModuleIcon name="help" /><div><h3>Compatibilidade da solução</h3><p>Precisamos conferir os requisitos selecionados antes de fechar os valores.</p></div></li>}</ul><AnimatedDetails className="fr-details"><summary><ModuleIcon name="orders" /><span>Rever os itens que escolheu<small>Sua seleção foi mantida nesta etapa</small></span><b aria-hidden="true">+</b></summary><div className="fr-details-body"><ul>{chosen.moduleIds.map(id => <li key={id}>{caps.find(c => c.id === id)?.label || MODULES.find(m => m.id === id)?.title || 'Recurso a confirmar'}</li>)}</ul></div></AnimatedDetails></section>
      <aside className="fr-next"><span className="fr-kicker">Vamos juntos</span><h2>Uma conversa para fechar os detalhes.</h2><p>Converse com Pedro sobre esses itens. Depois da conferência, poderá revisar o escopo e os valores antes de decidir.</p>{journey.evaluationReceipt ? <div><p className="fe-saved" role="status">Suas escolhas estão salvas. Referência {journey.evaluationReceipt.reference}.</p><a className="fr-whatsapp fe-contact" href={journey.evaluationReceipt.whatsappUrl}>Continuar no WhatsApp <span aria-hidden="true">↗</span></a><p className="fb-note">O registo continua salvo mesmo que não envie a mensagem.</p></div> : evaluationContact ? <form className="fe-contact-form" onSubmit={requestEvaluation}><p>Para Pedro encontrar sua configuração:</p><label>Seu nome<input autoComplete="name" required minLength={2} maxLength={120} value={contact.name} onChange={e => update({ contact: { ...contact, name: e.target.value } })} /></label><label>Nome do restaurante<input autoComplete="organization" required minLength={2} maxLength={120} value={contact.business} onChange={e => update({ contact: { ...contact, business: e.target.value } })} /></label><label>Seu WhatsApp<input autoComplete="tel" type="tel" required minLength={8} maxLength={30} placeholder="+351…" value={contact.phone} onChange={e => update({ contact: { ...contact, phone: e.target.value } })} /></label><label>Quer acrescentar algo? <small>Opcional</small><textarea rows={3} maxLength={1500} value={journey.question || ''} onChange={e => update({ question: e.target.value })} /></label><p className="fb-note">Vamos guardar suas escolhas e esses dados para responder à sua solicitação. Ao continuar, o WhatsApp abre com a mensagem pronta.</p><button className="fr-whatsapp fe-contact" type="submit" disabled={busy}>{busy ? 'A guardar sua solução…' : 'Guardar e conversar no WhatsApp'}<span aria-hidden="true">↗</span></button></form> : <button type="button" className="fr-whatsapp fe-contact" onClick={() => setEvaluationContact(true)}>Conversar sobre minha solução <span aria-hidden="true">↗</span></button>}{error && <p className="fo-error" role="alert">{error}</p>}<button className="fe-back" onClick={() => { update({ evaluation: undefined }); setEditing(true); setChangedConfirmed(false); router.push('/configurar/rever?editar=1') }}>Ajustar minha seleção</button><p className="fr-reassurance">Esta etapa ainda não confirma um pedido, valor final ou ativação.</p></aside></div>
    </section>
  }
  if (journey.receipt) return <FoodReceipt receipt={journey.receipt} offerReference={journey.offer?.reference} isTest={journey.isTest} onWhatsApp={() => event('food_whatsapp_opened')} onResumeOffer={() => { update({ receipt: undefined, submissionId: undefined }); setReview(null); setConfirmed(false) }} />
  return <section className={`fo-journey${editing ? ' fc-journey' : ''}`} aria-labelledby="offer-heading">
    {journey.isTest && <p className="fo-test">Teste controlado. Sem cobrança, ativação ou evento de compra.</p>}
    <span className="fb-eyebrow">Cenlo Food · {received ? 'Pedido recebido' : editing ? 'Sua composição' : 'Sua oferta'}</span>
    <h1 id="offer-heading" className="fb-display">{received ? received.kind === 'implementation' ? 'Seu pedido foi recebido.' : 'Sua dúvida foi recebida.' : editing ? 'Sua operação. Sua solução.' : s ? 'A sua solução, passo a passo.' : 'A preparar sua oferta'}</h1>
    {error && <p className="fo-error" role="alert">{error}</p>}
    {received && <div className="fo-confirm"><p>A oferta e a forma de pagamento estão registadas. Pedro vai conferir os dados para organizar o próximo passo consigo. Nenhum pagamento foi realizado nesta etapa.</p><p className="fo-reference">Referência: <strong>{received.reference}</strong></p><a className="fb-btn fb-btn-primary" href={received.whatsappUrl} target="_blank" rel="noreferrer" onClick={() => event('food_whatsapp_opened')}>Continuar no WhatsApp</a><p>O pedido continua salvo mesmo se não enviar a mensagem.</p></div>}
    {editing && !received && <div className="fc-editor">
      <p className="fc-intro">{journey.entry === 'diagnostic' ? 'Trouxemos as escolhas do seu diagnóstico. Confira os itens marcados e adicione ou retire o que fizer sentido. Na próxima etapa, pode conferir a oferta e os valores atualizados.' : 'Escolha o que faz sentido para o seu restaurante. Na próxima etapa, pode conferir a solução e os valores.'}</p>
      <div className="fc-layout"><div className="fc-main">
        <section className="fc-operation" aria-labelledby="fc-operation-title"><div className="fc-section-label"><ModuleIcon name="stores" /><div><span>01 · Sua operação</span><h2 id="fc-operation-title">Vamos começar pelo básico.</h2></div></div><div className="fo-fields"><label>Quantas unidades?<input type="number" min="1" max="200" value={composition.units} onChange={e => editComposition({ ...composition, units: Number(e.target.value) })} /></label><label>Precisa conectar outro sistema?<select value={composition.integration} onChange={e => editComposition({ ...composition, integration: e.target.value })}><option value="none">Não preciso de integração</option><option value="required">Sim, é indispensável</option><option value="unknown">Ainda não sei</option></select></label></div></section>
        <div className="fc-section-label fc-resource-heading"><span className="fc-section-number">02</span><div><span>Os recursos da sua solução</span><h2>O que não pode faltar?</h2></div></div>
        <div className="fc-groups">{GROUPS.map((group, index) => {
          const items = caps.filter(c => (MODULES.find(m => m.id === c.id)?.group || (c.id === 'menu-import' ? 'structure' : 'operations')) === group.id)
          if (!items.length) return null
          const selected = items.filter(c => composition.moduleIds.includes(c.id)).length
          return <AnimatedDetails className="fc-group" key={group.id} open={index === 0}><summary><ModuleIcon name={MODULES.find(m => m.group === group.id)?.icon || 'orders'} /><span className="fc-group-title">{group.title}<small>{items.length} recursos disponíveis para escolher</small></span><span className={`fc-group-count${selected ? ' has-selection' : ''}`}>{selected ? `${selected} ${selected === 1 ? 'selecionado' : 'selecionados'}` : 'Explorar'}</span><span className="fc-chevron" aria-hidden="true">⌄</span></summary><div className="fc-cards">{items.map(c => {
            const checked = composition.moduleIds.includes(c.id)
            return <article className={`fc-card${checked ? ' is-selected' : ''}`} key={c.id}><label><ModuleIcon name={MODULES.find(m => m.id === c.id)?.icon || 'orders'} /><span className="fc-card-title">{c.label}<span className="fc-card-benefit">{MODULE_BENEFITS[c.id]}</span><small>{c.id === 'loyalty' && campaignActive && composition.moduleIds.every(id => BASE_SELECTION_IDS.includes(id) || id === 'loyalty') ? 'Presente no Essential · por tempo limitado' : c.plan === 'essential' ? 'Básico · já incluído em todos os planos' : c.state === 'evaluation' ? 'Sujeito a confirmação' : checked ? 'Na sua seleção' : 'Adicionar à solução'}</small></span><input type="checkbox" checked={checked} disabled={c.plan === 'essential'} onChange={e => editComposition({ ...composition, moduleIds: e.target.checked ? [...composition.moduleIds, c.id] : composition.moduleIds.filter(x => x !== c.id) })} /></label>{c.condition && <AnimatedDetails className="fc-card-detail"><summary>O que considerar <span aria-hidden="true">+</span></summary><p>{c.condition}</p></AnimatedDetails>}</article>
          })}</div></AnimatedDetails>
        })}</div>
      </div>
      <aside className={`fc-selection${cartOpen ? ' is-open' : ''}`} aria-label="Sua seleção" onKeyDown={e => { if (e.key === 'Escape') { setCartOpen(false); cartToggle.current?.focus() } }}><div className="fc-cart-panel" id="fc-cart-details"><div className="fc-cart-content"><span className="fc-kicker">Montado por si</span><div className="fc-selection-title"><h2 id="fc-selection-title">Sua seleção</h2><span aria-live="polite">{composition.moduleIds.length}</span></div><p>A base completa já está incluída. Adicione o que precisa e veja o menor plano que atende à sua operação.</p><ul className="fc-selected-list">{composition.moduleIds.map(id => <li key={id}><span aria-hidden="true">✓</span>{caps.find(c => c.id === id)?.label || MODULES.find(m => m.id === id)?.title || 'Recurso selecionado'}</li>)}</ul>
      {journey.offer && removed.length > 0 && <AnimatedDetails className="fc-changes"><summary>{removed.length} {removed.length === 1 ? 'item retirado' : 'itens retirados'} nesta revisão <span aria-hidden="true">+</span></summary><p>{removed.map(id => caps.find(c => c.id === id)?.label || id).join(', ')}.</p></AnimatedDetails>}
      {(journey.offer || journey.previousOfferId) && <label className="fc-confirm"><input type="checkbox" checked={changedConfirmed} onChange={e => setChangedConfirmed(e.target.checked)} /><span>Confirmo minhas alterações e quero conferir a nova oferta.</span></label>}
      <button className="fc-continue fc-desktop-continue" disabled={busy || !caps.length || (!!(journey.offer || journey.previousOfferId) && !changedConfirmed)} onClick={() => void issue(journey, composition, changedConfirmed)}>{busy ? 'A preparar sua oferta…' : <>Ver minha oferta <span aria-hidden="true">→</span></>}</button>
      {journey.offer && <button className="fc-previous" onClick={() => { setEditing(false); setReasons([]) }}>Voltar à oferta anterior</button>}
      <p className="fc-footnote">Pode conferir os valores antes de decidir. Nada é cobrado nesta etapa.</p></div></div>
      <div className="fc-cart-bar">
        <button ref={cartToggle} type="button" className="fc-cart-toggle" aria-expanded={cartOpen} aria-controls="fc-cart-details" onClick={() => setCartOpen(!cartOpen)}>
          <span><small>Sua seleção</small><strong aria-live="polite">{composition.moduleIds.length} {composition.moduleIds.length === 1 ? 'item' : 'itens'}</strong></span>
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 15 6-6 6 6" /></svg>
        </button>
        <button type="button" className="fc-continue fc-mobile-continue" disabled={busy || !caps.length} onClick={() => {
          if ((journey.offer || journey.previousOfferId) && !changedConfirmed) { setCartOpen(true); return }
          void issue(journey, composition, changedConfirmed)
        }}>{busy ? 'A preparar…' : (journey.offer || journey.previousOfferId) && !changedConfirmed ? 'Rever alterações' : 'Ver minha oferta'}<span aria-hidden="true">→</span></button>
      </div></aside></div>
    </div>}
    {s && !editing && promotionExpired && <section className="fl-expired" role="status"><ModuleIcon name="calendar" /><h2>A condição especial do Clube terminou.</h2><p>Seu diagnóstico e suas escolhas continuam salvos. Confira o Essential sem o presente, ou ajuste a seleção para incluir o Clube nas condições atuais.</p><div className="fo-actions"><button type="button" className="fb-btn fb-btn-primary" disabled={busy} onClick={() => void issue(journey, { ...s.composition, moduleIds: s.composition.moduleIds.filter(id => id !== 'loyalty') }, true)}>Conferir Essential sem o presente</button><button type="button" className="fb-btn fb-btn-ghost" onClick={() => { setEditing(true); setChangedConfirmed(false) }}>Ajustar minha seleção</button></div><p>O prazo não reinicia ao atualizar a página. Nenhum valor é alterado ou cobrado sem sua confirmação.</p></section>}
    {s && !editing && !promotionExpired && <>
      {journey.answers && <section className="fo-diagnostic-summary" aria-labelledby="fo-summary-title"><span className="fc-kicker">O que nos contou</span><h2 id="fo-summary-title">A recomendação começa na sua operação.</h2><dl>{diagnosticFacts(journey.answers).map(f => <div key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd></div>)}</dl><p>As respostas estão guardadas. Pode ajustar os recursos no configurador sem repetir o diagnóstico.</p></section>}
      <OfferValue selected={s.included} priority={s.composition.priority} diagnostic={journey.entry === 'diagnostic'} onDemo={() => event('food_demo_opened')} />
      {s.composition.priority === 'retorno' && (s.promotion || availableGift) && <LoyaltyGift promotion={(s.promotion || availableGift)!} now={serverNow} busy={busy} onDemo={() => event('food_demo_opened')} onContinue={() => {
        if (!s.promotion) { void issue(journey, s.composition, true); return }
        void openWhatsApp('implementation')
      }} />}
      <div className="fo-plan-intro"><span className="fc-kicker">A solução recomendada</span><h2>Cenlo Food {s.label}</h2><p className="fb-lede">{s.reason}</p><p>O menor plano publicado que cobre a composição apresentada. Consulte o que está incluído e as condições de configuração.</p></div>
      {availableGift && !s.promotion && <p className="fo-assurance">Há um presente disponível para uma nova versão da sua oferta. Confira o Essential com o Clube antes de enviar o pedido.</p>}
      <p className="fo-route">Suas escolhas <span aria-hidden="true">→</span> <strong>Sua oferta</strong> <span aria-hidden="true">→</span> Conversa no WhatsApp</p>
      <div className="fo-prices"><div><span>Implantação · {cash ? 'à vista' : 'em prestações'}</span><strong>{money(received ? received.snapshot.payment.totalCents : total)}</strong><small>Base: {money(s.setupCents)}{cash && s.payment.cash ? ` · ${s.payment.cash.discountPercent}% à vista` : ''}</small></div><div><span>Mensalidade por unidade</span><strong>{money(s.monthlyCents)}</strong><small>{s.policy.monthlyStart}</small></div></div>
      <p>{s.policy.taxText}</p>
      {!received && <fieldset className="fo-payment"><legend>Escolha como prefere pagar a implantação</legend><label><input type="radio" name="payment" checked={cash} onChange={() => { update({ payment: 'cash', submissionId: undefined }); setConfirmed(false) }} />À vista: {money(s.payment.cash?.cents ?? s.setupCents)}</label>{s.payment.split && <label><input type="radio" name="payment" checked={!cash} onChange={() => { update({ payment: 'split', submissionId: undefined }); setConfirmed(false) }} />Em prestações: total de {money(s.setupCents)}</label>}</fieldset>}
      <section className="fo-calendar" aria-labelledby="fo-calendar-title">
        <header className="fo-calendar-heading"><span className="fo-calendar-icon"><ModuleIcon name="calendar" /></span><div><span className="fc-kicker">Tudo organizado para começar</span><h2 id="fo-calendar-title">Seu calendário de pagamentos</h2></div><span className="fo-calendar-method">{cash ? 'À vista' : 'Em prestações'}</span></header>
        <p className="fo-calendar-intro">Implantação da sua solução, etapa por etapa.</p>
        <ol className="fo-schedule">{(received ? received.snapshot.payment.amounts : amounts).map((n,i,list) => <li key={i}><div className="fo-schedule-label"><span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span><span>{list.length === 1 ? 'Pagamento único' : i === 0 ? 'Entrada' : `Prestação ${i + 1} de ${list.length}`}</span></div><strong>{money(n)}</strong><p>{(received ? received.snapshot.payment.due : s.policy.installmentDue)[i]}</p></li>)}</ol>
        <div className="fo-recurring"><div><span className="fo-recurring-label"><ModuleIcon name="calendar" /> Mensalidade por unidade</span><p>{s.policy.monthlyStart}</p></div><strong>{money(s.monthlyCents)}<small>/mês</small></strong></div>
        <p className="fo-calendar-note">A mensalidade é cobrada separadamente das prestações da implantação.</p>
      </section>
      <p className="fo-offer-validity">{s.policy.validityText}</p>
      {!received && !review && <div className="fo-actions"><button className="fb-btn fb-btn-primary" disabled={promotionChecking || busy} onClick={() => { if (availableGift && !s.promotion) { void issue(journey, s.composition, true); return } void openWhatsApp('implementation') }}>{availableGift && !s.promotion ? 'Conferir Essential com o Clube' : 'Quero avançar com esta solução'}</button><button className="fb-btn fb-btn-ghost" disabled={busy} onClick={() => void openWhatsApp('demonstration')}>Pedir demonstração com Pedro</button><button className="fb-link-btn" onClick={() => { setEditing(true); setChangedConfirmed(false) }}>Ajustar no configurador</button><button className="fb-link-btn" onClick={() => { setReview('question'); setConfirmed(false); update({ submissionId: undefined }); event('food_review_started') }}>Ainda tenho uma dúvida</button></div>}
      {!review && <p className="fo-assurance">O WhatsApp abre com a sua solução na mensagem. Basta enviar para falar com Pedro. Sem cobrança ou ativação nesta etapa.</p>}
      {s.composition.priority !== 'retorno' && !review && (s.promotion || availableGift) && <LoyaltyGift promotion={(s.promotion || availableGift)!} now={serverNow} busy={busy} onDemo={() => event('food_demo_opened')} onContinue={() => {
        if (!s.promotion) { void issue(journey, s.composition, true); return }
        void openWhatsApp('implementation')
      }} />}
      {!review && <OfferBenefits snapshot={s} />}
      {review && !received && <form className="fo-review" onSubmit={submit}>
        <h2>{review === 'implementation' ? 'Sua solução está escolhida. Vamos organizar o próximo passo.' : review === 'demonstration' ? 'Vamos ver como funciona no seu caso.' : 'O que precisa de esclarecer antes de decidir?'}</h2>
        {review === 'demonstration' && <p>Deixe o seu contacto. Pedro combina consigo uma demonstração focada na sua prioridade. Este pedido não marca um horário nem contrata o serviço.</p>}
        <p>{s.label} · Implantação {money(total)} · Mensalidade {money(s.monthlyCents)}. {cash ? 'À vista.' : 'Em prestações conforme os vencimentos acima.'}</p>
        <div className="fo-fields">{(['name', 'business', 'phone', 'email'] as const).map(k => <label key={k}>{({ name: 'Seu nome', business: 'Nome do negócio', phone: 'WhatsApp com código do país', email: 'E-mail (opcional)' })[k]}<input required={k !== 'email'} type={k === 'phone' ? 'tel' : k === 'email' ? 'email' : 'text'} autoComplete={k === 'business' ? 'organization' : k === 'phone' ? 'tel' : k} maxLength={k === 'email' ? 254 : 120} value={contact[k]} onChange={e => update({ contact: { ...contact, [k]: e.target.value }, submissionId: undefined })} /></label>)}
          {review === 'implementation' && <><label>Quem decide?<select value={journey.decision || ''} required onChange={e => update({ decision: e.target.value, submissionId: undefined })}><option value="" disabled>Selecione quem decide</option><option value="self">Eu decido</option><option value="together">Decido com outra pessoa</option><option value="research">Estou pesquisando para o responsável</option></select></label>
          <label>Quando gostaria de começar?<select value={journey.desiredStart || 'unknown'} onChange={e => update({ desiredStart: e.target.value, submissionId: undefined })}><option value="unknown">Ainda sem data</option><option value="now">Agora</option><option value="later">Mais adiante</option></select></label></>}</div>
        {review === 'question' && <label>Sua dúvida<textarea required maxLength={1500} value={journey.question || ''} onChange={e => update({ question: e.target.value, submissionId: undefined })} /></label>}
        <label className="fo-check"><input required type="checkbox" checked={confirmed} onChange={e => setConfirmed(e.target.checked)} />{review === 'implementation' ? 'Revisei a solução, os benefícios incluídos, os valores e a forma de pagamento. Quero seguir com a implantação e autorizo o retorno sobre este pedido.' : review === 'demonstration' ? 'Autorizo o contacto para combinar uma demonstração. Não é um pedido de implantação.' : 'Autorizo o contacto para esclarecer esta dúvida. Não é um pedido de implantação.'}</label>
        <div className="fo-review-actions"><button className="fb-btn fb-btn-primary" disabled={busy || !confirmed || promotionChecking || promotionExpired}>{busy ? 'A registar…' : review === 'implementation' ? 'Enviar meu pedido de implantação' : review === 'demonstration' ? 'Pedir demonstração' : 'Enviar a minha dúvida'}</button><button type="button" className="fb-btn fb-btn-ghost" onClick={() => { setReview(null); setConfirmed(false) }}>Voltar à oferta</button></div>
        <p className="fo-review-notice">Esta etapa não cobra nem ativa uma conta. Seus dados serão usados para tratar este pedido.</p>
      </form>}
      <AnimatedDetails className="fo-scope" open={!!review}><summary>O que está incluído na sua solução</summary><ul className="fo-included-grid">{s.included.map(c => <li key={c.id}><ModuleIcon name={MODULES.find(m => m.id === c.id)?.icon || 'orders'} /><div><strong>{c.label}</strong><p>{MODULE_BENEFITS[c.id]}</p>{!s.composition.moduleIds.includes(c.id) && c.state !== 'evaluation' && <span className="fo-included-bonus">Incluído sem custo adicional</span>}{c.condition && <small>{c.condition}</small>}</div></li>)}</ul><p>{s.sessions} {s.sessions === 1 ? 'sessão estratégica' : 'sessões estratégicas'} de 1 hora no acompanhamento inicial, no total. Formação operacional incluída na implantação.</p></AnimatedDetails>
      <AnimatedDetails className="fo-scope fo-conditions"><summary>Preparação e condições de implantação</summary><ul>{s.conditions.map(c => <li key={c.id}>{c.text}</li>)}</ul><p>A Cenlo configura a unidade e os recursos contratados, prepara os acessos e treina a equipa. O restaurante fornece ementa, horários, regras de entrega e um responsável pela implantação. Os testes e o início são combinados consigo.</p></AnimatedDetails>

      <p>{s.removalExplanation}</p><button className="fb-btn fb-btn-ghost fo-print-button" onClick={() => window.print()}>Guardar resumo sem dados pessoais</button>
      <p className="fo-reference">Oferta {journey.offer?.reference} · Publicação {s.version}</p>
    </>}
  </section>
}
