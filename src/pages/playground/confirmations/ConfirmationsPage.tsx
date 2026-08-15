import { useState } from 'react'
import { Section } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { Alert } from '@/components/ui/Alert'

type Status = 'idle' | 'confirming' | 'loading' | 'success' | 'failure' | 'cancelled'

export function ConfirmationsPage() {
  const [status, setStatus] = useState<Status>('idle')
  const [failNext, setFailNext] = useState(false)

  function handleConfirm() {
    setStatus('loading')
    window.setTimeout(() => {
      setStatus(failNext ? 'failure' : 'success')
    }, 1200)
  }

  function reset() {
    setStatus('idle')
  }

  return (
    <div data-testid="confirmations-page">
      <h1 className="page-title">Confirmation Workflows</h1>
      <p className="page-description">A full delete-confirmation flow: confirm, cancel, loading, success and failure states.</p>

      <Section title="Delete Item" testId="section-confirmations">
        <label className="checkbox-label mb-1" htmlFor="confirm-fail-toggle">
          <input id="confirm-fail-toggle" data-testid="confirm-fail-toggle" type="checkbox" checked={failNext} onChange={(e) => setFailNext(e.target.checked)} />
          <span>Simulate failure on next confirm</span>
        </label>

        <div>
          <Button testId="confirm-delete-trigger" variant="danger" onClick={() => setStatus('confirming')}>
            Delete Item
          </Button>
        </div>

        {status === 'loading' ? (
          <Alert variant="info" testId="confirm-status-loading">
            Deleting…
          </Alert>
        ) : null}
        {status === 'success' ? (
          <Alert variant="success" testId="confirm-status-success">
            Item deleted successfully.
          </Alert>
        ) : null}
        {status === 'failure' ? (
          <Alert variant="error" testId="confirm-status-failure">
            Failed to delete item. Please try again.
          </Alert>
        ) : null}
        {status === 'cancelled' ? (
          <Alert variant="warning" testId="confirm-status-cancelled">
            Deletion cancelled.
          </Alert>
        ) : null}

        {(status === 'success' || status === 'failure' || status === 'cancelled') ? (
          <Button size="sm" variant="secondary" testId="confirm-reset" onClick={reset}>
            Reset
          </Button>
        ) : null}
      </Section>

      <Modal
        open={status === 'confirming'}
        onClose={() => setStatus('cancelled')}
        title="Delete Item"
        testId="confirm-delete-modal"
        size="sm"
        footer={
          <>
            <Button variant="secondary" testId="confirm-delete-cancel" onClick={() => setStatus('cancelled')}>
              Cancel
            </Button>
            <Button variant="danger" testId="confirm-delete-confirm" onClick={handleConfirm}>
              Delete
            </Button>
          </>
        }
      >
        <p>Are you sure you want to delete this item? This action cannot be undone.</p>
      </Modal>
    </div>
  )
}
