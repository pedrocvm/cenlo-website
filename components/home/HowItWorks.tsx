'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { steps } from '@/lib/data'

gsap.registerPlugin(ScrollTrigger)

const bars = [22, 38, 64, 92, 70, 48, 30]

export default function HowItWorks() {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const mm = gsap.matchMedia()
    mm.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)', () => {
      const stepEls = gsap.utils.toArray<HTMLElement>('.how-step', el)
      const layers = gsap.utils.toArray<HTMLElement>('.how-layer', el)
      const titles = stepEls.map(s => s.querySelector('h3'))
      let current = 0
      gsap.set(titles.slice(1), { color: 'var(--c-mute)' })

      const show = (i: number) => {
        if (i === current) return
        gsap.to(layers[current], { autoAlpha: 0, y: -18, duration: 0.35, ease: 'power2.in', overwrite: true })
        gsap.fromTo(layers[i], { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'expo.out', delay: 0.15, overwrite: true })
        gsap.to(titles, { color: (j: number) => (j === i ? 'var(--c-ink)' : 'var(--c-mute)'), duration: 0.3 })
        const kids = layers[i].querySelectorAll('[data-pop]')
        gsap.fromTo(kids, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, stagger: 0.07, duration: 0.5, ease: 'power3.out', delay: 0.25 })
        if (i === 3) gsap.fromTo(layers[3].querySelectorAll('.bars i'), { scaleY: 0 }, { scaleY: 1, stagger: 0.05, duration: 0.7, ease: 'expo.out', delay: 0.3 })
        current = i
      }

      stepEls.forEach((s, i) => ScrollTrigger.create({
        trigger: s,
        start: 'top 55%',
        end: 'bottom 55%',
        onToggle: self => self.isActive && show(i),
      }))

      gsap.to(el.querySelector('.how-progress'), {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: { trigger: el.querySelector('.how-steps'), start: 'top 55%', end: 'bottom 55%', scrub: true },
      })
    })
    return () => mm.revert()
  }, [])

  return (
    <div ref={root} className="how">
      <ol className="how-steps" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {steps.map(s => (
          <li key={s.n} className="how-step" data-reveal>
            <span className="n">{s.n}</span>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </li>
        ))}
      </ol>
      <div className="how-visual" aria-hidden="true">
        <span className="how-progress" />
        <div className="how-layer">
          <span className="how-label">Onde o cliente chega</span>
          <div className="how-chipgrid">
            {['WhatsApp', 'Instagram', 'Link de pedido', 'Site', 'Mesa com QR', 'Telefone', 'Balcão', 'SMS', 'Lista de espera'].map(c => <span key={c} data-pop>{c}</span>)}
          </div>
        </div>
        <div className="how-layer">
          <span className="how-label">O que entra na central</span>
          <div className="how-row" data-pop><span>Pedido #1042 · link de pedido</span><span className="state">recebido</span></div>
          <div className="how-row" data-pop><span>Marcação #A21 · vitrine</span><span className="state">confirmada</span></div>
          <div className="how-row" data-pop><span>Fornada · pão de mistura</span><span className="state">em envio</span></div>
          <div className="how-row" data-pop><span>Preço</span><span className="mono">do cardápio publicado</span></div>
        </div>
        <div className="how-layer">
          <span className="how-label">Quem manda</span>
          <div className="how-row" data-pop><span>Atendimento automático</span><span className="toggle" data-on="true" /></div>
          <div className="how-row" data-pop><span>Ana entrou na conversa</span><span className="state state-warn">automático pausado</span></div>
          <div className="how-row" data-pop><span>Volta quando a equipe quiser</span><span className="toggle" /></div>
        </div>
        <div className="how-layer">
          <span className="how-label">Fechamento do dia · dados de demonstração</span>
          <span className="big-num" data-pop>264,50 €</span>
          <div className="bars">{bars.map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}</div>
          <div className="bars-legend"><span>18h</span><span>19h</span><span>20h</span><span>21h</span><span>22h</span><span>23h</span><span>00h</span></div>
        </div>
      </div>
    </div>
  )
}
