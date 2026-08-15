import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { ThemeToggle } from './ThemeToggle'
import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/hooks/useAuth'

export function PlaygroundLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user, logout } = useAuth()

  return (
    <div className="app-shell">
      <header className="topbar" data-testid="topbar">
        <button
          type="button"
          className="mobile-menu-btn"
          data-testid="mobile-menu-toggle"
          aria-expanded={mobileOpen}
          aria-controls="sidebar-nav"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <span className="visually-hidden">Toggle navigation</span>
          <span aria-hidden="true">☰</span>
        </button>
        <Link to={ROUTES.playground} className="topbar-brand">
          Web Automation Playground
        </Link>
        <nav className="topbar-links" aria-label="Account">
          <NavLink to={ROUTES.dashboard} data-testid="topbar-dashboard-link" className="topbar-link">
            Dashboard
          </NavLink>
          <NavLink to={ROUTES.profile} data-testid="topbar-profile-link" className="topbar-link">
            Profile
          </NavLink>
          {user?.role === 'admin' ? (
            <NavLink to={ROUTES.adminDashboard} data-testid="topbar-admin-link" className="topbar-link">
              Admin
            </NavLink>
          ) : null}
        </nav>
        <div className="topbar-actions">
          <ThemeToggle />
          {user ? (
            <span className="topbar-user" data-testid="topbar-username">
              {user.username} ({user.role})
            </span>
          ) : null}
          <button type="button" className="btn btn-secondary btn-sm" data-testid="logout-button" onClick={logout}>
            Logout
          </button>
        </div>
      </header>
      <div className="app-body">
        <Sidebar mobileOpen={mobileOpen} onNavigate={() => setMobileOpen(false)} />
        {mobileOpen ? (
          <button
            type="button"
            className="sidebar-scrim"
            aria-label="Close navigation"
            onClick={() => setMobileOpen(false)}
          />
        ) : null}
        <main className="app-content" id="main-content" data-testid="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
