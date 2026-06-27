'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

type PrivacyCtx = { open: boolean; openModal: () => void; closeModal: () => void }

const Ctx = createContext<PrivacyCtx>({ open: false, openModal: () => {}, closeModal: () => {} })

export function PrivacyProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <Ctx.Provider value={{ open, openModal: () => setOpen(true), closeModal: () => setOpen(false) }}>
      {children}
    </Ctx.Provider>
  )
}

export function usePrivacy() {
  return useContext(Ctx)
}
