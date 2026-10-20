'use client'

import { FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePrivacy } from '@/components/PrivacyContext'

gsap.registerPlugin(ScrollTrigger)

const ASSET = 'https://cenlofood.cenlo.pt/food/assets'
const DEMO_URL = 'https://food.cenlo.pt/demo/food'
const WHATSAPP_NUMBER = '351912333313'
const COMMERCIAL_DETAILS_CONFIRMED = false

type DemoKey = 'inicio' | 'cardapio' | 'carrinho' | 'localizacao'
type SubmitState = 'idle' | 'sending' | 'success' | 'error'

const demoFrames: Record<DemoKey, { label: string; src: string; alt: string }> = {
  inicio: {
    label: 'Início',
    src: `${ASSET}/video-site-pedido-poster.jpg`,
    alt: 'Página inicial do site de demonstração da Bella Napoli',
  },
  cardapio: {
    label: 'Cardápio',
    src: `${ASSET}/bn-pedir-1-menu.webp`,
    alt: 'Cardápio da Bella Napoli organizado por categorias',
  },
  carrinho: {
    label: 'Carrinho',
    src: `${ASSET}/bn-pedir-3-carrinho.webp`,
    alt: 'Carrinho com pedido pronto para abrir no WhatsApp',
  },
  localizacao: {
    label: 'Localização',
    src: `${ASSET}/video-site-pedido-poster.jpg`,
    alt: 'Site da Bella Napoli com endereço, horário e mapa',
  },
}

const faqs = [
  {
    q: 'Os €149,90 são pelo quê?',
    a: 'O valor apresentado nesta campanha é pela criação e configuração inicial do site mostrado na página. Antes da publicação da oferta, domínio, hospedagem, prazo, revisões e alterações futuras precisam estar formalmente definidos na condição comercial.',
    pending: true,
  },
  {
    q: 'O cliente precisa instalar um aplicativo?',
    a: 'Não. O site abre no navegador do celular. O cliente consulta o cardápio, monta o pedido e abre o WhatsApp com os itens preenchidos.',
  },
  {
    q: 'O cliente precisa criar uma conta?',
    a: 'Não. A navegação, o carrinho e a preparação da mensagem funcionam sem cadastro do cliente.',
  },
  {
    q: 'Como o pedido chega ao WhatsApp?',
    a: 'O cliente escolhe os itens, confere o carrinho e toca no botão. O WhatsApp abre com o pedido preenchido. A mensagem chega à pizzaria depois que ele toca em enviar.',
  },
  {
    q: 'Posso usar o número que minha pizzaria já tem?',
    a: 'Sim. O botão pode ser ligado ao número de WhatsApp que a pizzaria já usa no atendimento.',
  },
  {
    q: 'O site recebe pagamento online?',
    a: 'Esta oferta apresenta o cardápio e prepara o pedido para o WhatsApp. Pagamento online não deve ser considerado incluído sem uma condição específica aprovada.',
  },
  {
    q: 'O site aparece automaticamente no Google?',
    a: 'O endereço pode ser ligado ao perfil da pizzaria no Google e aos seus outros canais. A posição nas buscas também depende da configuração e da presença do negócio no Google.',
  },
  {
    q: 'O atendimento automático do Cenlo Food está incluído?',
    a: 'Não nesta oferta específica. Aqui, o cliente monta o pedido no site e envia pelo WhatsApp. O atendimento automático, a central de pedidos e a cozinha fazem parte da plataforma Cenlo Food completa.',
  },
]

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14m0 0-5.5-5.5M19 12l-5.5 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m5 12.5 4.3 4.3L19 7.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CenloMark({ dark = false }: { dark?: boolean }) {
  return (
    <svg width="29" height="29" viewBox="0 0 48 48" aria-hidden="true">
      <path d="M35.4 17.1 A13.2 13.2 0 1 0 35.4 30.9" fill="none" stroke={dark ? '#221C16' : '#F7F3EC'} strokeWidth="5.1" strokeLinecap="round" />
      <circle cx="26.6" cy="24" r="5.7" fill="#C0532E" />
    </svg>
  )
}

function track(name: string, data: Record<string, unknown> = {}) {
  try {
    const fbq = (window as typeof window & { fbq?: (...args: unknown[]) => void }).fbq
    if (name === 'lead_saved') fbq?.('track', 'Lead', data)
    if (name === 'whatsapp_opened') fbq?.('track', 'Contact', data)
    window.dispatchEvent(new CustomEvent(`cenlo:${name}`, { detail: data }))
  } catch {
    // Measurement must never block the commercial action.
  }
}

