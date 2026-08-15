import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { TextField } from '@/components/ui/TextField'
import { Checkbox } from '@/components/ui/Checkbox'
import { Button } from '@/components/ui/Button'
import { Alert } from '@/components/ui/Alert'
import { ROUTES } from '@/constants/routes'
import { DEMO_ACCOUNTS } from '@/constants/auth'
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

  function quickFill(acc: (typeof DEMO_ACCOUNTS)[number]) {
    setIdentifier(acc.identifier)
    setPassword(acc.password)
    setError(null)
    setErrorCode(null)
  }

  return (
    <div data-testid="login-page" className="login-layout">
      <div className="login-form-column">
        <h1 className="page-title">Login</h1>
        <p className="page-description">Sign in, or use one of the demo accounts on the right to fill the form instantly.</p>

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

      <aside className="login-accounts-column" data-testid="login-test-accounts" aria-label="Demo accounts">
        <h2 className="card-title">Demo Accounts</h2>
        <p className="text-muted mt-1">Deterministic, non-real credentials. Click "Use" to autofill the form.</p>
        <ul className="login-account-list">
          {DEMO_ACCOUNTS.map((acc) => (
            <li key={acc.username} className="login-account-item" data-testid={`login-account-${acc.username}`}>
              <div className="login-account-info">
                <div className="login-account-name">
                  {acc.label}
                  <span className={`badge ${acc.status === 'active' ? 'badge-active' : acc.status === 'unverified' ? 'badge-pending' : 'badge-inactive'}`}>
                    {acc.status}
                    {acc.role === 'admin' ? ' · admin' : ''}
                  </span>
                </div>
                <div className="login-account-creds">
                  {acc.identifier} · {acc.password}
                </div>
              </div>
              <Button size="sm" variant="secondary" testId={`login-quickfill-${acc.username}`} onClick={() => quickFill(acc)}>
                Use
              </Button>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  )
}
