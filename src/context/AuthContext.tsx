import { createContext, useCallback, useMemo, useState, type ReactNode } from 'react'
import * as authService from '@/services/authService'
import type { PublicUser } from '@/types'

export interface AuthContextValue {
  user: PublicUser | null
  isAuthenticated: boolean
  login: (identifier: string, password: string, rememberMe: boolean) => authService.LoginResult
  logout: () => void
  refresh: () => void
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)

function readUser(): PublicUser | null {
  const user = authService.getCurrentUser()
  return user ? authService.toPublicUser(user) : null
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<PublicUser | null>(() => readUser())

  const refresh = useCallback(() => {
    setUser(readUser())
  }, [])

  const login = useCallback((identifier: string, password: string, rememberMe: boolean) => {
    const result = authService.login(identifier, password, rememberMe)
    if (result.ok) setUser(readUser())
    return result
  }, [])

  const logout = useCallback(() => {
    authService.logout()
    setUser(null)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({ user, isAuthenticated: user !== null, login, logout, refresh }),
    [user, login, logout, refresh],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
