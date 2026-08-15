import { useRef, useState } from 'react'
import { Section } from '@/components/ui/Card'

export function MousePage() {
  const [lastAction, setLastAction] = useState('NONE')
  const [coords, setCoords] = useState({ x: 0, y: 0 })
  const [hoverRevealed, setHoverRevealed] = useState(false)
  const [hoverButtonEnabled, setHoverButtonEnabled] = useState(false)
  const areaRef = useRef<HTMLDivElement>(null)

  function trackMove(e: React.MouseEvent) {
    const rect = areaRef.current?.getBoundingClientRect()
    if (!rect) return
    setCoords({ x: Math.round(e.clientX - rect.left), y: Math.round(e.clientY - rect.top) })
    setLastAction('MOUSE MOVE')
  }

  return (
    <div data-testid="mouse-page">
      <h1 className="page-title">Mouse Actions</h1>
      <p className="page-description">Dedicated targets for click, double-click, right-click, hover and drag events.</p>

      <Section title="Click Area" testId="section-click-area">
        <div
          id="mouse-click-area"
          data-testid="mouse-click-area"
          className="status-panel"
          style={{ height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          onClick={() => setLastAction('CLICK')}
          onDoubleClick={() => setLastAction('DOUBLE CLICK')}
          onContextMenu={(e) => {
            e.preventDefault()
            setLastAction('RIGHT CLICK')
          }}
          onMouseDown={() => setLastAction('MOUSE DOWN')}
          onMouseUp={() => setLastAction('MOUSE UP')}
          onMouseMove={trackMove}
          onMouseOver={() => setLastAction('MOUSE OVER')}
          onMouseOut={() => setLastAction('MOUSE OUT')}
          ref={areaRef}
        >
          CLICK AREA
        </div>
        <p className="status-panel mt-1" data-testid="mouse-last-action">
          Last Action: {lastAction}
        </p>
        <p className="status-panel mt-1" data-testid="mouse-coordinates">
          Coordinates: {coords.x}, {coords.y}
        </p>
      </Section>

      <Section title="Hover Scenarios" testId="section-hover">
        <div className="grid-2">
          <div>
            <div
              id="hover-reveal-trigger"
              data-testid="hover-reveal-trigger"
              className="card"
              onMouseEnter={() => setHoverRevealed(true)}
              onMouseLeave={() => setHoverRevealed(false)}
            >
              Hover to reveal hidden element
              {hoverRevealed ? (
                <p id="hover-revealed-element" data-testid="hover-revealed-element" className="mt-1 text-success">
                  Revealed content!
                </p>
              ) : null}
            </div>
          </div>

          <div>
            <div
              id="hover-enable-trigger"
              data-testid="hover-enable-trigger"
              className="card"
              onMouseEnter={() => setHoverButtonEnabled(true)}
              onMouseLeave={() => setHoverButtonEnabled(false)}
            >
              Hover to enable the button below
              <div className="mt-1">
                <button id="hover-dependent-button" data-testid="hover-dependent-button" className="btn btn-primary" disabled={!hoverButtonEnabled}>
                  Hover-enabled Button
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-2" style={{ position: 'relative', display: 'inline-block' }}>
          <button
            id="tooltip-trigger"
            data-testid="tooltip-trigger"
            className="btn btn-secondary"
            aria-describedby="mouse-tooltip"
          >
            Hover for Tooltip
          </button>
          <span id="mouse-tooltip" data-testid="mouse-tooltip" role="tooltip" className="tooltip-bubble">
            This is a tooltip
          </span>
        </div>

        <div className="mt-2" id="hover-menu-root" data-testid="hover-menu-root" style={{ position: 'relative', display: 'inline-block' }}>
          <button className="btn btn-secondary" id="hover-menu-trigger" data-testid="hover-menu-trigger">
            Products
          </button>
          <ul className="hover-menu" data-testid="hover-menu" id="hover-menu">
            <li data-testid="hover-menu-item-electronics">
              Electronics
              <ul className="hover-submenu" data-testid="hover-submenu-electronics">
                <li data-testid="hover-submenu-item-phones">Phones</li>
                <li data-testid="hover-submenu-item-laptops">Laptops</li>
              </ul>
            </li>
            <li data-testid="hover-menu-item-clothing">Clothing</li>
            <li data-testid="hover-menu-item-accessories">Accessories</li>
          </ul>
        </div>
      </Section>

      <Section title="Resize" testId="section-resize">
        <div
          id="mouse-resize-box"
          data-testid="mouse-resize-box"
          className="status-panel"
          style={{ resize: 'both', overflow: 'auto', width: 220, height: 120, minWidth: 120, minHeight: 80 }}
        >
          Drag the bottom-right corner to resize this box.
        </div>
      </Section>
    </div>
  )
}
