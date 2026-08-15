import { NavLink } from 'react-router-dom'
import { PLAYGROUND_NAV } from '@/constants/navigation'

export function Sidebar({ mobileOpen, onNavigate }: { mobileOpen: boolean; onNavigate?: () => void }) {
  return (
    <nav
      className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}
      data-testid="sidebar-nav"
      aria-label="Playground modules"
    >
      <div className="sidebar-heading">Web Automation Playground</div>
      <ul className="sidebar-list">
        {PLAYGROUND_NAV.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              end={item.path.endsWith('/playground')}
              className={({ isActive }) => `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`}
              data-testid={item.testId}
              onClick={onNavigate}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
