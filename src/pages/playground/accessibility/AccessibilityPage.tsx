import { useState } from 'react'
import { Section } from '@/components/ui/Card'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'

export function AccessibilityPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [dropdownValue, setDropdownValue] = useState('Option A')
  const [announcement, setAnnouncement] = useState('')

  function announce(message: string) {
    setAnnouncement(message)
  }

  return (
    <div data-testid="accessibility-page">
      <h1 className="page-title">Accessibility</h1>
      <p className="page-description">Semantic HTML, ARIA attributes, keyboard navigation, focus management — plus deliberate negative examples for locator testing.</p>

      <Section title="Semantic HTML & Landmarks" testId="section-semantic-html">
        <nav aria-label="Example landmark navigation" data-testid="a11y-nav-landmark">
          <ul>
            <li>
              <a href="#a11y-main-landmark">Skip to main</a>
            </li>
          </ul>
        </nav>
        <main id="a11y-main-landmark" data-testid="a11y-main-landmark" aria-label="Example main landmark">
          <p>This region uses the native &lt;main&gt; landmark with an accessible name.</p>
        </main>
      </Section>

      <Section title="ARIA Labels, Roles, States & Descriptions" testId="section-aria">
        <button id="a11y-good-button" data-testid="a11y-good-button" className="btn btn-primary" aria-label="Save document" aria-describedby="a11y-good-button-desc">
          💾
        </button>
        <p id="a11y-good-button-desc" data-testid="a11y-good-button-desc" className="text-muted">
          Icon-only button with an explicit accessible name and description.
        </p>

        <div role="status" aria-live="polite" data-testid="a11y-live-region" className="status-panel mt-1">
          {announcement || 'Live region idle.'}
        </div>
        <Button size="sm" className="mt-1" testId="a11y-announce-button" onClick={() => announce(`Announced at ${new Date().toLocaleTimeString()}`)}>
          Trigger Announcement
        </Button>

        <div className="mt-2">
          <span id="a11y-progress-label">Upload progress</span>
          <div role="progressbar" aria-labelledby="a11y-progress-label" aria-valuenow={40} aria-valuemin={0} aria-valuemax={100} data-testid="a11y-progressbar" className="status-panel">
            40%
          </div>
        </div>
      </Section>

      <Section title="Accessible Form" testId="section-accessible-form">
        <div className="field">
          <label htmlFor="a11y-accessible-input" className="field-label">
            Accessible Email Field
          </label>
          <input id="a11y-accessible-input" data-testid="a11y-accessible-input" type="email" className="field-input" aria-required="true" aria-describedby="a11y-accessible-input-hint" />
          <p id="a11y-accessible-input-hint" className="field-hint">
            We'll never share your email.
          </p>
        </div>
      </Section>

      <Section title="Accessible Dropdown" testId="section-accessible-dropdown">
        <div style={{ position: 'relative', maxWidth: 240 }}>
          <button
            type="button"
            id="a11y-dropdown-trigger"
            data-testid="a11y-dropdown-trigger"
            className="field-input"
            aria-haspopup="listbox"
            aria-expanded={dropdownOpen}
            onClick={() => setDropdownOpen((v) => !v)}
          >
            {dropdownValue}
          </button>
          {dropdownOpen ? (
            <ul role="listbox" aria-label="Accessible options" data-testid="a11y-dropdown-list" className="hover-menu" style={{ display: 'block', position: 'absolute', width: '100%' }}>
              {['Option A', 'Option B', 'Option C'].map((o) => (
                <li key={o} role="option" aria-selected={dropdownValue === o} data-testid={`a11y-dropdown-option-${o.split(' ')[1]}`} onClick={() => { setDropdownValue(o); setDropdownOpen(false) }}>
                  {o}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </Section>

      <Section title="Accessible Table" testId="section-accessible-table">
        <table className="data-table" data-testid="a11y-table">
          <caption>Quarterly revenue by region</caption>
          <thead>
            <tr>
              <th scope="col">Region</th>
              <th scope="col">Q1</th>
              <th scope="col">Q2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">North</th>
              <td>$120k</td>
              <td>$140k</td>
            </tr>
            <tr>
              <th scope="row">South</th>
              <td>$98k</td>
              <td>$110k</td>
            </tr>
          </tbody>
        </table>
      </Section>

      <Section title="Accessible Modal & Focus Trap" testId="section-accessible-modal">
        <Button testId="a11y-open-modal" onClick={() => setModalOpen(true)}>
          Open Accessible Modal
        </Button>
        <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Accessible Modal" testId="a11y-modal">
          <p>Focus is trapped inside this dialog; Tab and Shift+Tab cycle within it, and Escape closes it.</p>
          <input className="field-input mt-1" placeholder="First focusable field" data-testid="a11y-modal-input" />
        </Modal>
      </Section>

      <Section title="Negative Examples (Intentional Accessibility Issues)" testId="section-a11y-negative">
        <p className="text-muted">These examples are deliberately mislabeled for negative-path accessibility automation.</p>

        <div className="mt-1">
          <span data-testid="a11y-poorly-labelled">Click</span>
          <button id="a11y-poorly-labelled-button" data-testid="a11y-poorly-labelled-button" className="btn btn-secondary mt-1">
            Click
          </button>
          <p className="text-muted">^ Button text "Click" gives no context to assistive technology.</p>
        </div>

        <div className="mt-1">
          <label id="a11y-duplicate-label-1">Email</label>
          <input data-testid="a11y-duplicate-input-1" className="field-input" />
          <label id="a11y-duplicate-label-2">Email</label>
          <input data-testid="a11y-duplicate-input-2" className="field-input mt-1" />
          <p className="text-muted">^ Two fields share the identical visible label "Email".</p>
        </div>

        <div className="mt-1">
          <span data-testid="a11y-hidden-element" aria-hidden="true" className="status-panel">
            Hidden from assistive technology (aria-hidden)
          </span>
        </div>

        <div className="mt-1">
          <button data-testid="a11y-disabled-element" className="btn btn-secondary" disabled aria-disabled="true">
            Permanently Disabled Control
          </button>
        </div>
      </Section>
    </div>
  )
}
