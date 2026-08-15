import { useState } from 'react'
import { Section } from '@/components/ui/Card'
import { useViewport } from '@/hooks/useViewport'
import { PRODUCTS } from '@/constants/testData'

export function ResponsivePage() {
  const { width, height, viewportClass } = useViewport()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div data-testid="responsive-page">
      <h1 className="page-title">Responsive</h1>
      <p className="page-description">Resize the browser window to see breakpoint-driven layout changes.</p>

      <Section title="Viewport Info" testId="section-viewport-info">
        <p className="status-panel" data-testid="responsive-current-view">
          Current View: {viewportClass.toUpperCase()}
        </p>
        <p className="status-panel mt-1" data-testid="responsive-viewport-size">
          Viewport: {width} × {height}
        </p>
      </Section>

      <Section title="Responsive Navigation" testId="section-responsive-nav">
        <nav data-testid="responsive-desktop-menu" className="responsive-desktop-menu">
          <a href="#a">Home</a>
          <a href="#b">Products</a>
          <a href="#c">About</a>
        </nav>
        <button type="button" data-testid="responsive-mobile-menu-toggle" className="responsive-mobile-menu-toggle" onClick={() => setMobileMenuOpen((v) => !v)}>
          ☰ Menu
        </button>
        {mobileMenuOpen ? (
          <nav data-testid="responsive-mobile-menu" className="mt-1">
            <a href="#a">Home</a>
            <br />
            <a href="#b">Products</a>
            <br />
            <a href="#c">About</a>
          </nav>
        ) : null}
      </Section>

      <Section title="Responsive Cards" testId="section-responsive-cards">
        <div className="responsive-card-grid" data-testid="responsive-card-grid">
          {PRODUCTS.slice(0, 6).map((p) => (
            <div key={p.id} className="card" data-testid={`responsive-card-${p.id}`}>
              <h3 className="card-title">{p.name}</h3>
              <p className="card-description">${p.price}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Responsive Table" testId="section-responsive-table">
        <div className="data-table-wrapper" data-testid="responsive-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {PRODUCTS.slice(0, 5).map((p) => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.category}</td>
                  <td>${p.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  )
}
