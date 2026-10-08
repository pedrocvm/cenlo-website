import SharedFoodOffer from '@/components/food-builder/SharedFoodOffer'

export const metadata = { title: 'Solução escolhida | Cenlo Food', robots: { index: false, follow: false } }
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  return <SharedFoodOffer id={(await params).id} />
}
