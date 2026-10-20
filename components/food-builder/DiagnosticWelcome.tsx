'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
export default function DiagnosticWelcome() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    try {
      const journey = JSON.parse(sessionStorage.getItem('cenlo-food-autonomous:v1') || 'null')
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Restore the browser's saved diagnostic after hydration.
      setVisible(journey?.entry === 'diagnostic' && !journey.receipt)
    } catch { /* The configurator also works without a diagnosis. */ }
  }, [])
  if (!visible) return null
  return <aside className="fb-diagnostic-welcome"><span className="fc-kicker">Suas respostas vieram com você</span><h2>Veja na prática. Ajuste no seu ritmo.</h2><p>Os recursos que você escolheu no diagnóstico já estão marcados. Explore as demonstrações e adicione ou retire o que fizer sentido para a sua operação.</p><Link className="fb-btn fb-btn-primary" href="/configurar/rever?editar=1">Conferir minha seleção →</Link><Link className="fb-link-btn" href="/diagnostico">Rever meu diagnóstico</Link></aside>
}
