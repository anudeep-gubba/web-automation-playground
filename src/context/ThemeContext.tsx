import { createContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { localStore, STORAGE_KEYS } from '@/services/storageService'
import type { ThemeMode } from '@/types'

export interface ThemeContextValue {
  mode: ThemeMode
  resolvedTheme: 'light' | 'dark'
  setMode: (mode: ThemeMode) => void
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>(() => localStore.get<ThemeMode>(STORAGE_KEYS.theme, 'system'))
  const [systemTheme, setSystemTheme] = useState(getSystemTheme)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => setSystemTheme(getSystemTheme())
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const resolvedTheme = mode === 'system' ? systemTheme : mode

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', resolvedTheme)
  }, [resolvedTheme])

  const setMode = (next: ThemeMode) => {
    setModeState(next)
    localStore.set(STORAGE_KEYS.theme, next)
  }

  const value = useMemo<ThemeContextValue>(() => ({ mode, resolvedTheme, setMode }), [mode, resolvedTheme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
