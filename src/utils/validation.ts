import { PASSWORD_POLICY } from '@/constants/auth'

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const PHONE_REGEX = /^\+?[0-9]{7,15}$/
export const URL_REGEX = /^(https?:\/\/)[^\s]+\.[^\s]+$/
export const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,20}$/

export function isRequired(value: string | undefined | null): boolean {
  return value !== undefined && value !== null && value.trim().length > 0
}

export function isValidEmail(value: string): boolean {
  return EMAIL_REGEX.test(value.trim())
}

export function isValidPhone(value: string): boolean {
  return PHONE_REGEX.test(value.trim())
}

export function isValidUrl(value: string): boolean {
  return URL_REGEX.test(value.trim())
}

export function isValidUsername(value: string): boolean {
  return USERNAME_REGEX.test(value.trim())
}

export interface PasswordCheck {
  valid: boolean
  reasons: string[]
}

export function checkPasswordStrength(value: string): PasswordCheck {
  const reasons: string[] = []
  if (value.length < PASSWORD_POLICY.minLength) reasons.push(`At least ${PASSWORD_POLICY.minLength} characters`)
  if (PASSWORD_POLICY.requireUppercase && !/[A-Z]/.test(value)) reasons.push('One uppercase letter')
  if (PASSWORD_POLICY.requireLowercase && !/[a-z]/.test(value)) reasons.push('One lowercase letter')
  if (PASSWORD_POLICY.requireNumber && !/[0-9]/.test(value)) reasons.push('One number')
  if (PASSWORD_POLICY.requireSpecial && !/[^A-Za-z0-9]/.test(value)) reasons.push('One special character')
  return { valid: reasons.length === 0, reasons }
}

export function isValidDate(value: string): boolean {
  if (!value) return false
  const d = new Date(value)
  return !Number.isNaN(d.getTime())
}

export function isPastDate(value: string): boolean {
  if (!isValidDate(value)) return false
  return new Date(value).getTime() < Date.now()
}

export function isAdult(value: string, minAge = 13): boolean {
  if (!isValidDate(value)) return false
  const dob = new Date(value)
  const now = new Date()
  let age = now.getFullYear() - dob.getFullYear()
  const m = now.getMonth() - dob.getMonth()
  if (m < 0 || (m === 0 && now.getDate() < dob.getDate())) age--
  return age >= minAge
}
