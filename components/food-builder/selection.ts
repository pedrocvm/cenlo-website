'use client'
import { useSyncExternalStore } from 'react'
import { MODULES } from '@/lib/food-builder/catalog'

const KEY = 'cenlo-food-builder:selection:v1'
const EMPTY: readonly string[] = []
const known = new Set(MODULES.filter(m => m.tier !== 'base').map(m => m.id as string))
const base = new Set(MODULES.filter(m => m.tier === 'base').map(m => m.id as string))
const listeners = new Set<() => void>()
let cache: readonly string[] | null = null

function read(): readonly string[] {
  if (cache) return cache
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(KEY) ?? '[]')
    cache = Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === 'string' && known.has(id)) : []
  } catch {
    cache = []
  }
  return cache
}

function write(next: readonly string[]) {
  cache = MODULES.filter(m => next.includes(m.id)).map(m => m.id)
  try {
    localStorage.setItem(KEY, JSON.stringify(cache))
  } catch {
    // ponytail: private mode / storage blocked — selection still works for this tab, just not across reloads
  }
  listeners.forEach(l => l())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  const onStorage = (e: StorageEvent) => {
    if (e.key !== KEY) return
    cache = null
    listener()
  }
  window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(listener)
    window.removeEventListener('storage', onStorage)
  }
}

export function useSelection(): readonly string[] {
  return useSyncExternalStore(subscribe, read, () => EMPTY)
}

export function isSelected(selection: readonly string[], id: string) {
  return base.has(id) || selection.includes(id)
}

export function toggleModule(id: string) {
  if (!known.has(id)) return
  const current = read()
  write(current.includes(id) ? current.filter(x => x !== id) : [...current, id])
}

export function removeModule(id: string) {
  write(read().filter(x => x !== id))
}

export function clearSelection() {
  write([])
}
