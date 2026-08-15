import { useState } from 'react'
import { Section } from '@/components/ui/Card'
import { SKILLS } from '@/constants/testData'

export function BasicActionsPage() {
  const [clickCount, setClickCount] = useState(0)
  const [lastAction, setLastAction] = useState('NONE')
  const [checked, setChecked] = useState(false)
  const [radioValue, setRadioValue] = useState('option-2')
  const [switchOn, setSwitchOn] = useState(false)
  const [textValue, setTextValue] = useState('')
  const [selectValue, setSelectValue] = useState('')
  const [multiValue, setMultiValue] = useState<string[]>([])

  return (
    <div data-testid="basic-actions-page">
      <h1 className="page-title">Basic Elements</h1>
      <p className="page-description">Every common HTML control with a stable, deterministic identifier.</p>

      <Section title="Buttons & Links" testId="section-buttons-links">
        <div className="form-actions">
          <button
            id="basic-button"
            data-testid="basic-button"
            className="btn btn-primary"
            onClick={() => {
              setClickCount((c) => c + 1)
              setLastAction('CLICK')
            }}
            onDoubleClick={() => setLastAction('DOUBLE CLICK')}
          >
            Click Me
          </button>
          <button
            id="basic-button-disabled"
            data-testid="basic-button-disabled"
            className="btn btn-secondary"
            disabled
          >
            Disabled Button
          </button>
          <a id="basic-link" data-testid="basic-link" href="#basic-link-target">
            Basic Link
          </a>
        </div>
        <p className="status-panel mt-1" data-testid="basic-button-status">
          Clicks: {clickCount} · Last Action: {lastAction}
        </p>
        <p id="basic-link-target">Link target anchor.</p>
      </Section>

      <Section title="Text & Media" testId="section-text-media">
        <h2 id="basic-heading" data-testid="basic-heading">
          Basic Heading
        </h2>
        <p id="basic-paragraph" data-testid="basic-paragraph">
          This is a basic paragraph of text used for read-text automation scenarios.
        </p>
        <span id="basic-text" data-testid="basic-text">
          Plain inline text element.
        </span>
        <img id="basic-image" data-testid="basic-image" src="/images/sample.svg" alt="Sample automation icon" width={64} height={64} />
        <span id="basic-icon" data-testid="basic-icon" role="img" aria-label="star icon" style={{ fontSize: '1.5rem' }}>
          ★
        </span>
      </Section>

      <Section title="Selection Controls" testId="section-selection-controls">
        <div className="field checkbox-field">
          <label className="checkbox-label" htmlFor="basic-checkbox">
            <input
              id="basic-checkbox"
              data-testid="basic-checkbox"
              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            />
            <span>Basic Checkbox (checked: {String(checked)})</span>
          </label>
        </div>

        <fieldset>
          <legend>Radio Group</legend>
          {['option-1', 'option-2', 'option-3'].map((opt) => (
            <label key={opt} className="checkbox-label" htmlFor={`basic-radio-${opt}`} style={{ display: 'block' }}>
              <input
                id={`basic-radio-${opt}`}
                data-testid={`basic-radio-${opt}`}
                type="radio"
                name="basic-radio"
                value={opt}
                checked={radioValue === opt}
                onChange={(e) => setRadioValue(e.target.value)}
              />
              <span>{opt}</span>
            </label>
          ))}
        </fieldset>

        <label className="checkbox-label" htmlFor="basic-switch">
          <input
            id="basic-switch"
            data-testid="basic-switch"
            type="checkbox"
            role="switch"
            aria-checked={switchOn}
            checked={switchOn}
            onChange={(e) => setSwitchOn(e.target.checked)}
          />
          <span>Switch (on: {String(switchOn)})</span>
        </label>
      </Section>

      <Section title="Text-Based Inputs" testId="section-text-inputs">
        <div className="form-grid">
          <div className="field">
            <label className="field-label" htmlFor="basic-input-text">
              Text Input
            </label>
            <input
              id="basic-input-text"
              data-testid="basic-input-text"
              className="field-input"
              type="text"
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
            />
          </div>
          <div className="field">
            <label className="field-label" htmlFor="basic-input-password">
              Password Input
            </label>
            <input id="basic-input-password" data-testid="basic-input-password" className="field-input" type="password" />
          </div>
          <div className="field">
            <label className="field-label" htmlFor="basic-input-number">
              Number Input
            </label>
            <input id="basic-input-number" data-testid="basic-input-number" className="field-input" type="number" />
          </div>
          <div className="field">
            <label className="field-label" htmlFor="basic-input-email">
              Email Input
            </label>
            <input id="basic-input-email" data-testid="basic-input-email" className="field-input" type="email" />
          </div>
          <div className="field">
            <label className="field-label" htmlFor="basic-input-tel">
              Telephone Input
            </label>
            <input id="basic-input-tel" data-testid="basic-input-tel" className="field-input" type="tel" />
          </div>
          <div className="field">
            <label className="field-label" htmlFor="basic-input-url">
              URL Input
            </label>
            <input id="basic-input-url" data-testid="basic-input-url" className="field-input" type="url" />
          </div>
          <div className="field">
            <label className="field-label" htmlFor="basic-input-search">
              Search Input
            </label>
            <input id="basic-input-search" data-testid="basic-input-search" className="field-input" type="search" />
          </div>
          <div className="field">
            <label className="field-label" htmlFor="basic-input-date">
              Date Input
            </label>
            <input id="basic-input-date" data-testid="basic-input-date" className="field-input" type="date" />
          </div>
          <div className="field">
            <label className="field-label" htmlFor="basic-input-time">
              Time Input
            </label>
            <input id="basic-input-time" data-testid="basic-input-time" className="field-input" type="time" />
          </div>
          <div className="field">
            <label className="field-label" htmlFor="basic-input-datetime">
              DateTime Input
            </label>
            <input id="basic-input-datetime" data-testid="basic-input-datetime" className="field-input" type="datetime-local" />
          </div>
          <div className="field">
            <label className="field-label" htmlFor="basic-input-color">
              Color Input
            </label>
            <input id="basic-input-color" data-testid="basic-input-color" className="field-input" type="color" defaultValue="#2563eb" />
          </div>
          <div className="field">
            <label className="field-label" htmlFor="basic-input-range">
              Range Input
            </label>
            <input id="basic-input-range" data-testid="basic-input-range" type="range" min={0} max={100} defaultValue={50} />
          </div>
          <div className="field">
            <label className="field-label" htmlFor="basic-input-file">
              File Input
            </label>
            <input id="basic-input-file" data-testid="basic-input-file" type="file" />
          </div>
        </div>

        <div className="field">
          <label className="field-label" htmlFor="basic-textarea">
            Textarea
          </label>
          <textarea id="basic-textarea" data-testid="basic-textarea" className="field-input" rows={4} />
        </div>
      </Section>

      <Section title="Select Controls" testId="section-select-controls">
        <div className="field">
          <label className="field-label" htmlFor="basic-select">
            Select
          </label>
          <select id="basic-select" data-testid="basic-select" className="field-input" value={selectValue} onChange={(e) => setSelectValue(e.target.value)}>
            <option value="">Choose…</option>
            {SKILLS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label className="field-label" htmlFor="basic-multi-select">
            Multi-select
          </label>
          <select
            id="basic-multi-select"
            data-testid="basic-multi-select"
            className="field-input"
            multiple
            size={4}
            value={multiValue}
            onChange={(e) => setMultiValue(Array.from(e.target.selectedOptions, (o) => o.value))}
          >
            {SKILLS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </Section>

      <Section title="Indicators" testId="section-indicators">
        <label className="field-label" htmlFor="basic-progress">
          Progress Bar
        </label>
        <progress id="basic-progress" data-testid="basic-progress" value={65} max={100} />
        <div className="mt-1">
          <label className="field-label" htmlFor="basic-meter">
            Meter
          </label>
          <meter id="basic-meter" data-testid="basic-meter" min={0} max={100} value={72} low={30} high={80} optimum={90} />
        </div>
      </Section>

      <Section title="Disclosure & Semantic HTML" testId="section-semantic">
        <details id="basic-details" data-testid="basic-details">
          <summary data-testid="basic-summary">Click to expand</summary>
          <p>Hidden content revealed via the native details/summary element.</p>
        </details>

        <article id="basic-article" data-testid="basic-article" className="mt-2">
          <header data-testid="basic-header">Article Header</header>
          <p>Semantic article content.</p>
          <footer data-testid="basic-footer">Article Footer</footer>
        </article>
      </Section>
    </div>
  )
}
