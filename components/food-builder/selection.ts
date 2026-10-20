'use client'
import { useSyncExternalStore } from 'react'
import { MODULES } from '@/lib/food-builder/catalog'

const KEY = 'cenlo-food-builder:selection:v1'
const EMPTY: readonly string[] = []
export const EXTRA_SELECTION_MODULES = [
  { id: 'conversation-order', title: 'Fechar pedidos na conversa', tier: 'base' as const, slug: null },
  { id: 'online-ordering', title: 'Página de pedidos online', tier: 'base' as const, slug: null },
  { id: 'menu-import', title: 'Importação de cardápio com IA', tier: 'optional' as const, slug: null },
]
const known = new Set([...MODULES.filter(m => m.tier !== 'base').map(m => m.id as string), ...EXTRA_SELECTION_MODULES.filter(m => m.tier !== 'base').map(m => m.id)])
export const BASE_SELECTION_MODULES = [...MODULES, ...EXTRA_SELECTION_MODULES].filter(m => m.tier === 'base')
export const BASE_SELECTION_IDS = BASE_SELECTION_MODULES.map(m => m.id as string)
const base = new Set(BASE_SELECTION_IDS)
const listeners = new Set<() => void>()
let cache: readonly string[] | null = null

function read(): readonly string[] {
  if (cache) return cache
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(KEY) ?? '[]')
    cache = Array.isArray(parsed) ? [...known].filter(id => parsed.includes(id)) : []
  } catch {
    cache = []
  }
  return cache
}

function write(next: readonly string[]) {
  cache = [...known].filter(id => next.includes(id))
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

/** Read current selection after hydration, before creating an offer. */
export function readSelection() { return read() }

/** Synchronize explicit requirements without changing the frozen offer or included plan extras. */
export function replaceSelection(ids: readonly string[]) { write(ids) }

export function mergeSelectionIntoComposition(ids: readonly string[], selection: readonly string[]) {
  return [...new Set([...BASE_SELECTION_IDS, ...ids.filter(id => base.has(id)), ...selection])]
}
