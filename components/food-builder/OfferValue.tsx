'use client'
import { useState } from 'react'
import { MODULES } from '@/lib/food-builder/catalog'
import { MODULE_BENEFITS } from '@/lib/food-builder/benefits'
import { videosFor } from '@/lib/food-builder/videos'
import ModuleIcon from './ModuleIcon'
import ModuleVideos from './ModuleVideos'

type Item = { id: string; label: string; condition?: string }
const priorities: Record<string, string> = {
  atendimento: 'Dar mais atenção ao cliente, mesmo no horário de movimento.',
  erros: 'Organizar os pedidos e reduzir o trabalho de repassar informações.',
  cozinha: 'Deixar mais claro o que entrou e o que precisa ser preparado.',
  entregas: 'Organizar o caminho do pedido até a entrega.',
  salao: 'Dar mais fluidez ao atendimento no salão.',
  retorno: 'Criar uma relação com quem já comprou de você.',
  direto: 'Fortalecer os canais de pedido do seu restaurante.',
  movimento: 'Preparar sua operação para receber e atender melhor os clientes.',
}
export default function OfferValue({ selected, priority, diagnostic, onDemo, offered = true }: { selected: Item[]; priority: string; diagnostic: boolean; onDemo: () => void; offered?: boolean }) {
  const [active, setActive] = useState<string | null>(null)
  const cards = [...selected.filter(c => c.id !== 'orders-core'), ...selected.filter(c => c.id === 'orders-core')].slice(0, 3)
  return <section className="fv" aria-label="O valor da sua solução">
    <span className="fc-kicker">{diagnostic ? 'Do seu diagnóstico à prática' : 'O que suas escolhas resolvem'}</span>
    <h2>{priorities[priority] || 'Uma operação mais organizada começa pelas suas escolhas.'}</h2>
    <p className="fv-intro">Veja alguns destaques dos recursos que você escolheu. Confira como podem ajudar na rotina e veja as condições de cada um.</p>
    <div className="fv-cards">{cards.map(c => {
      const m = MODULES.find(m => m.id === (c.id === 'conversation-order' ? 'whatsapp-assistant' : c.id))
      const videos = m ? videosFor(m.id) : []
      const open = active === c.id
      return <article key={c.id} className={open ? 'is-open' : ''}>
        <div className="fv-card-heading"><ModuleIcon name={m?.icon || 'orders'} /><h3>{c.label}</h3></div>
        <p>{MODULE_BENEFITS[c.id] || m?.summary}</p>
        {c.condition && <small>{c.condition}</small>}
        {videos.length > 0 && <button type="button" aria-expanded={open} aria-controls={`fv-video-${c.id}`} onClick={() => { setActive(open ? null : c.id); if (!open) onDemo() }}>{open ? 'Fechar demonstração' : 'Ver na prática'} <span aria-hidden="true">{open ? '−' : '▶'}</span></button>}
        {open && <div className="fv-video" id={`fv-video-${c.id}`}><ModuleVideos videos={videos} title={c.label} /></div>}
      </article>
    })}</div>
    <p className="fv-note">{offered ? 'O plano pode incluir outros recursos sem custo adicional. A composição completa e as condições estão abaixo.' : 'As demonstrações ajudam a entender os recursos. O escopo e os valores ainda serão confirmados para a sua operação.'}</p>
  </section>
}
