 'use client'
import Script from 'next/script'
declare global { interface Window { CenloAcquisition?: { consentToken: () => string | undefined; contactReceived: (id: string, intent: string) => void; event: (name: string, props?: Record<string, unknown>) => boolean } } }
export const consentToken = () => window.CenloAcquisition?.consentToken()
export const contactReceived = (id: string, intent: string) => window.CenloAcquisition?.contactReceived(id, intent)
export default function FoodAcquisition() { return <Script type="module" src="/shared/food-acquisition.js" strategy="afterInteractive" /> }
