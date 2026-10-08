import type { Metadata } from 'next'
import Image from 'next/image'
import { BASE_MODULES, GROUPS, MODULES } from '@/lib/food-builder/catalog'
import { HERO_SHOTS, shotsFor } from '@/lib/food-builder/screenshots'
import ModuleCard from '@/components/food-builder/ModuleCard'
import GroupNav from '@/components/food-builder/GroupNav'
import { TierBadge } from '@/components/food-builder/SelectToggle'

const title = 'Monte o seu Cenlo Food | Cenlo Food Builder'
const description = 'Explore os módulos do Cenlo Food, veja a plataforma real e escolha o que faz sentido para o seu negócio.'

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: 'https://cenlo.pt/food/montar' },
  openGraph: { title, description, url: 'https://cenlo.pt/food/montar', type: 'website' },
  twitter: { card: 'summary_large_image', title, description },
}

export default function FoodBuilderPage() {
  return (
    <>
      <section className="fb-hero" aria-labelledby="fb-title">
        <div>
          <span className="fb-eyebrow">Cenlo Food Builder</span>
          <h1 id="fb-title" className="fb-display">Monte o seu <em>Cenlo Food.</em></h1>
          <p className="fb-lede" style={{ marginTop: 20, maxWidth: 560 }}>
            Cada operação funciona de uma maneira. Explore as funcionalidades do Cenlo Food, escolha o que faz sentido para o seu negócio e crie uma configuração pensada para a sua realidade.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 14, marginTop: 28 }}>
            <a href="#modulos" className="fb-btn fb-btn-primary">Montar a minha configuração <span aria-hidden="true">↓</span></a>
            <span style={{ fontSize: 14, color: 'var(--ink2)' }}>Conheça cada módulo antes de decidir o que incluir.</span>
          </div>
          <ol className="fb-steps">
            <li>Explore os módulos e veja o Cenlo a funcionar.</li>
            <li>Adicione à sua configuração o que faz sentido.</li>
            <li>Envie-nos a seleção para a analisarmos consigo.</li>
          </ol>
        </div>
        <div className="fb-hero-media">
          <figure className="fb-frame">
            <Image src={HERO_SHOTS.main.src} width={HERO_SHOTS.main.width} height={HERO_SHOTS.main.height} alt={HERO_SHOTS.main.alt} priority sizes="(max-width: 820px) 100vw, 560px" />
          </figure>
          <figure className="fb-frame">
            <Image src={HERO_SHOTS.side.src} width={HERO_SHOTS.side.width} height={HERO_SHOTS.side.height} alt={HERO_SHOTS.side.alt} priority sizes="200px" />
          </figure>
        </div>
      </section>

      <div id="modulos" style={{ scrollMarginTop: 68 }}>
        <div className="fb-legend" aria-label="Legenda">
          <span><TierBadge tier="base" /> {BASE_MODULES.length} módulos já fazem parte de qualquer configuração</span>
          <span><TierBadge tier="premium" /> módulos de maior impacto, à sua escolha</span>
          <span><TierBadge tier="optional" /> pode juntar se fizer sentido</span>
        </div>
        <GroupNav groups={GROUPS.map(g => ({ id: g.id, title: g.title, count: MODULES.filter(m => m.group === g.id).length }))} />
        {GROUPS.map((g, gi) => (
          <section key={g.id} id={`grupo-${g.id}`} className="fb-group" aria-labelledby={`g-${g.id}`}>
            <header className="fb-group-head">
              <span className="fb-group-num">{String(gi + 1).padStart(2, '0')}</span>
              <h2 id={`g-${g.id}`}>{g.title}</h2>
              <p>{g.intro}</p>
            </header>
            <div className="fb-grid">
              {MODULES.filter(m => m.group === g.id).map(m => (
                <ModuleCard key={m.id} module={m} number={MODULES.indexOf(m) + 1} shot={shotsFor(m.id)[0]} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  )
}
