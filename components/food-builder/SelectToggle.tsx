'use client'
import type { Tier } from '@/lib/food-builder/catalog'
import { isSelected, toggleModule, useSelection } from './selection'

export function TierBadge({ tier }: { tier: Tier }) {
  if (tier === 'premium') return <span className="fb-tier fb-tier-premium"><span aria-hidden="true">★</span> Premium</span>
  if (tier === 'optional') return <span className="fb-tier fb-tier-optional">Opcional</span>
  return <span className="fb-tier fb-tier-base"><span aria-hidden="true">✓</span> Incluído na base</span>
}

export default function SelectToggle({ id, title, tier }: { id: string; title: string; tier: Tier }) {
  const selection = useSelection()
  const on = isSelected(selection, id)

  if (tier === 'base') {
    return (
      <div className="fb-core-note">
        <span className="fb-toggle-mark is-base" aria-hidden="true">✓</span>
        <span>Já incluído em qualquer configuração Cenlo Food</span>
      </div>
    )
  }

  return (
    <button
      type="button"
      className={`fb-toggle${tier === 'premium' ? ' is-premium' : ''}`}
      aria-pressed={on}
      aria-label={on ? `${title}: incluído na minha configuração. Carregar para remover.` : `Adicionar ${title} à minha configuração`}
      onClick={() => toggleModule(id)}
    >
      <span className="fb-toggle-mark" aria-hidden="true">{on ? '✓' : '+'}</span>
      <span>{on ? 'Incluído na minha configuração' : 'Adicionar à minha configuração'}</span>
    </button>
  )
}

export function RemoveLink({ id, title }: { id: string; title: string }) {
  const selection = useSelection()
  if (!selection.includes(id)) return null
  return <button type="button" className="fb-link-btn" onClick={() => toggleModule(id)} aria-label={`Remover ${title} da configuração`}>Remover</button>
}
