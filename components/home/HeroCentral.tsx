'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Logo from '../Logo'

const scenes = [
  {
    tab: 'Food', acc: 'var(--c-food)', channel: 'WhatsApp', ch: '#25D366',
    msg: 'Boa noite! Dois hambúrgueres da casa, um sem cebola, entrega na Rua do Almada 210.',
    tag: 'Cenlo Food', state: 'na cozinha', title: 'Pedido #1042',
    rows: ['2× Hambúrguer da casa · 1 sem cebola', 'Entrega · Rua do Almada 210'], totalLabel: 'total, vindo do cardápio', total: '34,40 €',
  },
  {
    tab: 'Beauty', acc: 'var(--c-beauty)', channel: 'Instagram', ch: '#E1306C',
    msg: 'Oi! Tem horário quinta à tarde pra manutenção em gel?',
    tag: 'Cenlo Beauty', state: 'confirmada', title: 'Marcação confirmada',
    rows: ['Manutenção em Gel · 1h', 'qui., 15:00 · Camila Duarte'], totalLabel: 'preço e duração do catálogo', total: '45,00 €',
  },
  {
    tab: 'Fornada', acc: 'var(--c-fornada)', channel: 'Padaria do Bairro', ch: '#E07A4C',
    msg: 'Toque em "Saiu agora": Pão de mistura, 16:20.',
    tag: 'Fornada Certa', state: 'entregue', title: 'Pão de mistura saiu',
    rows: ['SMS pelo celular da padaria', 'Só para quem escolheu este pão'], totalLabel: 'avisos entregues', total: '84 de 84',
  },
]

export default function HeroCentral() {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tabs = gsap.utils.toArray<HTMLElement>('[data-tab]', el)
      const sceneEls = gsap.utils.toArray<HTMLElement>('.central-scene', el)
      const core = el.querySelector('.core')
      const ring = el.querySelector('.core-ring')
      gsap.set(sceneEls, { autoAlpha: 0 })

      const tl = gsap.timeline({ repeat: -1, delay: 0.6 })
      sceneEls.forEach((scene, i) => {
        const bubble = scene.querySelector('.bubble')
        const dot = scene.querySelector('.beam-dot')
        const card = scene.querySelector('.ocard')
        const items = scene.querySelectorAll('.ocard li, .ocard-total')
        tl.call(() => tabs.forEach((t, j) => (t.dataset.on = String(i === j))))
          .set(scene, { autoAlpha: 1 })
          .fromTo(bubble, { autoAlpha: 0, x: -24, scale: 0.96 }, { autoAlpha: 1, x: 0, scale: 1, duration: 0.7, ease: 'expo.out' })
          .fromTo(dot, { top: '0%', autoAlpha: 0 }, { top: '50%', autoAlpha: 1, duration: 0.55, ease: 'power2.in' }, '+=0.35')
          .to(dot, { autoAlpha: 0, duration: 0.1 })
          .fromTo(core, { scale: 1 }, { scale: 1.08, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' }, '<')
          .fromTo(ring, { autoAlpha: 0.9, scale: 0.9 }, { autoAlpha: 0, scale: 1.35, duration: 0.8, ease: 'expo.out' }, '<')
          .fromTo(card, { autoAlpha: 0, y: 34, scale: 0.97 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.8, ease: 'expo.out' }, '<0.1')
          .from(items, { autoAlpha: 0, y: 8, stagger: 0.08, duration: 0.45, ease: 'power3.out' }, '<0.25')
          .to(scene, { autoAlpha: 0, y: -14, duration: 0.5, ease: 'power2.in' }, '+=2.4')
          .set(scene, { y: 0 })
      })
      return () => tl.kill()
    })
    return () => mm.revert()
  }, [])

  return (
    <div ref={root} className="central" aria-label="Exemplo animado: mensagens que viram pedido, marcação e aviso de fornada">
      <div className="central-top">
        <span className="central-live"><i aria-hidden="true" /> Central ao vivo</span>
        <div className="central-tabs" aria-hidden="true">
          {scenes.map((s, i) => (
            <span key={s.tab} data-tab data-on={i === 0} style={{ ['--tab' as string]: s.acc }}>{s.tab}</span>
          ))}
        </div>
      </div>
      <div className="central-stage">
        {scenes.map((s, i) => (
          <div key={s.tab} className="central-scene" style={i ? { opacity: 0, visibility: 'hidden' } : undefined} aria-hidden={i > 0}>
            <p className="bubble" style={{ ['--ch' as string]: s.ch }}>
              <small><i aria-hidden="true" />{s.channel}</small>
              {s.msg}
            </p>
            <div className="beam" aria-hidden="true">
              <span className="beam-line" />
              <span className="beam-dot" style={{ opacity: 0 }} />
              <span className="core"><span className="core-ring" /><Logo size={40} arc="#F4F1EA" /></span>
            </div>
            <div className="ocard" style={{ ['--acc' as string]: s.acc }}>
              <div className="ocard-head">
                <span className="ocard-tag">{s.tag}</span>
                <span className="ocard-state">{s.state}</span>
              </div>
              <h3>{s.title}</h3>
              <ul>{s.rows.map(r => <li key={r}>{r}</li>)}</ul>
              <div className="ocard-total"><span>{s.totalLabel}</span><strong>{s.total}</strong></div>
            </div>
          </div>
        ))}
      </div>
      <div className="central-foot"><span>Dados de demonstração</span><span className="mono">cenlo.pt</span></div>
    </div>
  )
}
