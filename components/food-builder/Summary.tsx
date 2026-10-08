'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BASE_MODULES, MODULES } from '@/lib/food-builder/catalog'
import { TierBadge } from './SelectToggle'
import { clearSelection, removeModule, useSelection } from './selection'

function countLabel(n: number) {
  return n === 1 ? 'módulo selecionado' : 'módulos selecionados'
}

function Panel({ onNavigate, headingId }: { onNavigate?: () => void; headingId: string }) {
  const selection = useSelection()
  const [confirming, setConfirming] = useState(false)
  const selected = MODULES.filter(m => selection.includes(m.id))

  return (
    <section className="fb-summary" aria-labelledby={headingId}>
      <h2 id={headingId}>A sua configuração Cenlo Food</h2>
      <div className="fb-count" aria-live="polite">
        <strong key={selected.length}>{selected.length}</strong>
        <span>{countLabel(selected.length)}</span>
      </div>
      <div className="fb-base">
        <span className="fb-badge fb-badge-ok" aria-hidden="true">Base</span>
        <Link href="/food/montar#modulos" onClick={onNavigate}><b>{BASE_MODULES.length} módulos</b> já incluídos</Link>
      </div>
      {selected.length ? (
        <ul className="fb-sel-list">
          {selected.map(m => (
            <li key={m.id}>
              <Link href={`/food/montar/${m.slug}`} onClick={onNavigate}>{m.title}</Link>
              {m.tier === 'premium' && <TierBadge tier="premium" />}
              <button type="button" className="fb-x" onClick={() => removeModule(m.id)} aria-label={`Remover ${m.title}`}>✕</button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="fb-empty">Junte à base os módulos premium e opcionais que fazem sentido para a sua operação. Pode alterar a escolha a qualquer momento.</p>
      )}
      <Link href="/food/montar/rever" className="fb-btn fb-btn-primary" onClick={onNavigate}>Rever a minha configuração</Link>
      {selected.length > 0 && (
        <div className="fb-reset">
          {confirming ? (
            <>
              <span>Limpar todos os módulos escolhidos?</span>
              <button type="button" className="fb-link-btn" onClick={() => { clearSelection(); setConfirming(false) }}>Sim, recomeçar</button>
              <button type="button" className="fb-link-btn" onClick={() => setConfirming(false)}>Cancelar</button>
            </>
          ) : (
            <button type="button" className="fb-link-btn" onClick={() => setConfirming(true)}>Recomeçar a configuração</button>
          )}
        </div>
      )}
      <p className="fb-note">Sem compromisso. A seleção é uma preferência para analisarmos consigo, não ativa nada na sua conta.</p>
    </section>
  )
}

export default function Summary({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const selection = useSelection()
  const sheetRef = useRef<HTMLDialogElement>(null)
  const [sheetOpen, setSheetOpen] = useState(false)
  const showSide = !pathname.startsWith('/food/montar/rever') && !pathname.startsWith('/food/montar/enviado')

  useEffect(() => {
    const d = sheetRef.current
    if (!d) return
    if (sheetOpen && !d.open) d.showModal()
    if (!sheetOpen && d.open) d.close()
  }, [sheetOpen])

  useEffect(() => setSheetOpen(false), [pathname])

  const n = selection.length

  return (
    <div className={`fb-shell${showSide ? ' has-side' : ''}`}>
      <div className="fb-main">{children}</div>
      {showSide && (
        <>
          <aside className="fb-side" aria-label="Resumo da configuração">
            <Panel headingId="fb-summary-side" />
          </aside>
          <div className="fb-bar">
            <button type="button" className="fb-bar-open" onClick={() => setSheetOpen(true)} aria-haspopup="dialog">
              <small>A sua configuração · base incluída</small>
              <strong><b key={n}>{n}</b> {countLabel(n)} ▴</strong>
            </button>
            <Link href="/food/montar/rever" className="fb-btn fb-btn-primary">Rever</Link>
          </div>
          <dialog
            ref={sheetRef}
            className="fb-sheet"
            aria-label="Resumo da configuração"
            onClose={() => setSheetOpen(false)}
            onClick={e => { if (e.target === e.currentTarget) setSheetOpen(false) }}
          >
            {sheetOpen && (
              <div style={{ position: 'relative' }}>
                <button type="button" className="fb-icon-btn" onClick={() => setSheetOpen(false)} aria-label="Fechar resumo" style={{ position: 'absolute', top: 14, right: 14 }}>✕</button>
                <Panel headingId="fb-summary-sheet" onNavigate={() => setSheetOpen(false)} />
              </div>
            )}
          </dialog>
        </>
      )}
    </div>
  )
}
