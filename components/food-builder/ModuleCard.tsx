'use client'
import Image from 'next/image'
import Link from 'next/link'
import { CORE_MODULE_ID, type Module } from '@/lib/food-builder/catalog'
import type { Shot } from '@/lib/food-builder/screenshots'
import ModuleIcon from './ModuleIcon'
import SelectToggle, { RemoveLink, TierBadge } from './SelectToggle'
import { isSelected, useSelection } from './selection'

export default function ModuleCard({ module: m, number, shot }: { module: Module; number: number; shot?: Shot }) {
  const selection = useSelection()
  const on = isSelected(selection, m.id)
  const href = `/configurar/${m.slug}`

  return (
    <article className={`fb-card fb-card-${m.tier}${on && m.tier !== 'base' ? ' is-on' : ''}${m.id === CORE_MODULE_ID ? ' is-core' : ''}`} aria-labelledby={`card-${m.id}`}>
      <Link href={href} className={`fb-card-media${shot?.device === 'mobile' ? ' is-mobile' : ''}${shot ? '' : ' is-empty'}`} tabIndex={-1} aria-hidden="true">
        {shot ? (
          <Image src={shot.src} alt="" width={shot.width} height={shot.height} sizes="(max-width: 820px) 100vw, 480px" />
        ) : (
          <span>Captura em preparação</span>
        )}
      </Link>
      <div className="fb-card-body">
        <div className="fb-card-top">
          <ModuleIcon name={m.icon} />
          <div style={{ minWidth: 0 }}>
            <div className="fb-card-num">{String(number).padStart(2, '0')}</div>
            <h3 id={`card-${m.id}`}>{m.title}</h3>
          </div>
        </div>
        <div><TierBadge tier={m.tier} /></div>
        <p className="fb-promise">{m.promise}</p>
        <p className="fb-desc">{m.summary}</p>
        <div className="fb-card-actions">
          <SelectToggle id={m.id} title={m.title} tier={m.tier} />
          <div className="fb-card-links">
            <Link href={href} className="fb-details" aria-label={`Ver detalhes de ${m.title}`}>Ver detalhes <span aria-hidden="true">→</span></Link>
            <RemoveLink id={m.id} title={m.title} />
          </div>
        </div>
      </div>
    </article>
  )
}
