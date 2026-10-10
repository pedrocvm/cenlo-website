import { GROUPS, MODULES } from '@/lib/food-builder/catalog'
import AnimatedDetails from './AnimatedDetails'

export type IncludedResource = { id: string; label: string; condition?: string }

export default function IncludedBase({ items }: { items: IncludedResource[] }) {
  if (!items.length) return null
  return <section className="fc-base-included" aria-label="Base Cenlo Food incluída">
    <div className="fc-base-heading"><span className="fc-base-check" aria-hidden="true">✓</span><div><h2>Base Cenlo Food</h2><p>Incluída em todos os planos. Não precisa selecionar estes recursos.</p></div><span className="fc-base-count">{items.length} recursos</span></div>
    <AnimatedDetails className="fc-base-details"><summary>Ver o que está incluído <span aria-hidden="true">+</span></summary>
      <div className="fc-base-groups">{GROUPS.map(group => {
        const resources = items.filter(item => (MODULES.find(m => m.id === item.id)?.group || (item.id === 'online-ordering' ? 'channels' : 'operations')) === group.id)
        if (!resources.length) return null
        return <div key={group.id}><h3>{group.title}</h3><ul>{resources.map(item => <li key={item.id}><span aria-hidden="true">✓</span><div>{item.label}{item.condition && <small>{item.condition}</small>}</div></li>)}</ul></div>
      })}</div>
    </AnimatedDetails>
  </section>
}
