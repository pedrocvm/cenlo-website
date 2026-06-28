'use client'
import { useEffect } from 'react'
import { usePrivacy } from './PrivacyContext'
import { privacy } from '@/lib/data'

export default function PrivacyModal() {
  const { open, closeModal } = usePrivacy()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, closeModal])

  if (!open) return null

  return (
    <div
      onClick={closeModal}
      role="dialog"
      aria-modal="true"
      aria-label="Política de Privacidade"
      style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(7,7,10,.72)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '40px 20px', overflowY: 'auto' }}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="modal-panel"
        style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 18, maxWidth: 620, width: '100%', boxShadow: '0 40px 80px -40px rgba(0,0,0,.7)' }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '22px 26px', borderBottom: '1px solid var(--line2)', position: 'sticky', top: 0, background: 'var(--surface)', borderRadius: '18px 18px 0 0' }}>
          <h2 style={{ fontSize: 22, color: '#fff' }}>Política de Privacidade</h2>
          <button
            onClick={closeModal}
            data-privacy-close
            aria-label="Fechar"
            style={{ background: 'none', border: '1px solid var(--line)', borderRadius: 9, width: 38, height: 38, color: 'var(--ink)', fontSize: 18, flexShrink: 0, cursor: 'pointer' }}
          >✕</button>
        </div>
        <div style={{ padding: '24px 26px 28px', display: 'flex', flexDirection: 'column', gap: 18 }}>
          <p style={{ fontSize: 13, color: 'var(--muted)' }}>Última atualização: junho de 2026</p>
          {privacy.map(s => (
            <div key={s.t}>
              <h3 style={{ fontSize: 15.5, color: 'var(--ink)', fontWeight: 700, marginBottom: 6 }}>{s.t}</h3>
              <p style={{ fontSize: 14.5, color: 'var(--ink2)' }}>{s.d}</p>
            </div>
          ))}
          <p style={{ fontSize: 13.5, color: 'var(--muted)', borderTop: '1px solid var(--line2)', paddingTop: 16 }}>
            Dúvidas sobre os seus dados? Escreva para{' '}
            <a href="mailto:ola@cenlo.pt" style={{ color: 'var(--terra)', fontWeight: 600 }}>ola@cenlo.pt</a>.
          </p>
          <button
            onClick={closeModal}
            style={{ alignSelf: 'flex-start', background: 'var(--terraBtn)', color: '#fff', border: 'none', padding: '12px 22px', borderRadius: 10, fontWeight: 600, fontSize: 15, cursor: 'pointer' }}
          >Entendi</button>
        </div>
      </div>
    </div>
  )
}
