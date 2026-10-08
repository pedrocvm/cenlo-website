'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function BuilderNav() {
  const pathname = usePathname()
  return (
    <nav className="fb-header-nav" aria-label="Builder">
      <Link href="/food/montar" className="fb-header-link" aria-current={pathname === '/food/montar' ? 'page' : undefined}>Módulos</Link>
      <Link href="/food/montar/rever" className="fb-header-link" aria-current={pathname === '/food/montar/rever' ? 'page' : undefined}>Rever</Link>
      <a href="https://cenlofood.cenlo.pt" className="fb-header-link hide-sm">Conhecer o Cenlo Food</a>
    </nav>
  )
}
