import { useState } from 'react'
import { Section } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { TextField } from '@/components/ui/TextField'

export interface StorageBackend {
  raw: () => Array<[string, string]>
  set: (key: string, value: unknown) => void
  remove: (key: string) => void
  clear: () => void
}

export function StoragePanel({ backend, prefix }: { backend: StorageBackend; prefix: string }) {
  const [key, setKey] = useState('')
  const [value, setValue] = useState('')
  const [entries, setEntries] = useState(() => backend.raw())

  function refresh() {
    setEntries(backend.raw())
  }

  function handleSet() {
    if (!key) return
    backend.set(key, value)
    refresh()
  }

  function handleUpdate(existingKey: string) {
    backend.set(existingKey, value || key)
    refresh()
  }

  function handleDelete(existingKey: string) {
    backend.remove(existingKey)
    refresh()
  }

  function handleClear() {
    backend.clear()
    refresh()
  }

  return (
    <Section title="Storage Manager" testId={`section-${prefix}`}>
      <div className="form-grid">
        <TextField label="Key" value={key} onChange={(e) => setKey(e.target.value)} id={`${prefix}-key`} testId={`${prefix}-key`} />
        <TextField label="Value" value={value} onChange={(e) => setValue(e.target.value)} id={`${prefix}-value`} testId={`${prefix}-value`} />
      </div>
      <div className="form-actions">
        <Button testId={`${prefix}-set`} onClick={handleSet}>
          Set
        </Button>
        <Button variant="secondary" testId={`${prefix}-get`} onClick={refresh}>
          Get
        </Button>
        <Button variant="danger" testId={`${prefix}-clear`} onClick={handleClear}>
          Clear
        </Button>
      </div>

      <div className="data-table-wrapper mt-2">
        <table className="data-table" id={`${prefix}-table`} data-testid={`${prefix}-table`}>
          <thead>
            <tr>
              <th>Key</th>
              <th>Value</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {entries.length === 0 ? (
              <tr>
                <td colSpan={3} data-testid={`${prefix}-empty`}>
                  No entries.
                </td>
              </tr>
            ) : (
              entries.map(([k, v]) => (
                <tr key={k} data-testid={`${prefix}-row-${k}`}>
                  <td data-testid={`${prefix}-cell-key-${k}`}>{k}</td>
                  <td data-testid={`${prefix}-cell-value-${k}`}>{v}</td>
                  <td>
                    <Button size="sm" variant="secondary" testId={`${prefix}-update-${k}`} onClick={() => handleUpdate(k)}>
                      Update
                    </Button>{' '}
                    <Button size="sm" variant="danger" testId={`${prefix}-delete-${k}`} onClick={() => handleDelete(k)}>
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <p className="text-muted mt-1">
        Refresh the page to confirm persistence, or open a new tab to compare local vs. session storage behavior.
      </p>
    </Section>
  )
}
