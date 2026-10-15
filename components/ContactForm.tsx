'use client'
import { useState } from 'react'
import { usePrivacy } from './PrivacyContext'

type Form = { nome: string; negocio: string; cidade: string; segmento: string; telefone: string; email: string; mensagem: string }

const empty: Form = { nome: '', negocio: '', cidade: '', segmento: '', telefone: '', email: '', mensagem: '' }

const segments = ['Restaurante ou delivery', 'Studio de beleza', 'Padaria', 'Outro tipo de negócio']

type Field = { key: 'nome' | 'negocio' | 'cidade' | 'telefone' | 'email'; label: string; ph: string; type?: string; required?: boolean; pattern?: string; title?: string; auto?: string }
const fields: Field[] = [
  { key: 'nome', label: 'Nome *', ph: 'Como você se chama', required: true, auto: 'name' },
  { key: 'negocio', label: 'Negócio', ph: 'Nome da casa ou do studio', auto: 'organization' },
  { key: 'cidade', label: 'Cidade', ph: 'Ex.: Porto', auto: 'address-level2' },
  { key: 'telefone', label: 'Celular / WhatsApp *', ph: '+351 9xx xxx xxx', type: 'tel', required: true, pattern: '[+0-9 \\-]{9,}', title: 'Use pelo menos 9 caracteres. Pode incluir +, números, espaços e hífen.', auto: 'tel' },
  { key: 'email', label: 'Email (opcional)', ph: 'nome@email.com', type: 'email', auto: 'email' },
]

export default function ContactForm() {
  const [form, setForm] = useState<Form>(empty)
  const [consent, setConsent] = useState(false)
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [showErr, setShowErr] = useState(false)
  const [apiErr, setApiErr] = useState(false)
  const { openModal } = usePrivacy()

  const setField = (k: keyof Form, v: string) => setForm(f => ({ ...f, [k]: v }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.nome.trim() || !form.telefone.trim() || !consent) {
      setShowErr(true)
      return
    }
    setSending(true)
    setApiErr(false)
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    }).catch(() => null)
    setSending(false)
    if (!res?.ok) { setApiErr(true); return }
    setSent(true)
    setShowErr(false)
  }

  function reset() {
    setForm(empty)
    setConsent(false)
    setSent(false)
  }

  if (sent) {
    return (
      <div role="status" aria-live="polite" style={{ textAlign: 'center', padding: '36px 8px' }}>
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(63,203,142,.14)', color: 'var(--c-ok)', display: 'grid', placeItems: 'center', margin: '0 auto' }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5" /></svg>
        </div>
        <h2 style={{ fontSize: 26, marginTop: 20 }}>Recebido.</h2>
        <p style={{ color: 'var(--c-ink2)', marginTop: 10 }}>Uma pessoa da equipe vai falar com você, normalmente no mesmo dia útil.</p>
        <button type="button" onClick={reset} className="btn btn-ghost btn-sm" style={{ marginTop: 24 }}>Enviar outra mensagem</button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-grid">
        {fields.slice(0, 3).map(f => (
          <label key={f.key} className="field" htmlFor={f.key}>
            <span>{f.label}</span>
            <input id={f.key} name={f.key} className="input" type={f.type || 'text'} value={form[f.key]} onChange={e => setField(f.key, e.target.value)} placeholder={f.ph} required={f.required} autoComplete={f.auto} />
          </label>
        ))}
        <label className="field" htmlFor="segmento">
          <span>Tipo de negócio</span>
          <select id="segmento" name="segmento" className="input" value={form.segmento} onChange={e => setField('segmento', e.target.value)}>
            <option value="">Escolha uma opção</option>
            {segments.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </label>
        {fields.slice(3).map(f => (
          <label key={f.key} className="field" htmlFor={f.key}>
            <span>{f.label}</span>
            <input id={f.key} name={f.key} className="input" type={f.type || 'text'} value={form[f.key]} onChange={e => setField(f.key, e.target.value)} placeholder={f.ph} required={f.required} pattern={f.pattern} title={f.title} autoComplete={f.auto} />
          </label>
        ))}
        <label className="field field-full" htmlFor="mensagem">
          <span>Mensagem</span>
          <textarea id="mensagem" name="mensagem" className="input" value={form.mensagem} onChange={e => setField('mensagem', e.target.value)} rows={4} placeholder="Como os pedidos ou as marcações chegam hoje? O que mais dá trabalho?" />
        </label>
      </div>

      <label htmlFor="consent" className="consent">
        <input id="consent" type="checkbox" checked={consent} onChange={e => { setConsent(e.target.checked); setShowErr(false) }} required />
        <span>
          Aceito que a Cenlo use estes dados para responder ao meu pedido de contato. Os dados não são compartilhados com terceiros. Veja a{' '}
          <button type="button" onClick={openModal} className="inline-link">Política de Privacidade</button>.
        </span>
      </label>

      <button type="submit" disabled={sending} className="btn btn-primary" style={{ width: '100%', marginTop: 20, opacity: sending ? 0.7 : 1 }}>
        {sending ? 'Enviando…' : 'Enviar mensagem'}
      </button>
      {showErr && <p role="alert" className="form-msg">Preencha o nome, o celular e aceite o uso dos dados para enviar.</p>}
      {apiErr && <p role="alert" className="form-msg">Não conseguimos enviar agora. Tente de novo ou escreva para ola@cenlo.pt.</p>}
    </form>
  )
}
