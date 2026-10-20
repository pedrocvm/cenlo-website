(() => {
  const root = document.querySelector('[data-composition-id]')
  if (!root || !window.gsap) throw new Error('HyperFrames composition requires GSAP')

  const id = root.getAttribute('data-composition-id')
  const q = selector => root.querySelectorAll(selector)
  const tl = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } })

  gsap.set(q('.hf-search-card'), { opacity: 0, y: 55, scale: .95 })
  gsap.set(q('.hf-result'), { opacity: 0, y: 22 })
  gsap.set(q('.hf-fragment'), { opacity: 0, scale: .75, filter: 'blur(10px)' })
  gsap.set(q('.hf-phone-wrap'), { opacity: 0, scale: .72, rotateY: -24, rotateX: 8, y: 90 })
  gsap.set(q('.hf-screen img'), { opacity: 0, scale: 1.04 })
  gsap.set(q('.hf-screen img[data-screen="home"]'), { opacity: 1, scale: 1 })
  gsap.set(q('.hf-label'), { opacity: 0, scale: .7 })
  gsap.set(q('.hf-offer'), { opacity: 0, scale: .72, rotate: -14 })
  gsap.set(q('.hf-headline'), { opacity: 0, y: 45 })
  gsap.set(q('.hf-brand'), { opacity: 0, y: -18 })

  tl.to(q('.hf-brand'), { opacity: 1, y: 0, duration: .55 }, 0)
    .to(q('.hf-search-card'), { opacity: 1, y: 0, scale: 1, duration: .8 }, .15)
    .fromTo(q('.hf-typed'), { width: 0 }, { width: 'auto', duration: 1.1, ease: 'none' }, .55)
    .to(q('.hf-cursor'), { opacity: 0, duration: .08, repeat: 5, yoyo: true, ease: 'none' }, .62)
    .to(q('.hf-result'), { opacity: 1, y: 0, duration: .45 }, 1.45)
    .to(q('.hf-search-card'), { opacity: 0, y: -45, scale: .97, duration: .48, ease: 'power2.in' }, 2.05)

  tl.to(q('.hf-fragment'), {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    duration: .55,
    stagger: .09,
    ease: 'back.out(1.45)',
  }, 2.25)
    .to(q('.hf-fragment'), {
      left: '50%',
      right: 'auto',
      top: '50%',
      bottom: 'auto',
      xPercent: -50,
      yPercent: -50,
      scale: .15,
      opacity: 0,
      rotate: 0,
      duration: .75,
      stagger: .035,
      ease: 'power3.in',
    }, 3.15)
    .to(q('.hf-phone-wrap'), {
      opacity: 1,
      scale: 1,
      rotateY: -5,
      rotateX: 2,
      y: 0,
      duration: .95,
      ease: 'expo.out',
    }, 3.35)
    .to(q('.hf-label-menu'), { opacity: 1, scale: 1, duration: .45, ease: 'back.out(1.8)' }, 4.05)

  tl.to(q('.hf-screen img[data-screen="home"]'), { opacity: 0, scale: .98, duration: .35 }, 4.55)
    .to(q('.hf-screen img[data-screen="menu"]'), { opacity: 1, scale: 1, duration: .52 }, 4.55)
    .to(q('.hf-screen img[data-screen="menu"]'), { yPercent: -12, duration: 1.15, ease: 'power1.inOut' }, 4.95)
    .to(q('.hf-label-menu'), { opacity: 0, scale: .8, duration: .3 }, 5.65)
    .to(q('.hf-screen img[data-screen="menu"]'), { opacity: 0, duration: .35 }, 5.85)
    .to(q('.hf-screen img[data-screen="cart"]'), { opacity: 1, scale: 1, duration: .5 }, 5.85)
    .to(q('.hf-label-order'), { opacity: 1, scale: 1, duration: .48, ease: 'back.out(1.8)' }, 6.2)

  tl.to(q('.hf-phone-wrap'), { x: root.classList.contains('is-mobile') ? 0 : 235, scale: .88, duration: .8 }, 7.05)
    .to(q('.hf-label-order'), { opacity: 0, scale: .8, duration: .25 }, 7.15)
    .to(q('.hf-headline'), { opacity: 1, y: 0, duration: .7 }, 7.25)
    .to(q('.hf-offer'), { opacity: 1, scale: 1, rotate: -5, duration: .65, ease: 'back.out(1.55)' }, 7.65)
    .to(q('.hf-headline'), { opacity: 0, y: -25, duration: .42, ease: 'power2.in' }, 9.15)
    .to(q('.hf-offer'), { opacity: 0, scale: .84, duration: .4, ease: 'power2.in' }, 9.2)
    .to(q('.hf-phone-wrap'), { opacity: 0, scale: .78, y: 35, duration: .42, ease: 'power2.in' }, 9.25)
    .to(q('.hf-search-card'), { opacity: 1, y: 0, scale: 1, duration: .52 }, 9.42)
    .set({}, {}, 10)

  window.__timelines = window.__timelines || {}
  window.__timelines[id] = tl
})()
