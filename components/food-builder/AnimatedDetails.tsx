'use client'

import { useEffect, useRef, type ComponentProps } from 'react'

/** Keep native disclosure semantics while animating both directions, including interruptions. */
export default function AnimatedDetails({ children, onClick, ...props }: ComponentProps<'details'>) {
  const animation = useRef<Animation | null>(null)
  const target = useRef<boolean | null>(null)
  useEffect(() => () => animation.current?.cancel(), [])

  return <details {...props} onClick={event => {
    onClick?.(event)
    const element = event.currentTarget
    const summary = (event.target as HTMLElement).closest('summary')
    if (event.defaultPrevented || !summary || summary.parentElement !== element) return
    if ((event.target as HTMLElement).closest('a,button,input,select,textarea')) return
    event.preventDefault()
    const opening = !(target.current ?? element.open)
    const from = element.getBoundingClientRect().height
    animation.current?.cancel()
    target.current = opening
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      element.open = opening
      target.current = null
      return
    }
    // Measure the natural endpoint, then keep the content rendered until closing finishes.
    element.open = opening
    const to = element.getBoundingClientRect().height
    element.open = true
    element.style.overflow = 'clip'
    const motion = element.animate([{ height: `${from}px` }, { height: `${to}px` }], {
      duration: opening ? 300 : 240,
      easing: 'cubic-bezier(.22, 1, .36, 1)',
    })
    animation.current = motion
    motion.onfinish = () => {
      element.open = opening
      element.style.overflow = ''
      animation.current = null
      target.current = null
    }
  }}>{children}</details>
}
