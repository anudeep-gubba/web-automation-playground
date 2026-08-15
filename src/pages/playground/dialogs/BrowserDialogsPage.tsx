import { useState } from 'react'
import { Section } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

export function BrowserDialogsPage() {
  const [result, setResult] = useState('NONE')

  return (
    <div data-testid="browser-dialogs-page">
      <h1 className="page-title">Browser Dialogs</h1>
      <p className="page-description">Native window.alert / confirm / prompt dialogs, where the browser security model permits automation.</p>

      <Section title="Native Dialogs" testId="section-browser-dialogs">
        <div className="form-actions">
          <Button
            testId="browser-alert-button"
            onClick={() => {
              window.alert('This is a native alert.')
              setResult('ALERT ACKNOWLEDGED')
            }}
          >
            Alert
          </Button>
          <Button
            testId="browser-confirm-button"
            onClick={() => {
              const ok = window.confirm('Do you confirm this action?')
              setResult(ok ? 'CONFIRM: OK' : 'CONFIRM: CANCEL')
            }}
          >
            Confirm
          </Button>
          <Button
            testId="browser-prompt-button"
            onClick={() => {
              const value = window.prompt('Enter your name:')
              setResult(value === null ? 'PROMPT: CANCELLED' : `PROMPT: ${value}`)
            }}
          >
            Prompt
          </Button>
        </div>
        <p className="status-panel mt-1" data-testid="browser-dialog-result">
          Result: {result}
        </p>
      </Section>
    </div>
  )
}
