'use client'
import { useState } from 'react'
import { faqs } from '@/lib/data'

export default function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 10 }}>
      {faqs.map((q, i) => {
        const isOpen = open === i
        return (
          <button
            key={i}
            onClick={() => setOpen(isOpen ? null : i)}
            aria-expanded={isOpen}
            style={{ textAlign: 'left', background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 13, padding: '18px 20px', width: '100%', cursor: 'pointer' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
              <span style={{ fontWeight: 600, fontSize: 16, color: '#fff' }}>{q.q}</span>
              <span className={`faq-icon${isOpen ? ' open' : ''}`} style={{ fontSize: 20, color: 'var(--terra)', flexShrink: 0, lineHeight: 1 }}>+</span>
            </div>
            <div className={`faq-body${isOpen ? ' open' : ''}`}>
              <div><p style={{ fontSize: 15, color: 'var(--ink2)', marginTop: 12 }}>{q.a}</p></div>
            </div>
          </button>
        )
      })}
    </div>
  )
}
