'use client'
import { isSelected, toggleModule, useSelection } from './selection'

export default function SelectToggle({ id, title, required }: { id: string; title: string; required: boolean }) {
  const selection = useSelection()
  const on = isSelected(selection, id)

  if (required) {
    return (
      <div className="fb-core-note">
        <span className="fb-badge">Base</span>
        <span>Base Cenlo Food incluída</span>
      </div>
    )
  }

  return (
    <button
      type="button"
      className="fb-toggle"
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
