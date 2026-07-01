'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from './Logo'

const navItems = [
  { label: 'Início', href: '/' },
  { label: 'Produtos', href: '/produtos' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Contacto', href: '/contacto' },
]

export default function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const hamburgerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!mobileOpen) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setMobileOpen(false)
        hamburgerRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [mobileOpen])

  function closeMobile() {
    setMobileOpen(false)
  }

  return (
    <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: 'rgba(11,11,15,.78)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--line)' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px', height: 68, display: 'flex', alignItems: 'center', gap: 28 }}>
        <Link href="/" aria-label="Início Cenlo" style={{ background: 'none', border: 'none', padding: 0, display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <Logo />
          <span style={{ fontFamily: 'var(--font-schibsted)', fontWeight: 800, fontSize: 21, letterSpacing: '-.03em', color: 'var(--ink)' }}>Cenlo</span>
        </Link>

        {/* Desktop nav — display controlled entirely by Tailwind hidden md:flex; no inline display to avoid override */}
        <nav aria-label="Principal" style={{ gap: 4, marginLeft: 6 }} className="hidden md:flex">
          {navItems.map(item => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  background: active ? 'var(--bg2)' : 'none',
                  border: 'none',
                  padding: '9px 13px',
                  borderRadius: 9,
                  fontSize: 14.5,
                  fontWeight: active ? 600 : 500,
                  color: active ? 'var(--ink)' : 'var(--ink2)',
                  display: 'inline-block',
                }}
              >{item.label}</Link>
            )
          })}
        </nav>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
          <Link
            href="/contacto"
            className="header-cta cta-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--terraBtn)', color: '#fff', border: 'none', padding: '11px 18px', borderRadius: 10, fontWeight: 600, fontSize: 14.5, whiteSpace: 'nowrap' }}
          >Pedir demonstração</Link>

          <button
            ref={hamburgerRef}
            onClick={() => setMobileOpen(v => !v)}
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            className="flex md:hidden"
            style={{ background: 'none', border: '1px solid var(--line)', borderRadius: 9, width: 44, height: 44, alignItems: 'center', justifyContent: 'center', fontSize: 18, color: 'var(--ink)', cursor: 'pointer', flexShrink: 0 }}
          >{mobileOpen ? '✕' : '≡'}</button>
        </div>
      </div>

      {mobileOpen && (
        <div id="mobile-nav" className="mobile-menu-panel" style={{ borderTop: '1px solid var(--line)', background: 'var(--bg)', padding: '8px 16px 16px' }}>
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={closeMobile}
              style={{ display: 'block', width: '100%', textAlign: 'left', padding: '13px 8px', fontSize: 16, fontWeight: 600, color: 'var(--ink)', borderBottom: '1px solid var(--line2)' }}
            >{item.label}</Link>
          ))}
          <Link
            href="/contacto"
            onClick={closeMobile}
            style={{ display: 'block', width: '100%', textAlign: 'center', marginTop: 14, background: 'var(--terraBtn)', color: '#fff', padding: '13px', borderRadius: 10, fontWeight: 600, fontSize: 15 }}
          >Pedir demonstração</Link>
        </div>
      )}
    </header>
  )
}
