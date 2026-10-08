'use client'
import { useEffect, useState } from 'react'

export default function GroupNav({ groups }: { groups: { id: string; title: string; count: number }[] }) {
  const [active, setActive] = useState(groups[0]?.id)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (visible) setActive(visible.target.id.replace('grupo-', ''))
      },
      { rootMargin: '-140px 0px -55% 0px' },
    )
    groups.forEach(g => {
      const el = document.getElementById(`grupo-${g.id}`)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [groups])

  return (
    <nav className="fb-groupnav" aria-label="Áreas de módulos">
      <ol>
        {groups.map(g => (
          <li key={g.id}>
            <a href={`#grupo-${g.id}`} aria-current={active === g.id ? 'true' : undefined}>
              {g.title} <small>{g.count}</small>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
