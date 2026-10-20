'use client'

import { FormEvent, KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { usePrivacy } from '@/components/PrivacyContext'
import { EXAMPLE_URL, FAQS, OFFER_TERMS, WHATSAPP_NUMBER } from '@/lib/site-pizzaria/content'

type Placement = 'header' | 'hero' | 'sticky' | 'closing'
type Field = 'firstName' | 'business' | 'phone' | 'consent'
type Values = { firstName: string; business: string; phone: string; currentLink: string; consent: boolean }
type Submit = { state: 'idle' } | { state: 'sending' } | { state: 'error'; message: string } | { state: 'success'; reference: string }

const STEPS = [
  { key: 'inicio', chip: 'Início', src: '/site-pizzaria/inicio.webp', alt: 'Página inicial do site da Bella Napoli com os botões Pedir agora e Ver menu', hot: { x: 60.8, y: 67.8, label: 'Ver menu' }, caption: 'O cliente abre o site e toca em Ver menu.' },
  { key: 'cardapio', chip: 'Cardápio', src: '/site-pizzaria/cardapio.webp', alt: 'Cardápio com fotos e preços: Margherita a €8,50 e Pepperoni a €9,50', hot: { x: 50, y: 84, label: 'Adicionar' }, caption: 'Vê as fotos, as descrições e os preços, e escolhe a pizza.' },
  { key: 'pizza', chip: 'Pizza', src: '/site-pizzaria/pizza.webp', alt: 'Tela Montar pizza com quantidade, tamanho Grande escolhido e o botão Adicionar ao pedido', hot: { x: 50, y: 95.1, label: 'Adicionar ao pedido' }, caption: 'Escolhe o tamanho, os sabores e os extras.' },
  { key: 'carrinho', chip: 'Carrinho', src: '/site-pizzaria/carrinho.webp', alt: 'Carrinho com uma pizza grande de pepperoni, total estimado de €12,35 e o botão Enviar pedido pelo WhatsApp', hot: { x: 50, y: 89.8, label: 'Enviar pedido pelo WhatsApp' }, caption: 'Confere o pedido, escolhe entrega ou retirada e como vai pagar.' },
  { key: 'whatsapp', chip: 'WhatsApp', src: '', alt: '', hot: { x: 90.5, y: 95.5, label: 'Enviar' }, caption: 'O WhatsApp abre com o pedido escrito. Ele só chega à pizzaria quando o cliente toca em enviar.' },
] as const

const MESSAGE: [string, string?][] = [
  ['PEDIDO VIA SITE'],
  [''],
  ['Olá! Fiz este pedido no site e queria confirmar para levantamento no balcão.'],
  [''],
  ['Cliente:', ' Ana'],
  ['Tipo:', ' Levantamento'],
  ['Pagamento:', ' Dinheiro'],
  [''],
  ['Pedido:', ''],
  ['• 1x Pizza Grande de Pepperoni'],
  [''],
  ['Podem confirmar, por favor?'],
]

const INCLUDED = [
  ['Cardápio com fotos e preços', 'Pizzas, bebidas e sobremesas em categorias, com tamanhos, meio a meio e extras.'],
  ['Pedido montado pelo cliente', 'Ele escolhe, ajusta e vê o total estimado antes de enviar.'],
  ['WhatsApp com o pedido escrito', 'A mensagem chega ao número da pizzaria quando o cliente toca em enviar.'],
  ['Endereço, horário e mapa', 'Tudo numa página, com o mapa do Google para o cliente encontrar a pizzaria.'],
  ['A sua marca', 'Nome, logo e fotos da sua pizzaria no lugar dos da Bella Napoli.'],
  ['Um link para divulgar', 'Na bio do Instagram, no perfil do Google, no WhatsApp ou num QR na mesa.'],
] as const

const EMPTY: Values = { firstName: '', business: '', phone: '', currentLink: '', consent: false }

function uuid() {
  if (typeof crypto.randomUUID === 'function') return crypto.randomUUID()
  const b = crypto.getRandomValues(new Uint8Array(16))
  b[6] = (b[6] & 0x0f) | 0x40
  b[8] = (b[8] & 0x3f) | 0x80
  const h = [...b].map(x => x.toString(16).padStart(2, '0')).join('')
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`
}

type Acquisition = {
  event?: (name: string, props?: Record<string, unknown>) => unknown
  contactReceived?: (eventId: string, intent: string) => void
  consentToken?: () => string | undefined
}
const acquisition = () => (window as typeof window & { CenloAcquisition?: Acquisition }).CenloAcquisition

/** Local signal for QA, and the Food acquisition contract (consent, CRM, Meta) when it maps. */
function track(name: string, data: Record<string, unknown> = {}, crm?: [string, Record<string, unknown>?]) {
  try {
    window.dispatchEvent(new CustomEvent('cenlo:site_pizzaria', { detail: { name, ...data } }))
    if (crm) acquisition()?.event?.(crm[0], crm[1] ?? {})
  } catch {
    // Measurement never blocks the visitor.
  }
}

function check(values: Values): Partial<Record<Field, string>> {
  const errors: Partial<Record<Field, string>> = {}
  if (values.firstName.trim().length < 2) errors.firstName = 'Escreva o seu primeiro nome.'
  if (values.business.trim().length < 2) errors.business = 'Escreva o nome da pizzaria.'
  const digits = values.phone.replace(/\D/g, '')
  if (digits.length < 9 || digits.length > 15 || /[^\d\s()+.-]/.test(values.phone)) errors.phone = 'Confira o número de WhatsApp. Ex.: 912 345 678 ou +351 912 345 678.'
  if (!values.consent) errors.consent = 'Marque a autorização para a gente responder no WhatsApp.'
  return errors
}

/** 912345678 → "912 345 678"; an international number keeps what the visitor typed. */
function formatPhone(raw: string) {
  if (raw.trim().startsWith('+')) return raw.replace(/[^\d+\s]/g, '').slice(0, 20)
  return raw.replace(/\D/g, '').slice(0, 9).replace(/(\d{3})(?=\d)/g, '$1 ')
}

/** "instagram.com/forno_do_ze/" or "forno_do_ze" → "@forno_do_ze"; links stay links. */
function handleOf(raw: string) {
  const v = raw.trim()
  const m = /^(?:https?:\/\/)?(?:www\.)?instagram\.com\/([A-Za-z0-9._]+)/i.exec(v) || /^@?([A-Za-z0-9._]{2,30})$/.exec(v)
  return m ? '@' + m[1] : ''
}

function Arrow() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14m0 0-5.5-5.5M19 12l-5.5 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

function Check() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m5 12.5 4.3 4.3L19 7.5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

function Mark({ light = false }: { light?: boolean }) {
  return (
    <svg width="30" height="30" viewBox="0 0 48 48" aria-hidden="true">
      <path d="M35.4 17.1 A13.2 13.2 0 1 0 35.4 30.9" fill="none" stroke={light ? '#F4F1EA' : '#29221E'} strokeWidth="5.1" strokeLinecap="round" />
      <circle cx="26.6" cy="24" r="5.7" fill="#F26522" />
    </svg>
  )
}

function Message() {
  return <>{MESSAGE.map(([bold, rest], i) => <span key={i} className="spzWaLine">{rest !== undefined ? <><b>{bold}</b>{rest}</> : bold || ' '}</span>)}</>
}

function PhoneDemo() {
  const [step, setStep] = useState(0)
  const [sent, setSent] = useState(false)
  const stage = useRef<HTMLDivElement>(null)
  const touched = useRef(false)
  const visible = useRef(false)
  const first = useRef(true)

  const go = useCallback((next: number, opts: { user?: boolean; send?: boolean } = {}) => {
    if (opts.user && !touched.current) {
      touched.current = true
      track('mockup_used', { step: STEPS[next]?.key ?? 'enviado' })
    }
    if (opts.send) setSent(true)
    else { setSent(false); setStep(next) }
  }, [])

  const advance = useCallback((user = false) => {
    if (step < STEPS.length - 1) go(step + 1, { user })
    else if (!sent) go(step, { user, send: true })
    else go(0, { user })
  }, [go, step, sent])

  useEffect(() => {
    const root = stage.current
    // The first screen is the LCP: it paints from the HTML, never from a tween.
    if (first.current) { first.current = false; return }
    if (!root || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const screen = root.querySelector<HTMLElement>(`[data-screen="${STEPS[step].key}"]`)
    const lines = STEPS[step].key === 'whatsapp' && !sent ? [...root.querySelectorAll<HTMLElement>('.spzWaDraft .spzWaLine')] : []
    const bubble = sent ? root.querySelector<HTMLElement>('.spzWaBubble') : null
    const targets = [screen, bubble, ...lines].filter((el): el is HTMLElement => Boolean(el))
    // Tweens end where the CSS already is, so clearing inline styles never leaves a stale screen visible.
    const clear = () => gsap.set(targets, { clearProps: 'opacity,visibility,transform' })
    const tl = gsap.timeline({ onComplete: clear })
    if (screen && !sent) tl.fromTo(screen, { xPercent: 14, autoAlpha: 0 }, { xPercent: 0, autoAlpha: 1, duration: 0.42, ease: 'power3.out' })
    if (lines.length) tl.fromTo(lines, { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 0.24, stagger: 0.05, ease: 'power2.out' }, '-=0.1')
    if (bubble) tl.fromTo(bubble, { autoAlpha: 0, y: 40, scale: 0.92 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.45, ease: 'power3.out' })
    return () => { tl.kill(); clear() }
  }, [step, sent])

  useEffect(() => {
    const root = stage.current
    if (!root) return
    const io = new IntersectionObserver(([entry]) => { visible.current = entry.isIntersecting }, { threshold: 0.45 })
    io.observe(root)
    return () => io.disconnect()
  }, [])

  // Until the visitor takes over, the phone walks through the order by itself, slowly enough to read.
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = window.setTimeout(() => {
      if (!touched.current && visible.current && !document.hidden) advance()
    }, sent ? 3800 : step === 0 ? 4200 : 3200)
    return () => window.clearTimeout(id)
  }, [advance, step, sent])

  const onTabKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const delta = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0
    if (!delta) return
    event.preventDefault()
    const next = (index + delta + STEPS.length) % STEPS.length
    go(next, { user: true })
    event.currentTarget.parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus()
  }

  const current = STEPS[step]
  const caption = sent ? 'Pronto: o pedido chegou à pizzaria pelo WhatsApp, enviado pelo próprio cliente.' : current.caption

  return (
    <div className="spzDemo">
      <div className="spzPhone" ref={stage}>
        <div className="spzPhoneScreen" role="tabpanel" id="spz-demo-panel" aria-labelledby={`spz-tab-${current.key}`}>
          {STEPS.slice(0, 4).map((s, i) => (
            <img
              key={s.key}
              data-screen={s.key}
              src={s.src}
              alt={i === step ? s.alt : ''}
              aria-hidden={i !== step}
              width={600}
              height={1298}
              loading={i === 0 ? 'eager' : 'lazy'}
              fetchPriority={i === 0 ? 'high' : 'auto'}
              decoding="async"
              className={i === step ? 'isOn' : ''}
            />
          ))}
          <div data-screen="whatsapp" className={`spzWa${current.key === 'whatsapp' ? ' isOn' : ''}`} aria-hidden={current.key !== 'whatsapp'}>
            <div className="spzWaTop"><span aria-hidden="true">BN</span><div><b>Bella Napoli</b><small>conta comercial</small></div></div>
            <div className="spzWaChat">
              {sent && <div className="spzWaBubble"><Message /><small>agora ✓✓</small></div>}
            </div>
            <div className="spzWaComposer">
              <div className="spzWaDraft">{sent ? <span className="spzWaLine spzWaPlaceholder">Mensagem</span> : <Message />}</div>
              <span className="spzWaSend" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24"><path d="M3 20.5 21 12 3 3.5l.02 6.6L15 12 3.02 13.9z" fill="currentColor" /></svg></span>
            </div>
            <span className="spzIllus">Ilustração da conversa no WhatsApp</span>
          </div>
          {!sent && (
            <button
              type="button"
              className="spzHot"
              style={{ left: `${current.hot.x}%`, top: `${current.hot.y}%` }}
              onClick={() => advance(true)}
              aria-label={`Simular toque em ${current.hot.label}`}
            ><span aria-hidden="true" /></button>
          )}
        </div>
      </div>

      <div className="spzDemoSide">
        <p className="spzDemoCaption" aria-live="polite"><b>{sent ? '✓' : step + 1}</b><span>{caption}</span></p>
        <div className="spzChips" role="tablist" aria-label="Etapas do pedido no site de exemplo">
          {STEPS.map((s, i) => (
            <button
              key={s.key}
              id={`spz-tab-${s.key}`}
              type="button"
              role="tab"
              aria-selected={i === step}
              aria-controls="spz-demo-panel"
              tabIndex={i === step ? 0 : -1}
              onClick={() => go(i, { user: true })}
              onKeyDown={event => onTabKey(event, i)}
            >{s.chip}</button>
          ))}
        </div>
        <p className="spzDemoHint">{sent
          ? <button type="button" className="spzLinkBtn" onClick={() => go(0, { user: true })}>Ver de novo</button>
          : 'Toque no botão destacado no celular ou escolha uma etapa.'}</p>
      </div>
    </div>
  )
}

export default function SitePizzariaLanding() {
  const { openModal } = usePrivacy()
  const heroCta = useRef<HTMLAnchorElement>(null)
  const formSection = useRef<HTMLElement>(null)
  const footer = useRef<HTMLElement>(null)
  const submissionId = useRef('')
  const started = useRef(false)
  const nameEdited = useRef(false)
  const fieldRefs = useRef<Partial<Record<Field, HTMLInputElement | null>>>({})
  const successRef = useRef<HTMLHeadingElement>(null)
  const [preview, setPreview] = useState('')
  const [values, setValues] = useState<Values>(EMPTY)
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({})
  const [submit, setSubmit] = useState<Submit>({ state: 'idle' })
  const [sticky, setSticky] = useState(false)
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({})

  useEffect(() => { track('landing_viewed', { offer: 'site-pizzaria-14990' }) }, [])

  useEffect(() => {
    const seen = new Map<Element, boolean>()
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => seen.set(e.target, e.isIntersecting))
      const [cta, form, foot] = [heroCta.current, formSection.current, footer.current].map(el => (el ? seen.get(el) ?? false : false))
      setSticky(!cta && !form && !foot && (heroCta.current?.getBoundingClientRect().top ?? 1) < 0)
    }, { rootMargin: '0px 0px -10% 0px' })
    ;[heroCta.current, formSection.current, footer.current].forEach(el => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  useEffect(() => { if (submit.state === 'success') successRef.current?.focus() }, [submit.state])

  const toForm = (placement: Placement) => () => track('cta_clicked', { placement }, ['food_start_clicked', { placement }])
  const openExample = (placement: Placement) => () => track('demo_opened', { placement }, ['food_public_demo_opened', { placement }])

  const set = (field: keyof Values) => (value: string | boolean) => {
    if (!started.current) { started.current = true; track('form_started') }
    if (field === 'business') nameEdited.current = true
    setValues(v => ({ ...v, [field]: field === 'phone' && typeof value === 'string' ? formatPhone(value) : value }))
    if (errors[field as Field]) setErrors(e => ({ ...e, [field]: undefined }))
  }

  const onPreview = (value: string) => {
    setPreview(value)
    if (!nameEdited.current) setValues(v => ({ ...v, business: value }))
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (submit.state === 'sending') return

    const found = check(values)
    setErrors(found)
    const first = (['firstName', 'business', 'phone', 'consent'] as Field[]).find(f => found[f])
    if (first) {
      fieldRefs.current[first]?.focus()
      track('form_failed', { reason: 'invalid', field: first })
      return
    }

    submissionId.current ||= uuid()
    const params = new URLSearchParams(window.location.search)
    const honeypot = (event.currentTarget.elements.namedItem('website') as HTMLInputElement | null)?.value || ''
    setSubmit({ state: 'sending' })

    try {
      const response = await fetch('/api/site-pizzaria', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          website: honeypot,
          submissionId: submissionId.current,
          pageUrl: window.location.href,
          referrer: document.referrer || null,
          consentToken: acquisition()?.consentToken?.(),
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || null,
          attribution: Object.fromEntries(['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'utm_id', 'fbclid', 'gclid'].map(k => [k, params.get(k) || ''])),
        }),
      })
      const result = await response.json().catch(() => ({}))
      if (response.ok && result.ok) {
        setSubmit({ state: 'success', reference: result.reference })
        track('lead_saved', { reference: result.reference })
        const leadEventId = typeof result.leadEventId === 'string' ? result.leadEventId : `food-contact:${submissionId.current}`
        acquisition()?.contactReceived?.(leadEventId, 'site_offer')
        return
      }
      if (response.status === 422 && result.field && result.field in EMPTY) {
        setErrors({ [result.field]: result.error })
        fieldRefs.current[result.field as Field]?.focus()
        setSubmit({ state: 'idle' })
      } else {
        setSubmit({ state: 'error', message: result.error || 'Não foi possível enviar agora. Seus dados continuam preenchidos. Tente de novo.' })
      }
      track('form_failed', { reason: `http_${response.status}`, field: result.field })
    } catch {
      setSubmit({ state: 'error', message: 'Sem ligação com o servidor. Confira a internet e toque em enviar de novo. Seus dados continuam preenchidos.' })
      track('form_failed', { reason: 'network' })
    }
  }

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Olá! Vi a oferta do site para pizzaria por €149,90 e tenho uma dúvida.')}`
  const onWhatsapp = (placement: string) => () => track('whatsapp_opened', { placement }, ['food_whatsapp_opened'])
  const describedBy = (f: Field, extra?: string) => [shown(f) ? `spz-err-${f}` : '', extra || ''].filter(Boolean).join(' ') || undefined
  const live = check(values)
  const shown = (f: Field) => errors[f] || (touched[f] ? live[f] : undefined)
  const done = (['firstName', 'business', 'phone', 'consent'] as Field[]).filter(f => !live[f]).length
  const handle = handleOf(values.currentLink)
  const shownName = preview.trim() || 'Sua Pizzaria'
  const initials = shownName.split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0]?.toUpperCase()).join('')

  return (
    <div className="spzRoot">
      <header className="spzHeader">
        <div className="spzWrap spzHeaderInner">
          <a className="spzBrand" href="https://cenlofood.cenlo.pt/" aria-label="Cenlo Food, página inicial"><Mark /><span>Cenlo <b>Food</b></span></a>
          <a className="spzHeaderLink" href={EXAMPLE_URL} target="_blank" rel="noopener noreferrer" onClick={openExample('header')}>Ver o site de exemplo</a>
          <a className="spzBtn spzBtnPrimary spzBtnSmall spzHeaderCta" href="#pedido" onClick={toForm('header')}>Quero meu site</a>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        <section className="spzHero" aria-labelledby="spz-title">
          <div className="spzWrap spzHeroGrid">
            <div className="spzHeroCopy">
              <p className="spzKicker">Site para pizzaria · a oferta do anúncio</p>
              <h1 id="spz-title">O site da sua pizzaria por <em>€149,90</em></h1>
              <p className="spzLead">Cardápio com fotos e preços, endereço, horário e mapa. O cliente monta o pedido no celular e o WhatsApp abre com tudo escrito para ele enviar.</p>
              <div className="spzHeroActions">
                <a ref={heroCta} className="spzBtn spzBtnPrimary" href="#pedido" onClick={toForm('hero')}>Quero meu site por €149,90 <Arrow /></a>
                <a className="spzTextLink" href={EXAMPLE_URL} target="_blank" rel="noopener noreferrer" onClick={openExample('hero')}>Abrir o site de exemplo <Arrow /></a>
              </div>
              <ul className="spzHeroFacts">
                <li><Check /> Sem aplicativo e sem cadastro para o cliente</li>
                <li><Check /> Pagamento único, com até 3 ajustes</li>
                <li><Check /> Você manda o cardápio e as fotos, a Cenlo monta o site</li>
              </ul>
            </div>
            <div className="spzHeroDemo">
              <PhoneDemo />
              <p className="spzNote">Telas reais do site de demonstração da Bella Napoli, feito com a Cenlo. Dados fictícios.</p>
            </div>
          </div>
        </section>

        <section className="spzSection spzIncluded" id="inclui" aria-labelledby="spz-inclui">
          <div className="spzWrap spzIncludedGrid">
            <div>
              <p className="spzKicker">O que vem no site</p>
              <h2 id="spz-inclui">Tudo o que o cliente procura antes de pedir, numa página.</h2>
              <ol className="spzList">
                {INCLUDED.map(([title, text], i) => (
                  <li key={title}><span aria-hidden="true">{String(i + 1).padStart(2, '0')}</span><div><h3>{title}</h3><p>{text}</p></div></li>
                ))}
              </ol>
              <p className="spzNote">O site não cobra online: o pagamento é combinado entre o cliente e a pizzaria.</p>
            </div>
            <figure className="spzMiniPhone">
              <div className="spzPhone spzPhoneSmall"><div className="spzPhoneScreen"><img src="/site-pizzaria/localizacao.webp" alt="Seção de localização do site da Bella Napoli com endereço, horário, telefone e o mapa do Google" width={600} height={1298} loading="lazy" decoding="async" /></div></div>
              <figcaption>Endereço, horário, telefone e o mapa do Google no site de demonstração.</figcaption>
            </figure>
          </div>
        </section>

        <section className="spzSection spzBrandSec" id="sua-marca" aria-labelledby="spz-marca">
          <div className="spzWrap spzBrandGrid">
            <div>
              <p className="spzKicker">Com a sua marca</p>
              <h2 id="spz-marca">Veja com o nome da sua pizzaria.</h2>
              <p>A Bella Napoli é só o exemplo. O seu site leva o seu nome, o seu logo, as suas fotos e o seu cardápio.</p>
              <label className="spzPreviewField" htmlFor="spz-preview">
                <span>Nome da sua pizzaria</span>
                <input id="spz-preview" type="text" maxLength={32} autoComplete="organization" placeholder="Ex.: Pizzaria do Bairro" value={preview} onChange={e => onPreview(e.target.value)} aria-describedby="spz-preview-help" />
              </label>
              <small id="spz-preview-help" className="spzHelp">Serve só para esta prévia. Se você pedir o site, o nome já vai preenchido no formulário.</small>
            </div>
            <figure className="spzBrandPreview">
              <div className="spzPhone spzPhoneSmall">
                <div className="spzPhoneScreen">
                  <img src="/site-pizzaria/inicio.webp" alt="" width={600} height={1298} loading="lazy" decoding="async" />
                  <div className="spzBrandBar" aria-live="polite">
                    <span className="spzMono" aria-hidden="true">{initials || 'SP'}</span>
                    <b key={shownName}>{shownName}</b>
                  </div>
                </div>
              </div>
              <figcaption>Prévia ilustrativa sobre a tela da demonstração.</figcaption>
            </figure>
          </div>
        </section>

        <section className="spzSection spzOffer" id="oferta" aria-labelledby="spz-oferta">
          <div className="spzWrap spzOfferGrid">
            <div className="spzPrice">
              <p className="spzKicker">A oferta</p>
              <h2 id="spz-oferta">Site para pizzaria</h2>
              <p className="spzPriceValue"><span>€</span>149<small>,90</small></p>
              <ul className="spzTerms">{OFFER_TERMS.map(t => <li key={t}><Check /> {t}</li>)}</ul>
              <a className="spzBtn spzBtnPrimary" href="#pedido" onClick={toForm('closing')}>Quero meu site por €149,90 <Arrow /></a>
            </div>
            <div>
              <h3 className="spzStepsTitle">Como começa</h3>
              <ol className="spzSteps">
                <li><b>Você pede aqui</b><span>Nome, pizzaria e WhatsApp. Leva menos de um minuto.</span></li>
                <li><b>A gente chama você no WhatsApp</b><span>Pedimos o cardápio com preços, as fotos, o logo, o endereço e o horário.</span></li>
                <li><b>A Cenlo monta o site</b><span>Com o seu cardápio, as suas fotos e a sua marca. Você confere e pede até 3 ajustes antes de o site ir ao ar.</span></li>
              </ol>
            </div>
          </div>
        </section>

        <section className="spzSection spzFormSec" id="pedido" ref={formSection} aria-labelledby="spz-pedido">
          <div className="spzWrap spzFormGrid">
            <div className="spzFormIntro">
              <p className="spzKicker">Pedir o site</p>
              <h2 id="spz-pedido">Peça o site da sua pizzaria.</h2>
              <p>Depois do envio, a gente responde no WhatsApp que você deixar aqui. Nada é cobrado neste formulário.</p>
              <div className="spzPrep"><b>Para adiantar, separe:</b><span>logo, cardápio com preços, fotos das pizzas, endereço e horário.</span></div>
            </div>

            <div className={`spzFormCard${submit.state === 'success' ? ' isDone' : ''}`}>
              <div className="spzTicketHead" aria-hidden="true">
                <span className="spzTicketLabel">Pedido</span>
                <b className="spzTicketName" key={values.business.trim() || 'empty'}>Site para {values.business.trim() || 'a sua pizzaria'}</b>
                <span className="spzTicketPrice">€149,90 · pagamento único</span>
                <span className="spzProgress"><i style={{ transform: `scaleX(${submit.state === 'success' ? 1 : done / 4})` }} /></span>
              </div>
              {submit.state === 'success' ? (
                <div className="spzSuccess" role="status">
                  <svg className="spzDraw" width="56" height="56" viewBox="0 0 56 56" aria-hidden="true"><circle cx="28" cy="28" r="26" /><path d="m17 29 7.5 7.5L40 21" /></svg>
                  <h3 ref={successRef} tabIndex={-1}>Pedido recebido, {values.firstName.trim().split(' ')[0]}.</h3>
                  <ol className="spzTimeline">
                    <li className="isDone"><b>Pedido recebido</b><span>Referência <code>{submit.reference}</code></span></li>
                    <li><b>A gente chama você no WhatsApp</b><span>No número <b>{values.phone}</b>, para pedir o cardápio, as fotos e o logo.</span></li>
                    <li><b>A Cenlo monta o site</b><span>Você confere e pede até 3 ajustes antes de ir ao ar.</span></li>
                  </ol>
                  <a className="spzTextLink" href={EXAMPLE_URL} target="_blank" rel="noopener noreferrer" onClick={openExample('closing')}>Abrir o site de demonstração <Arrow /></a>
                </div>
              ) : (
                <form onSubmit={onSubmit} noValidate aria-describedby={submit.state === 'error' ? 'spz-form-error' : undefined}>
                  <input className="spzHoneypot" name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" />
                  {([
                    ['firstName', 'Primeiro nome', { autoComplete: 'given-name', enterKeyHint: 'next', maxLength: 60 }],
                    ['business', 'Nome da pizzaria', { autoComplete: 'organization', enterKeyHint: 'next', maxLength: 120 }],
                    ['phone', 'WhatsApp', { type: 'tel', autoComplete: 'tel', inputMode: 'tel', enterKeyHint: 'next', maxLength: 20 }],
                  ] as const).map(([f, label, attrs]) => (
                    <div className={`spzFloat${f === 'phone' ? ' hasPrefix' : ''}${!live[f] ? ' isValid' : ''}${shown(f) ? ' isInvalid' : ''}`} key={f}>
                      {f === 'phone' && !values.phone.trim().startsWith('+') && <span className="spzPrefix" aria-hidden="true">+351</span>}
                      <input
                        id={`spz-${f}`}
                        ref={el => { fieldRefs.current[f] = el }}
                        value={values[f]}
                        placeholder=" "
                        onChange={e => set(f)(e.target.value)}
                        onBlur={() => values[f] && setTouched(t => ({ ...t, [f]: true }))}
                        aria-invalid={Boolean(shown(f))}
                        aria-describedby={describedBy(f, f === 'phone' ? 'spz-phone-help' : undefined)}
                        required
                        {...attrs}
                      />
                      <label htmlFor={`spz-${f}`}>{label}</label>
                      <span className="spzOk" aria-hidden="true"><Check /></span>
                      {f === 'phone' && <small id="spz-phone-help" className="spzHint">Número de Portugal ou com o código do país, ex.: +55.</small>}
                      {shown(f) && <p className="spzFieldError" id={`spz-err-${f}`}>{shown(f)}</p>}
                    </div>
                  ))}
                  <div className={`spzFloat${handle ? ' isValid' : ''}`}>
                    <input id="spz-currentLink" value={values.currentLink} placeholder=" " onChange={e => set('currentLink')(e.target.value)} inputMode="url" autoComplete="url" maxLength={220} enterKeyHint="done" aria-describedby="spz-link-help" />
                    <label htmlFor="spz-currentLink">Instagram ou cardápio atual <small>opcional</small></label>
                    <span className="spzOk" aria-hidden="true"><Check /></span>
                    <small id="spz-link-help" className="spzHint">{handle ? <>Vamos olhar <b>{handle}</b> para adiantar o cardápio.</> : 'O @ do Instagram ou o link do cardápio que você usa hoje.'}</small>
                  </div>
                  <label className={`spzSwitch${shown('consent') ? ' isInvalid' : ''}`} htmlFor="spz-consent">
                    <input id="spz-consent" type="checkbox" role="switch" ref={el => { fieldRefs.current.consent = el }} checked={values.consent} onChange={e => set('consent')(e.target.checked)} aria-invalid={Boolean(shown('consent'))} aria-describedby={describedBy('consent', 'spz-privacy')} />
                    <span className="spzTrack" aria-hidden="true"><i /></span>
                    <span>Autorizo a Cenlo a falar comigo pelo WhatsApp sobre este pedido.</span>
                  </label>
                  {shown('consent') && <p className="spzFieldError" id="spz-err-consent">{shown('consent')}</p>}
                  <p className="spzHelp" id="spz-privacy">Usamos estes dados só para responder a este pedido. Nada é cobrado aqui.</p>
                  {submit.state === 'error' && <p className="spzFormError" id="spz-form-error" role="alert">{submit.message}</p>}
                  <button className="spzBtn spzBtnPrimary spzSubmit" type="submit" disabled={submit.state === 'sending'} aria-busy={submit.state === 'sending'}>
                    {submit.state === 'sending' ? <><span className="spzSpinner" aria-hidden="true" /> Enviando…</> : submit.state === 'error' ? 'Tentar de novo' : <>Pedir o meu site <Arrow /></>}
                  </button>
                  <p className="spzLeft" aria-live="polite">{done === 4 ? 'Tudo certo. É só enviar.' : 4 - done === 1 ? 'Falta 1 item.' : `Faltam ${4 - done} itens.`}</p>
                  <a className="spzWaAlt" href={whatsappHref} target="_blank" rel="noopener noreferrer" onClick={onWhatsapp('form')}>Tem uma dúvida antes? Fale com a gente no WhatsApp.</a>
                </form>
              )}
            </div>
          </div>
        </section>

        <section className="spzSection spzFaq" id="duvidas" aria-labelledby="spz-duvidas">
          <div className="spzWrap spzFaqGrid">
            <div>
              <p className="spzKicker">Dúvidas</p>
              <h2 id="spz-duvidas">Antes de pedir</h2>
            </div>
            <div className="spzFaqList">
              {FAQS.map(item => (
                <details key={item.q}>
                  <summary>{item.q}<i aria-hidden="true" /></summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="spzFooter" ref={footer}>
        <div className="spzWrap spzFooterGrid">
          <a className="spzBrand" href="https://cenlofood.cenlo.pt/"><Mark light /><span>Cenlo <b>Food</b></span></a>
          <nav aria-label="Rodapé">
            <a href="mailto:ola@cenlo.pt">ola@cenlo.pt</a>
            <a href="/termos">Termos</a>
            <button type="button" onClick={openModal}>Privacidade</button>
          </nav>
          <span>© 2026 Cenlo · Feito em Portugal</span>
        </div>
      </footer>

      <div className="spzSticky" data-visible={sticky} aria-hidden={!sticky}>
        <span><small>Site para pizzaria</small><b>€149,90</b></span>
        <a className="spzBtn spzBtnPrimary spzBtnSmall" href="#pedido" tabIndex={sticky ? 0 : -1} onClick={toForm('sticky')}>Quero meu site</a>
      </div>

    </div>
  )
}
