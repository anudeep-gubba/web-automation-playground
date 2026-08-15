import { Link } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/hooks/useAuth'

export function DashboardPage() {
  const { user } = useAuth()

  return (
    <div data-testid="dashboard-page">
      <h1 className="page-title" data-testid="dashboard-title">
        Welcome, {user?.firstName}
      </h1>
      <p className="page-description">You are logged in as {user?.username} ({user?.role}).</p>

      <div className="grid-2">
        <div className="card" data-testid="dashboard-profile-card">
          <h3 className="card-title">Your Profile</h3>
          <p className="card-description">
            {user?.firstName} {user?.lastName} · {user?.email}
          </p>
          <Link className="btn btn-secondary" to={ROUTES.profile} data-testid="dashboard-profile-link">
            View Profile
          </Link>
        </div>
        <div className="card" data-testid="dashboard-playground-card">
          <h3 className="card-title">Automation Playground</h3>
          <p className="card-description">Browse all 26+ automation testing modules.</p>
          <Link className="btn btn-primary" to={ROUTES.playground} data-testid="dashboard-playground-link">
            Open Playground
          </Link>
        </div>
        {user?.role === 'admin' ? (
          <div className="card" data-testid="dashboard-admin-card">
            <h3 className="card-title">Admin Dashboard</h3>
            <p className="card-description">Manage users and advanced settings.</p>
            <Link className="btn btn-secondary" to={ROUTES.adminDashboard} data-testid="dashboard-admin-link">
              Open Admin
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  )
}
