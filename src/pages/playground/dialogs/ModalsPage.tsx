import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Section } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { ROUTES } from '@/constants/routes'

export function ModalsPage() {
  const [simpleOpen, setSimpleOpen] = useState(false)
  const [largeOpen, setLargeOpen] = useState(false)
  const [nestedOpen, setNestedOpen] = useState(false)
  const [nestedInnerOpen, setNestedInnerOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [confirmResult, setConfirmResult] = useState('NONE')
  const [formOpen, setFormOpen] = useState(false)
  const [formName, setFormName] = useState('')
  const [formResult, setFormResult] = useState('')
  const [scrollOpen, setScrollOpen] = useState(false)

  return (
    <div data-testid="modals-page">
      <h1 className="page-title">Modals</h1>
      <p className="page-description">
        Simple, large, nested, confirmation, form and scrolling modals. See also{' '}
        <Link to={`${ROUTES.dialogs}/browser`} data-testid="modals-browser-dialogs-link">
          Browser Dialogs
        </Link>
        .
      </p>

      <Section title="Modal Scenarios" testId="section-modals">
        <div className="form-actions">
          <Button testId="open-simple-modal" onClick={() => setSimpleOpen(true)}>
            Simple Modal
          </Button>
          <Button testId="open-large-modal" onClick={() => setLargeOpen(true)}>
            Large Modal
          </Button>
          <Button testId="open-nested-modal" onClick={() => setNestedOpen(true)}>
            Nested Modal
          </Button>
          <Button testId="open-confirm-modal" onClick={() => setConfirmOpen(true)}>
            Confirmation Modal
          </Button>
          <Button testId="open-form-modal" onClick={() => setFormOpen(true)}>
            Form Modal
          </Button>
          <Button testId="open-scroll-modal" onClick={() => setScrollOpen(true)}>
            Scrolling Modal
          </Button>
        </div>
        <p className="status-panel mt-1" data-testid="confirm-modal-result">
          Confirmation Result: {confirmResult}
        </p>
        {formResult ? (
          <p className="status-panel mt-1" data-testid="form-modal-result">
            Form submitted: {formResult}
          </p>
        ) : null}
      </Section>

      <Modal open={simpleOpen} onClose={() => setSimpleOpen(false)} title="Simple Modal" testId="simple-modal">
        <p>This is a simple modal, closable by the close button, backdrop click, or Escape.</p>
      </Modal>

      <Modal open={largeOpen} onClose={() => setLargeOpen(false)} title="Large Modal" testId="large-modal" size="lg">
        <p>A wider modal for content-heavy scenarios.</p>
        <div className="grid-2">
          <div className="card">Panel A</div>
          <div className="card">Panel B</div>
        </div>
      </Modal>

      <Modal open={nestedOpen} onClose={() => setNestedOpen(false)} title="Outer Modal" testId="nested-modal-outer">
        <p>This modal can open another modal on top of it.</p>
        <Button testId="open-nested-inner-modal" onClick={() => setNestedInnerOpen(true)}>
          Open Inner Modal
        </Button>
      </Modal>
      <Modal open={nestedInnerOpen} onClose={() => setNestedInnerOpen(false)} title="Inner Modal" testId="nested-modal-inner" size="sm">
        <p>Nested modal content.</p>
      </Modal>

      <Modal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Delete Item"
        testId="confirm-modal"
        size="sm"
        footer={
          <>
            <Button
              variant="secondary"
              testId="confirm-modal-cancel"
              onClick={() => {
                setConfirmResult('CANCELLED')
                setConfirmOpen(false)
              }}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              testId="confirm-modal-confirm"
              onClick={() => {
                setConfirmResult('CONFIRMED')
                setConfirmOpen(false)
              }}
            >
              Delete
            </Button>
          </>
        }
      >
        <p>Are you sure you want to delete this item? This action cannot be undone.</p>
      </Modal>

      <Modal
        open={formOpen}
        onClose={() => setFormOpen(false)}
        title="Form Modal"
        testId="form-modal"
        footer={
          <>
            <Button variant="secondary" testId="form-modal-cancel" onClick={() => setFormOpen(false)}>
              Cancel
            </Button>
            <Button
              testId="form-modal-submit"
              onClick={() => {
                setFormResult(formName)
                setFormOpen(false)
              }}
            >
              Submit
            </Button>
          </>
        }
      >
        <div className="field">
          <label className="field-label" htmlFor="form-modal-name">
            Name
          </label>
          <input id="form-modal-name" data-testid="form-modal-name" className="field-input" value={formName} onChange={(e) => setFormName(e.target.value)} />
        </div>
      </Modal>

      <Modal open={scrollOpen} onClose={() => setScrollOpen(false)} title="Scrolling Modal" testId="scroll-modal">
        <div style={{ maxHeight: 240 }}>
          {Array.from({ length: 30 }, (_, i) => (
            <p key={i} data-testid={`scroll-modal-line-${i}`}>
              Modal content line {i + 1}
            </p>
          ))}
        </div>
      </Modal>
    </div>
  )
}
