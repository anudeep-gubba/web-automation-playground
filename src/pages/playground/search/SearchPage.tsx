import { useMemo, useRef, useState, type KeyboardEvent } from 'react'
import { Section } from '@/components/ui/Card'
import { SEARCH_CATALOG } from '@/constants/testData'

export function SearchPage() {
  const [query, setQuery] = useState('')
  const [committedQuery, setCommittedQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState('')
  const [sortAsc, setSortAsc] = useState(true)
  const [activeSuggestion, setActiveSuggestion] = useState(-1)
  const [suggestionsOpen, setSuggestionsOpen] = useState(false)
  const timeoutRef = useRef<number | undefined>(undefined)

  const suggestions = useMemo(() => {
    if (!query) return []
    return SEARCH_CATALOG.filter((item) => item.title.toLowerCase().includes(query.toLowerCase())).slice(0, 6)
  }, [query])

  const results = useMemo(() => {
    let items = SEARCH_CATALOG.filter((item) => item.title.toLowerCase().includes(committedQuery.toLowerCase()))
    if (category) items = items.filter((item) => item.category === category)
    items = [...items].sort((a, b) => (sortAsc ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)))
    return items
  }, [committedQuery, category, sortAsc])

  function runSearch(value: string) {
    setLoading(true)
    setSuggestionsOpen(false)
    window.clearTimeout(timeoutRef.current)
    timeoutRef.current = window.setTimeout(() => {
      setCommittedQuery(value)
      setLoading(false)
    }, 500)
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveSuggestion((i) => Math.min(i + 1, suggestions.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveSuggestion((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      if (activeSuggestion >= 0 && suggestions[activeSuggestion]) {
        setQuery(suggestions[activeSuggestion].title)
        runSearch(suggestions[activeSuggestion].title)
      } else {
        runSearch(query)
      }
    } else if (e.key === 'Escape') {
      setSuggestionsOpen(false)
    }
  }

  return (
    <div data-testid="search-page">
      <h1 className="page-title">Search</h1>
      <p className="page-description">Type-ahead suggestions, keyboard navigation, loading state, filtering and sorting.</p>

      <Section title="Search Box" testId="section-search-box">
        <div style={{ position: 'relative', maxWidth: 360 }}>
          <input
            id="search-input"
            data-testid="search-input"
            className="field-input"
            placeholder="Search products, books…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSuggestionsOpen(true)
              setActiveSuggestion(-1)
            }}
            onKeyDown={handleKeyDown}
            role="combobox"
            aria-expanded={suggestionsOpen && suggestions.length > 0}
            aria-controls="search-suggestions"
          />
          {suggestionsOpen && suggestions.length > 0 ? (
            <ul id="search-suggestions" data-testid="search-suggestions" role="listbox" className="hover-menu" style={{ display: 'block', position: 'absolute', width: '100%' }}>
              {suggestions.map((s, i) => (
                <li
                  key={s.id}
                  role="option"
                  aria-selected={i === activeSuggestion}
                  data-testid={`search-suggestion-${s.id}`}
                  style={i === activeSuggestion ? { background: 'var(--color-surface-alt)' } : undefined}
                  onClick={() => {
                    setQuery(s.title)
                    runSearch(s.title)
                  }}
                >
                  {s.title}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="form-actions mt-1">
          <button type="button" className="btn btn-primary btn-sm" data-testid="search-submit" onClick={() => runSearch(query)}>
            Search
          </button>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            data-testid="search-clear"
            onClick={() => {
              setQuery('')
              setCommittedQuery('')
              setSuggestionsOpen(false)
            }}
          >
            Clear
          </button>
        </div>
      </Section>

      <Section title="Filters" testId="section-search-filters">
        <div className="form-grid">
          <select id="search-category-filter" data-testid="search-category-filter" className="field-input" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">All categories</option>
            {[...new Set(SEARCH_CATALOG.map((c) => c.category))].map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <button type="button" className="btn btn-secondary" data-testid="search-sort-toggle" onClick={() => setSortAsc((v) => !v)}>
            Sort {sortAsc ? 'A → Z' : 'Z → A'}
          </button>
        </div>
      </Section>

      <Section title="Results" testId="section-search-results">
        {loading ? (
          <p data-testid="search-loading" className="text-muted">
            Searching…
          </p>
        ) : results.length === 0 ? (
          <p data-testid="search-no-results" className="text-muted">
            No results found.
          </p>
        ) : (
          <ul id="search-results" data-testid="search-results">
            {results.map((r) => (
              <li key={r.id} data-testid={`search-result-${r.id}`}>
                {r.title} — <span className="text-muted">{r.category}</span>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </div>
  )
}
