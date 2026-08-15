import { Section } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/hooks/useToast'

export function NotificationsPage() {
  const { showToast } = useToast()

  return (
    <div data-testid="notifications-page">
      <h1 className="page-title">Notifications</h1>
      <p className="page-description">Toast notifications rendered in a fixed viewport (bottom-right), with auto-dismiss and stacking.</p>

      <Section title="Trigger Notifications" testId="section-notifications">
        <div className="form-actions">
          <Button testId="notify-success" variant="success" onClick={() => showToast({ variant: 'success', title: 'Success', description: 'Action completed successfully.' })}>
            Success Toast
          </Button>
          <Button testId="notify-error" variant="danger" onClick={() => showToast({ variant: 'error', title: 'Error', description: 'Something went wrong.' })}>
            Error Toast
          </Button>
          <Button testId="notify-warning" variant="secondary" onClick={() => showToast({ variant: 'warning', title: 'Warning', description: 'Please double-check this.' })}>
            Warning Toast
          </Button>
          <Button testId="notify-info" variant="secondary" onClick={() => showToast({ variant: 'info', title: 'Info', description: 'For your information.' })}>
            Info Toast
          </Button>
          <Button
            testId="notify-persistent"
            variant="secondary"
            onClick={() => showToast({ variant: 'info', title: 'Persistent', description: 'This stays until dismissed.', persistent: true })}
          >
            Persistent Toast
          </Button>
          <Button
            testId="notify-stack"
            variant="secondary"
            onClick={() => {
              showToast({ variant: 'success', title: 'First' })
              showToast({ variant: 'info', title: 'Second' })
              showToast({ variant: 'warning', title: 'Third' })
            }}
          >
            Stack 3 Toasts
          </Button>
        </div>
      </Section>
    </div>
  )
}
