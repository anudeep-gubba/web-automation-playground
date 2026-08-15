// Central domain types for the Web Automation Playground.
// Enums are intentionally implemented as string literal unions + const objects
// (not TS `enum`) to keep the codebase erasable-syntax friendly.

export type Role = 'admin' | 'user'

export type AccountStatus = 'active' | 'locked' | 'disabled' | 'unverified'

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  username: string
  password: string
  phone: string
  dateOfBirth: string
  country: string
  role: Role
  status: AccountStatus
  createdAt: string
  avatarUrl?: string
}

export type PublicUser = Omit<User, 'password'>

export interface Session {
  userId: string
  rememberMe: boolean
  issuedAt: number
  expiresAt: number
}

export interface AuthResult {
  ok: boolean
  errorCode?: AuthErrorCode
  message?: string
}

export type AuthErrorCode =
  | 'INVALID_CREDENTIALS'
  | 'ACCOUNT_LOCKED'
  | 'ACCOUNT_DISABLED'
  | 'ACCOUNT_UNVERIFIED'
  | 'EMAIL_TAKEN'
  | 'USERNAME_TAKEN'
  | 'UNKNOWN_EMAIL'
  | 'INVALID_CODE'
  | 'EXPIRED_CODE'
  | 'MAX_ATTEMPTS'
  | 'WEAK_PASSWORD'
  | 'PASSWORD_MISMATCH'
  | 'SAME_PASSWORD'
  | 'VALIDATION_ERROR'

export interface FieldErrors {
  [field: string]: string | undefined
}

export interface ToastMessage {
  id: string
  variant: 'success' | 'error' | 'warning' | 'info'
  title: string
  description?: string
  persistent?: boolean
}

export interface TableRow {
  id: number
  name: string
  email: string
  role: string
  status: 'Active' | 'Inactive' | 'Pending'
  date: string
  amount: number
}

export interface Product {
  id: number
  name: string
  category: string
  price: number
  stock: number
}

export interface Order {
  id: number
  productId: number
  customer: string
  quantity: number
  total: number
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled'
  date: string
}

export interface ListItem {
  id: number
  label: string
  group?: string
}

export interface SearchResultItem {
  id: number
  title: string
  category: string
}

export interface CountryData {
  name: string
  states: { name: string; cities: string[] }[]
}

export type ThemeMode = 'light' | 'dark' | 'system'
