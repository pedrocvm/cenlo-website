import type { Metadata } from 'next'
import Review from '@/components/food-builder/Review'

export const metadata: Metadata = {
  title: 'Rever a configuração | Cenlo Food Builder',
  robots: { index: false, follow: true },
}

export default function ReviewPage() {
  return <Review />
}
