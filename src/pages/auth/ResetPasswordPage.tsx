import { useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { TextField } from '@/components/ui/TextField'
import { Button } from '@/components/ui/Button'
import { Alert } from '@/components/ui/Alert'
import { ROUTES } from '@/constants/routes'
import * as authService from '@/services/authService'
import { isRequired } from '@/utils/validation'

export function ResetPasswordPage() {
  const [searchParams] = useSearchParams()
  const [email, setEmail] = useState(searchParams.get('email') ?? '')
  const [code, setCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!isRequired(email) || !isRequired(code) || !isRequired(newPassword) || !isRequired(confirmPassword)) {
      setError('All fields are required.')
      return
    }
    const result = authService.resetPassword(email, code, newPassword, confirmPassword)
    if (!result.ok) {
      setError(result.message ?? 'Reset failed.')
      return
    }
    setError(null)
    setSuccess(true)
  }

  if (success) {
    return (
      <div data-testid="reset-password-success" style={{ maxWidth: 420, margin: '0 auto', textAlign: 'center' }}>
        <h1 className="page-title">Password Reset</h1>
        <p>Your password has been changed successfully.</p>
        <Link className="btn btn-primary" to={ROUTES.login} data-testid="reset-password-login-link">
          Go to Login
        </Link>
      </div>
    )
  }

  return (
    <div data-testid="reset-password-page" style={{ maxWidth: 420, margin: '0 auto' }}>
      <h1 className="page-title">Reset Password</h1>

      {error ? (
        <Alert variant="error" testId="reset-password-error">
          {error}
        </Alert>
      ) : null}

      <form onSubmit={handleSubmit} noValidate data-testid="reset-password-form">
        <TextField label="Email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} id="reset-password-email" testId="reset-password-email" />
        <TextField label="Verification Code" required value={code} onChange={(e) => setCode(e.target.value)} id="reset-password-code" testId="reset-password-code" />
        <TextField
          label="New Password"
          type="password"
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          id="reset-password-new"
          testId="reset-password-new"
        />
        <TextField
          label="Confirm Password"
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          id="reset-password-confirm"
          testId="reset-password-confirm"
        />
        <div className="form-actions">
          <Button type="submit" testId="reset-password-submit">
            Reset Password
          </Button>
        </div>
      </form>
    </div>
  )
}
