import { useState } from 'react'
import { Section } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Alert } from '@/components/ui/Alert'

interface ScenarioResult {
  status: number | string
  body: string
  durationMs: number
}

const SCENARIOS: { key: string; label: string; path: string; testId: string }[] = [
  { key: 'success', label: 'Success (200)', path: '/api/network/success', testId: 'network-success' },
  { key: '400', label: '400 Bad Request', path: '/api/network/400', testId: 'network-400' },
  { key: '401', label: '401 Unauthorized', path: '/api/network/401', testId: 'network-401' },
  { key: '403', label: '403 Forbidden', path: '/api/network/403', testId: 'network-403' },
  { key: '404', label: '404 Not Found', path: '/api/network/404', testId: 'network-404' },
  { key: '500', label: '500 Server Error', path: '/api/network/500', testId: 'network-500' },
  { key: 'delayed', label: 'Delayed (3s)', path: '/api/network/delayed', testId: 'network-delayed' },
  { key: 'timeout', label: 'Timeout Simulation', path: '/api/network/timeout', testId: 'network-timeout' },
  { key: 'empty', label: 'Empty Response', path: '/api/network/empty', testId: 'network-empty' },
  { key: 'large', label: 'Large Response', path: '/api/network/large', testId: 'network-large' },
]

export function NetworkPage() {
  const [results, setResults] = useState<Record<string, ScenarioResult>>({})
  const [loading, setLoading] = useState<string | null>(null)
  const [backendError, setBackendError] = useState(false)

  async function runScenario(key: string, path: string) {
    setLoading(key)
    setBackendError(false)
    const start = performance.now()
    const controller = new AbortController()
    const timeoutId = window.setTimeout(() => controller.abort(), key === 'timeout' ? 3000 : 8000)
    try {
      const response = await fetch(path, { signal: controller.signal })
      const text = await response.text()
      setResults((prev) => ({
        ...prev,
        [key]: { status: response.status, body: text.length > 300 ? `${text.slice(0, 300)}… (${text.length} chars)` : text || '(empty body)', durationMs: Math.round(performance.now() - start) },
      }))
    } catch (err) {
      const isAbort = err instanceof DOMException && err.name === 'AbortError'
      setResults((prev) => ({
        ...prev,
        [key]: { status: isAbort ? 'TIMEOUT' : 'NETWORK ERROR', body: isAbort ? 'Request aborted after timeout.' : String(err), durationMs: Math.round(performance.now() - start) },
      }))
      if (!isAbort) setBackendError(true)
    } finally {
      window.clearTimeout(timeoutId)
      setLoading(null)
    }
  }

  return (
    <div data-testid="network-page">
      <h1 className="page-title">Network</h1>
      <p className="page-description">
        Real HTTP requests against a small local backend (<code>npm run server</code>) — status codes, delays, timeouts and
        payload sizes are all deterministic and fully local.
      </p>

      {backendError ? (
        <Alert variant="warning" testId="network-backend-warning">
          Could not reach the local backend. Run <code>npm run server</code> in a separate terminal, then retry.
        </Alert>
      ) : null}

      <Section title="Simulated Responses" testId="section-network">
        <div className="data-table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Scenario</th>
                <th>Status</th>
                <th>Duration</th>
                <th>Body</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {SCENARIOS.map((s) => {
                const result = results[s.key]
                return (
                  <tr key={s.key} data-testid={`network-row-${s.key}`}>
                    <td>{s.label}</td>
                    <td data-testid={`${s.testId}-status`}>{result?.status ?? '—'}</td>
                    <td data-testid={`${s.testId}-duration`}>{result ? `${result.durationMs}ms` : '—'}</td>
                    <td data-testid={`${s.testId}-body`} style={{ maxWidth: 320, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {result?.body ?? '—'}
                    </td>
                    <td>
                      <Button size="sm" testId={s.testId} loading={loading === s.key} onClick={() => runScenario(s.key, s.path)}>
                        Run
                      </Button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  )
}
