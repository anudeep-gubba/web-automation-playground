import { useMemo, useState, type UIEvent } from 'react'
import { Section } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { DUPLICATE_TEXT_LIST_ITEMS, LARGE_LIST_ITEMS, NESTED_LIST, SIMPLE_LIST_ITEMS } from '@/constants/testData'

const ROW_HEIGHT = 32
const VIEWPORT_HEIGHT = 240
const VISIBLE_ROWS = Math.ceil(VIEWPORT_HEIGHT / ROW_HEIGHT) + 4

export function ListsPage() {
  const [selected, setSelected] = useState<number | null>(null)
  const [search, setSearch] = useState('')
  const [dynamicItems, setDynamicItems] = useState(['Task 1', 'Task 2', 'Task 3'])
  const [expanded, setExpanded] = useState<Record<number, boolean>>({})
  const [infiniteCount, setInfiniteCount] = useState(30)
  const [scrollTop, setScrollTop] = useState(0)

  const filtered = useMemo(
    () => SIMPLE_LIST_ITEMS.filter((i) => i.label.toLowerCase().includes(search.toLowerCase())),
    [search],
  )

  function toggleExpand(id: number) {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  function handleInfiniteScroll(e: UIEvent<HTMLDivElement>) {
    const el = e.currentTarget
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 30) {
      setInfiniteCount((n) => Math.min(n + 20, 300))
    }
  }

  const startIndex = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - 2)
  const endIndex = Math.min(LARGE_LIST_ITEMS.length, startIndex + VISIBLE_ROWS)
  const visibleItems = LARGE_LIST_ITEMS.slice(startIndex, endIndex)

  return (
    <div data-testid="lists-page">
      <h1 className="page-title">Lists</h1>
      <p className="page-description">Ordered, unordered, searchable, dynamic, nested, expandable, virtualized and infinite lists.</p>

      <Section title="Ordered & Unordered Lists" testId="section-basic-lists">
        <div className="grid-2">
          <ol id="ordered-list" data-testid="ordered-list">
            {SIMPLE_LIST_ITEMS.slice(0, 5).map((item) => (
              <li key={item.id} data-testid={`ordered-list-item-${item.id}`}>
                {item.label}
              </li>
            ))}
          </ol>
          <ul id="unordered-list" data-testid="unordered-list">
            {SIMPLE_LIST_ITEMS.slice(0, 5).map((item) => (
              <li key={item.id} data-testid={`unordered-list-item-${item.id}`}>
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section title="Searchable / Selectable List" testId="section-searchable-list">
        <input
          id="list-search-input"
          data-testid="list-search-input"
          className="field-input"
          placeholder="Search fruits…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <ul id="searchable-list" data-testid="searchable-list" className="mt-1" style={{ listStyle: 'none', padding: 0 }}>
          {filtered.length === 0 ? (
            <li data-testid="searchable-list-empty" className="text-muted">
              No results
            </li>
          ) : (
            filtered.map((item) => (
              <li
                key={item.id}
                data-testid={`searchable-list-item-${item.id}`}
                className={`sidebar-link ${selected === item.id ? 'sidebar-link-active' : ''}`}
                style={{ cursor: 'pointer' }}
                onClick={() => setSelected(item.id)}
              >
                {item.label}
              </li>
            ))
          )}
        </ul>
        <p className="status-panel mt-1" data-testid="list-item-count">
          Count: {filtered.length}
        </p>
      </Section>

      <Section title="Dynamic List" testId="section-dynamic-list">
        <div className="form-actions mb-0">
          <Button size="sm" testId="dynamic-list-add" onClick={() => setDynamicItems((prev) => [...prev, `Task ${prev.length + 1}`])}>
            Add Item
          </Button>
          <Button size="sm" variant="danger" testId="dynamic-list-remove" onClick={() => setDynamicItems((prev) => prev.slice(0, -1))} disabled={dynamicItems.length === 0}>
            Remove Last
          </Button>
        </div>
        <ul id="dynamic-list" data-testid="dynamic-list" className="mt-1">
          {dynamicItems.map((label, i) => (
            <li key={i} data-testid={`dynamic-list-item-${i}`}>
              {label}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Nested & Expandable List" testId="section-nested-list">
        <ul id="expandable-list" data-testid="expandable-list" style={{ listStyle: 'none', padding: 0 }}>
          {NESTED_LIST.map((group) => (
            <li key={group.id} data-testid={`expandable-group-${group.id}`}>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                data-testid={`expandable-toggle-${group.id}`}
                aria-expanded={!!expanded[group.id]}
                onClick={() => toggleExpand(group.id)}
              >
                {expanded[group.id] ? '▾' : '▸'} {group.label}
              </button>
              {expanded[group.id] ? (
                <ul data-testid={`expandable-children-${group.id}`} style={{ paddingLeft: '1.5rem' }}>
                  {group.children.map((child) => (
                    <li key={child.id} data-testid={`expandable-child-${child.id}`}>
                      {child.label}
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Duplicate Text List (negative testing)" testId="section-duplicate-list">
        <p className="text-muted">Intentional duplicate labels to test disambiguation strategies (nth-match, index, structural locators).</p>
        <ul id="duplicate-text-list" data-testid="duplicate-text-list">
          {DUPLICATE_TEXT_LIST_ITEMS.map((item) => (
            <li key={item.id} data-testid={`duplicate-text-item-${item.id}`} className="duplicate-text-item">
              {item.label}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Virtualized List (1,000 items)" testId="section-virtualized-list">
        <div
          id="virtualized-list"
          data-testid="virtualized-list"
          style={{ height: VIEWPORT_HEIGHT, overflowY: 'auto', border: '1px solid var(--color-border)', borderRadius: 8, position: 'relative' }}
          onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
        >
          <div style={{ height: LARGE_LIST_ITEMS.length * ROW_HEIGHT, position: 'relative' }}>
            {visibleItems.map((item, i) => (
              <div
                key={item.id}
                data-testid={`virtualized-row-${item.id}`}
                style={{ position: 'absolute', top: (startIndex + i) * ROW_HEIGHT, height: ROW_HEIGHT, left: 0, right: 0, padding: '0 0.75rem', display: 'flex', alignItems: 'center' }}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section title="Infinite List" testId="section-infinite-list">
        <div
          id="infinite-list"
          data-testid="infinite-list"
          onScroll={handleInfiniteScroll}
          style={{ height: 240, overflowY: 'auto', border: '1px solid var(--color-border)', borderRadius: 8, padding: '0.5rem 0.75rem' }}
        >
          {LARGE_LIST_ITEMS.slice(0, infiniteCount).map((item) => (
            <p key={item.id} data-testid={`infinite-list-item-${item.id}`}>
              {item.label}
            </p>
          ))}
          <p className="text-muted" data-testid="infinite-list-loaded-count">
            Loaded: {infiniteCount} / 300
          </p>
        </div>
      </Section>
    </div>
  )
}
