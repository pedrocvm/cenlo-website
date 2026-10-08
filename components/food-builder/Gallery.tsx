'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import type { Shot } from '@/lib/food-builder/screenshots'

export default function Gallery({ shots, title }: { shots: Shot[]; title: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [index, setIndex] = useState(0)
  const [open, setOpen] = useState(false)
  const shot = shots[index]

  useEffect(() => {
    const d = dialogRef.current
    if (!d) return
    if (open && !d.open) d.showModal()
    if (!open && d.open) d.close()
  }, [open])

  function show(i: number) {
    setIndex(i)
    setOpen(true)
  }

  function step(delta: number) {
    setIndex(i => (i + delta + shots.length) % shots.length)
  }

  if (!shots.length) return null

  return (
    <div>
      <div className="fb-gallery">
        {shots.map((s, i) => (
          <figure key={s.src} className={`fb-shot fb-shot-${s.device}${i === 0 ? ' fb-shot-lead' : ''}`}>
            <button type="button" onClick={() => show(i)} className="fb-shot-btn" aria-label={`Ampliar: ${s.caption}`}>
              <Image
                src={s.src}
                width={s.width}
                height={s.height}
                alt={s.alt}
                sizes={i === 0 ? '(max-width: 820px) 100vw, 760px' : '(max-width: 820px) 50vw, 360px'}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
              <span className="fb-zoom" aria-hidden="true">⤢</span>
            </button>
            <figcaption>{s.caption}</figcaption>
          </figure>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className="fb-lightbox"
        aria-label={`${title}: capturas`}
        onClose={() => setOpen(false)}
        onClick={e => { if (e.target === e.currentTarget) setOpen(false) }}
        onKeyDown={e => {
          if (e.key === 'ArrowRight') step(1)
          if (e.key === 'ArrowLeft') step(-1)
        }}
      >
        {open && shot && (
          <div className="fb-lightbox-inner">
            <div className="fb-lightbox-top">
              <span>{index + 1} / {shots.length}</span>
              <button type="button" onClick={() => setOpen(false)} className="fb-icon-btn" aria-label="Fechar">✕</button>
            </div>
            <figure key={shot.src} className="fb-lightbox-figure">
              {/* eslint-disable-next-line @next/next/no-img-element -- full-size original, no resize wanted */}
              <img src={shot.src} width={shot.width} height={shot.height} alt={shot.alt} />
              <figcaption>{shot.caption}</figcaption>
            </figure>
            {shots.length > 1 && (
              <div className="fb-lightbox-nav">
                <button type="button" onClick={() => step(-1)} className="fb-icon-btn" aria-label="Captura anterior">←</button>
                <button type="button" onClick={() => step(1)} className="fb-icon-btn" aria-label="Captura seguinte">→</button>
              </div>
            )}
          </div>
        )}
      </dialog>
    </div>
  )
}
