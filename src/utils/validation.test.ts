import { describe, expect, it } from 'vitest'
import { checkPasswordStrength, isAdult, isRequired, isValidEmail, isValidPhone, isValidUrl, isValidUsername } from './validation'

describe('isRequired', () => {
  it('rejects empty and whitespace-only strings', () => {
    expect(isRequired('')).toBe(false)
    expect(isRequired('   ')).toBe(false)
    expect(isRequired(undefined)).toBe(false)
  })
  it('accepts non-empty strings', () => {
    expect(isRequired('hello')).toBe(true)
  })
})

describe('isValidEmail', () => {
  it('accepts well-formed emails', () => {
    expect(isValidEmail('user@example.com')).toBe(true)
  })
  it('rejects malformed emails', () => {
    expect(isValidEmail('not-an-email')).toBe(false)
    expect(isValidEmail('missing@domain')).toBe(false)
  })
})

describe('isValidPhone', () => {
  it('accepts digit-only phone numbers within range', () => {
    expect(isValidPhone('5550100001')).toBe(true)
  })
  it('rejects too-short numbers', () => {
    expect(isValidPhone('123')).toBe(false)
  })
})

describe('isValidUrl', () => {
  it('accepts http(s) URLs', () => {
    expect(isValidUrl('https://example.com')).toBe(true)
  })
  it('rejects URLs without a protocol', () => {
    expect(isValidUrl('example.com')).toBe(false)
  })
})

describe('isValidUsername', () => {
  it('accepts 3-20 alphanumeric/underscore characters', () => {
    expect(isValidUsername('standard_user1')).toBe(true)
  })
  it('rejects too-short usernames', () => {
    expect(isValidUsername('ab')).toBe(false)
  })
})

describe('checkPasswordStrength', () => {
  it('accepts a password meeting all policy rules', () => {
    expect(checkPasswordStrength('User@123').valid).toBe(true)
  })
  it('rejects a weak password and reports reasons', () => {
    const result = checkPasswordStrength('weak')
    expect(result.valid).toBe(false)
    expect(result.reasons.length).toBeGreaterThan(0)
  })
})

describe('isAdult', () => {
  it('accepts dates of birth over the minimum age', () => {
    expect(isAdult('1990-01-01')).toBe(true)
  })
  it('rejects recent dates of birth', () => {
    const recent = new Date()
    recent.setFullYear(recent.getFullYear() - 5)
    expect(isAdult(recent.toISOString().slice(0, 10))).toBe(false)
  })
})
