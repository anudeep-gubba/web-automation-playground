import {
  EMAIL_VERIFICATION_CODE,
  EXPIRED_CODE,
  MAX_CODE_ATTEMPTS,
  PASSWORD_RESET_CODE,
  RESERVED_EMAILS,
  RESERVED_USERNAMES,
  SEED_USERS,
  SESSION_DURATION_MS,
} from '@/constants/auth'
import { localStore, sessionStore, STORAGE_KEYS } from '@/services/storageService'
import { checkPasswordStrength } from '@/utils/validation'
import type { AuthErrorCode, AuthResult, PublicUser, Session, User } from '@/types'

// Deterministic, fully client-side "backend" for auth so the entire flow
// works offline. Users are persisted in localStorage; the active session is
// stored in localStorage (Remember Me) or sessionStorage (default), which is
// what drives the "cleared on tab close" behaviour tested by the Session
// Storage / Remember Me scenarios.

function loadUsers(): User[] {
  return localStore.get<User[]>(STORAGE_KEYS.users, SEED_USERS)
}

function saveUsers(users: User[]): void {
  localStore.set(STORAGE_KEYS.users, users)
}

export function toPublicUser(user: User): PublicUser {
  const { password: _password, ...rest } = user
  return rest
}

function findByIdentifier(users: User[], identifier: string): User | undefined {
  const norm = identifier.trim().toLowerCase()
  return users.find((u) => u.email.toLowerCase() === norm || u.username.toLowerCase() === norm)
}

function fail(errorCode: AuthErrorCode, message: string): AuthResult {
  return { ok: false, errorCode, message }
}

export interface RegisterInput {
  firstName: string
  lastName: string
  email: string
  username: string
  password: string
  confirmPassword: string
  phone: string
  dateOfBirth: string
  country: string
  termsAccepted: boolean
}

export function register(input: RegisterInput): AuthResult {
  const users = loadUsers()
  const emailTaken =
    RESERVED_EMAILS.includes(input.email.toLowerCase()) ||
    users.some((u) => u.email.toLowerCase() === input.email.toLowerCase())
  if (emailTaken) return fail('EMAIL_TAKEN', 'This email is already registered.')

  const usernameTaken =
    RESERVED_USERNAMES.includes(input.username.toLowerCase()) ||
    users.some((u) => u.username.toLowerCase() === input.username.toLowerCase())
  if (usernameTaken) return fail('USERNAME_TAKEN', 'This username is already taken.')

  if (input.password !== input.confirmPassword) return fail('PASSWORD_MISMATCH', 'Passwords do not match.')

  const strength = checkPasswordStrength(input.password)
  if (!strength.valid) return fail('WEAK_PASSWORD', `Password is weak: ${strength.reasons.join(', ')}`)

  const newUser: User = {
    id: `user-${Date.now()}`,
    firstName: input.firstName,
    lastName: input.lastName,
    email: input.email,
    username: input.username,
    password: input.password,
    phone: input.phone,
    dateOfBirth: input.dateOfBirth,
    country: input.country,
    role: 'user',
    status: 'unverified',
    createdAt: new Date().toISOString(),
  }
  saveUsers([...users, newUser])
  localStore.set(STORAGE_KEYS.verification, { email: newUser.email, attempts: 0 })
  return { ok: true }
}

export function verifyEmail(email: string, code: string): AuthResult {
  const state = localStore.get<{ email: string; attempts: number } | null>(STORAGE_KEYS.verification, null)
  const attempts = state && state.email === email ? state.attempts : 0

  if (attempts >= MAX_CODE_ATTEMPTS) return fail('MAX_ATTEMPTS', 'Maximum verification attempts reached.')
  if (!code) return fail('VALIDATION_ERROR', 'Verification code is required.')
  if (code === EXPIRED_CODE) return fail('EXPIRED_CODE', 'This verification code has expired.')
  if (code !== EMAIL_VERIFICATION_CODE) {
    localStore.set(STORAGE_KEYS.verification, { email, attempts: attempts + 1 })
    return fail('INVALID_CODE', 'Invalid verification code.')
  }

  const users = loadUsers()
  const idx = users.findIndex((u) => u.email.toLowerCase() === email.toLowerCase())
  if (idx === -1) return fail('UNKNOWN_EMAIL', 'No account found for this email.')
  users[idx] = { ...users[idx], status: 'active' }
  saveUsers(users)
  localStore.remove(STORAGE_KEYS.verification)
  return { ok: true }
}

export function resendVerificationCode(email: string): AuthResult {
  localStore.set(STORAGE_KEYS.verification, { email, attempts: 0 })
  return { ok: true }
}

export interface LoginResult extends AuthResult {
  session?: Session
}

