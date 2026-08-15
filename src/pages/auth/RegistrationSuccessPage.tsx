import { Link, useLocation, Navigate } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'

export function RegistrationSuccessPage() {
  const location = useLocation()
  const email = (location.state as { email?: string } | null)?.email

  if (!email) return <Navigate to={ROUTES.register} replace />

  return (
    <div data-testid="registration-success-page" style={{ maxWidth: 480, margin: '0 auto', textAlign: 'center' }}>
      <h1 className="page-title">Registration Successful</h1>
      <p className="page-description">Account:</p>
      <p className="badge" data-testid="registration-success-email">
        {email}
      </p>
      <div className="form-actions" style={{ justifyContent: 'center', marginTop: '1.5rem' }}>
        <Link
          className="btn btn-primary"
          to={`${ROUTES.verifyEmail}?email=${encodeURIComponent(email)}`}
          data-testid="registration-verify-email-link"
        >
          Verify Email
        </Link>
        <Link className="btn btn-secondary" to={ROUTES.login} data-testid="registration-go-to-login-link">
          Go to Login
        </Link>
      </div>
    </div>
  )
}
