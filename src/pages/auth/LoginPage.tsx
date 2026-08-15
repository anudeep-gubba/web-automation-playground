import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { TextField } from '@/components/ui/TextField'
import { Checkbox } from '@/components/ui/Checkbox'
import { Button } from '@/components/ui/Button'
import { Alert } from '@/components/ui/Alert'
import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/hooks/useAuth'
import { isRequired } from '@/utils/validation'
import type { AuthErrorCode } from '@/types'

const ERROR_MESSAGES: Partial<Record<AuthErrorCode, string>> = {
  ACCOUNT_LOCKED: 'This account has been locked. Contact an administrator.',
  ACCOUNT_DISABLED: 'This account has been disabled.',
  ACCOUNT_UNVERIFIED: 'Please verify your email before logging in.',
  INVALID_CREDENTIALS: 'Invalid username/email or password.',
}

export function LoginPage() {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [errorCode, setErrorCode] = useState<AuthErrorCode | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)
    setErrorCode(null)

    if (!isRequired(identifier) || !isRequired(password)) {
      setError('Email/username and password are required.')
      return
    }

    setSubmitting(true)
    const result = login(identifier, password, rememberMe)
    setSubmitting(false)

    if (!result.ok) {
      setErrorCode(result.errorCode ?? null)
      setError((result.errorCode && ERROR_MESSAGES[result.errorCode]) ?? result.message ?? 'Login failed.')
      return
    }

    const from = (location.state as { from?: { pathname: string } } | null)?.from?.pathname
    navigate(from ?? ROUTES.dashboard, { replace: true })
  }

  return (
    <div data-testid="login-page" style={{ maxWidth: 420, margin: '0 auto' }}>
      <h1 className="page-title">Login</h1>
      <p className="page-description">Use one of the deterministic test accounts documented on the Home page.</p>

      {error ? (
        <Alert variant="error" testId={errorCode === 'ACCOUNT_LOCKED' ? 'login-error-locked' : 'login-error'}>
          {error}
        </Alert>
      ) : null}

      <form onSubmit={handleSubmit} noValidate data-testid="login-form">
        <TextField
          label="Email / Username"
          required
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          id="login-email"
          testId="login-email"
          autoComplete="username"
        />
        <TextField
          label="Password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="login-password"
          testId="login-password"
          autoComplete="current-password"
        />
        <Checkbox
          label="Remember Me"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e.target.checked)}
          id="login-remember-me"
          testId="login-remember-me"
        />
        <div className="form-actions">
          <Button type="submit" testId="login-submit" loading={submitting}>
            Login
          </Button>
        </div>
      </form>

      <div className="mt-2" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Link to={ROUTES.forgotPassword} data-testid="login-forgot-password-link">
          Forgot Password?
        </Link>
        <Link to={ROUTES.register} data-testid="login-create-account-link">
          Create Account
        </Link>
      </div>
    </div>
  )
}
