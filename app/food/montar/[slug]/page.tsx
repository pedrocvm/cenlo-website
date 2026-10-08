import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { GROUPS, MODULES, moduleBySlug } from '@/lib/food-builder/catalog'
import { shotsFor } from '@/lib/food-builder/screenshots'
import ModuleIcon from '@/components/food-builder/ModuleIcon'
import SelectToggle, { RemoveLink } from '@/components/food-builder/SelectToggle'
import Gallery from '@/components/food-builder/Gallery'

export const dynamicParams = false

export function generateStaticParams() {
  return MODULES.map(m => ({ slug: m.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const m = moduleBySlug((await params).slug)
  if (!m) return {}
  const title = `${m.title} | Cenlo Food Builder`
  const url = `https://cenlo.pt/food/montar/${m.slug}`
  return { title, description: m.promise, alternates: { canonical: url }, openGraph: { title, description: m.promise, url, type: 'website' } }
}

export default async function ModulePage({ params }: { params: Promise<{ slug: string }> }) {
  const m = moduleBySlug((await params).slug)
  if (!m) notFound()
  const group = GROUPS.find(g => g.id === m.group)!
  const shots = shotsFor(m.id)
  const i = MODULES.indexOf(m)
  const prev = MODULES[i - 1]
  const next = MODULES[i + 1]

  return (
    <article>
      <Link href={`/food/montar#grupo-${m.group}`} className="fb-back"><span aria-hidden="true">←</span> Todos os módulos</Link>

      <header className="fb-detail-hero">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <ModuleIcon name={m.icon} />
          <span className="fb-eyebrow">{group.title}</span>
          {m.required && <span className="fb-badge">Base Cenlo Food incluída</span>}
        </div>
        <h1 className="fb-display">{m.title}</h1>
        <p className="fb-lede" style={{ maxWidth: 680, fontSize: 'clamp(18px, 2vw, 22px)', color: 'var(--ink)' }}>{m.promise}</p>
        <p className="fb-lede" style={{ maxWidth: 680 }}>{m.summary}</p>
        <div className="fb-detail-actions">
          <SelectToggle id={m.id} title={m.title} required={m.required} />
          <RemoveLink id={m.id} title={m.title} />
        </div>
      </header>

      <section className="fb-section" aria-labelledby="s-problem">
        <div className="fb-section-head">
          <h2 id="s-problem">O que este módulo resolve</h2>
          <div>{m.problem.map(p => <p key={p} className="fb-prose">{p}</p>)}</div>
        </div>
      </section>

      <section className="fb-section" aria-labelledby="s-flow">
        <div className="fb-section-head">
          <h2 id="s-flow">Como funciona na prática</h2>
          <ol className="fb-flow">{m.flow.map(step => <li key={step}><p>{step}</p></li>)}</ol>
        </div>
      </section>

      <section className="fb-section" aria-labelledby="s-incl">
        <div className="fb-section-head">
          <h2 id="s-incl">O que está incluído</h2>
          <div className="fb-incl">
            {m.deliverables.map(d => (
              <div key={d.title}>
                <h3>{d.title}</h3>
                <p>{d.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="fb-section" aria-labelledby="s-shots">
        <div className="fb-section-head">
          <h2 id="s-shots">Veja o módulo em funcionamento</h2>
          <div>
            {shots.length ? (
              <>
                <Gallery shots={shots} title={m.title} />
                <p className="fb-note">Capturas da plataforma Cenlo Food com dados de demonstração.</p>
              </>
            ) : (
              <p className="fb-pending">Estamos a preparar as capturas deste módulo. Se quiser vê-lo a funcionar, inclua-o na sua configuração e mostramos-lhe numa demonstração.</p>
            )}
          </div>
        </div>
      </section>

      <section className="fb-section" aria-labelledby="s-fit">
        <div className="fb-section-head">
          <h2 id="s-fit">Quando faz sentido incluir</h2>
          <ul className="fb-fit">{m.fit.map(f => <li key={f}>{f}</li>)}</ul>
        </div>
      </section>

      <section className="fb-cta-final" aria-labelledby="s-cta">
        <div>
          <h2 id="s-cta">{m.required ? 'A base de qualquer Cenlo Food.' : `${m.title} faz sentido para si?`}</h2>
          <p className="fb-lede" style={{ marginTop: 10, fontSize: 16 }}>
            {m.required ? 'O Núcleo de Pedidos está sempre incluído. Escolha agora os módulos que quer juntar-lhe.' : 'Adicione-o à sua configuração. Pode remover a qualquer momento antes de enviar.'}
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {m.required ? (
            <Link href="/food/montar#modulos" className="fb-btn fb-btn-primary">Escolher módulos</Link>
          ) : (
            <>
              <SelectToggle id={m.id} title={m.title} required={false} />
              <RemoveLink id={m.id} title={m.title} />
            </>
          )}
          <Link href="/food/montar/rever" className="fb-btn fb-btn-ghost">Rever a minha configuração</Link>
        </div>
      </section>

      <nav className="fb-pager" aria-label="Outros módulos">
        {prev ? <Link href={`/food/montar/${prev.slug}`}><small>← Módulo anterior</small><strong>{prev.title}</strong></Link> : <span />}
        {next ? <Link href={`/food/montar/${next.slug}`}><small>Módulo seguinte →</small><strong>{next.title}</strong></Link> : <span />}
      </nav>
    </article>
  )
}
