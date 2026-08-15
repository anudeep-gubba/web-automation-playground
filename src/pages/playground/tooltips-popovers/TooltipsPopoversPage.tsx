import { useEffect, useRef, useState } from 'react'
import { Section } from '@/components/ui/Card'

export function TooltipsPopoversPage() {
  const [clickTooltipOpen, setClickTooltipOpen] = useState(false)
  const [popoverOpen, setPopoverOpen] = useState(false)
  const [nestedPopoverOpen, setNestedPopoverOpen] = useState(false)
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null)
  const popoverRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleOutsideClick(e: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setPopoverOpen(false)
        setNestedPopoverOpen(false)
      }
    }
    function handleEscape(e: globalThis.KeyboardEvent) {
      if (e.key === 'Escape') {
        setPopoverOpen(false)
        setNestedPopoverOpen(false)
        setContextMenu(null)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  return (
    <div data-testid="tooltips-popovers-page">
      <h1 className="page-title">Tooltips &amp; Popovers</h1>
      <p className="page-description">Hover, focus and click-triggered tooltips; popovers and a custom context menu.</p>

      <Section title="Tooltips" testId="section-tooltips">
        <div className="form-actions">
          <span style={{ position: 'relative', display: 'inline-block' }}>
            <button type="button" className="btn btn-secondary" data-testid="tooltip-hover-trigger" aria-describedby="tooltip-hover-bubble">
              Hover Tooltip
            </button>
            <span id="tooltip-hover-bubble" data-testid="tooltip-hover-bubble" role="tooltip" className="tooltip-bubble" style={{ left: 'auto' }}>
              Shown on hover
            </span>
          </span>

          <span style={{ position: 'relative', display: 'inline-block' }}>
            <button type="button" className="btn btn-secondary" data-testid="tooltip-focus-trigger" aria-describedby="tooltip-focus-bubble">
              Focus Tooltip
            </button>
            <span id="tooltip-focus-bubble" data-testid="tooltip-focus-bubble" role="tooltip" className="tooltip-bubble" style={{ left: 'auto' }}>
              Shown on focus
            </span>
          </span>

          <span style={{ position: 'relative', display: 'inline-block' }}>
            <button type="button" className="btn btn-secondary" data-testid="tooltip-click-trigger" onClick={() => setClickTooltipOpen((v) => !v)}>
              Click Tooltip
            </button>
            {clickTooltipOpen ? (
              <span data-testid="tooltip-click-bubble" role="tooltip" className="tooltip-bubble" style={{ visibility: 'visible', opacity: 1, position: 'absolute', left: 'auto' }}>
                Shown on click
              </span>
            ) : null}
          </span>
        </div>
      </Section>

      <Section title="Popover" testId="section-popover">
        <div ref={popoverRef} style={{ position: 'relative', display: 'inline-block' }}>
          <button type="button" className="btn btn-primary" data-testid="popover-trigger" onClick={() => setPopoverOpen((v) => !v)}>
            Open Popover
          </button>
          {popoverOpen ? (
            <div data-testid="popover-panel" className="hover-menu" style={{ display: 'block', position: 'absolute', padding: '0.75rem', minWidth: 220 }}>
              <p>Popover content with a nested popover trigger.</p>
              <button type="button" className="btn btn-secondary btn-sm" data-testid="nested-popover-trigger" onClick={() => setNestedPopoverOpen((v) => !v)}>
                Open Nested
              </button>
              {nestedPopoverOpen ? (
                <div data-testid="nested-popover-panel" className="card mt-1">
                  Nested popover content.
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </Section>

      <Section title="Context Menu" testId="section-context-menu">
        <div
          id="context-menu-target"
          data-testid="context-menu-target"
          className="status-panel"
          style={{ height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onContextMenu={(e) => {
            e.preventDefault()
            setContextMenu({ x: e.clientX, y: e.clientY })
          }}
        >
          Right-click for context menu
        </div>
        {contextMenu ? (
          <ul
            data-testid="context-menu"
            className="hover-menu"
            style={{ display: 'block', position: 'fixed', left: contextMenu.x, top: contextMenu.y }}
          >
            <li data-testid="context-menu-item-copy" onClick={() => setContextMenu(null)}>
              Copy
            </li>
            <li data-testid="context-menu-item-paste" onClick={() => setContextMenu(null)}>
              Paste
            </li>
            <li data-testid="context-menu-item-delete" onClick={() => setContextMenu(null)}>
              Delete
            </li>
          </ul>
        ) : null}
      </Section>
    </div>
  )
}
