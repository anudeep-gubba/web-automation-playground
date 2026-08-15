import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField } from '@/components/ui/TextField'
import { Button } from '@/components/ui/Button'
import { Alert } from '@/components/ui/Alert'
import { ROUTES } from '@/constants/routes'
import * as authService from '@/services/authService'
import { isValidEmail } from '@/utils/validation'
import { PASSWORD_RESET_CODE } from '@/constants/auth'

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)
  const navigate = useNavigate()

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!isValidEmail(email)) {
      setError('Enter a valid email address.')
      return
    }
    const result = authService.requestPasswordReset(email)
    if (!result.ok) {
      setError(result.message ?? 'No account found for this email.')
      return
    }
    setError(null)
    setSent(true)
  }

  return (
    <div data-testid="forgot-password-page" style={{ maxWidth: 420, margin: '0 auto' }}>
      <h1 className="page-title">Forgot Password</h1>
      <p className="page-description">
        Deterministic reset code for testing: <strong>{PASSWORD_RESET_CODE}</strong>. Use <code>000000</code> to simulate
        an expired code.
      </p>

      {error ? (
        <Alert variant="error" testId="forgot-password-error">
          {error}
        </Alert>
      ) : null}
      {sent ? (
        <Alert variant="success" testId="forgot-password-sent">
          Reset instructions generated. Continue to Reset Password.
        </Alert>
      ) : null}

      <form onSubmit={handleSubmit} noValidate data-testid="forgot-password-form">
        <TextField
          label="Email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          id="forgot-password-email"
          testId="forgot-password-email"
        />
        <div className="form-actions">
          <Button type="submit" testId="forgot-password-submit">
            Send Reset Link
          </Button>
          {sent ? (
            <Button
              type="button"
              variant="secondary"
              testId="forgot-password-continue"
              onClick={() => navigate(`${ROUTES.resetPassword}?email=${encodeURIComponent(email)}`)}
            >
              Continue to Reset Password
            </Button>
          ) : null}
        </div>
      </form>
    </div>
  )
}
