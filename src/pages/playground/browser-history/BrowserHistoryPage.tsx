import { useNavigate } from 'react-router-dom'
import { Section } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { historyPageRoute } from '@/constants/routes'

export function BrowserHistoryPage() {
  const navigate = useNavigate()

  return (
    <div data-testid="browser-history-page">
      <h1 className="page-title">Browser History</h1>
      <p className="page-description">Navigate between routes and use browser/programmatic back and forward controls.</p>

      <Section title="History Navigation" testId="section-browser-history">
        <div className="form-actions">
          <Button testId="go-page-a" onClick={() => navigate(historyPageRoute('a'))}>
            Go Page A
          </Button>
          <Button testId="go-page-b" onClick={() => navigate(historyPageRoute('b'))}>
            Go Page B
          </Button>
          <Button testId="go-page-c" onClick={() => navigate(historyPageRoute('c'))}>
            Go Page C
          </Button>
        </div>
        <div className="form-actions">
          <Button variant="secondary" testId="history-back" onClick={() => navigate(-1)}>
            Back
          </Button>
          <Button variant="secondary" testId="history-forward" onClick={() => navigate(1)}>
            Forward
          </Button>
        </div>
        <p className="status-panel mt-1" data-testid="history-current-url">
          Current URL: {window.location.pathname}
        </p>
      </Section>
    </div>
  )
}
