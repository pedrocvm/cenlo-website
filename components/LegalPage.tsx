export default function LegalPage({ eyebrow, title, updated, items }: { eyebrow: string; title: string; updated: string; items: { t: string; d: string }[] }) {
  return (
    <section className="page-hero">
      <div className="wrap legal">
        <span className="eyebrow eyebrow-dot">{eyebrow}</span>
        <h1 className="h2" style={{ marginTop: 22 }}>{title}</h1>
        <p style={{ marginTop: 16, color: 'var(--c-mute)', fontSize: 14 }}>Última atualização: {updated}</p>
        <div className="legal-list">
          {items.map(s => (
            <div key={s.t}>
              <h2>{s.t}</h2>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid var(--c-hair)', color: 'var(--c-ink2)' }}>
          Alguma dúvida? Escreva para <a href="mailto:ola@cenlo.pt" className="text-link" style={{ color: 'var(--c-ink)' }}>ola@cenlo.pt</a>.
        </p>
      </div>
    </section>
  )
}
