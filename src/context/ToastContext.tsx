import { createContext, useCallback, useMemo, useRef, useState, type ReactNode } from 'react'
import type { ToastMessage } from '@/types'

export interface ToastContextValue {
  toasts: ToastMessage[]
  showToast: (toast: Omit<ToastMessage, 'id'>) => string
  dismissToast: (id: string) => void
}

export const ToastContext = createContext<ToastContextValue | undefined>(undefined)

const AUTO_DISMISS_MS = 4000

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([])
  const counter = useRef(0)

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const showToast = useCallback(
    (toast: Omit<ToastMessage, 'id'>) => {
      counter.current += 1
      const id = `toast-${counter.current}`
      setToasts((prev) => [...prev, { ...toast, id }])
      if (!toast.persistent) {
        window.setTimeout(() => dismissToast(id), AUTO_DISMISS_MS)
      }
      return id
    },
    [dismissToast],
  )

  const value = useMemo<ToastContextValue>(() => ({ toasts, showToast, dismissToast }), [toasts, showToast, dismissToast])

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}
