'use client'
import { useEffect, useRef } from 'react'
import { usePrivacy } from './PrivacyContext'
import { privacy } from '@/lib/data'

export default function PrivacyModal() {
  const { open, closeModal } = usePrivacy()
  const close = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const prev = document.activeElement as HTMLElement | null
    close.current?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal() }
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); prev?.focus() }
  }, [open, closeModal])

  if (!open) return null

  return (
    <div className="modal" onClick={closeModal} role="dialog" aria-modal="true" aria-labelledby="privacy-title">
      <div className="modal-panel" onClick={e => e.stopPropagation()}>
        <div className="modal-head">
          <h2 id="privacy-title" style={{ fontSize: 22 }}>Política de Privacidade</h2>
          <button ref={close} type="button" onClick={closeModal} data-privacy-close aria-label="Fechar" className="icon-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
        </div>
        <div className="modal-body">
          <p style={{ fontSize: 13, color: 'var(--c-mute)', marginTop: 0 }}>Última atualização: outubro de 2026</p>
          {privacy.map(s => (
            <div key={s.t}>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </div>
          ))}
          <button type="button" onClick={closeModal} className="btn btn-primary btn-sm" style={{ justifySelf: 'start' }}>Entendi</button>
        </div>
      </div>
    </div>
  )
}