export function login(identifier: string, password: string, rememberMe: boolean): LoginResult {
  const trimmedIdentifier = identifier.trim()
  const users = loadUsers()
  const user = findByIdentifier(users, trimmedIdentifier)

  if (!user || user.password !== password) return fail('INVALID_CREDENTIALS', 'Invalid username/email or password.')
  if (user.status === 'locked') return fail('ACCOUNT_LOCKED', 'This account is locked.')
  if (user.status === 'disabled') return fail('ACCOUNT_DISABLED', 'This account is disabled.')
  if (user.status === 'unverified') return fail('ACCOUNT_UNVERIFIED', 'Please verify your email before logging in.')

  const now = Date.now()
  const duration = rememberMe ? SESSION_DURATION_MS.rememberMe : SESSION_DURATION_MS.default
  const session: Session = { userId: user.id, rememberMe, issuedAt: now, expiresAt: now + duration }

  // Clear any stale session in the other store, then persist in the store
  // that matches Remember Me semantics.
  sessionStore.remove(STORAGE_KEYS.session)
  localStore.remove(STORAGE_KEYS.session)
  ;(rememberMe ? localStore : sessionStore).set(STORAGE_KEYS.session, session)

  return { ok: true, session }
}

export function logout(): void {
  localStore.remove(STORAGE_KEYS.session)
  sessionStore.remove(STORAGE_KEYS.session)
}

export function getSession(): Session | null {
  const fromLocal = localStore.get<Session | null>(STORAGE_KEYS.session, null)
  const fromSession = sessionStore.get<Session | null>(STORAGE_KEYS.session, null)
  const session = fromLocal ?? fromSession
  if (!session) return null
  if (session.expiresAt < Date.now()) {
    logout()
    return null
  }
  return session
}

export function getCurrentUser(): User | null {
  const session = getSession()
  if (!session) return null
  const users = loadUsers()
  return users.find((u) => u.id === session.userId) ?? null
}

export function requestPasswordReset(email: string): AuthResult {
  const users = loadUsers()
  const user = users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase())
  if (!user) return fail('UNKNOWN_EMAIL', 'No account found for this email.')
  localStore.set(STORAGE_KEYS.passwordReset, { email: user.email, attempts: 0 })
  return { ok: true }
}

export function resetPassword(email: string, code: string, newPassword: string, confirmPassword: string): AuthResult {
  if (code === EXPIRED_CODE) return fail('EXPIRED_CODE', 'This reset code has expired.')
  if (code !== PASSWORD_RESET_CODE) return fail('INVALID_CODE', 'Invalid reset code.')
  if (newPassword !== confirmPassword) return fail('PASSWORD_MISMATCH', 'Passwords do not match.')
  const strength = checkPasswordStrength(newPassword)
  if (!strength.valid) return fail('WEAK_PASSWORD', `Password is weak: ${strength.reasons.join(', ')}`)

  const users = loadUsers()
  const idx = users.findIndex((u) => u.email.toLowerCase() === email.trim().toLowerCase())
  if (idx === -1) return fail('UNKNOWN_EMAIL', 'No account found for this email.')
  if (users[idx].password === newPassword) return fail('SAME_PASSWORD', 'New password must differ from the old one.')
  users[idx] = { ...users[idx], password: newPassword }
  saveUsers(users)
  localStore.remove(STORAGE_KEYS.passwordReset)
  return { ok: true }
}

export function changePassword(userId: string, currentPassword: string, newPassword: string, confirmPassword: string): AuthResult {
  const users = loadUsers()
  const idx = users.findIndex((u) => u.id === userId)
  if (idx === -1) return fail('UNKNOWN_EMAIL', 'User not found.')
  if (users[idx].password !== currentPassword) return fail('INVALID_CREDENTIALS', 'Current password is incorrect.')
  if (currentPassword === newPassword) return fail('SAME_PASSWORD', 'New password must differ from the old one.')
  if (newPassword !== confirmPassword) return fail('PASSWORD_MISMATCH', 'Passwords do not match.')
  const strength = checkPasswordStrength(newPassword)
  if (!strength.valid) return fail('WEAK_PASSWORD', `Password is weak: ${strength.reasons.join(', ')}`)

  users[idx] = { ...users[idx], password: newPassword }
  saveUsers(users)
  return { ok: true }
}

export function updateProfile(userId: string, updates: Partial<Pick<User, 'firstName' | 'lastName' | 'phone' | 'avatarUrl'>>): AuthResult {
  const users = loadUsers()
  const idx = users.findIndex((u) => u.id === userId)
  if (idx === -1) return fail('UNKNOWN_EMAIL', 'User not found.')
  users[idx] = { ...users[idx], ...updates }
  saveUsers(users)
  return { ok: true }
}

export function listUsers(): PublicUser[] {
  return loadUsers().map(toPublicUser)
}

export function setUserStatus(userId: string, status: User['status']): AuthResult {
  const users = loadUsers()
  const idx = users.findIndex((u) => u.id === userId)
  if (idx === -1) return fail('UNKNOWN_EMAIL', 'User not found.')
  users[idx] = { ...users[idx], status }
  saveUsers(users)
  return { ok: true }
}

export function resetToSeedData(): void {
  saveUsers(SEED_USERS)
  localStore.remove(STORAGE_KEYS.verification)
  localStore.remove(STORAGE_KEYS.passwordReset)
}
