import { useState } from 'react'
import { Section } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Spinner, SkeletonLine } from '@/components/ui/Spinner'

const DELAY_MS = 3000

export function DynamicElementsPage() {
  const [appeared, setAppeared] = useState(false)
  const [appearing, setAppearing] = useState(false)
  const [visible, setVisible] = useState(true)
  const [disappearing, setDisappearing] = useState(false)
  const [dynamicText, setDynamicText] = useState('WAITING')
  const [elementEnabled, setElementEnabled] = useState(false)
  const [spinnerLoading, setSpinnerLoading] = useState(false)
  const [skeletonLoading, setSkeletonLoading] = useState(false)
  const [apiResult, setApiResult] = useState<string | null>(null)
  const [apiLoading, setApiLoading] = useState(false)

  function triggerAppear() {
    setAppearing(true)
    setAppeared(false)
    window.setTimeout(() => {
      setAppeared(true)
      setAppearing(false)
    }, DELAY_MS)
  }

  function triggerDisappear() {
    setDisappearing(true)
    window.setTimeout(() => {
      setVisible(false)
      setDisappearing(false)
    }, DELAY_MS)
  }

  function triggerTextChange() {
    setDynamicText('WAITING')
    window.setTimeout(() => setDynamicText('READY'), DELAY_MS)
  }

  function triggerEnable() {
    setElementEnabled(false)
    window.setTimeout(() => setElementEnabled(true), DELAY_MS)
  }

  function triggerSpinner() {
    setSpinnerLoading(true)
    window.setTimeout(() => setSpinnerLoading(false), DELAY_MS)
  }

  function triggerSkeleton() {
    setSkeletonLoading(true)
    window.setTimeout(() => setSkeletonLoading(false), DELAY_MS)
  }

  function triggerApiCall() {
    setApiLoading(true)
    setApiResult(null)
    window.setTimeout(() => {
      setApiResult('{"status":"ok","data":[1,2,3]}')
      setApiLoading(false)
    }, DELAY_MS)
  }

  return (
    <div data-testid="dynamic-elements-page">
      <h1 className="page-title">Dynamic Elements</h1>
      <p className="page-description">Every scenario below uses a deterministic {DELAY_MS / 1000}s delay.</p>

      <Section title="Appear / Disappear" testId="section-appear-disappear">
        <Button size="sm" testId="dynamic-appear-trigger" onClick={triggerAppear} loading={appearing}>
          Trigger Appear
        </Button>
        {appeared ? (
          <p id="dynamic-appeared-element" data-testid="dynamic-appeared-element" className="status-panel mt-1">
            I appeared after the delay!
          </p>
        ) : null}

        <div className="mt-2">
          <Button size="sm" testId="dynamic-disappear-trigger" onClick={triggerDisappear} loading={disappearing} disabled={!visible}>
            Trigger Disappear
          </Button>
          {visible ? (
            <p id="dynamic-disappearing-element" data-testid="dynamic-disappearing-element" className="status-panel mt-1">
              I will disappear after the delay.
            </p>
          ) : (
            <p className="text-muted mt-1" data-testid="dynamic-disappeared-notice">
              Element removed.
            </p>
          )}
        </div>
      </Section>

      <Section title="Text & State Change" testId="section-text-state-change">
        <Button size="sm" testId="dynamic-text-trigger" onClick={triggerTextChange}>
          Start
        </Button>
        <p id="dynamic-status-text" data-testid="dynamic-status-text" className="status-panel mt-1">
          Element Status: {dynamicText}
        </p>

        <div className="mt-2">
          <Button size="sm" testId="dynamic-enable-trigger" onClick={triggerEnable}>
            Enable After Delay
          </Button>
          <button id="dynamic-enabled-target" data-testid="dynamic-enabled-target" className="btn btn-primary mt-1" disabled={!elementEnabled}>
            {elementEnabled ? 'Now Enabled' : 'Currently Disabled'}
          </button>
        </div>
      </Section>

      <Section title="Loading Indicators" testId="section-loading-indicators">
        <div className="grid-2">
          <div>
            <Button size="sm" testId="dynamic-spinner-trigger" onClick={triggerSpinner}>
              Show Spinner
            </Button>
            <div className="mt-1" data-testid="dynamic-spinner-container">
              {spinnerLoading ? <Spinner testId="dynamic-spinner" /> : <span data-testid="dynamic-spinner-idle">Idle</span>}
            </div>
          </div>
          <div>
            <Button size="sm" testId="dynamic-skeleton-trigger" onClick={triggerSkeleton}>
              Show Skeleton
            </Button>
            <div className="mt-1" data-testid="dynamic-skeleton-container">
              {skeletonLoading ? (
                <>
                  <SkeletonLine testId="dynamic-skeleton-line-1" />
                  <SkeletonLine testId="dynamic-skeleton-line-2" width="70%" />
                </>
              ) : (
                <span data-testid="dynamic-skeleton-idle">Idle</span>
              )}
            </div>
          </div>
        </div>
      </Section>

      <Section title="Delayed API Response Simulation" testId="section-delayed-api">
        <Button size="sm" testId="dynamic-api-trigger" onClick={triggerApiCall} loading={apiLoading}>
          Fetch Data
        </Button>
        <pre className="code-block mt-1" data-testid="dynamic-api-result">
          {apiLoading ? 'Loading…' : (apiResult ?? 'No data yet.')}
        </pre>
      </Section>
    </div>
  )
}
