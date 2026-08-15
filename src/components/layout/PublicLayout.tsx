import { Link, NavLink, Outlet } from 'react-router-dom'
import { ThemeToggle } from './ThemeToggle'
import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/hooks/useAuth'

export function PublicLayout() {
  const { isAuthenticated, user, logout } = useAuth()

  return (
    <div className="app-shell">
      <header className="topbar" data-testid="public-topbar">
        <Link to={ROUTES.home} className="topbar-brand" data-testid="brand-link">
          Web Automation Playground
        </Link>
        <nav className="topbar-links" aria-label="Main">
          <NavLink to={ROUTES.home} data-testid="nav-home" end>
            Home
          </NavLink>
          {isAuthenticated ? (
            <NavLink to={ROUTES.dashboard} data-testid="nav-dashboard-link">
              Dashboard
            </NavLink>
          ) : (
            <>
              <NavLink to={ROUTES.login} data-testid="nav-login-link">
                Login
              </NavLink>
              <NavLink to={ROUTES.register} data-testid="nav-register-link">
                Register
              </NavLink>
            </>
          )}
        </nav>
        <div className="topbar-actions">
          <ThemeToggle />
          {isAuthenticated ? (
            <>
              <span className="topbar-user" data-testid="public-topbar-username">
                {user?.username}
              </span>
              <button type="button" className="btn btn-secondary btn-sm" data-testid="public-logout-button" onClick={logout}>
                Logout
              </button>
            </>
          ) : null}
        </div>
      </header>
      <main className="public-content" id="main-content" data-testid="main-content">
        <Outlet />
      </main>
      <footer className="app-footer" data-testid="app-footer">
        <p>Web Automation Playground — a framework-independent sandbox for browser automation testing.</p>
      </footer>
    </div>
  )
}
