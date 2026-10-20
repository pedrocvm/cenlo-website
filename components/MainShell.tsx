'use client'

import { usePathname } from 'next/navigation'

export default function MainShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  if (pathname.startsWith('/site-pizzaria')) {
    return <div id="main">{children}</div>
  }

  return <main id="main">{children}</main>
}
