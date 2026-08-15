import { Link } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'

export function NotFoundPage() {
  return (
    <div data-testid="not-found-page" style={{ textAlign: 'center', maxWidth: 480, margin: '3rem auto' }}>
      <h1 className="page-title" data-testid="not-found-title">
        404 — Page Not Found
      </h1>
      <p className="page-description">The route you requested does not exist in this application.</p>
      <Link className="btn btn-primary" to={ROUTES.home} data-testid="not-found-home-link">
        Back to Home
      </Link>
    </div>
  )
}
