'use client'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(ScrollTrigger, SplitText)

export default function Motion() {
  const pathname = usePathname()

  useEffect(() => {
    document.documentElement.dataset.motion = 'ready'
    const mm = gsap.matchMedia()

    mm.add({ motion: '(prefers-reduced-motion: no-preference)', wide: '(min-width: 981px)' }, ctx => {
      const { motion, wide } = ctx.conditions as { motion: boolean; wide: boolean }
      if (!motion) return

      const splits = gsap.utils.toArray<HTMLElement>('[data-split]').map(el =>
        SplitText.create(el, {
          type: 'lines',
          mask: 'lines',
          linesClass: 'split-line',
          autoSplit: true,
          onSplit: self => gsap.from(self.lines, {
            yPercent: 110,
            duration: 1.1,
            ease: 'expo.out',
            stagger: 0.09,
            delay: el.dataset.split === 'now' ? 0.15 : 0,
            scrollTrigger: el.dataset.split === 'now' ? undefined : { trigger: el, start: 'top 86%', once: true },
          }),
        }),
      )

      ScrollTrigger.batch('[data-reveal]', {
        start: 'top 90%',
        once: true,
        onEnter: batch => gsap.fromTo(batch, { autoAlpha: 0, y: 32 }, { autoAlpha: 1, y: 0, duration: 0.95, ease: 'expo.out', stagger: 0.08, overwrite: true }),
      })

      if (wide) {
        gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach(el => {
          gsap.to(el, {
            yPercent: -Number(el.dataset.parallax || 8),
            ease: 'none',
            scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
          })
        })

        const slots = gsap.utils.toArray<HTMLElement>('.panel-slot')
        slots.slice(0, -1).forEach((slot, i) => {
          gsap.to(slot.firstElementChild, {
            scale: 0.94,
            filter: 'brightness(.7)',
            ease: 'none',
            scrollTrigger: { trigger: slots[i + 1], start: 'top 70%', end: 'top top+=86', scrub: true },
          })
        })
      }

      return () => splits.forEach(s => s.revert())
    })

    const spotlight = (e: PointerEvent) => {
      const card = (e.target as Element).closest?.<HTMLElement>('.principle')
      if (!card) return
      const r = card.getBoundingClientRect()
      card.style.setProperty('--mx', `${e.clientX - r.left}px`)
      card.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
    document.addEventListener('pointermove', spotlight, { passive: true })

    return () => { mm.revert(); document.removeEventListener('pointermove', spotlight) }
  }, [pathname])

  return null
}
