import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/hooks/useAuth'

export function ProtectedRoute() {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.login} state={{ from: location }} replace />
  }
  return <Outlet />
}

export function RoleRoute({ role }: { role: 'admin' | 'user' }) {
  const { user } = useAuth()

  if (!user) return <Navigate to={ROUTES.login} replace />
  if (user.role !== role) return <Navigate to={ROUTES.accessDenied} replace />
  return <Outlet />
}

export function GuestOnlyRoute() {
  const { isAuthenticated } = useAuth()
  if (isAuthenticated) return <Navigate to={ROUTES.dashboard} replace />
  return <Outlet />
}
