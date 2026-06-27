'use client'
import { useState } from 'react'
import { usePrivacy } from './PrivacyContext'

type Form = { nome: string; negocio: string; cidade: string; segmento: string; telefone: string; email: string; mensagem: string }

const empty: Form = { nome: '', negocio: '', cidade: '', segmento: '', telefone: '', email: '', mensagem: '' }

type Field = { key: keyof Omit<Form,'mensagem'>; label: string; ph: string; type?: string; required?: boolean }
const fields: Field[] = [
  { key: 'nome',     label: 'Nome *',            ph: 'O seu nome',          required: true },
  { key: 'negocio',  label: 'Negócio',            ph: 'Nome do seu negócio' },
  { key: 'cidade',   label: 'Cidade',             ph: 'Ex.: Porto' },
  { key: 'segmento', label: 'Segmento',           ph: 'Ex.: Pizzaria' },
  { key: 'telefone', label: 'Telefone *',         ph: 'Telemóvel',           type: 'tel', required: true },
  { key: 'email',    label: 'Email (opcional)',   ph: 'nome@email.pt',       type: 'email' },
]

export default function ContactForm() {
  const [form, setForm] = useState<Form>(empty)
  const [consent, setConsent] = useState(false)
  const [sent, setSent] = useState(false)
  const [showErr, setShowErr] = useState(false)
  const { openModal } = usePrivacy()

  function setField(k: keyof Form, v: string) {
    setForm(f => ({ ...f, [k]: v }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.nome.trim() || !form.telefone.trim() || !consent) {
      setShowErr(true)
      return
    }
    setSent(true)
    setShowErr(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function reset() {
    setForm(empty)
    setConsent(false)
    setSent(false)
  }

  const inputStyle: React.CSSProperties = { width: '100%', background: 'var(--bg)', border: '1px solid var(--line)', borderRadius: 10, padding: '11px 13px', fontSize: 15, fontFamily: 'inherit', color: 'var(--ink)' }

  if (sent) {
    return (
      <div style={{ textAlign: 'center', padding: '30px 10px' }}>
        <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--oliveBg)', color: 'var(--olive)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, margin: '0 auto', fontWeight: 700 }}>✓</div>
        <h3 style={{ fontSize: 22, marginTop: 18, fontFamily: 'var(--font-schibsted)' }}>Pedido recebido</h3>
        <p style={{ fontSize: 15, color: 'var(--ink2)', marginTop: 8 }}>Obrigado. Entramos em contacto para combinar a demonstração.</p>
        <button onClick={reset} style={{ marginTop: 20, background: 'none', border: '1px solid var(--line)', padding: '10px 18px', borderRadius: 10, fontWeight: 600, fontSize: 14, cursor: 'pointer', color: 'var(--ink)' }}>Enviar outro pedido</button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="grid-two" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {fields.map(f => (
          <label key={f.key} htmlFor={f.key}>
            <span style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--ink2)', marginBottom: 6 }}>{f.label}</span>
            <input
              id={f.key}
              name={f.key}
              type={f.type || 'text'}
              value={form[f.key]}
              onChange={e => setField(f.key, e.target.value)}
              placeholder={f.ph}
              required={f.required}
              autoComplete={f.key === 'telefone' ? 'tel' : f.key === 'email' ? 'email' : undefined}
              style={inputStyle}
            />
          </label>
        ))}
        <label htmlFor="mensagem" style={{ gridColumn: '1 / -1' }}>
          <span style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--ink2)', marginBottom: 6 }}>Mensagem</span>
          <textarea
            id="mensagem"
            name="mensagem"
            value={form.mensagem}
            onChange={e => setField('mensagem', e.target.value)}
            rows={3}
            placeholder="Como é a sua operação hoje e como o podemos ajudar?"
            style={{ ...inputStyle, resize: 'vertical' }}
          />
        </label>
      </div>

      <label htmlFor="consent" style={{ display: 'flex', gap: 11, alignItems: 'flex-start', marginTop: 16, cursor: 'pointer' }}>
        <input
          id="consent"
          type="checkbox"
          checked={consent}
          onChange={e => { setConsent(e.target.checked); setShowErr(false) }}
          required
          style={{ marginTop: 3, width: 17, height: 17, accentColor: 'var(--terra)', flexShrink: 0 }}
        />
        <span style={{ fontSize: 12.5, color: 'var(--muted)', lineHeight: 1.5 }}>
          Aceito que a Cenlo utilize estes dados para responder ao meu pedido de contacto/demonstração. Os dados não serão partilhados com terceiros. Consulte a{' '}
          <button type="button" onClick={openModal} style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', color: 'var(--terra)', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}>Política de Privacidade</button>.
        </span>
      </label>

      <button type="submit" style={{ width: '100%', marginTop: 18, background: 'var(--terraBtn)', color: '#fff', border: 'none', padding: 14, borderRadius: 11, fontWeight: 700, fontSize: 16, cursor: 'pointer' }}>
        Pedir demonstração
      </button>
      <p style={{ fontSize: 13, color: 'var(--muted)', textAlign: 'center', marginTop: 8 }}>Demonstração curta, sem compromisso.</p>
      {showErr && <p role="alert" style={{ fontSize: 13, color: 'var(--terraD)', marginTop: 10, textAlign: 'center' }}>Preencha o nome, o telefone e aceite o consentimento para enviar.</p>}
    </form>
  )
}
