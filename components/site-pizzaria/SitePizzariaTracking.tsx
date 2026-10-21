'use client'
import Script from 'next/script'
import { useEffect } from 'react'

/** This namespace is already proxied with the landing, so HTML and tracking release together. */
export default function SitePizzariaTracking() {
  useEffect(() => {
    window.dispatchEvent(new Event('cenlo-food-navigation'))
    return () => { window.dispatchEvent(new Event('cenlo-site-pizzaria-leave')) }
  }, [])
  return <>
    <Script type="module" src="/site-pizzaria/tracking/site-pizzaria-pixel.js" strategy="afterInteractive" />
    <Script type="module" src="/site-pizzaria/tracking/food-acquisition.js" strategy="afterInteractive" />
  </>
}
