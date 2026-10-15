import { ImageResponse } from 'next/og'

export const alt = 'Cenlo: centrais para negócios locais. Cenlo Food, Cenlo Beauty e Fornada Certa.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const products = [
  { name: 'Cenlo Food', seg: 'Restaurantes e delivery', c: '#F26522' },
  { name: 'Cenlo Beauty', seg: 'Studios de beleza', c: '#E3559C' },
  { name: 'Fornada Certa', seg: 'Padarias', c: '#E07A4C' },
]

export default function Image() {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', background: 'radial-gradient(circle at 85% 10%, rgba(242,101,34,.35), #0A0A0D 55%)', padding: '72px 80px', fontFamily: 'system-ui, sans-serif', color: '#F4F1EA' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <svg width="64" height="64" viewBox="0 0 48 48">
          <path d="M35.4 17.1 A13.2 13.2 0 1 0 35.4 30.9" fill="none" stroke="#F4F1EA" strokeWidth="5.1" strokeLinecap="round" />
          <circle cx="26.6" cy="24" r="5.7" fill="#F26522" />
        </svg>
        <span style={{ fontSize: 48, fontWeight: 800, letterSpacing: '-2px' }}>Cenlo</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: 76, fontWeight: 800, letterSpacing: '-3px', lineHeight: 1, display: 'flex' }}>Da mensagem solta</div>
        <div style={{ fontSize: 76, fontWeight: 800, letterSpacing: '-3px', lineHeight: 1.05, color: '#F26522', display: 'flex' }}>ao pedido pronto.</div>
      </div>
      <div style={{ display: 'flex', gap: 14 }}>
        {products.map(p => (
          <div key={p.name} style={{ display: 'flex', flexDirection: 'column', padding: '16px 22px', borderRadius: 18, border: '1px solid rgba(255,255,255,.14)', background: 'rgba(255,255,255,.04)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 26, fontWeight: 700 }}>
              <span style={{ width: 12, height: 12, borderRadius: 6, background: p.c, display: 'flex' }} />{p.name}
            </span>
            <span style={{ fontSize: 18, color: '#B9B6BF', marginTop: 4 }}>{p.seg}</span>
          </div>
        ))}
      </div>
    </div>,
    { ...size },
  )
}
