import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://cenlo.pt'
  const routes = ['', '/produtos', '/pizza', '/sobre', '/contacto', '/politica-de-privacidade', '/termos']
  const legal = ['/politica-de-privacidade', '/termos']
  return routes.map(r => ({
    url: `${base}${r}`,
    lastModified: new Date('2026-06-27'),
    changeFrequency: 'monthly' as const,
    priority: r === '' ? 1 : r === '/pizza' ? 0.9 : legal.includes(r) ? 0.3 : 0.7,
  }))
}
