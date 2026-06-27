import { ImageResponse } from 'next/og'

export const alt = 'Cenlo — central de pedidos por WhatsApp para negócios locais'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        background: '#0B0B0F',
        padding: '80px 96px',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      {/* Orange accent bar */}
      <div style={{ width: 60, height: 6, background: '#FF6A2C', borderRadius: 3, marginBottom: 40, display: 'flex' }} />

      {/* Brand name */}
      <div style={{ fontSize: 72, fontWeight: 800, color: '#F4F3F7', letterSpacing: '-2px', lineHeight: 1, display: 'flex' }}>
        Cenlo
      </div>

      {/* Tagline */}
      <div style={{ fontSize: 28, color: '#A6A6B3', marginTop: 20, lineHeight: 1.4, maxWidth: 720, display: 'flex' }}>
        Central de pedidos por WhatsApp para negócios locais.
      </div>

      {/* Pill */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginTop: 48,
          background: 'rgba(255,106,44,.18)',
          border: '1px solid rgba(255,106,44,.4)',
          borderRadius: 999,
          padding: '10px 22px',
        }}
      >
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#34D399', display: 'flex' }} />
        <span style={{ fontSize: 20, color: '#FFB68F', fontWeight: 600, display: 'flex' }}>Cenlo Pizza — já em operação</span>
      </div>

      {/* Domain */}
      <div style={{ position: 'absolute', bottom: 48, right: 96, fontSize: 18, color: '#4A4A5A', display: 'flex' }}>
        cenlo.pt
      </div>
    </div>,
    { ...size }
  )
}
