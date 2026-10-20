'use client'
import { useEffect, useState } from 'react'
import FoodOfferJourney from './FoodOfferJourney'
import LegacyReview from './LegacyReview'
export { SENT_KEY } from './LegacyReview'
export default function Review() {
  const [enabled, setEnabled] = useState<boolean | null>(null)
  const [error, setError] = useState(false)
  useEffect(() => { const abort = new AbortController(); fetch('/api/food-builder/autonomous/status', { cache: 'no-store', signal: abort.signal }).then(r => { if (!r.ok) throw new Error(); return r.json() }).then(s => { let frozen = false; try { frozen = !!JSON.parse(sessionStorage.getItem('cenlo-food-autonomous:v1') || 'null')?.offer } catch {} setEnabled(s.enabled === true || frozen) }).catch(e => { if (e.name !== 'AbortError') setError(true) }); return () => abort.abort() }, [])
  if (error) return <p role="alert" style={{ paddingTop: 120 }}>Não foi possível conferir as condições agora. Suas escolhas continuam salvas. Atualize a página para tentar novamente.</p>
  if (enabled === null) return <p role="status" style={{ paddingTop: 120 }}>Conferindo as condições…</p>
  return enabled ? <FoodOfferJourney /> : <LegacyReview />
}
