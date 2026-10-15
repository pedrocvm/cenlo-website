'use client'
import { useEffect, useState } from 'react'
import { products } from '@/lib/data'
import { ArrowOut } from './Icons'

const demos = products.filter(p => p.demo)
const dots = { food: 'var(--c-food)', beauty: 'var(--c-beauty2)', fornada: 'var(--c-fornada2)' }

export default function DemoSwitcher() {
  const [id, setId] = useState(demos[0].id)

  useEffect(() => {
    const wanted = new URLSearchParams(location.search).get('produto')
    if (demos.some(d => d.id === wanted)) setId(wanted as typeof id)
  }, [])

  function choose(next: typeof id) {
    setId(next)
    const url = new URL(location.href)
    url.searchParams.set('produto', next)
    history.replaceState(null, '', url)
  }

  const current = demos.find(d => d.id === id)!
  const demo = current.demo!

  return (
    <div className="demo">
      <div className="demo-tabs" role="tablist" aria-label="Escolha a demonstração">
        {demos.map(d => (
          <button
            key={d.id}
            type="button"
            role="tab"
            id={`tab-${d.id}`}
            aria-selected={d.id === id}
            aria-controls="demo-panel"
            className="demo-tab"
            style={{ ['--dot' as string]: dots[d.id] }}
            onClick={() => choose(d.id)}
          >
            <i aria-hidden="true" />
            <span><b>{d.name}</b><small>{d.demo!.place} · {d.demo!.kind}</small></span>
          </button>
        ))}
      </div>
      <div id="demo-panel" role="tabpanel" aria-labelledby={`tab-${id}`} className="demo-frame">
        <div className="demo-bar">
          <span className="demo-dots" aria-hidden="true"><i /><i /><i /></span>
          <span className="demo-url">{demo.url.replace('https://', '')}</span>
          <a href={demo.url} target="_blank" rel="noopener" className="demo-open">Abrir em tela cheia <ArrowOut size={14} /></a>
        </div>
        <iframe key={id} src={demo.url} title={`Demonstração do ${current.name}: ${demo.place}`} allow="clipboard-write" />
      </div>
    </div>
  )
}
