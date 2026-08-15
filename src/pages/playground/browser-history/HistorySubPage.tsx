import { useNavigate, useParams } from 'react-router-dom'
import { Section } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ROUTES } from '@/constants/routes'

export function HistorySubPage() {
  const { page } = useParams<{ page: string }>()
  const navigate = useNavigate()
  const label = (page ?? '').toUpperCase()

  return (
    <div data-testid={`history-page-${page}`}>
      <h1 className="page-title" data-testid="history-page-title">
        Page {label}
      </h1>
      <p className="page-description">You navigated to Page {label}. Use Back/Forward to move through history.</p>
      <Section title="Navigation" testId="section-history-subpage">
        <p className="status-panel" data-testid="history-current-url">
          Current URL: {window.location.pathname}
        </p>
        <div className="form-actions">
          <Button variant="secondary" testId="history-back" onClick={() => navigate(-1)}>
            Back
          </Button>
          <Button variant="secondary" testId="history-forward" onClick={() => navigate(1)}>
            Forward
          </Button>
          <Button testId="history-return" onClick={() => navigate(ROUTES.browserHistory)}>
            Return to History Module
          </Button>
        </div>
      </Section>
    </div>
  )
}
