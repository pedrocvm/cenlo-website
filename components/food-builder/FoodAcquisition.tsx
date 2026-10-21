 'use client'
import Script from 'next/script'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
declare global { interface Window { CenloAcquisition?: { consentToken: () => string | undefined; contactReceived: (id: string, intent: string) => void; event: (name: string, props?: Record<string, unknown>) => boolean } } }
export const consentToken = () => window.CenloAcquisition?.consentToken()
export const contactReceived = (id: string, intent: string) => window.CenloAcquisition?.contactReceived(id, intent)
export default function FoodAcquisition() {
  const pathname = usePathname()
  useEffect(() => { window.dispatchEvent(new Event('cenlo-food-navigation')) }, [pathname])
  return <Script type="module" src="/shared/food-acquisition.js" strategy="afterInteractive" /> }
