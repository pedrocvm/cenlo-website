'use client'

import { usePathname } from 'next/navigation'

export default function MainShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  if (pathname.startsWith('/site-pizzaria')) {
    return <>{children}</>
  }

  return <main id="main">{children}</main>
}
