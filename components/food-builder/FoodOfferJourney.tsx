'use client'
/* eslint-disable react-hooks/set-state-in-effect -- Restore this tab's saved external session after hydration. */
import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { readSelection } from './selection'
import ModuleIcon from './ModuleIcon'
import { MODULES } from '@/lib/food-builder/catalog'
import { readAttribution } from './CaptureAttribution'

const KEY = 'cenlo-food-autonomous:v1'
const API = '/api/food-builder/autonomous'
const money = (n: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'EUR' }).format(n / 100)
type Cap = { id: string; label: string; plan: string; state: string; condition?: string }
type Composition = { moduleIds: string[]; preferences: string[]; units: number; integration: string; priority: string }
type Snapshot = { state: string; label: string; plan: string; version: string; setupCents: number; monthlyCents: number; sessions: number; reason: string; removalExplanation: string; composition: Composition; included: Cap[]; conditions: { id: string; text: string; state: string }[]; payment: { cash: { cents: number; discountPercent: number } | null; split: { upfrontCents: number; restCents: number[] } | null }; policy: { monthlyStart: string; installmentDue: string[]; validityText: string; taxText: string } }
type Offer = { id: string; reference: string; snapshot: Snapshot; expiresAt: string | null; isTest: boolean }
type Receipt = { saved: boolean; id: string; reference: string; kind: string; whatsappUrl: string; snapshot: { offer: Snapshot; payment: { totalCents: number; amounts: number[]; due: string[]; option: string } } }
type Journey = { evaluation?: { reasons: string[]; composition: Composition }; sessionKey: string; entry: 'diagnostic' | 'builder'; previousOfferId?: string; builderSelection?: string; answers?: Record<string, unknown>; composition?: Composition; offer?: Offer; receipt?: Receipt; payment?: 'cash' | 'split'; isTest: boolean; attribution: Record<string, string>; submissionId?: string; contact?: { name: string; business: string; phone: string; email: string }; decision?: string; desiredStart?: string; question?: string }
function load(): Journey | null { try { return JSON.parse(sessionStorage.getItem(KEY) || 'null') } catch { return null } }
function save(j: Journey) { try { sessionStorage.setItem(KEY, JSON.stringify(j)) } catch { /* This tab still works without storage. */ } }

