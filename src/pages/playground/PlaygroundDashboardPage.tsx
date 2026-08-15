import { Link } from 'react-router-dom'
import { PLAYGROUND_NAV } from '@/constants/navigation'

export function PlaygroundDashboardPage() {
  const modules = PLAYGROUND_NAV.filter((item) => item.path !== '/playground')

  return (
    <div data-testid="playground-dashboard-page">
      <h1 className="page-title">Automation Playground</h1>
      <p className="page-description">{modules.length} modules, each with stable, documented automation identifiers.</p>

      <div className="grid-2">
        {modules.map((m) => (
          <Link key={m.path} to={m.path} className="card" data-testid={`playground-module-card-${m.testId}`} style={{ textDecoration: 'none', color: 'inherit' }}>
            <h3 className="card-title">{m.label}</h3>
          </Link>
        ))}
      </div>
    </div>
  )
}
