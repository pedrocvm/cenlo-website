// Builds the shared, paused timeline. Each composition registers it inline under its own id.
function buildSitePizzariaTimeline() {
  const root = document.querySelector('[data-composition-id]')
  const q = sel => root.querySelectorAll(sel)
  const tl = gsap.timeline({ paused: true })

  // One order, the same one the landing mockup shows: tap, next screen, caption. Positions are the real buttons, in % of the screen.
  const steps = [
    { screen: 'inicio', tap: [60.8, 67.8] },
    { screen: 'cardapio', tap: [50, 84] },
    { screen: 'pizza', tap: [50, 95.1] },
    { screen: 'carrinho', tap: [50, 89.8] },
    { screen: 'wa', tap: [90.5, 95.5] },
  ]
  const STEP = 2
  const tap = root.querySelector('.hf-tap')
  const captions = q('.hf-caption')

  tl.fromTo('.hf-copy > *', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' }, 0)
  tl.fromTo('.hf-phone', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0.1)

  steps.forEach((step, i) => {
    const at = 0.6 + i * STEP
    tl.fromTo(captions[i], { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }, at)
    if (i < steps.length - 1) tl.to(captions[i], { opacity: 0, y: -10, duration: 0.25 }, at + STEP - 0.25)
    tl.set(tap, { left: step.tap[0] + '%', top: step.tap[1] + '%' }, at + 1.1)
    tl.fromTo(tap, { opacity: 0, scale: 1.6 }, { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' }, at + 1.1)
    tl.to(tap, { scale: 0.82, duration: 0.12, yoyo: true, repeat: 1 }, at + 1.55)
    tl.to(tap, { opacity: 0, duration: 0.2 }, at + 1.8)
    const next = steps[i + 1]
    if (next) {
      const el = root.querySelector(`[data-screen="${next.screen}"]`)
      tl.fromTo(el, { opacity: 0, xPercent: 14 }, { opacity: 1, xPercent: 0, duration: 0.4, ease: 'power3.out' }, at + 1.9)
    }
  })

  const waAt = 0.6 + 4 * STEP
  tl.fromTo(q('.hf-wa-draft .hf-line'), { opacity: 0 }, { opacity: 1, duration: 0.2, stagger: 0.05 }, waAt - 0.05)
  tl.to('.hf-wa-composer', { opacity: 0, duration: 0.2 }, waAt + 1.85)
  tl.fromTo('.hf-wa-bubble', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }, waAt + 1.9)
  tl.fromTo(captions[5], { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.35 }, waAt + 1.9)
  tl.to(captions[4], { opacity: 0, duration: 0.2 }, waAt + 1.75)

  if (document.body.classList.contains('is-mobile')) tl.to('.hf-phone', { opacity: 0, duration: 0.4 }, waAt + 2.5)
  tl.fromTo('.hf-offer', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, waAt + 2.6)

  return tl
}
