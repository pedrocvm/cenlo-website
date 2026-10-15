'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from './Logo'

const nav = [
  { label: 'Produtos', href: '/produtos' },
  { label: 'Como funciona', href: '/#como-funciona' },
  { label: 'Demo', href: '/demo' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Contato', href: '/contacto' },
]

const productLinks = [
  { label: 'Cenlo Food', href: '/produtos#food', dot: 'var(--c-food)' },
  { label: 'Cenlo Beauty', href: '/produtos#beauty', dot: 'var(--c-beauty2)' },
  { label: 'Fornada Certa', href: '/produtos#fornada-certa', dot: 'var(--c-fornada2)' },
]

export default function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const btn = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setOpen(false); btn.current?.focus() }
    }
    document.addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; document.removeEventListener('keydown', onKey) }
  }, [open])

  if (pathname.startsWith('/configurar')) return null

  return (
    <>
      <header className="site-header" data-scrolled={scrolled || open}>
        <div className="wrap site-header-in">
          <Link href="/" className="brand" aria-label="Cenlo, início">
            <Logo />
            <span className="brand-word">Cenlo</span>
          </Link>
          <nav aria-label="Principal" className="nav">
            {nav.map(i => (
              <Link key={i.href} href={i.href} aria-current={pathname === i.href ? 'page' : undefined}>{i.label}</Link>
            ))}
          </nav>
          <div className="header-actions">
            <Link href="/contacto" className="btn btn-primary btn-sm header-cta">Falar com a equipe</Link>
            <button
              ref={btn}
              type="button"
              className="menu-btn"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen(v => !v)}
            ><span /></button>
          </div>
        </div>
      </header>
      {open && (
        <nav id="mobile-nav" className="mobile-nav" aria-label="Menu">
          {nav.map(i => <Link key={i.href} href={i.href} className="m-link" onClick={() => setOpen(false)}>{i.label}</Link>)}
          <div className="m-products">
            {productLinks.map(p => (
              <Link key={p.href} href={p.href} onClick={() => setOpen(false)}>
                <i style={{ width: 9, height: 9, borderRadius: '50%', background: p.dot }} aria-hidden="true" />{p.label}
              </Link>
            ))}
          </div>
          <Link href="/contacto" className="btn btn-primary" onClick={() => setOpen(false)}>Falar com a equipe</Link>
        </nav>
      )}
    </>
  )
}
