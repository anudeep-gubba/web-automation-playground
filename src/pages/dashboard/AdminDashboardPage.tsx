import { Link } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import * as authService from '@/services/authService'

export function AdminDashboardPage() {
  const users = authService.listUsers()
  return (
    <div data-testid="admin-dashboard-page">
      <h1 className="page-title">Admin Dashboard</h1>
      <p className="page-description">Visible only to accounts with the admin role. Standard users are redirected to Access Denied.</p>
      <div className="grid-2">
        <div className="card" data-testid="admin-stat-users">
          <h3 className="card-title">Total Users</h3>
          <p style={{ fontSize: '2rem', fontWeight: 700 }}>{users.length}</p>
        </div>
        <div className="card" data-testid="admin-stat-active">
          <h3 className="card-title">Active Accounts</h3>
          <p style={{ fontSize: '2rem', fontWeight: 700 }}>{users.filter((u) => u.status === 'active').length}</p>
        </div>
      </div>
      <div className="form-actions mt-2">
        <Link className="btn btn-primary" to={ROUTES.userManagement} data-testid="admin-user-management-link">
          User Management
        </Link>
      </div>
    </div>
  )
}
