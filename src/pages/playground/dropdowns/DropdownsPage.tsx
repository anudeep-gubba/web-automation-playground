import { useRef, useState } from 'react'
import { Section } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { COUNTRIES } from '@/constants/testData'

export function DropdownsPage() {
  const [customOpen, setCustomOpen] = useState(false)
  const [customValue, setCustomValue] = useState('Select an option')
  const customRef = useRef<HTMLDivElement>(null)

  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchValue, setSearchValue] = useState('')

  const [multiOpen, setMultiOpen] = useState(false)
  const [multiValues, setMultiValues] = useState<string[]>([])

  const [country, setCountry] = useState('')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')

  const [dynamicOptions, setDynamicOptions] = useState<string[] | null>(null)
  const [dynamicLoading, setDynamicLoading] = useState(false)

  const customOptions = ['Option 1', 'Option 2', 'Option 3']
  const searchableOptions = COUNTRIES.map((c) => c.name)
  const filteredSearchable = searchableOptions.filter((o) => o.toLowerCase().includes(searchQuery.toLowerCase()))

  const states = COUNTRIES.find((c) => c.name === country)?.states ?? []
  const cities = states.find((s) => s.name === state)?.cities ?? []

  function loadDynamicOptions() {
    setDynamicLoading(true)
    setDynamicOptions(null)
    window.setTimeout(() => {
      setDynamicOptions(['Loaded Option A', 'Loaded Option B', 'Loaded Option C'])
      setDynamicLoading(false)
    }, 1200)
  }

  function toggleMultiValue(value: string) {
    setMultiValues((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]))
  }

  return (
    <div data-testid="dropdowns-page">
      <h1 className="page-title">Dropdowns</h1>
      <p className="page-description">Native, custom, searchable, multi-select, cascading, disabled and dynamic dropdowns.</p>

      <Section title="Native Select" testId="section-native-dropdown">
        <select id="dropdown-native" data-testid="dropdown-native" className="field-input" defaultValue="">
          <option value="" disabled>
            Choose…
          </option>
          {customOptions.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </Section>

      <Section title="Custom Dropdown" testId="section-custom-dropdown">
        <div ref={customRef} style={{ position: 'relative', maxWidth: 260 }}>
          <button
            type="button"
            id="dropdown-custom-trigger"
            data-testid="dropdown-custom-trigger"
            className="field-input"
            aria-haspopup="listbox"
            aria-expanded={customOpen}
            onClick={() => setCustomOpen((v) => !v)}
            style={{ width: '100%', textAlign: 'left' }}
          >
            {customValue}
          </button>
          {customOpen ? (
            <ul id="dropdown-custom-list" data-testid="dropdown-custom-list" role="listbox" className="hover-menu" style={{ display: 'block', position: 'absolute', width: '100%' }}>
              {customOptions.map((o) => (
                <li
                  key={o}
                  role="option"
                  aria-selected={customValue === o}
                  data-testid={`dropdown-custom-option-${o.replace(/\s/g, '-').toLowerCase()}`}
                  onClick={() => {
                    setCustomValue(o)
                    setCustomOpen(false)
                  }}
                >
                  {o}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </Section>

      <Section title="Searchable Dropdown" testId="section-searchable-dropdown">
        <div style={{ position: 'relative', maxWidth: 260 }}>
          <input
            id="dropdown-searchable-input"
            data-testid="dropdown-searchable-input"
            className="field-input"
            placeholder={searchValue || 'Search country…'}
            value={searchQuery}
            onFocus={() => setSearchOpen(true)}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setSearchOpen(true)
            }}
          />
          {searchOpen ? (
            <ul id="dropdown-searchable-list" data-testid="dropdown-searchable-list" role="listbox" className="hover-menu" style={{ display: 'block', position: 'absolute', width: '100%' }}>
              {filteredSearchable.length === 0 ? (
                <li data-testid="dropdown-searchable-empty">No matches</li>
              ) : (
                filteredSearchable.map((o) => (
                  <li
                    key={o}
                    role="option"
                    data-testid={`dropdown-searchable-option-${o.replace(/\s/g, '-').toLowerCase()}`}
                    onClick={() => {
                      setSearchValue(o)
                      setSearchQuery('')
                      setSearchOpen(false)
                    }}
                  >
                    {o}
                  </li>
                ))
              )}
            </ul>
          ) : null}
        </div>
      </Section>

      <Section title="Multi-select Dropdown" testId="section-multiselect-dropdown">
        <div style={{ position: 'relative', maxWidth: 300 }}>
          <button
            type="button"
            id="dropdown-multiselect-trigger"
            data-testid="dropdown-multiselect-trigger"
            className="field-input"
            aria-haspopup="listbox"
            aria-expanded={multiOpen}
            onClick={() => setMultiOpen((v) => !v)}
            style={{ width: '100%', textAlign: 'left' }}
          >
            {multiValues.length ? multiValues.join(', ') : 'Select options…'}
          </button>
          {multiOpen ? (
            <ul id="dropdown-multiselect-list" data-testid="dropdown-multiselect-list" role="listbox" className="hover-menu" style={{ display: 'block', position: 'absolute', width: '100%' }}>
              {customOptions.map((o) => (
                <li key={o} data-testid={`dropdown-multiselect-option-${o.replace(/\s/g, '-').toLowerCase()}`}>
                  <label className="checkbox-label">
                    <input type="checkbox" checked={multiValues.includes(o)} onChange={() => toggleMultiValue(o)} />
                    <span>{o}</span>
                  </label>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </Section>

      <Section title="Cascading Dropdown" testId="section-cascading-dropdown">
        <div className="form-grid">
          <div className="field">
            <label className="field-label" htmlFor="dropdown-country">
              Country
            </label>
            <select
              id="dropdown-country"
              data-testid="dropdown-country"
              className="field-input"
              value={country}
              onChange={(e) => {
                setCountry(e.target.value)
                setState('')
                setCity('')
              }}
            >
              <option value="">Select country</option>
              {COUNTRIES.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label className="field-label" htmlFor="dropdown-state">
              State
            </label>
            <select
              id="dropdown-state"
              data-testid="dropdown-state"
              className="field-input"
              value={state}
              disabled={states.length === 0}
              onChange={(e) => {
                setState(e.target.value)
                setCity('')
              }}
            >
              <option value="">Select state</option>
              {states.map((s) => (
                <option key={s.name} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label className="field-label" htmlFor="dropdown-city">
              City
            </label>
            <select id="dropdown-city" data-testid="dropdown-city" className="field-input" value={city} disabled={cities.length === 0} onChange={(e) => setCity(e.target.value)}>
              <option value="">Select city</option>
              {cities.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Section>

      <Section title="Disabled Dropdown" testId="section-disabled-dropdown">
        <select id="dropdown-disabled" data-testid="dropdown-disabled" className="field-input" disabled>
          <option>Unavailable</option>
        </select>
      </Section>

      <Section title="Dynamic Dropdown" testId="section-dynamic-dropdown">
        <Button size="sm" testId="dropdown-dynamic-load" onClick={loadDynamicOptions} loading={dynamicLoading}>
          Load Options
        </Button>
        <select id="dropdown-dynamic" data-testid="dropdown-dynamic" className="field-input mt-1" disabled={!dynamicOptions}>
          {dynamicOptions ? dynamicOptions.map((o) => <option key={o}>{o}</option>) : <option>No options loaded yet</option>}
        </select>
      </Section>
    </div>
  )
}
