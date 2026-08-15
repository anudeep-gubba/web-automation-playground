// Thin, typed wrapper around Web Storage APIs. Centralising access here keeps
// key names consistent and makes the Local/Session Storage playground pages
// able to reuse the exact same read/write logic as the rest of the app.

export const STORAGE_KEYS = {
  users: 'wap_users',
  session: 'wap_session',
  theme: 'wap_theme',
  verification: 'wap_verification_state',
  passwordReset: 'wap_reset_state',
} as const

function safeParse<T>(raw: string | null, fallback: T): T {
  if (raw === null) return fallback
  try {
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export const localStore = {
  get<T>(key: string, fallback: T): T {
    if (typeof window === 'undefined') return fallback
    return safeParse(window.localStorage.getItem(key), fallback)
  },
  set(key: string, value: unknown): void {
    window.localStorage.setItem(key, JSON.stringify(value))
  },
  remove(key: string): void {
    window.localStorage.removeItem(key)
  },
  clear(): void {
    window.localStorage.clear()
  },
  raw(): Array<[string, string]> {
    return Object.keys(window.localStorage).map((k) => [k, window.localStorage.getItem(k) ?? ''])
  },
}

export const sessionStore = {
  get<T>(key: string, fallback: T): T {
    if (typeof window === 'undefined') return fallback
    return safeParse(window.sessionStorage.getItem(key), fallback)
  },
  set(key: string, value: unknown): void {
    window.sessionStorage.setItem(key, JSON.stringify(value))
  },
  remove(key: string): void {
    window.sessionStorage.removeItem(key)
  },
  clear(): void {
    window.sessionStorage.clear()
  },
  raw(): Array<[string, string]> {
    return Object.keys(window.sessionStorage).map((k) => [k, window.sessionStorage.getItem(k) ?? ''])
  },
}

export interface CookieOptions {
  days?: number
  path?: string
}

export const cookieStore = {
  set(name: string, value: string, options: CookieOptions = {}): void {
    const path = options.path ?? '/'
    let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; path=${path}`
    if (options.days !== undefined) {
      const date = new Date()
      date.setTime(date.getTime() + options.days * 24 * 60 * 60 * 1000)
      cookie += `; expires=${date.toUTCString()}`
    }
    document.cookie = cookie
  },
  getAll(): { name: string; value: string }[] {
    if (!document.cookie) return []
    return document.cookie.split('; ').map((pair) => {
      const [name, ...rest] = pair.split('=')
      return { name: decodeURIComponent(name), value: decodeURIComponent(rest.join('=')) }
    })
  },
  get(name: string): string | undefined {
    return cookieStore.getAll().find((c) => c.name === name)?.value
  },
  remove(name: string, path = '/'): void {
    document.cookie = `${encodeURIComponent(name)}=; path=${path}; expires=Thu, 01 Jan 1970 00:00:00 GMT`
  },
  clear(): void {
    cookieStore.getAll().forEach((c) => cookieStore.remove(c.name))
  },
}
