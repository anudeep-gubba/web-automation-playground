import { Link } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/hooks/useAuth'

export function HomePage() {
  const { isAuthenticated } = useAuth()

  return (
    <div data-testid="home-page">
      <h1 className="page-title" data-testid="home-title">
        Web Automation Playground
      </h1>
      <p className="page-description">
        A standalone, framework-independent sandbox for exercising browser automation tools. Every module below
        exposes stable <code>data-testid</code> identifiers so external automation frameworks (Selenium, Playwright,
        WebdriverIO, Puppeteer, or your own) can target it deterministically. This application does not depend on any
        of those tools itself.
      </p>

      <div className="grid-2">
        <div className="card" data-testid="home-card-playground">
          <h3 className="card-title">Automation Playground</h3>
          <p className="card-description">
            26+ dedicated modules: forms, mouse/keyboard actions, drag &amp; drop, tables, iframes, shadow DOM,
            storage, network, WebSocket, accessibility and more.
          </p>
          {isAuthenticated ? (
            <Link className="btn btn-primary" to={ROUTES.playground} data-testid="home-enter-playground">
              Enter Playground
            </Link>
          ) : (
            <Link className="btn btn-primary" to={ROUTES.login} data-testid="home-login-to-enter">
              Login to Enter
            </Link>
          )}
        </div>
        <div className="card" data-testid="home-card-auth">
          <h3 className="card-title">Authentication Flows</h3>
          <p className="card-description">
            Registration, email verification, login, forgot/reset password, role-based access and session handling —
            all deterministic and fully local.
          </p>
          {!isAuthenticated ? (
            <div className="form-actions">
              <Link className="btn btn-secondary" to={ROUTES.register} data-testid="home-register-link">
                Register
              </Link>
              <Link className="btn btn-primary" to={ROUTES.login} data-testid="home-login-link">
                Login
              </Link>
            </div>
          ) : (
            <Link className="btn btn-secondary" to={ROUTES.dashboard} data-testid="home-dashboard-link">
              Go to Dashboard
            </Link>
          )}
        </div>
      </div>

      <section className="playground-section" data-testid="home-test-accounts">
        <h2 className="section-title">Deterministic Test Accounts</h2>
        <p className="section-description">Documented, non-real credentials for automation scripts. See README for the full list.</p>
        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Account</th>
                <th>Email / Username</th>
                <th>Password</th>
                <th>State</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Standard User</td>
                <td>user@example.com / standarduser</td>
                <td>User@123</td>
                <td>Active</td>
              </tr>
              <tr>
                <td>Admin User</td>
                <td>admin@example.com / adminuser</td>
                <td>Admin@123</td>
                <td>Active, role: admin</td>
              </tr>
              <tr>
                <td>Locked User</td>
                <td>locked@example.com / lockeduser</td>
                <td>Locked@123</td>
                <td>Locked</td>
              </tr>
              <tr>
                <td>Unverified User</td>
                <td>unverified@example.com / unverifieduser</td>
                <td>User@123</td>
                <td>Unverified</td>
              </tr>
              <tr>
                <td>Disabled User</td>
                <td>disabled@example.com / disableduser</td>
                <td>Disabled@123</td>
                <td>Disabled</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
