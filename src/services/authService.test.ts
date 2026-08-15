import { beforeEach, describe, expect, it } from 'vitest'
import * as authService from './authService'
import { EMAIL_VERIFICATION_CODE, EXPIRED_CODE } from '@/constants/auth'

describe('authService', () => {
  beforeEach(() => {
    window.localStorage.clear()
    window.sessionStorage.clear()
  })

  describe('login', () => {
    it('logs in with valid credentials', () => {
      const result = authService.login('user@example.com', 'User@123', false)
      expect(result.ok).toBe(true)
      expect(authService.getCurrentUser()?.email).toBe('user@example.com')
    })

    it('rejects invalid password', () => {
      const result = authService.login('user@example.com', 'wrong-password', false)
      expect(result.ok).toBe(false)
      expect(result.errorCode).toBe('INVALID_CREDENTIALS')
    })

    it('rejects a locked account', () => {
      const result = authService.login('locked@example.com', 'Locked@123', false)
      expect(result.ok).toBe(false)
      expect(result.errorCode).toBe('ACCOUNT_LOCKED')
    })

    it('rejects an unverified account', () => {
      const result = authService.login('unverified@example.com', 'User@123', false)
      expect(result.ok).toBe(false)
      expect(result.errorCode).toBe('ACCOUNT_UNVERIFIED')
    })

    it('persists the session in localStorage when rememberMe is true', () => {
      authService.login('user@example.com', 'User@123', true)
      expect(window.localStorage.getItem('wap_session')).not.toBeNull()
      expect(window.sessionStorage.getItem('wap_session')).toBeNull()
    })

    it('persists the session in sessionStorage when rememberMe is false', () => {
      authService.login('user@example.com', 'User@123', false)
      expect(window.sessionStorage.getItem('wap_session')).not.toBeNull()
      expect(window.localStorage.getItem('wap_session')).toBeNull()
    })
  })

  describe('logout', () => {
    it('clears the active session', () => {
      authService.login('user@example.com', 'User@123', true)
      authService.logout()
      expect(authService.getCurrentUser()).toBeNull()
    })
  })

  describe('register + verifyEmail', () => {
    it('registers a new unverified user who cannot log in until verified', () => {
      const result = authService.register({
        firstName: 'Test',
        lastName: 'Person',
        email: 'newperson@example.com',
        username: 'newperson',
        password: 'NewUser@123',
        confirmPassword: 'NewUser@123',
        phone: '5551234567',
        dateOfBirth: '1995-01-01',
        country: 'India',
        termsAccepted: true,
      })
      expect(result.ok).toBe(true)

      const blockedLogin = authService.login('newperson', 'NewUser@123', false)
      expect(blockedLogin.errorCode).toBe('ACCOUNT_UNVERIFIED')

      const verify = authService.verifyEmail('newperson@example.com', EMAIL_VERIFICATION_CODE)
      expect(verify.ok).toBe(true)

      const successfulLogin = authService.login('newperson', 'NewUser@123', false)
      expect(successfulLogin.ok).toBe(true)
    })

    it('rejects registration with a taken email', () => {
      const result = authService.register({
        firstName: 'Dup',
        lastName: 'User',
        email: 'user@example.com',
        username: 'dupuser',
        password: 'NewUser@123',
        confirmPassword: 'NewUser@123',
        phone: '5551234567',
        dateOfBirth: '1995-01-01',
        country: 'India',
        termsAccepted: true,
      })
      expect(result.ok).toBe(false)
      expect(result.errorCode).toBe('EMAIL_TAKEN')
    })

    it('treats an expired verification code as EXPIRED_CODE', () => {
      const result = authService.verifyEmail('unverified@example.com', EXPIRED_CODE)
      expect(result.ok).toBe(false)
      expect(result.errorCode).toBe('EXPIRED_CODE')
    })
  })

  describe('changePassword', () => {
    it('rejects an incorrect current password', () => {
      authService.login('user@example.com', 'User@123', false)
      const user = authService.getCurrentUser()!
      const result = authService.changePassword(user.id, 'wrong-current', 'NewPass@123', 'NewPass@123')
      expect(result.ok).toBe(false)
      expect(result.errorCode).toBe('INVALID_CREDENTIALS')
    })

    it('changes the password with valid input', () => {
      authService.login('user@example.com', 'User@123', false)
      const user = authService.getCurrentUser()!
      const result = authService.changePassword(user.id, 'User@123', 'NewPass@123', 'NewPass@123')
      expect(result.ok).toBe(true)
    })
  })
})
