import { useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { TextField } from '@/components/ui/TextField'
import { Button } from '@/components/ui/Button'
import { Alert } from '@/components/ui/Alert'
import { ROUTES } from '@/constants/routes'
import * as authService from '@/services/authService'
import { EMAIL_VERIFICATION_CODE, MAX_CODE_ATTEMPTS } from '@/constants/auth'

export function VerifyEmailPage() {
  const [searchParams] = useSearchParams()
  const [email, setEmail] = useState(searchParams.get('email') ?? '')
  const [code, setCode] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [attempts, setAttempts] = useState(0)
  const [success, setSuccess] = useState(false)
  const [resent, setResent] = useState(false)

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setResent(false)
    if (!/^[0-9]{6}$/.test(code)) {
      setError('Code must be exactly 6 digits.')
      return
    }
    const result = authService.verifyEmail(email, code)
    if (result.ok) {
      setSuccess(true)
      setError(null)
      return
    }
    setAttempts((a) => a + 1)
    setError(result.message ?? 'Verification failed.')
  }

  function handleResend() {
    authService.resendVerificationCode(email)
    setAttempts(0)
    setError(null)
    setResent(true)
  }

  if (success) {
    return (
      <div data-testid="verify-email-success" style={{ maxWidth: 420, margin: '0 auto', textAlign: 'center' }}>
        <h1 className="page-title">Email Verified</h1>
        <p>Your account is now active.</p>
        <Link className="btn btn-primary" to={ROUTES.login} data-testid="verify-email-login-link">
          Go to Login
        </Link>
      </div>
    )
  }

  return (
    <div data-testid="verify-email-page" style={{ maxWidth: 420, margin: '0 auto' }}>
      <h1 className="page-title">Email Verification</h1>
      <p className="page-description">
        Deterministic verification code for testing: <strong>{EMAIL_VERIFICATION_CODE}</strong>. Use <code>000000</code> to
        simulate an expired code.
      </p>

      {error ? (
        <Alert variant="error" testId="verify-email-error">
          {error}
        </Alert>
      ) : null}
      {resent ? (
        <Alert variant="success" testId="verify-email-resent">
          A new code has been generated.
        </Alert>
      ) : null}
      {attempts >= MAX_CODE_ATTEMPTS ? (
        <Alert variant="warning" testId="verify-email-max-attempts">
          Maximum attempts reached. Please resend the code.
        </Alert>
      ) : null}

      <form onSubmit={handleSubmit} noValidate data-testid="verify-email-form">
        <TextField
          label="Email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="verify-email-address"
          testId="verify-email-address"
        />
        <TextField
          label="Verification Code"
          required
          value={code}
          onChange={(e) => setCode(e.target.value)}
          maxLength={6}
          inputMode="numeric"
          id="verify-email-code"
          testId="verify-email-code"
        />
        <div className="form-actions">
          <Button type="submit" testId="verify-email-submit" disabled={attempts >= MAX_CODE_ATTEMPTS}>
            Verify
          </Button>
          <Button type="button" variant="secondary" testId="verify-email-resend" onClick={handleResend}>
            Resend Code
          </Button>
        </div>
      </form>
    </div>
  )
}
