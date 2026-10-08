'use client'
import { useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { BASE_MODULES, BUSINESS_TYPES, GROUPS, MODULES } from '@/lib/food-builder/catalog'
import { normalizePhone, type FieldError } from '@/lib/food-builder/submission'
import ModuleIcon from './ModuleIcon'
import { removeModule, useSelection } from './selection'
import { TierBadge } from './SelectToggle'
import { readAttribution } from './CaptureAttribution'

export const SENT_KEY = 'cenlo-food-builder:sent:v1'

type Form = { name: string; businessName: string; phone: string; email: string; city: string; businessType: string; notes: string }
const empty: Form = { name: '', businessName: '', phone: '', email: '', city: '', businessType: '', notes: '' }

function validate(f: Form): Record<string, string> {
  const e: Record<string, string> = {}
  if (f.name.trim().length < 2) e.name = 'Indique o seu nome.'
  if (f.businessName.trim().length < 2) e.businessName = 'Indique o nome do estabelecimento.'
  if (!normalizePhone(f.phone)) e.phone = 'Indique um telemóvel português (9 dígitos) ou um número internacional com indicativo, por exemplo +34 600 000 000.'
  if (f.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = 'O e-mail não parece válido.'
  if (f.notes.length > 1500) e.notes = 'As observações podem ter até 1500 caracteres.'
  return e
}

export default function Review() {
  const router = useRouter()
  const selection = useSelection()
  const [form, setForm] = useState<Form>(empty)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [apiError, setApiError] = useState('')
  const [sending, setSending] = useState(false)
  const startedAt = useRef(Date.now())
  const attempt = useRef<{ id: string; fingerprint: string } | null>(null)
  const honeypot = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const selected = MODULES.filter(m => selection.includes(m.id))

  function set<K extends keyof Form>(k: K, v: string) {
    setForm(f => ({ ...f, [k]: v }))
    if (errors[k]) setErrors(({ [k]: _, ...rest }) => rest)
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (sending) return
    const found = validate(form)
    setErrors(found)
    setApiError('')
    if (Object.keys(found).length) {
      formRef.current?.querySelector<HTMLElement>(`[name="${Object.keys(found)[0]}"]`)?.focus()
      return
    }
    const payload = {
      contact: { name: form.name, phone: form.phone, email: form.email },
      business: { name: form.businessName, city: form.city, type: form.businessType },
      notes: form.notes,
      moduleIds: selection,
    }
    const fingerprint = JSON.stringify(payload)
    // same content retried after a timeout keeps its id, so the server-side idempotency key dedupes the e-mail
    if (attempt.current?.fingerprint !== fingerprint) attempt.current = { id: crypto.randomUUID(), fingerprint }
    setSending(true)
    try {
      const res = await fetch('/api/food-builder/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...payload,
          submissionId: attempt.current.id,
          startedAt: startedAt.current,
          website: honeypot.current?.value ?? '',
          attribution: readAttribution(),
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok || !data.ok) {
        const fieldErrors: FieldError[] = Array.isArray(data.errors) ? data.errors : []
        const mapped = Object.fromEntries(fieldErrors.filter(fe => fe.field in empty).map(fe => [fe.field, fe.message]))
        setErrors(mapped)
        setApiError(Object.keys(mapped).length ? 'Reveja os campos assinalados.' : data.error || 'Não foi possível enviar a configuração. Tente novamente.')
        return
      }
      try {
        sessionStorage.setItem(SENT_KEY, JSON.stringify({ reference: data.reference, businessName: form.businessName.trim(), moduleIds: selection }))
      } catch {
        // ponytail: without storage the done page falls back to a generic confirmation
      }
      router.push('/food/montar/enviado')
    } catch {
      setApiError('Sem ligação ao servidor. Verifique a internet e tente novamente. A sua seleção e os seus dados continuam aqui.')
    } finally {
      setSending(false)
    }
  }

  const field = (k: keyof Form, label: string, opts: { optional?: boolean; type?: string; autoComplete?: string; placeholder?: string; full?: boolean; inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'] } = {}) => (
    <div className={`fb-field${opts.full ? ' full' : ''}`}>
      <label htmlFor={`f-${k}`}>{label} {opts.optional ? <i>(opcional)</i> : <span aria-hidden="true">*</span>}</label>
      <input
        id={`f-${k}`}
        name={k}
        className="fb-input"
        type={opts.type ?? 'text'}
        inputMode={opts.inputMode}
        autoComplete={opts.autoComplete}
        placeholder={opts.placeholder}
        value={form[k]}
        onChange={e => set(k, e.target.value)}
        required={!opts.optional}
        aria-invalid={errors[k] ? true : undefined}
        aria-describedby={errors[k] ? `e-${k}` : undefined}
        maxLength={k === 'email' ? 254 : 120}
      />
      {errors[k] && <span id={`e-${k}`} className="fb-err">{errors[k]}</span>}
    </div>
  )

  return (
    <div className="fb-review">
      <span className="fb-eyebrow">Rever a configuração</span>
      <h1 className="fb-display">O seu Cenlo Food está a ganhar forma.</h1>
      <p className="fb-lede" style={{ marginTop: 16, maxWidth: 720 }}>
        Já escolheu as funcionalidades que fazem mais sentido para o seu negócio. Envie-nos esta configuração para analisarmos consigo como aplicar o Cenlo à sua operação.
      </p>

      <div className="fb-review-grid">
        <div>
          <div className="fb-rgroup">
            <h2>Base Cenlo Food incluída · {BASE_MODULES.length} módulos</h2>
            <div className="fb-ritem fb-base-box">
              {GROUPS.map(g => {
                const items = BASE_MODULES.filter(m => m.group === g.id)
                if (!items.length) return null
                return (
                  <div key={g.id} className="fb-base-row">
                    <span>{g.title}</span>
                    <ul className="fb-chips">
                      {items.map(m => <li key={m.id}><Link href={`/food/montar/${m.slug}`} className="fb-chip">✓ {m.title}</Link></li>)}
                    </ul>
                  </div>
                )
              })}
            </div>
          </div>

          {GROUPS.map(g => {
            const items = selected.filter(m => m.group === g.id)
            if (!items.length) return null
            return (
              <div key={g.id} className="fb-rgroup">
                <h2>{g.title}</h2>
                {items.map(m => (
                  <div key={m.id} className={`fb-ritem${m.tier === 'premium' ? ' is-premium' : ''}`}>
                    <ModuleIcon name={m.icon} />
                    <div>
                      <h3>{m.title} <TierBadge tier={m.tier} /></h3>
                      <p>{m.summary}</p>
                      <div className="fb-ritem-links"><Link href={`/food/montar/${m.slug}`}>Ver detalhes</Link></div>
                    </div>
                    <button type="button" className="fb-x" onClick={() => removeModule(m.id)} aria-label={`Remover ${m.title}`}>✕</button>
                  </div>
                ))}
              </div>
            )
          })}

          {!selected.length && (
            <p className="fb-pending" style={{ marginTop: 26 }}>
              Ainda não escolheu módulos premium ou opcionais. Pode enviar só com a base, ou explorar os módulos e escolher os que fazem sentido para a sua operação.
            </p>
          )}
          <Link href="/food/montar#modulos" className="fb-btn fb-btn-ghost" style={{ marginTop: 22 }}>← Continuar a explorar módulos</Link>
        </div>

        <form ref={formRef} className="fb-form" onSubmit={submit} noValidate aria-labelledby="form-title">
          <h2 id="form-title">Enviar a configuração</h2>
          <p style={{ fontSize: 14, color: 'var(--ink2)', marginTop: 6, lineHeight: 1.55 }}>
            Base + {selected.length} {selected.length === 1 ? 'módulo escolhido' : 'módulos escolhidos'}. Não é uma contratação: é a sua preferência, que analisamos consigo antes de qualquer decisão.
          </p>
          <div className="fb-fields">
            {field('name', 'Nome', { autoComplete: 'name' })}
            {field('businessName', 'Estabelecimento', { autoComplete: 'organization' })}
            {field('phone', 'WhatsApp ou telefone', { type: 'tel', autoComplete: 'tel', inputMode: 'tel', placeholder: '912 345 678', full: true })}
            {field('email', 'E-mail', { optional: true, type: 'email', autoComplete: 'email' })}
            {field('city', 'Cidade', { optional: true, autoComplete: 'address-level2' })}
            <div className="fb-field full">
              <label htmlFor="f-businessType">Tipo de estabelecimento <i>(opcional)</i></label>
              <select id="f-businessType" name="businessType" className="fb-input" value={form.businessType} onChange={e => set('businessType', e.target.value)}>
                <option value="">Escolher…</option>
                {BUSINESS_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="fb-field full">
              <label htmlFor="f-notes">Observações sobre a operação <i>(opcional)</i></label>
              <textarea
                id="f-notes"
                name="notes"
                className="fb-input"
                rows={4}
                maxLength={1500}
                placeholder="Ex.: fazemos cerca de 60 pedidos por noite, metade por telefone, e temos dois estafetas."
                value={form.notes}
                onChange={e => set('notes', e.target.value)}
                aria-invalid={errors.notes ? true : undefined}
                aria-describedby={errors.notes ? 'e-notes' : undefined}
              />
              {errors.notes && <span id="e-notes" className="fb-err">{errors.notes}</span>}
            </div>
          </div>
          <div className="fb-hp" aria-hidden="true">
            <label htmlFor="f-website">Website</label>
            <input id="f-website" ref={honeypot} name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
          </div>
          {apiError && <div className="fb-alert" role="alert">{apiError}</div>}
          <button type="submit" className="fb-btn fb-btn-primary" style={{ width: '100%', marginTop: 16 }} disabled={sending} aria-busy={sending}>
            {sending ? <><span className="fb-spinner" aria-hidden="true" /> A enviar…</> : 'Enviar a minha configuração'}
          </button>
          <p className="fb-privacy">
            Usamos estes dados apenas para responder a esta configuração. Não fica inscrito em nenhuma newsletter nem recebe campanhas. Saiba mais na nossa{' '}
            <a href="https://cenlo.pt/politica-de-privacidade" target="_blank" rel="noopener">política de privacidade</a>.
          </p>
        </form>
      </div>
    </div>
  )
}
