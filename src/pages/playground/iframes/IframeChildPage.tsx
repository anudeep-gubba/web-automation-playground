import { useState } from 'react'

// Rendered bare (no app chrome) inside an <iframe>. Kept intentionally
// dependency-free so it loads fast and its DOM stays predictable.
export function IframeChildPage() {
  const [checked, setChecked] = useState(false)
  const [text, setText] = useState('')
  const [option, setOption] = useState('one')

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: '1rem' }} data-testid="iframe-child-root">
      <h2 data-testid="iframe-child-heading">Same-Origin Iframe Content</h2>
      <div className="field">
        <label htmlFor="iframe-input">Iframe Input</label>
        <br />
        <input id="iframe-input" data-testid="iframe-input" value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      <button id="iframe-button" data-testid="iframe-button" onClick={() => setText('Button clicked')} type="button">
        Iframe Button
      </button>
      <div>
        <label htmlFor="iframe-checkbox">
          <input id="iframe-checkbox" data-testid="iframe-checkbox" type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
          Iframe Checkbox
        </label>
      </div>
      <div>
        <label htmlFor="iframe-dropdown">Iframe Dropdown</label>
        <br />
        <select id="iframe-dropdown" data-testid="iframe-dropdown" value={option} onChange={(e) => setOption(e.target.value)}>
          <option value="one">One</option>
          <option value="two">Two</option>
          <option value="three">Three</option>
        </select>
      </div>
      <p data-testid="iframe-status">Text: {text || '(empty)'} · Checked: {String(checked)} · Option: {option}</p>
    </div>
  )
}
