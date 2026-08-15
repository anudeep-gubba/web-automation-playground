import { useState } from 'react'
import { Section } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { TextField } from '@/components/ui/TextField'
import { cookieStore } from '@/services/storageService'

export function CookiesPage() {
  const [name, setName] = useState('')
  const [value, setValue] = useState('')
  const [days, setDays] = useState('')
  const [cookies, setCookies] = useState(() => cookieStore.getAll())

  function refresh() {
    setCookies(cookieStore.getAll())
  }

  function handleSet() {
    if (!name) return
    cookieStore.set(name, value, days ? { days: Number(days) } : {})
    refresh()
  }

  function handleDelete(cookieName: string) {
    cookieStore.remove(cookieName)
    refresh()
  }

  function handleClearAll() {
    cookieStore.clear()
    refresh()
  }

  return (
    <div data-testid="cookies-page">
      <h1 className="page-title">Cookies</h1>
      <p className="page-description">Create, read, update and delete cookies for this origin, including session and expiring cookies.</p>

      <Section title="Cookie Manager" testId="section-cookies">
        <div className="form-grid">
          <TextField label="Cookie Name" value={name} onChange={(e) => setName(e.target.value)} id="cookie-name" testId="cookie-name" />
          <TextField label="Cookie Value" value={value} onChange={(e) => setValue(e.target.value)} id="cookie-value" testId="cookie-value" />
          <TextField
            label="Expiration (days, blank = session)"
            type="number"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            id="cookie-expiration"
            testId="cookie-expiration"
          />
        </div>
        <div className="form-actions">
          <Button testId="cookie-set-button" onClick={handleSet}>
            Set Cookie
          </Button>
          <Button variant="secondary" testId="cookie-read-button" onClick={refresh}>
            Read Cookies
          </Button>
          <Button variant="danger" testId="cookie-clear-button" onClick={handleClearAll}>
            Clear Cookies
          </Button>
        </div>

        <div className="data-table-wrapper mt-2">
          <table className="data-table" id="cookie-table" data-testid="cookie-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Value</th>
                <th>Path</th>
                <th>Domain</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cookies.length === 0 ? (
                <tr>
                  <td colSpan={5} data-testid="cookie-table-empty">
                    No cookies set.
                  </td>
                </tr>
              ) : (
                cookies.map((c) => (
                  <tr key={c.name} data-testid={`cookie-row-${c.name}`}>
                    <td data-testid={`cookie-cell-name-${c.name}`}>{c.name}</td>
                    <td data-testid={`cookie-cell-value-${c.name}`}>{c.value}</td>
                    <td>/</td>
                    <td>{window.location.hostname}</td>
                    <td>
                      <Button size="sm" variant="danger" testId={`cookie-delete-${c.name}`} onClick={() => handleDelete(c.name)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  )
}
