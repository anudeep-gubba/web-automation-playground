import { Link } from 'react-router-dom'
import { ROUTES } from '@/constants/routes'
import { useAuth } from '@/hooks/useAuth'

const FEATURES = [
  { icon: '🧩', title: '30+ Modules', description: 'Forms, mouse & keyboard, drag & drop, tables, iframes, Shadow DOM, storage, network, WebSocket, accessibility and more.' },
  { icon: '🎯', title: 'Deterministic', description: 'Seeded test accounts, fixed codes and stable identifiers — every run behaves exactly the same.' },
  { icon: '📴', title: 'Fully Offline', description: 'Core functionality runs entirely client-side. No third-party API calls, no flaky network dependencies.' },
  { icon: '🚫', title: 'Framework-Free', description: 'Zero Selenium, Playwright, Cypress, WebdriverIO or Puppeteer code — this is the target, not the tool.' },
]

const STEPS = [
  { step: '1', title: 'Sign in', description: 'Use a documented demo account, or register a new one — right from the Login page.' },
  { step: '2', title: 'Explore a module', description: 'Every playground page is a self-contained automation scenario with stable data-testid hooks.' },
  { step: '3', title: 'Point your framework at it', description: 'Drive it with Selenium, Playwright, WebdriverIO, or anything else — this app never knows the difference.' },
]

export function HomePage() {
  const { isAuthenticated } = useAuth()

  return (
    <div data-testid="home-page">
      <section className="hero" data-testid="home-hero">
        <p className="hero-eyebrow">Web Automation Playground</p>
        <h1 className="hero-title" data-testid="home-title">
          A sandbox built to be automated.
        </h1>
        <p className="hero-subtitle">
          Every button, form, modal and menu here carries a stable <code>data-testid</code>. Point Selenium, Playwright,
          WebdriverIO, or your own framework at it — this app has no automation tooling of its own.
        </p>
        <div className="hero-actions">
          {isAuthenticated ? (
            <Link className="btn btn-primary btn-lg" to={ROUTES.playground} data-testid="home-enter-playground">
              Enter Playground
            </Link>
          ) : (
            <>
              <Link className="btn btn-primary btn-lg" to={ROUTES.login} data-testid="home-login-link">
                Login
              </Link>
              <Link className="btn btn-secondary btn-lg" to={ROUTES.register} data-testid="home-register-link">
                Create Account
              </Link>
            </>
          )}
        </div>
      </section>

      <section className="feature-grid" data-testid="home-features">
        {FEATURES.map((f) => (
          <div key={f.title} className="feature-card">
            <span className="feature-icon" aria-hidden="true">
              {f.icon}
            </span>
            <h3 className="card-title">{f.title}</h3>
            <p className="card-description">{f.description}</p>
          </div>
        ))}
      </section>

      <section className="steps-section" data-testid="home-steps">
        <h2 className="section-title" style={{ textAlign: 'center' }}>
          How it works
        </h2>
        <div className="steps-grid">
          {STEPS.map((s) => (
            <div key={s.step} className="step-card">
              <span className="step-number">{s.step}</span>
              <h3 className="card-title">{s.title}</h3>
              <p className="card-description">{s.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
