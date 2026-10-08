'use client'
import { useEffect } from 'react'
import { UTM_KEYS } from '@/lib/food-builder/submission'

const KEY = 'cenlo-food-builder:attribution:v1'

export type Attribution = Partial<Record<(typeof UTM_KEYS)[number], string>> & { landingPath?: string; referrerHost?: string }

export function readAttribution(): Attribution {
  try {
    return JSON.parse(sessionStorage.getItem(KEY) ?? '{}')
  } catch {
    return {}
  }
}

export default function CaptureAttribution() {
  useEffect(() => {
    try {
      if (sessionStorage.getItem(KEY)) return
      const params = new URLSearchParams(location.search)
      const data: Attribution = { landingPath: location.pathname }
      for (const k of UTM_KEYS) {
        const v = params.get(k)
        if (v) data[k] = v.slice(0, 120)
      }
      const ref = document.referrer ? new URL(document.referrer).host : ''
      if (ref && ref !== location.host) data.referrerHost = ref
      sessionStorage.setItem(KEY, JSON.stringify(data))
    } catch {
      // ponytail: attribution is best-effort; blocked storage just means the e-mail shows no campaign data
    }
  }, [])
  return null
}
