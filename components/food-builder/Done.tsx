'use client'
import { useState, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { CORE_MODULE, MODULES } from '@/lib/food-builder/catalog'
import { SENT_KEY } from './Review'

const CENLO_WHATSAPP = '351912333313'

type Sent = { reference: string; businessName: string; moduleIds: string[] }

let cached: { raw: string | null; value: Sent | null } = { raw: null, value: null }
function readSent(): Sent | null {
  let raw: string | null
  try {
    raw = sessionStorage.getItem(SENT_KEY)
  } catch {
    raw = null
  }
  if (raw === cached.raw) return cached.value
  let p: Partial<Sent> | null
  try {
    p = raw ? JSON.parse(raw) : null
  } catch {
    p = null
  }
  const value = p && typeof p.reference === 'string' && /^CFB-[A-Z0-9]{8}$/.test(p.reference)
    ? { reference: p.reference, businessName: String(p.businessName ?? ''), moduleIds: Array.isArray(p.moduleIds) ? p.moduleIds : [] }
    : null
  cached = { raw, value }
  return value
}

export function whatsappHref(reference: string, businessName: string) {
  const text = `Olá! Acabei de montar a minha configuração do Cenlo Food Builder.\n\nReferência ${reference}\n\nEstabelecimento ${businessName}\n\nGostaria de conversar sobre os módulos que selecionei.`
  return `https://wa.me/${CENLO_WHATSAPP}?text=${encodeURIComponent(text)}`
}

export default function Done() {
  const sent = useSyncExternalStore(() => () => {}, readSent, () => undefined)
  const [copied, setCopied] = useState<'ok' | 'fail' | null>(null)

  if (sent === undefined) return <div className="fb-done" aria-busy="true" />

  if (!sent) {
    return (
      <div className="fb-done">
        <span className="fb-eyebrow">Cenlo Food Builder</span>
        <h1 className="fb-display">Não encontrámos um envio recente.</h1>
        <p className="fb-lede" style={{ marginTop: 16 }}>Esta página mostra a confirmação logo depois de enviar a configuração. Se ainda não a enviou, pode rever a sua seleção e enviá-la agora.</p>
        <div className="fb-done-actions">
          <Link href="/food/montar/rever" className="fb-btn fb-btn-primary">Rever a minha configuração</Link>
          <Link href="/food/montar" className="fb-btn fb-btn-ghost">Explorar módulos</Link>
        </div>
      </div>
    )
  }

  const modules = [CORE_MODULE, ...MODULES.filter(m => !m.required && sent.moduleIds.includes(m.id))]
  const summary = [
    `Configuração Cenlo Food · Referência ${sent.reference}`,
    `Estabelecimento: ${sent.businessName}`,
    '',
    ...modules.map(m => `• ${m.title}${m.required ? ' (base incluída)' : ''}`),
  ].join('\n')

  async function copy() {
    try {
      await navigator.clipboard.writeText(summary)
      setCopied('ok')
    } catch {
      setCopied('fail')
    }
  }

  return (
    <div className="fb-done">
      <div className="fb-done-mark" aria-hidden="true">✓</div>
      <h1 className="fb-display">A sua configuração foi enviada.</h1>
      <p className="fb-lede" style={{ marginTop: 16 }}>
        Recebemos os módulos que escolheu para o seu Cenlo Food. Vamos analisar a sua seleção e entrar em contacto para compreender melhor as necessidades do seu negócio.
      </p>

      <div className="fb-ref">
        <div>
          <small>Referência</small>
          <strong>{sent.reference}</strong>
        </div>
        <span style={{ fontSize: 14, color: 'var(--ink2)' }}>{sent.businessName}</span>
      </div>

      <section style={{ marginTop: 28 }} aria-labelledby="done-mods">
        <h2 id="done-mods" style={{ fontSize: 13, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted)' }}>
          Módulos enviados · base + {modules.length - 1}
        </h2>
        <ul className="fb-chips" style={{ listStyle: 'none', padding: 0 }}>
          {modules.map(m => <li key={m.id} className={`fb-chip${m.required ? ' is-core' : ''}`}>{m.title}</li>)}
        </ul>
      </section>

      <div className="fb-done-actions">
        <a href={whatsappHref(sent.reference, sent.businessName)} target="_blank" rel="noopener" className="fb-btn fb-btn-ghost">Falar com a Cenlo pelo WhatsApp</a>
        <button type="button" className="fb-btn fb-btn-ghost" onClick={copy}>Copiar resumo</button>
      </div>
      <p className="fb-note" role="status" aria-live="polite">
        {copied === 'ok' ? 'Resumo copiado.' : copied === 'fail' ? 'Não foi possível copiar automaticamente. Selecione a referência e os módulos acima para os copiar.' : 'Não precisa de reenviar nada pelo WhatsApp: a configuração já nos chegou. O WhatsApp abre com uma mensagem pronta, que só é enviada se a enviar.'}
      </p>
      <Link href="/food/montar" className="fb-back">← Voltar aos módulos</Link>
    </div>
  )
}
