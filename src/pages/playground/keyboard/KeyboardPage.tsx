import { useState, type KeyboardEvent } from 'react'
import { Section } from '@/components/ui/Card'

function describeKey(e: KeyboardEvent): string {
  const parts: string[] = []
  if (e.ctrlKey) parts.push('CTRL')
  if (e.metaKey) parts.push('CMD')
  if (e.shiftKey) parts.push('SHIFT')
  if (e.altKey) parts.push('ALT')
  const key = e.key.length === 1 ? e.key.toUpperCase() : e.key.toUpperCase()
  parts.push(key)
  return parts.join(' + ')
}

export function KeyboardPage() {
  const [lastKey, setLastKey] = useState('NONE')
  const [lastCombo, setLastCombo] = useState('NONE')
  const [history, setHistory] = useState<string[]>([])

  function handleKeyDown(e: KeyboardEvent<HTMLElement>) {
    setLastKey(e.key.toUpperCase())
    const combo = describeKey(e)
    setLastCombo(combo)
    setHistory((prev) => [combo, ...prev].slice(0, 10))
    if (e.key === ' ') {
      // avoid page scroll on Space inside the shortcut area
    }
  }

  return (
    <div data-testid="keyboard-page">
      <h1 className="page-title">Keyboard Actions</h1>
      <p className="page-description">Type, navigate and use shortcuts to see live key event capture.</p>

      <Section title="Text Fields" testId="section-text-fields">
        <div className="form-grid">
          <div className="field">
            <label className="field-label" htmlFor="keyboard-text-field">
              Text Field
            </label>
            <input id="keyboard-text-field" data-testid="keyboard-text-field" className="field-input" onKeyDown={handleKeyDown} />
          </div>
          <div className="field">
            <label className="field-label" htmlFor="keyboard-search-field">
              Search Field
            </label>
            <input id="keyboard-search-field" data-testid="keyboard-search-field" type="search" className="field-input" onKeyDown={handleKeyDown} />
          </div>
        </div>
      </Section>

      <Section title="Shortcut Area" testId="section-shortcut-area">
        <div
          id="keyboard-shortcut-area"
          data-testid="keyboard-shortcut-area"
          className="status-panel"
          style={{ height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          Focus here and press any key or shortcut
        </div>
      </Section>

      <Section title="Key Event Display" testId="section-key-display">
        <p className="status-panel" data-testid="keyboard-last-key">
          Last Key: {lastKey}
        </p>
        <p className="status-panel mt-1" data-testid="keyboard-last-combo">
          Last Combination: {lastCombo}
        </p>
        <ul data-testid="keyboard-history" className="mt-1">
          {history.map((combo, i) => (
            <li key={i} data-testid={`keyboard-history-item-${i}`}>
              {combo}
            </li>
          ))}
        </ul>
      </Section>
    </div>
  )
}
