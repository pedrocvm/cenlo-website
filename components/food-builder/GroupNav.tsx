'use client'
import { useEffect, useRef, useState } from 'react'

export default function GroupNav({ groups }: { groups: { id: string; title: string; count: number }[] }) {
  const [active, setActive] = useState(groups[0]?.id)
  const [edges, setEdges] = useState({ left: false, right: false })
  const listRef = useRef<HTMLOListElement>(null)
  const lockUntil = useRef(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (Date.now() < lockUntil.current) return
        const visible = entries.filter(e => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (visible) setActive(visible.target.id.replace('grupo-', ''))
      },
      { rootMargin: '-140px 0px -55% 0px' },
    )
    groups.forEach(g => {
      const el = document.getElementById(`grupo-${g.id}`)
      if (el) observer.observe(el)
    })
    const atBottom = () => {
      if (Date.now() >= lockUntil.current && innerHeight + scrollY >= document.documentElement.scrollHeight - 4) setActive(groups[groups.length - 1]?.id)
    }
    window.addEventListener('scroll', atBottom, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', atBottom)
    }
  }, [groups])

  useEffect(() => {
    const list = listRef.current
    if (!list) return
    const update = () => setEdges({ left: list.scrollLeft > 4, right: list.scrollLeft + list.clientWidth < list.scrollWidth - 4 })
    update()
    list.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      list.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  useEffect(() => {
    const list = listRef.current
    const item = list?.querySelector<HTMLElement>(`[data-group="${active}"]`)
    if (!list || !item || list.scrollWidth <= list.clientWidth) return
    list.scrollTo({ left: item.offsetLeft - list.clientWidth / 2 + item.offsetWidth / 2 })
  }, [active])

  function page(direction: 1 | -1) {
    const list = listRef.current
    list?.scrollBy({ left: direction * list.clientWidth * 0.7, behavior: 'smooth' })
  }

  return (
    <nav className="fb-groupnav" aria-label="Áreas de módulos">
      {edges.left && <button type="button" className="fb-groupnav-arrow is-left" onClick={() => page(-1)} aria-label="Ver áreas anteriores">‹</button>}
      <ol ref={listRef}>
        {groups.map(g => (
          <li key={g.id} data-group={g.id}>
            <a href={`#grupo-${g.id}`} aria-current={active === g.id ? 'true' : undefined} onClick={() => { lockUntil.current = Date.now() + 1200; setActive(g.id) }}>
              {g.title} <small>{g.count}</small>
            </a>
          </li>
        ))}
      </ol>
      {edges.right && <button type="button" className="fb-groupnav-arrow is-right" onClick={() => page(1)} aria-label="Ver mais áreas">›</button>}
    </nav>
  )
}
