'use client'
import { useState } from 'react'
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

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(11,11,15,.78)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--line)' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px', height: 68, display: 'flex', alignItems: 'center', gap: 28 }}>
        <Link href="/" aria-label="Início Cenlo" style={{ background: 'none', border: 'none', padding: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
          <Logo />
          <span style={{ fontFamily: 'var(--font-schibsted)', fontWeight: 800, fontSize: 21, letterSpacing: '-.03em', color: 'var(--ink)' }}>Cenlo</span>
        </Link>

        <nav aria-label="Principal" style={{ display: 'flex', gap: 4, marginLeft: 6 }} className="hidden md:flex">
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

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Link
            href="/contacto"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--terraBtn)', color: '#fff', border: 'none', padding: '11px 18px', borderRadius: 10, fontWeight: 600, fontSize: 14.5, whiteSpace: 'nowrap' }}
          >Pedir demonstração</Link>

          <button
            onClick={() => setMobileOpen(v => !v)}
            aria-label="Menu"
            className="flex md:hidden"
            style={{ background: 'none', border: '1px solid var(--line)', borderRadius: 9, width: 44, height: 44, alignItems: 'center', justifyContent: 'center', fontSize: 18, color: 'var(--ink)', cursor: 'pointer' }}
          >≡</button>
        </div>
      </div>

      {mobileOpen && (
        <div style={{ borderTop: '1px solid var(--line)', background: 'var(--bg)', padding: '8px 16px 14px' }}>
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              style={{ display: 'block', width: '100%', textAlign: 'left', padding: '13px 8px', fontSize: 16, fontWeight: 600, color: 'var(--ink)', borderBottom: '1px solid var(--line2)' }}
            >{item.label}</Link>
          ))}
        </div>
      )}
    </header>
  )
}