function FoodReceipt({ receipt, offerReference, isTest, onWhatsApp }: { receipt: Receipt; offerReference?: string; isTest: boolean; onWhatsApp: () => void }) {
  const s = receipt.snapshot.offer
  const payment = receipt.snapshot.payment
  const cash = payment.option === 'cash'
  const question = receipt.kind === 'question'
  return <section className="fr" aria-labelledby="offer-heading">
    {isTest && <p className="fr-test"><span /> Ambiente de teste <small>Sem cobrança ou ativação.</small></p>}
    <header className="fr-hero">
      <div className="fr-check" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none"><path d="m8 16 5.5 5.5L25 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
      <div><span className="fr-kicker">Tudo registrado por aqui</span><h1 id="offer-heading">{question ? 'Sua dúvida foi recebida.' : 'Seu pedido foi recebido.'}</h1><p>{question ? 'Pedro vai conferir sua dúvida e retornar com o próximo passo.' : 'Sua escolha está salva. Agora, vamos organizar o próximo passo com você.'}</p></div>
    </header>

    <div className="fr-grid">
      <div className="fr-main">
        <section className="fr-plan" aria-labelledby="fr-plan-title">
          <div className="fr-plan-heading"><div><span className="fr-kicker">Sua solução</span><h2 id="fr-plan-title">Cenlo Food <span>{s.label}</span></h2></div><span className="fr-saved">✓ Oferta registrada</span></div>
          <div className="fr-prices">
            <div className="fr-price fr-price-setup"><div className="fr-price-label">Implantação <span>{cash ? 'À vista' : 'Parcelada'}</span></div><strong>{money(payment.totalCents)}</strong><p>{cash && s.payment.cash ? <><s>{money(s.setupCents)}</s><span className="fr-discount">{s.payment.cash.discountPercent}% de desconto</span></> : 'Pagamento conforme as parcelas abaixo'}</p></div>
            <div className="fr-price"><div className="fr-price-label">Mensalidade <span>Por unidade</span></div><strong>{money(s.monthlyCents)}<small>/mês</small></strong><p>{s.policy.monthlyStart}</p></div>
          </div>
          <div className="fr-schedule"><h3>Quando será pago</h3><ol>{payment.amounts.map((amount, i) => <li key={i}><span className="fr-step-number">{String(i + 1).padStart(2, '0')}</span><span>{payment.due[i]}</span><strong>{money(amount)}</strong></li>)}</ol></div>
          <p className="fr-unpaid"><span aria-hidden="true">○</span> Nenhum pagamento realizado nesta etapa.</p>
        </section>

        <section className="fr-scope" aria-labelledby="fr-scope-title"><div className="fr-section-heading"><div><span className="fr-kicker">O que você escolheu</span><h2 id="fr-scope-title">Sua operação, conectada.</h2></div><span>{s.included.length} recursos incluídos</span></div>
          <ul className="fr-features">{s.included.map(c => <li key={c.id}><ModuleIcon name={MODULES.find(m => m.id === c.id)?.icon || 'orders'} /><div><h3>{c.label}</h3>{c.condition ? <p>{c.condition}</p> : <span className="fr-included">{s.composition.moduleIds.includes(c.id) ? 'Escolhido por você' : 'Incluído sem custo adicional'}</span>}</div></li>)}</ul>
          <div className="fr-support"><ModuleIcon name="users" /><p><strong>Acompanhamento inicial</strong><span>{s.sessions} {s.sessions === 1 ? 'sessão estratégica' : 'sessões estratégicas'} de 1 hora, no total. Treinamento operacional separado.</span></p></div>
        </section>

        <details className="fr-details"><summary><ModuleIcon name="calendar" /><span>Preparação e condições de implantação<small>O que vamos organizar juntos</small></span><b aria-hidden="true">+</b></summary><div className="fr-details-body"><ul>{s.conditions.map(c => <li key={c.id}>{c.text}</li>)}</ul><p>A Cenlo configura a unidade e os recursos contratados, prepara os acessos e treina a equipe. O restaurante fornece cardápio, horários, regras de entrega e um responsável pela implantação. Os testes e o início são combinados com você.</p></div></details>
        <details className="fr-details"><summary><ModuleIcon name="receipt" /><span>Condições e referência da oferta<small>Consulte os detalhes que ficaram registrados</small></span><b aria-hidden="true">+</b></summary><div className="fr-details-body"><p>{s.policy.taxText}</p><p>{s.policy.validityText}</p><p>{s.reason}</p><p>{s.removalExplanation}</p><p className="fr-reference">Pedido {receipt.reference}<br />Oferta {offerReference}<br />Publicação {s.version}</p></div></details>
        <button className="fr-print" onClick={() => window.print()}><ModuleIcon name="printer" /> Salvar resumo sem dados pessoais <span aria-hidden="true">↗</span></button>
      </div>

      <aside className="fr-next" aria-labelledby="fr-next-title"><span className="fr-kicker">E agora?</span><h2 id="fr-next-title">Vamos ao próximo passo.</h2><p>Pedro vai conferir os dados e falar com você {question ? 'para esclarecer sua dúvida.' : 'para organizar a implantação.'}</p><ol className="fr-progress"><li className="is-complete"><span aria-hidden="true">✓</span><div><strong>{question ? 'Dúvida registrada' : 'Pedido recebido'}</strong><small>Oferta e pagamento escolhidos estão salvos.</small></div></li><li><span aria-hidden="true">2</span><div><strong>Conferência com Pedro</strong><small>{question ? 'Esclarecer o que falta para decidir.' : 'Alinhar os dados e combinar o início.'}</small></div></li></ol><a className="fr-whatsapp" href={receipt.whatsappUrl} target="_blank" rel="noreferrer" onClick={onWhatsApp}><ModuleIcon name="chat" /> Continuar no WhatsApp <span aria-hidden="true">↗</span></a><p className="fr-reassurance">Pode fechar esta página. Seu pedido continua salvo, mesmo sem enviar uma mensagem.</p><div className="fr-request-reference"><span>Referência do pedido</span><code>{receipt.reference}</code></div></aside>
    </div>
  </section>
}

