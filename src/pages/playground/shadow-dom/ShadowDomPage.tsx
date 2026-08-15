import { useEffect, useRef, useState } from 'react'
import { Section } from '@/components/ui/Card'
import { registerAutomationElements } from '@/webcomponents/registerAutomationElements'

registerAutomationElements()

export function ShadowDomPage() {
  const [inputValue, setInputValue] = useState('')
  const [clickCount, setClickCount] = useState(0)
  const [dropdownValue, setDropdownValue] = useState('')
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    function onValueChange(e: Event) {
      const detail = (e as CustomEvent<string>).detail
      const target = e.target as HTMLElement
      if (target.tagName.toLowerCase() === 'automation-input') setInputValue(detail)
      if (target.tagName.toLowerCase() === 'automation-dropdown') setDropdownValue(detail)
    }
    function onClick(e: Event) {
      setClickCount((e as CustomEvent<number>).detail)
    }

    root.addEventListener('value-change', onValueChange)
    root.addEventListener('automation-click', onClick)
    return () => {
      root.removeEventListener('value-change', onValueChange)
      root.removeEventListener('automation-click', onClick)
    }
  }, [])

  return (
    <div data-testid="shadow-dom-page" ref={rootRef}>
      <h1 className="page-title">Shadow DOM</h1>
      <p className="page-description">Real, open-mode Shadow DOM custom elements — not simulated markup. Requires shadow-piercing selectors to automate.</p>

      <Section title="Shadow DOM Controls" testId="section-shadow-controls">
        <div id="shadow-host" data-testid="shadow-host" className="grid-2">
          <div>
            <automation-input label="Shadow Input" data-testid="automation-input-host"></automation-input>
          </div>
          <div>
            <label className="field-label">Shadow Button</label>
            <br />
            <automation-button label="Click Me" data-testid="automation-button-host"></automation-button>
          </div>
          <div>
            <label className="field-label">Shadow Dropdown</label>
            <automation-dropdown data-testid="automation-dropdown-host"></automation-dropdown>
          </div>
        </div>
        <p className="status-panel mt-2" data-testid="shadow-dom-status">
          Input: {inputValue || '(empty)'} · Clicks: {clickCount} · Dropdown: {dropdownValue || '(none)'}
        </p>
      </Section>

      <Section title="Nested Shadow DOM" testId="section-nested-shadow">
        <automation-nested-host data-testid="automation-nested-host"></automation-nested-host>
      </Section>
    </div>
  )
}
