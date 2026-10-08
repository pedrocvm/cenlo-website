import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { GROUPS, MODULES, moduleBySlug } from '@/lib/food-builder/catalog'
import { shotsFor } from '@/lib/food-builder/screenshots'
import ModuleIcon from '@/components/food-builder/ModuleIcon'
import SelectToggle, { RemoveLink, TierBadge } from '@/components/food-builder/SelectToggle'
import Gallery from '@/components/food-builder/Gallery'

export const dynamicParams = false

export function generateStaticParams() {
  return MODULES.map(m => ({ slug: m.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const m = moduleBySlug((await params).slug)
  if (!m) return {}
  const title = `${m.title} | Cenlo Food Builder`
  const url = `https://cenlofood.cenlo.pt/configurar/${m.slug}`
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
      <Link href={`/configurar#grupo-${m.group}`} className="fb-back"><span aria-hidden="true">←</span> Todos os módulos</Link>

      <header className="fb-detail-hero">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <ModuleIcon name={m.icon} />
          <span className="fb-eyebrow">{group.title}</span>
          <TierBadge tier={m.tier} />
        </div>
        <h1 className="fb-display">{m.title}</h1>
        <p className="fb-lede" style={{ maxWidth: 680, fontSize: 'clamp(18px, 2vw, 22px)', color: 'var(--ink)' }}>{m.promise}</p>
        <p className="fb-lede" style={{ maxWidth: 680 }}>{m.summary}</p>
        <div className="fb-detail-actions">
          <SelectToggle id={m.id} title={m.title} tier={m.tier} />
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

      <section className={`fb-cta-final${m.tier === 'premium' ? ' is-premium' : ''}`} aria-labelledby="s-cta">
        <div>
          <h2 id="s-cta">{m.tier === 'base' ? 'Incluído na base do Cenlo Food.' : `${m.title} faz sentido para si?`}</h2>
          <p className="fb-lede" style={{ marginTop: 10, fontSize: 16 }}>
            {m.tier === 'base' ? `${m.title} faz parte de qualquer configuração Cenlo Food. Escolha agora os módulos premium e opcionais que quer juntar à base.` : 'Adicione-o à sua configuração. Pode remover a qualquer momento antes de enviar.'}
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {m.tier === 'base' ? (
            <Link href="/configurar#modulos" className="fb-btn fb-btn-primary">Escolher módulos</Link>
          ) : (
            <>
              <SelectToggle id={m.id} title={m.title} tier={m.tier} />
              <RemoveLink id={m.id} title={m.title} />
            </>
          )}
          <Link href="/configurar/rever" className="fb-btn fb-btn-ghost">Rever a minha configuração</Link>
        </div>
      </section>

      <nav className="fb-pager" aria-label="Outros módulos">
        {prev ? <Link href={`/configurar/${prev.slug}`}><small>← Módulo anterior</small><strong>{prev.title}</strong></Link> : <span />}
        {next ? <Link href={`/configurar/${next.slug}`}><small>Módulo seguinte →</small><strong>{next.title}</strong></Link> : <span />}
      </nav>
    </article>
  )
}