export default function FoodOfferJourney({ entry = 'builder' }: { entry?: 'builder' | 'diagnostic' }) {
  const router = useRouter()
  const pathname = usePathname()
  const [journey, setJourney] = useState<Journey | null>(null)
  const [caps, setCaps] = useState<Cap[]>([])
  const [composition, setComposition] = useState<Composition>({ moduleIds: ['orders-core'], preferences: [], units: 1, integration: 'none', priority: 'pedidos' })
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [reasons, setReasons] = useState<string[]>([])
  const [editing, setEditing] = useState(false)
  const [review, setReview] = useState<null | 'implementation' | 'question'>(null)
  const [confirmed, setConfirmed] = useState(false)
  const [changedConfirmed, setChangedConfirmed] = useState(false)
  const [demo, setDemo] = useState(false)
  const init = useRef(false)
  const lock = useRef(false)
  const ref = useRef<Journey | null>(null)
  function update(value: Partial<Journey>) {
    const next = { ...ref.current!, ...value }; ref.current = next; setJourney(next); save(next); return next
  }
  async function call(path: string, body?: unknown, session = ref.current?.sessionKey) {
    const res = await fetch(API + path, { method: body ? 'POST' : 'GET', headers: { 'content-type': 'application/json', 'x-food-session': session || '' }, body: body ? JSON.stringify(body) : undefined })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Não foi possível continuar. Tente novamente.')
    return data
  }
  function event(name: string, j = ref.current) {
    if (!j?.offer) return
    void call(`/offers/${j.offer.id}/events`, { sessionKey: j.sessionKey, event: name }).catch(() => {})
  }
  async function issue(j: Journey, c?: Composition, confirmedRevision = false) {
    if (lock.current) return
    lock.current = true; setBusy(true); setError(''); setReasons([])
    try {
      const result = await call('/offers', { sessionKey: j.sessionKey, entry: j.entry, ...(c ? { composition: c } : j.entry === 'diagnostic' ? { answers: j.answers } : { composition: composition }),
        ...((j.offer || j.previousOfferId) ? { previousId: j.offer?.id || j.previousOfferId } : {}), revisionConfirmed: confirmedRevision, isTest: j.isTest, attribution: j.attribution })
      if (result.state === 'evaluation') {
        update({ evaluation: { reasons: result.reasons, composition: result.composition }, composition: result.composition, builderSelection: JSON.stringify(readSelection()) })
        setComposition(result.composition); setEditing(false); setReasons([])
        router.push('/configurar/avaliacao'); window.scrollTo({ top: 0, behavior: 'instant' }); return
      }
      const next = update({ evaluation: undefined, offer: result.offer, composition: result.offer.snapshot.composition, receipt: undefined, previousOfferId: undefined, submissionId: undefined, builderSelection: JSON.stringify(readSelection()) })
      setComposition(result.offer.snapshot.composition); setEditing(false); setReview(null); setConfirmed(false)
      event('food_offer_viewed', next); window.scrollTo({ top: 0, behavior: 'instant' })
    } catch (e) { setError((e as Error).message); if (!j.offer) setEditing(true) }
    finally { lock.current = false; setBusy(false) }
  }
  useEffect(() => {
    if (init.current) return
    init.current = true
    const selection = readSelection()
    const old = load()
    const j: Journey = old || { sessionKey: crypto.randomUUID(), entry, isTest: new URLSearchParams(location.search).get('test') === '1', attribution: Object.fromEntries(Object.entries(readAttribution()).filter(([,v]) => typeof v === 'string').map(([k,v]) => [k.replace(/^utm_/, ''), v!])) }
    ref.current = j; setJourney(j); save(j)
    if (j.evaluation && pathname === '/configurar/avaliacao') { setComposition(j.evaluation.composition); setEditing(false) }
    else if (j.offer) {
      const changedInBuilder = entry === 'builder' && j.builderSelection !== undefined && j.builderSelection !== JSON.stringify(selection) && !j.receipt
      setComposition(changedInBuilder ? { ...j.offer.snapshot.composition, moduleIds: [...new Set(['orders-core', ...selection])] } : j.offer.snapshot.composition)
      setEditing(changedInBuilder || new URLSearchParams(location.search).get('editar') === '1'); event('food_offer_viewed', j)
    }
    else if (j.composition && new URLSearchParams(location.search).get('editar') === '1') { setComposition(j.composition); setEditing(true) }
    else if (j.entry === 'diagnostic' && j.answers) { if (j.previousOfferId) { setEditing(true); setComposition(j.composition || composition); setError('Suas respostas mudaram. Confira os itens indispensáveis e confirme a revisão; a oferta anterior permanece registrada.') } else void issue(j) }
    else { setComposition({ ...composition, moduleIds: [...new Set(['orders-core', ...selection])] }); setEditing(true) }
    void call('/catalog', undefined, j.sessionKey).then(d => setCaps(d.snapshot.capabilities)).catch(e => setError(e.message))
    // Restore a frozen offer, never recalculate it on refresh.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  if (!journey) return <p role="status">Carregando suas escolhas…</p>
  const s = journey.receipt?.snapshot.offer || journey.offer?.snapshot
  const cash = journey.payment !== 'split'
  const total = s ? (cash ? s.payment.cash?.cents ?? s.setupCents : s.setupCents) : 0
  const amounts = s ? cash ? [total] : [...(s.payment.split?.upfrontCents ? [s.payment.split.upfrontCents] : []), ...(s.payment.split?.restCents || [])] : []
  const contact = journey.contact || { name: '', business: '', phone: '', email: '' }
  const received = journey.receipt
  const removed = journey.offer?.snapshot.composition.moduleIds.filter(id => !composition.moduleIds.includes(id)) || []
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!confirmed || !review || !journey?.offer || lock.current) return
    lock.current = true; setBusy(true); setError('')
    const next = update({ submissionId: journey.submissionId || crypto.randomUUID() })
    try {
      const receipt = await call('/requests', { submissionId: next.submissionId, offerId: next.offer!.id, sessionKey: next.sessionKey, kind: review, payment: next.payment || 'cash', contact,
        decision: next.decision || 'self', desiredStart: next.desiredStart || 'unknown', confirmation: true, ...(review === 'question' ? { question: next.question || '' } : {}), website: '' })
      update({ receipt }); setReview(null); setConfirmed(false); window.scrollTo({ top: 0, behavior: 'instant' })
    } catch (e) { setError((e as Error).message) }
    finally { lock.current = false; setBusy(false) }
  }
  if (journey.evaluation && pathname === '/configurar/avaliacao') {
    const chosen = journey.evaluation.composition
    const friendly: Record<string, { title: string; text: string }> = {
      'auto-printing': { title: 'Impressão dos pedidos', text: 'Vamos conferir a impressora e o computador da sua operação para definir como conectar a impressão.' },
      'customer-reactivation': { title: 'Recompra automática', text: 'Antes de ativar os envios, precisamos confirmar as regras para começar e interromper as mensagens corretamente.' },
      'conversation-order': { title: 'Pedidos pela conversa', text: 'Precisamos conferir o atendimento com o seu cardápio antes de confirmar essa função na proposta.' },
      'multi-store': { title: 'Mais de uma unidade', text: 'Vamos entender como suas lojas trabalham para definir o escopo da implantação.' },
    }
    const pending = caps.filter(c => chosen.moduleIds.includes(c.id) && c.state === 'evaluation')
    const details = pending.map(c => friendly[c.id] || { title: c.label, text: c.condition || 'Vamos confirmar os detalhes deste recurso para a sua operação.' })
    if (chosen.units !== 1 && !pending.some(c => c.id === 'multi-store')) details.push(friendly['multi-store'])
    if (chosen.integration !== 'none') details.push({ title: 'Conexão com outro sistema', text: 'Vamos conferir qual sistema você usa e se a conexão atende ao que precisa.' })
    return <section className="fr fe" aria-labelledby="offer-heading">
      <header className="fr-hero"><div className="fr-check"><ModuleIcon name="chat" /></div><div><span className="fr-kicker">Próximo passo · Sua solução</span><h1 id="offer-heading">Vamos acertar os últimos detalhes.</h1><p>Alguns itens precisam de uma conferência com a sua operação. Você não precisa começar de novo.</p></div></header>
      <div className="fe-layout"><section className="fe-content"><span className="fr-kicker">Para preparar uma proposta que faça sentido</span><h2>O que falta confirmar</h2><ul className="fe-checklist">{details.length ? details.map((d,i) => <li key={d.title}><span className="fe-number">{String(i+1).padStart(2,'0')}</span><div><h3>{d.title}</h3><p>{d.text}</p></div></li>) : <li><ModuleIcon name="help" /><div><h3>Compatibilidade da solução</h3><p>Precisamos conferir os requisitos selecionados antes de fechar os valores.</p></div></li>}</ul><details className="fr-details"><summary><ModuleIcon name="orders" /><span>Rever os itens que você escolheu<small>Sua seleção foi mantida nesta etapa</small></span><b aria-hidden="true">+</b></summary><div className="fr-details-body"><ul>{chosen.moduleIds.map(id => <li key={id}>{caps.find(c => c.id === id)?.label || MODULES.find(m => m.id === id)?.title || 'Recurso a confirmar'}</li>)}</ul></div></details></section>
      <aside className="fr-next"><span className="fr-kicker">Vamos juntos</span><h2>Uma conversa para fechar os detalhes.</h2><p>Converse com Pedro sobre esses itens. Depois da conferência, você poderá revisar o escopo e os valores antes de decidir.</p><a className="fr-whatsapp fe-contact" href="https://pedro.cenlo.pt/food">Conversar sobre minha solução <span aria-hidden="true">↗</span></a><button className="fe-back" onClick={() => { update({ evaluation: undefined }); setEditing(true); setChangedConfirmed(false); router.push('/configurar/rever?editar=1') }}>Ajustar minha seleção</button><p className="fr-reassurance">Esta etapa ainda não confirma um pedido, valor final ou ativação.</p></aside></div>
    </section>
  }
  if (journey.receipt) return <FoodReceipt receipt={journey.receipt} offerReference={journey.offer?.reference} isTest={journey.isTest} onWhatsApp={() => event('food_whatsapp_opened')} />
  return <section className="fo-journey" aria-labelledby="offer-heading">
    {journey.isTest && <p className="fo-test">Teste controlado. Sem cobrança, ativação ou evento de compra.</p>}
    <span className="fb-eyebrow">Cenlo Food · {received ? 'Pedido recebido' : editing ? 'Sua composição' : 'Sua oferta'}</span>
    <h1 id="offer-heading" className="fb-display">{received ? received.kind === 'implementation' ? 'Seu pedido foi recebido.' : 'Sua dúvida foi recebida.' : editing ? 'O que precisa estar incluído?' : s ? `Cenlo Food ${s.label}` : 'Preparando sua oferta'}</h1>
    {error && <p className="fo-error" role="alert">{error}</p>}
    {received && <div className="fo-confirm"><p>A oferta e a forma de pagamento estão registradas. Pedro vai conferir os dados para organizar o próximo passo com você. Nenhum pagamento foi realizado nesta etapa.</p><p className="fo-reference">Referência: <strong>{received.reference}</strong></p><a className="fb-btn fb-btn-primary" href={received.whatsappUrl} target="_blank" rel="noreferrer" onClick={() => event('food_whatsapp_opened')}>Continuar no WhatsApp</a><p>O pedido continua salvo mesmo se você não enviar a mensagem.</p></div>}
    {editing && !received && <div className="fo-editor">
      <p>Marque somente o que é indispensável. Você recebe o plano de menor valor que cobre esses itens.</p>
      {reasons.length > 0 && <div className="fo-error" role="status"><strong>Esta configuração precisa de avaliação.</strong><ul>{reasons.map(r => <li key={r}>{r}</li>)}</ul><p>Não há preço fechado para esse conjunto. Você pode rever os requisitos ou falar com Pedro sobre a compatibilidade.</p><a href="https://pedro.cenlo.pt/food">Pedir avaliação</a></div>}
      <div className="fo-fields"><label>Quantas unidades?<input type="number" min="1" max="200" value={composition.units} onChange={e => setComposition({ ...composition, units: Number(e.target.value) })} /></label><label>Precisa conectar outro sistema?<select value={composition.integration} onChange={e => setComposition({ ...composition, integration: e.target.value })}><option value="none">Não, posso usar sem integração</option><option value="required">Sim, a integração é indispensável</option><option value="unknown">Ainda não sei</option></select></label></div>
      <fieldset><legend>Itens indispensáveis</legend><div className="fo-modules">{caps.map(c => <label key={c.id}><input type="checkbox" checked={composition.moduleIds.includes(c.id)} disabled={c.id === 'orders-core'} onChange={e => setComposition({ ...composition, moduleIds: e.target.checked ? [...composition.moduleIds, c.id] : composition.moduleIds.filter(x => x !== c.id) })} /><span>{c.label}<small>{c.plan === 'essential' ? 'Essential' : c.plan === 'pro' ? 'Pro' : 'Ultra'}{c.condition ? ` · ${c.condition}` : ''}</small></span></label>)}</div></fieldset>
      {journey.offer && removed.length > 0 && <p>Você retirou dos itens indispensáveis: {removed.map(id => caps.find(c => c.id === id)?.label || id).join(', ')}. A nova oferta vai mostrar o plano resultante, seus valores e tudo o que fica incluído antes de você confirmar o pedido.</p>}
      {(journey.offer || journey.previousOfferId) && <label className="fo-check"><input type="checkbox" checked={changedConfirmed} onChange={e => setChangedConfirmed(e.target.checked)} />Confirmo os itens que adicionei ou retirei e quero conferir a nova oferta.</label>}
      <button className="fb-btn fb-btn-primary" disabled={busy || !caps.length || (!!(journey.offer || journey.previousOfferId) && !changedConfirmed)} onClick={() => void issue(journey, composition, changedConfirmed)}>{busy ? 'Conferindo…' : 'Ver minha oferta e os valores'}</button>
      {journey.offer && <button className="fb-btn fb-btn-ghost" onClick={() => { setEditing(false); setReasons([]) }}>Voltar à oferta anterior</button>}
    </div>}
    {s && !editing && <>
      <p className="fb-lede">{s.reason}</p>
      <div className="fo-prices"><div><span>Implantação · {cash ? 'à vista' : 'parcelada'}</span><strong>{money(received ? received.snapshot.payment.totalCents : total)}</strong><small>Base: {money(s.setupCents)}{cash && s.payment.cash ? ` · ${s.payment.cash.discountPercent}% à vista` : ''}</small></div><div><span>Mensalidade por unidade</span><strong>{money(s.monthlyCents)}</strong><small>{s.policy.monthlyStart}</small></div></div>
      <p>{s.policy.taxText}</p>
      {!received && <fieldset className="fo-payment"><legend>Escolha como prefere pagar a implantação</legend><label><input type="radio" name="payment" checked={cash} onChange={() => { update({ payment: 'cash', submissionId: undefined }); setConfirmed(false) }} />À vista: {money(s.payment.cash?.cents ?? s.setupCents)}</label>{s.payment.split && <label><input type="radio" name="payment" checked={!cash} onChange={() => { update({ payment: 'split', submissionId: undefined }); setConfirmed(false) }} />Parcelado: total de {money(s.setupCents)}</label>}</fieldset>}
      <ol className="fo-schedule">{(received ? received.snapshot.payment.amounts : amounts).map((n,i) => <li key={i}><strong>{money(n)}</strong> · {(received ? received.snapshot.payment.due : s.policy.installmentDue)[i]}</li>)}</ol>
      <p>Mensalidade: {s.policy.monthlyStart}</p><p>{s.policy.validityText}</p>
      {!received && !review && <div className="fo-actions"><button className="fb-btn fb-btn-primary" onClick={() => { setReview('implementation'); event('food_review_started') }}>Quero começar com esta oferta</button><button className="fb-btn fb-btn-ghost" onClick={() => { setEditing(true); setChangedConfirmed(false) }}>Revisar minha solução</button><button className="fb-link-btn" onClick={() => { setReview('question'); event('food_review_started') }}>Ainda tenho uma dúvida</button></div>}
      {review && !received && <form className="fo-review" onSubmit={submit}>
        <h2>{review === 'implementation' ? 'Confira a solução e os valores antes de enviar seu pedido.' : 'O que você precisa entender antes de decidir?'}</h2>
        <p>{s.label} · Implantação {money(total)} · Mensalidade {money(s.monthlyCents)}. {cash ? 'À vista.' : 'Parcelado conforme os vencimentos acima.'}</p>
        <div className="fo-fields">{(['name', 'business', 'phone', 'email'] as const).map(k => <label key={k}>{({ name: 'Seu nome', business: 'Nome do negócio', phone: 'WhatsApp com código do país', email: 'E-mail (opcional)' })[k]}<input required={k !== 'email'} type={k === 'phone' ? 'tel' : k === 'email' ? 'email' : 'text'} autoComplete={k === 'business' ? 'organization' : k === 'phone' ? 'tel' : k} maxLength={k === 'email' ? 254 : 120} value={contact[k]} onChange={e => update({ contact: { ...contact, [k]: e.target.value }, submissionId: undefined })} /></label>)}
          <label>Quem decide?<select value={journey.decision || 'self'} onChange={e => update({ decision: e.target.value, submissionId: undefined })}><option value="self">Eu decido</option><option value="together">Decido com outra pessoa</option><option value="research">Estou pesquisando para o responsável</option></select></label>
          <label>Quando gostaria de começar?<select value={journey.desiredStart || 'unknown'} onChange={e => update({ desiredStart: e.target.value, submissionId: undefined })}><option value="unknown">Ainda sem data</option><option value="now">Agora</option><option value="later">Em um período posterior</option></select></label></div>
        {review === 'question' && <label>Sua dúvida<textarea required maxLength={1500} value={journey.question || ''} onChange={e => update({ question: e.target.value, submissionId: undefined })} /></label>}
        <label className="fo-check"><input required type="checkbox" checked={confirmed} onChange={e => setConfirmed(e.target.checked)} />{review === 'implementation' ? 'Revisei a solução, os valores e a forma de pagamento. Quero seguir com a implantação e autorizo o retorno sobre este pedido.' : 'Autorizo o retorno para esclarecer esta dúvida. Isso não é um pedido de implantação.'}</label>
        <button className="fb-btn fb-btn-primary" disabled={busy || !confirmed}>{busy ? 'Registrando…' : review === 'implementation' ? 'Enviar meu pedido de implantação' : 'Enviar minha dúvida'}</button><button type="button" className="fb-btn fb-btn-ghost" onClick={() => { setReview(null); setConfirmed(false) }}>Voltar à oferta</button>
        <p>Esta etapa não cobra nem ativa uma conta. Seus dados serão usados para tratar este pedido.</p>
      </form>}
      <details className="fo-scope" open={!!review}><summary>O que está incluído na sua solução</summary><ul>{s.included.map(c => <li key={c.id}>{c.label}{!s.composition.moduleIds.includes(c.id) && c.state !== 'evaluation' && <span className="fo-included-bonus">Incluído sem custo adicional</span>}{c.condition && <small>{c.condition}</small>}</li>)}</ul><p>{s.sessions} {s.sessions === 1 ? 'sessão estratégica' : 'sessões estratégicas'} de 1 hora no acompanhamento inicial, no total. Treinamento operacional separado.</p></details>
      <div className="fo-conditions"><h2>Condições de implantação</h2><ul>{s.conditions.map(c => <li key={c.id}>{c.text}</li>)}</ul><p>A Cenlo configura a unidade e os recursos contratados, prepara os acessos e treina a equipe. O restaurante fornece cardápio, horários, regras de entrega e um responsável pela implantação. Os testes e o início são combinados com você.</p></div>
      <details className="fo-demo" open={demo} onToggle={e => { const open = e.currentTarget.open; if (open && !demo) event('food_demo_opened'); setDemo(open) }}><summary>Veja como isso funciona na prática</summary><p>Capturas reais do produto com dados de demonstração. Este fluxo mostra a página de pedidos e o quadro da cozinha, presentes em todos os planos. A equipe muda as etapas no painel.</p>{demo && <div><figure><img src="/food-builder/screens/online-ordering-menu-mobile.webp" alt="Cardápio da operação de demonstração Bella Napoli" width="390" height="844" loading="lazy" /><figcaption>1. O cliente escolhe os itens na página de pedidos.</figcaption></figure><figure><img src="/food-builder/screens/orders-list.webp" alt="Pedidos com dados de demonstração no painel" width="1600" height="1000" loading="lazy" /><figcaption>2. O pedido confirmado fica registrado no painel.</figcaption></figure><figure><img src="/food-builder/screens/kitchen-board.webp" alt="Quadro da cozinha com pedidos de demonstração em cada etapa" width="1600" height="1000" loading="lazy" /><figcaption>3. A equipe acompanha e atualiza a preparação na cozinha.</figcaption></figure></div>}</details>
      <p>{s.removalExplanation}</p><button className="fb-btn fb-btn-ghost fo-print-button" onClick={() => window.print()}>Salvar resumo sem dados pessoais</button>
      <p className="fo-reference">Oferta {journey.offer?.reference} · Publicação {s.version}</p>
    </>}
  </section>
}
