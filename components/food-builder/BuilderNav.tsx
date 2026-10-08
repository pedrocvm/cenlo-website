'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function BuilderNav() {
  const pathname = usePathname()
  return (
    <nav className="fb-header-nav" aria-label="Builder">
      <Link href="/configurar" className="fb-header-link" aria-current={pathname === '/configurar' ? 'page' : undefined}>Módulos</Link>
      <Link href="/configurar/rever" className="fb-header-link" aria-current={pathname === '/configurar/rever' ? 'page' : undefined}>Rever</Link>
      <a href="https://cenlofood.cenlo.pt" className="fb-header-link hide-sm">Conhecer o Cenlo Food</a>
    </nav>
  )
}