export default function SitePizzariaLanding() {
  const { openModal } = usePrivacy()
  const rootRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLElement>(null)
  const phoneRef = useRef<HTMLDivElement>(null)
  const [activeDemo, setActiveDemo] = useState<DemoKey>('inicio')
  const [storyStep, setStoryStep] = useState(0)
  const [restaurantName, setRestaurantName] = useState('Sua Pizzaria')
  const [reducedMotion, setReducedMotion] = useState(false)
  const [stickyVisible, setStickyVisible] = useState(false)
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [submitMessage, setSubmitMessage] = useState('')
  const [reference, setReference] = useState('')

  const storyVisuals = useMemo(() => [
    { kind: 'search', label: 'Busca no celular' },
    { kind: 'image', label: 'Site da pizzaria', src: `${ASSET}/video-site-pedido-poster.jpg` },
    { kind: 'image', label: 'Cardápio organizado', src: `${ASSET}/bn-pedir-1-menu.webp` },
    { kind: 'image', label: 'Pedido no WhatsApp', src: `${ASSET}/bn-pedir-3-carrinho.webp` },
  ], [])

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!rootRef.current) return
    const scope = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo('.spzHeroCopy > *',
          { autoAlpha: 0, y: 26 },
          { autoAlpha: 1, y: 0, duration: 0.85, ease: 'expo.out', stagger: 0.07, delay: 0.08 },
        )
        gsap.fromTo('.spzHeroPhone',
          { autoAlpha: 0, x: 54, rotateY: -16, rotateX: 5, scale: 0.94 },
          { autoAlpha: 1, x: 0, rotateY: -5, rotateX: 2, scale: 1, duration: 1.35, ease: 'expo.out', delay: 0.2 },
        )
        gsap.fromTo('.spzPriceSeal',
          { autoAlpha: 0, scale: 0.65, rotate: -12 },
          { autoAlpha: 1, scale: 1, rotate: -5, duration: 0.8, ease: 'back.out(1.8)', delay: 0.75 },
        )

        const steps = gsap.utils.toArray<HTMLElement>('[data-story-step]')
        steps.forEach((step, index) => {
          ScrollTrigger.create({
            trigger: step,
            start: 'top 58%',
            end: 'bottom 42%',
            onToggle: self => { if (self.isActive) setStoryStep(index) },
          })
        })

        gsap.utils.toArray<HTMLElement>('[data-spz-reveal]').forEach(el => {
          gsap.fromTo(el,
            { autoAlpha: 0, y: 30 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
              ease: 'expo.out',
              scrollTrigger: { trigger: el, start: 'top 88%', once: true },
            },
          )
        })
      })

      return () => mm.revert()
    }, rootRef)

    return () => scope.revert()
  }, [])

  useEffect(() => {
    const hero = heroRef.current
    const form = formRef.current
    if (!hero || !form) return

    const update = () => {
      const heroPassed = hero.getBoundingClientRect().bottom < 12
      const formNear = form.getBoundingClientRect().top < window.innerHeight * 0.86
      setStickyVisible(heroPassed && !formNear)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  useEffect(() => {
    const phone = phoneRef.current
    if (!phone || reducedMotion || !window.matchMedia('(pointer:fine)').matches) return

    let frame = 0
    const move = (event: PointerEvent) => {
      const rect = phone.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width - 0.5
      const y = (event.clientY - rect.top) / rect.height - 0.5
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        phone.style.setProperty('--tilt-x', `${-y * 7}deg`)
        phone.style.setProperty('--tilt-y', `${x * 10 - 5}deg`)
      })
    }
    const reset = () => {
      phone.style.setProperty('--tilt-x', '2deg')
      phone.style.setProperty('--tilt-y', '-5deg')
    }
    phone.addEventListener('pointermove', move)
    phone.addEventListener('pointerleave', reset)
    return () => {
      cancelAnimationFrame(frame)
      phone.removeEventListener('pointermove', move)
      phone.removeEventListener('pointerleave', reset)
    }
  }, [reducedMotion])

  const scrollToForm = () => {
    track('site_offer_cta_clicked', { placement: 'landing' })
    formRef.current?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' })
  }

  const openDemo = () => {
    track('site_demo_opened', { offer: 'site-pizzaria-14990' })
    window.open(DEMO_URL, '_blank', 'noopener,noreferrer')
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (submitState === 'sending') return

    const form = event.currentTarget
    const data = new FormData(form)
    const params = new URLSearchParams(window.location.search)
    const payload = {
      firstName: String(data.get('firstName') || '').trim(),
      business: String(data.get('business') || '').trim(),
      phone: String(data.get('phone') || '').trim(),
      currentLink: String(data.get('currentLink') || '').trim(),
      website: String(data.get('website') || '').trim(),
      consent: data.get('consent') === 'on',
      pageUrl: window.location.href,
      referrer: document.referrer || null,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || null,
      attribution: Object.fromEntries(
        ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'utm_id', 'fbclid', 'gclid']
          .map(key => [key, params.get(key)])
          .filter((entry): entry is [string, string] => Boolean(entry[1])),
      ),
    }

    setSubmitState('sending')
    setSubmitMessage('')

    try {
      const response = await fetch('/api/site-pizzaria', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const result = await response.json().catch(() => ({}))
      if (!response.ok || !result.ok) throw new Error(result.error || 'Não foi possível enviar agora.')

      setReference(result.reference || '')
      setSubmitState('success')
      setSubmitMessage('Vamos entrar em contato pelo WhatsApp para confirmar o cardápio, os materiais e os próximos passos.')
      track('lead_saved', { content_name: 'site_pizzaria_14990', reference: result.reference })
    } catch (error) {
      setSubmitState('error')
      setSubmitMessage(error instanceof Error ? error.message : 'Não foi possível enviar agora. Tente novamente.')
    }
  }

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Olá! Vi a oferta do site para pizzaria por €149,90 e tenho uma dúvida.')}`

  return (
    <div className="spzRoot" ref={rootRef}>
      <header className="spzHeader">
        <div className="spzWrap spzHeaderInner">
          <a className="spzBrand" href="https://cenlofood.cenlo.pt/" aria-label="Cenlo Food, página inicial">
            <CenloMark dark />
            <span>Cenlo <b>Food</b></span>
          </a>
          <nav aria-label="Página da oferta">
            <button type="button" className="spzHeaderLink" onClick={openDemo}>Ver exemplo</button>
            <button type="button" className="spzBtn spzBtnPrimary spzBtnSmall" onClick={scrollToForm}>Quero meu site</button>
          </nav>
        </div>
      </header>

      <main>
        <section className="spzHero" ref={heroRef}>
          <div className="spzDiagonal" aria-hidden="true" />
          <div className="spzWrap spzHeroGrid">
            <div className="spzHeroCopy">
              <span className="spzKicker">Site pronto para pizzarias</span>
              <h1>O site da sua pizzaria pronto por <em>€149,90.</em></h1>
              <p className="spzLead">Cardápio com fotos e preços, endereço, horário, mapa e um pedido que o cliente monta e envia direto para o seu WhatsApp. Sem aplicativo e sem cadastro para o cliente.</p>
              <div className="spzHeroActions">
                <button type="button" className="spzBtn spzBtnPrimary" onClick={scrollToForm}>Quero meu site por €149,90 <ArrowIcon /></button>
                <button type="button" className="spzBtn spzBtnSecondary" onClick={openDemo}>Ver um exemplo funcionando</button>
              </div>
              <p className="spzMicro">Você envia o cardápio e os dados da pizzaria. A Cenlo prepara o site para você.</p>
              <div className="spzHeroProof" aria-label="Resumo da oferta">
                <span><CheckIcon /> Cardápio no celular</span>
                <span><CheckIcon /> Pedido no WhatsApp</span>
                <span><CheckIcon /> Sua marca e informações</span>
              </div>
            </div>

            <div className="spzHeroVisual" aria-label="Demonstração do site da Bella Napoli">
              <div className="spzSearchBubble"><span aria-hidden="true">⌕</span><b>pizzaria perto de mim</b><i /></div>
              <div className="spzPhone spzHeroPhone" ref={phoneRef}>
                <div className="spzPhoneBar"><span /><i /></div>
                <div className="spzPhoneScreen">
                  <video
                    muted
                    loop
                    playsInline
                    autoPlay={!reducedMotion}
                    preload="metadata"
                    poster={`${ASSET}/video-site-pedido-poster.jpg`}
                    aria-label="Navegação pelo site de pedidos da Bella Napoli"
                  >
                    <source src={`${ASSET}/video-site-pedido.mp4`} type="video/mp4" />
                  </video>
                </div>
              </div>
              <div className="spzPriceSeal"><small>criação</small><strong>149,90 €</strong></div>
              <span className="spzFloatTag spzTagMenu">cardápio</span>
              <span className="spzFloatTag spzTagWhatsapp">pedido no WhatsApp</span>
              <span className="spzDemoLabel">dados de demonstração</span>
            </div>
          </div>
        </section>

        <section className="spzQuickProof" aria-label="O que o site oferece">
          <div className="spzWrap spzQuickGrid">
            {[
              ['01', 'Cardápio com fotos e preços'],
              ['02', 'Pedido preparado para o WhatsApp'],
              ['03', 'Sem aplicativo'],
              ['04', 'Sem cadastro para o cliente'],
            ].map(([n, text]) => <div key={n}><small>{n}</small><span>{text}</span></div>)}
          </div>
        </section>

        <section className="spzStory" id="como-funciona">
          <div className="spzWrap">
            <div className="spzSectionHead" data-spz-reveal>
              <span className="spzKicker">Do Google ao WhatsApp</span>
              <h2>Quando alguém encontra sua pizzaria, o cardápio precisa estar fácil de achar.</h2>
            </div>
            <div className="spzStoryGrid">
              <div className="spzStoryVisual" aria-live="polite">
                <div className="spzStoryPhone">
                  <div className="spzPhoneBar"><span /><i /></div>
                  <div className="spzStoryScreen">
                    {storyVisuals[storyStep].kind === 'search' ? (
                      <div className="spzSearchScene">
                        <span>⌕</span>
                        <p>pizzaria perto de mim</p>
                        <div><b>Bella Napoli</b><small>Cardápio, horário e pedido</small></div>
                      </div>
                    ) : (
                      <img
                        key={storyVisuals[storyStep].src}
                        src={storyVisuals[storyStep].src}
                        alt={storyVisuals[storyStep].label}
                        width="780"
                        height="1688"
                      />
                    )}
                  </div>
                </div>
                <div className="spzStoryCounter"><b>0{storyStep + 1}</b><span>de 04</span></div>
              </div>

              <div className="spzStorySteps">
                {[
                  ['Alguém procura pela sua pizzaria.', 'O link do site pode aparecer no perfil do Google, no Instagram, no WhatsApp, num código QR ou numa campanha.'],
                  ['Encontra tudo numa página só.', 'Cardápio, preços, endereço, horário, telefone e mapa deixam de ficar espalhados em publicações e mensagens.'],
                  ['Escolhe as pizzas com calma.', 'Fotos, descrições, tamanhos e preços ficam organizados para o cliente montar o pedido no celular.'],
                  ['O WhatsApp abre com tudo preenchido.', 'O cliente confere a mensagem e toca em enviar. O pedido só chega depois desse envio.'],
                ].map(([title, text], index) => (
                  <article key={title} data-story-step className={storyStep === index ? 'isActive' : ''}>
                    <span>0{index + 1}</span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="spzDemo" id="exemplo">
          <div className="spzWrap spzDemoGrid">
            <div className="spzDemoCopy" data-spz-reveal>
              <span className="spzKicker">Demonstração real</span>
              <h2>Veja o site funcionando antes de decidir.</h2>
              <p>Este é o site da Bella Napoli, uma pizzaria de demonstração. Você pode abrir o cardápio, montar um pedido e ver como ele é preparado para o WhatsApp.</p>
              <button type="button" className="spzBtn spzBtnDark" onClick={openDemo}>Abrir o site de demonstração <ArrowIcon /></button>
              <small>O exemplo usa dados fictícios para mostrar o funcionamento.</small>
            </div>

            <div className="spzDemoStage" data-spz-reveal>
              <div className="spzDemoTabs" role="tablist" aria-label="Áreas do site">
                {(Object.keys(demoFrames) as DemoKey[]).map(key => (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={activeDemo === key}
                    onClick={() => setActiveDemo(key)}
                  >{demoFrames[key].label}</button>
                ))}
              </div>
              <div className="spzDemoPhone">
                <div className="spzPhoneBar"><span /><i /></div>
                <img
                  key={activeDemo}
                  src={demoFrames[activeDemo].src}
                  alt={demoFrames[activeDemo].alt}
                  width="780"
                  height="1688"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="spzJourney">
          <div className="spzWrap">
            <div className="spzSectionHead" data-spz-reveal>
              <span className="spzKicker">Três passos</span>
              <h2>O cliente encontra, escolhe e pede sem instalar nada.</h2>
            </div>
            <div className="spzJourneyGrid">
              {[
                ['Abre o site da pizzaria', 'Chega pelo Instagram, Google, WhatsApp, anúncio ou código QR.', 'link'],
                ['Escolhe e monta o pedido', 'Consulta fotos, descrições, tamanhos, preços e opções disponíveis.', 'pizza'],
                ['Envia pelo WhatsApp', 'Confere a mensagem preenchida e toca em enviar para a pizzaria.', 'chat'],
              ].map(([title, text, icon], index) => (
                <article key={title} data-spz-reveal>
                  <span className={`spzJourneyIcon is-${icon}`} aria-hidden="true">{index + 1}</span>
                  <small>Passo 0{index + 1}</small>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
              <svg className="spzJourneyLine" viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden="true">
                <path d="M70 74 C250 5 330 112 500 58 S760 8 930 72" pathLength="1" />
              </svg>
            </div>
          </div>
        </section>

        <section className="spzIncluded">
          <div className="spzWrap">
            <div className="spzSectionHead" data-spz-reveal>
              <span className="spzKicker">O que vem pronto</span>
              <h2>O site já chega com o que sua pizzaria precisa mostrar.</h2>
            </div>
            <div className="spzIncludedGrid">
              {[
                ['Sua marca', 'Nome, logo, cores e apresentação da pizzaria.', `${ASSET}/video-site-pedido-poster.jpg`],
                ['Seu cardápio', 'Categorias, pizzas, tamanhos, preços, descrições e fotos fornecidas.', `${ASSET}/bn-pedir-1-menu.webp`],
                ['Pedido pelo WhatsApp', 'Carrinho com os itens escolhidos e botão para abrir a mensagem.', `${ASSET}/bn-pedir-3-carrinho.webp`],
                ['Informações da loja', 'Endereço, telefone, horário e redes sociais numa página só.', `${ASSET}/video-site-pedido-poster.jpg`],
                ['Localização', 'Mapa para o cliente encontrar a pizzaria.', `${ASSET}/video-site-pedido-poster.jpg`],
                ['Experiência no celular', 'Página adaptada ao dispositivo onde a maior parte dos clientes acessa.', `${ASSET}/bn-pedir-2-item.webp`],
              ].map(([title, text, src], index) => (
                <article key={title} data-spz-reveal>
                  <div className="spzIncludedMedia"><img src={src} alt="" loading="lazy" /></div>
                  <span>0{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="spzPersonalize">
          <div className="spzWrap spzPersonalizeGrid">
            <div className="spzPersonalizeCopy" data-spz-reveal>
              <span className="spzKicker">Feito para a sua marca</span>
              <h2>Seu nome, suas pizzas, seus preços.</h2>
              <p>A Bella Napoli é apenas o exemplo. A versão entregue usa a identidade e as informações da sua pizzaria.</p>
              <label htmlFor="restaurant-preview">Digite o nome da sua pizzaria</label>
              <input
                id="restaurant-preview"
                type="text"
                maxLength={34}
                value={restaurantName}
                onChange={event => setRestaurantName(event.target.value || 'Sua Pizzaria')}
                aria-describedby="restaurant-preview-help"
              />
              <small id="restaurant-preview-help">Este campo serve apenas para a visualização e não armazena o texto.</small>
            </div>
            <div className="spzBrandPreview" data-spz-reveal>
              <div className="spzBrandPhone">
                <div className="spzBrandTop"><span className="spzMiniMark">C</span><b>{restaurantName}</b></div>
                <div className="spzBrandHero">
                  <small>Pedido direto pelo WhatsApp</small>
                  <h3>A pizza que está a fazer falta, a caminho.</h3>
                  <button type="button" tabIndex={-1}>Pedir agora</button>
                </div>
                <div className="spzBrandPills"><span>Cardápio</span><span>Horário</span><span>Mapa</span></div>
              </div>
              <span className="spzBrandCaption">Prévia ilustrativa com o nome digitado</span>
            </div>
          </div>
        </section>

        <section className="spzChannels">
          <div className="spzWrap">
            <div className="spzSectionHead" data-spz-reveal>
              <span className="spzKicker">Um endereço para divulgar</span>
              <h2>Coloque o site onde seus clientes já procuram.</h2>
              <p>O endereço pode ser ligado aos canais da pizzaria. Criar o site, por si só, não garante posição nas buscas do Google.</p>
            </div>
            <div className="spzChannelsGrid">
              {['Perfil da pizzaria no Google', 'Bio do Instagram', 'WhatsApp', 'Código QR', 'Campanhas e anúncios'].map((item, index) => (
                <div key={item} data-spz-reveal><span>0{index + 1}</span><b>{item}</b></div>
              ))}
            </div>
          </div>
        </section>

        <section className="spzOffer" id="oferta">
          <div className="spzWrap spzOfferCard" data-spz-reveal>
            <div className="spzOfferCopy">
              <span className="spzKicker">A oferta do anúncio</span>
              <h2>Seu site pronto por <em>€149,90.</em></h2>
              <p>Você envia os dados e o cardápio. A Cenlo organiza as informações, aplica a identidade da sua pizzaria e prepara o site para revisão.</p>
              <ul>
                {[
                  'Configuração visual da pizzaria',
                  'Cadastro inicial do cardápio enviado',
                  'Carrinho com pedido para o WhatsApp',
                  'Endereço, horário, telefone e mapa',
                  'Adaptação para celular',
                  'Publicação depois da sua aprovação',
                ].map(item => <li key={item}><CheckIcon /> {item}</li>)}
              </ul>
              {!COMMERCIAL_DETAILS_CONFIRMED && (
                <aside className="spzReviewNotice">
                  <b>Bloqueio de publicação</b>
                  <span>Antes de colocar esta oferta no ar, ainda é preciso confirmar domínio, hospedagem, prazo, revisões, alterações futuras e regra de desistência.</span>
                </aside>
              )}
            </div>
            <div className="spzOfferPrice">
              <span>Criação e configuração inicial</span>
              <strong><small>€</small>149<sup>,90</sup></strong>
              <p>O valor exato e o que está incluído aparecem antes do envio do pedido.</p>
              <button type="button" className="spzBtn spzBtnPrimary" onClick={scrollToForm}>Quero começar <ArrowIcon /></button>
            </div>
          </div>
        </section>

        <section className="spzDelivery">
          <div className="spzWrap">
            <div className="spzSectionHead" data-spz-reveal>
              <span className="spzKicker">Como fica pronto</span>
              <h2>Você não precisa montar nada.</h2>
            </div>
            <ol className="spzDeliverySteps">
              {[
                ['Você envia', 'Nome, logo, cardápio, preços, fotos, endereço, horário e WhatsApp.'],
                ['A Cenlo prepara', 'Organizamos as informações e aplicamos a identidade da pizzaria.'],
                ['Você revisa', 'Confere a página e envia os ajustes incluídos na oferta.'],
                ['O site é publicado', 'Depois da aprovação, o endereço fica pronto para divulgação.'],
              ].map(([title, text], index) => (
                <li key={title} data-spz-reveal><span>0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></li>
              ))}
            </ol>
          </div>
        </section>

        <section className="spzFormSection" id="quero-meu-site" ref={formRef}>
          <div className="spzWrap spzFormGrid">
            <div className="spzFormIntro" data-spz-reveal>
              <span className="spzKicker">Próximo passo</span>
              <h2>Vamos preparar o site da sua pizzaria.</h2>
              <p>Deixe os dados abaixo. A gente entra em contato pelo WhatsApp para confirmar os materiais, as condições e os próximos passos.</p>
              <div className="spzFormAside">
                <b>Separe quando puder</b>
                <span>Logo, cardápio, preços, fotos, endereço, horário e o número do WhatsApp.</span>
              </div>
            </div>

            <div className="spzFormCard" data-spz-reveal>
              {submitState === 'success' ? (
                <div className="spzSuccess" role="status" tabIndex={-1}>
                  <span className="spzSuccessMark"><CheckIcon /></span>
                  <small>Pedido recebido</small>
                  <h3>Agora a gente confirma os materiais com você.</h3>
                  <p>{submitMessage}</p>
                  {reference && <code>Referência {reference}</code>}
                  <button type="button" className="spzBtn spzBtnSecondary" onClick={openDemo}>Voltar ao exemplo do site</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <input className="spzHoneypot" name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" />
                  <label>
                    <span>Primeiro nome</span>
                    <input name="firstName" required autoComplete="given-name" placeholder="Pedro" minLength={2} maxLength={60} />
                  </label>
                  <label>
                    <span>Nome da pizzaria</span>
                    <input name="business" required autoComplete="organization" placeholder="Bella Napoli" minLength={2} maxLength={120} />
                  </label>
                  <label>
                    <span>WhatsApp</span>
                    <input name="phone" type="tel" required autoComplete="tel" inputMode="tel" placeholder="912 345 678" minLength={6} maxLength={24} />
                  </label>
                  <label>
                    <span>Instagram ou cardápio atual <small>opcional</small></span>
                    <input name="currentLink" type="text" inputMode="url" placeholder="@minhapizzaria ou um link" maxLength={220} />
                  </label>
                  <label className="spzConsent">
                    <input name="consent" type="checkbox" required />
                    <span>Autorizo a Cenlo a entrar em contato pelo WhatsApp sobre este pedido.</span>
                  </label>
                  <p className="spzPrivacyText">Os dados serão usados para responder a este pedido. Eles não entram em campanhas sem uma autorização específica.</p>
                  {submitState === 'error' && <div className="spzFormError" role="alert">{submitMessage}</div>}
                  <button className="spzBtn spzBtnPrimary spzSubmit" type="submit" disabled={submitState === 'sending'}>
                    {submitState === 'sending' ? 'Enviando…' : <>Quero começar <ArrowIcon /></>}
                  </button>
                  <a
                    className="spzWhatsappAlternative"
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track('whatsapp_opened', { content_name: 'site_pizzaria_14990' })}
                  >Prefere tirar uma dúvida primeiro? Fale no WhatsApp.</a>
                </form>
              )}
            </div>
          </div>
        </section>

        <section className="spzFaq" id="perguntas">
          <div className="spzWrap spzFaqGrid">
            <div className="spzSectionHead" data-spz-reveal>
              <span className="spzKicker">Antes de começar</span>
              <h2>As perguntas que precisam estar respondidas.</h2>
              <p>Os pontos comerciais ainda pendentes ficam visíveis nesta revisão e bloqueiam a publicação.</p>
            </div>
            <div className="spzFaqList">
              {faqs.map((item, index) => (
                <details key={item.q} data-spz-reveal>
                  <summary><span>0{index + 1}</span>{item.q}<i aria-hidden="true" /></summary>
                  <div><p>{item.a}</p>{item.pending && <small>Condição pendente de aprovação comercial.</small>}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="spzFinal">
          <div className="spzWrap spzFinalInner" data-spz-reveal>
            <span className="spzKicker">O site da sua pizzaria</span>
            <h2>Cardápio que ninguém acha não vende.</h2>
            <p>Dê à sua pizzaria uma página própria para mostrar o cardápio, preparar pedidos para o WhatsApp e reunir as informações que o cliente procura.</p>
            <div className="spzFinalPrice"><span>por</span><strong>€149,90</strong></div>
            <div className="spzFinalActions">
              <button type="button" className="spzBtn spzBtnPrimary" onClick={scrollToForm}>Quero meu site <ArrowIcon /></button>
              <button type="button" className="spzBtn spzBtnSecondary" onClick={openDemo}>Ver exemplo funcionando</button>
            </div>
          </div>
        </section>
      </main>

      <footer className="spzFooter">
        <div className="spzWrap spzFooterGrid">
          <div>
            <a className="spzBrand isFooter" href="https://cenlofood.cenlo.pt/">
              <CenloMark />
              <span>Cenlo <b>Food</b></span>
            </a>
            <p>Sites e sistemas para negócios locais de alimentação.</p>
          </div>
          <nav aria-label="Rodapé">
            <a href="mailto:ola@cenlo.pt">ola@cenlo.pt</a>
            <a href="/termos">Termos</a>
            <button type="button" onClick={openModal}>Preferências de privacidade</button>
          </nav>
          <span>© 2026 Cenlo · Feito em Portugal</span>
        </div>
      </footer>

      <div className="spzSticky" data-visible={stickyVisible} aria-hidden={!stickyVisible}>
        <span><small>Site para pizzaria</small><b>€149,90</b></span>
        <button type="button" className="spzBtn spzBtnPrimary spzBtnSmall" onClick={scrollToForm}>Quero meu site</button>
      </div>
    </div>
  )
}
