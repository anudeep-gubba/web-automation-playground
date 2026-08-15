import { Link } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'

export function AccessDeniedPage() {
  return (
    <div data-testid="access-denied-page" style={{ textAlign: 'center', maxWidth: 480, margin: '3rem auto' }}>
      <h1 className="page-title" data-testid="access-denied-title">
        403 — Access Denied
      </h1>
      <p className="page-description">You do not have permission to view this page. This route requires a different role.</p>
      <Link className="btn btn-primary" to={ROUTES.home} data-testid="access-denied-home-link">
        Back to Home
      </Link>
    </div>
  )
}
