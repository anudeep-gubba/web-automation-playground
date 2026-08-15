import { Fragment, useMemo, useState } from 'react'
import { Section } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { TABLE_ROWS } from '@/constants/testData'
import type { TableRow } from '@/types'

type SortKey = keyof Pick<TableRow, 'id' | 'name' | 'email' | 'role' | 'status' | 'date' | 'amount'>
type SortDir = 'asc' | 'desc'

const PAGE_SIZE = 10
const ALL_COLUMNS: { key: SortKey; label: string }[] = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status' },
  { key: 'date', label: 'Date' },
  { key: 'amount', label: 'Amount' },
]

export function TablesPage() {
  const [rows, setRows] = useState<TableRow[]>(TABLE_ROWS)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')
  const [sortKey, setSortKey] = useState<SortKey | null>(null)
  const [sortDir, setSortDir] = useState<SortDir>('asc')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState<Set<number>>(new Set())
  const [expandedRow, setExpandedRow] = useState<number | null>(null)
  const [editingRow, setEditingRow] = useState<number | null>(null)
  const [editValue, setEditValue] = useState('')
  const [visibleColumns, setVisibleColumns] = useState<Set<SortKey>>(new Set(ALL_COLUMNS.map((c) => c.key)))

  const filtered = useMemo(() => {
    let result = rows
    if (search) {
      const q = search.toLowerCase()
      result = result.filter((r) => r.name.toLowerCase().includes(q) || r.email.toLowerCase().includes(q))
    }
    if (statusFilter) result = result.filter((r) => r.status === statusFilter)
    if (sortKey) {
      result = [...result].sort((a, b) => {
        const av = a[sortKey]
        const bv = b[sortKey]
        const cmp = typeof av === 'number' && typeof bv === 'number' ? av - bv : String(av).localeCompare(String(bv))
        return sortDir === 'asc' ? cmp : -cmp
      })
    }
    return result
  }, [rows, search, statusFilter, sortKey, sortDir])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const pageRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const allOnPageSelected = pageRows.length > 0 && pageRows.every((r) => selected.has(r.id))

  function toggleSort(key: SortKey) {
    if (sortKey !== key) {
      setSortKey(key)
      setSortDir('asc')
    } else {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    }
  }

  function toggleRowSelected(id: number) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function toggleSelectAllOnPage() {
    setSelected((prev) => {
      const next = new Set(prev)
      if (allOnPageSelected) pageRows.forEach((r) => next.delete(r.id))
      else pageRows.forEach((r) => next.add(r.id))
      return next
    })
  }

  function deleteRow(id: number) {
    setRows((prev) => prev.filter((r) => r.id !== id))
  }

  function addRow() {
    const nextId = Math.max(0, ...rows.map((r) => r.id)) + 1
    setRows((prev) => [
      { id: nextId, name: 'New User', email: `new.user${nextId}@example.com`, role: 'Viewer', status: 'Pending', date: new Date().toISOString().slice(0, 10), amount: 0 },
      ...prev,
    ])
  }

  function startEdit(row: TableRow) {
    setEditingRow(row.id)
    setEditValue(row.name)
  }
  function saveEdit(id: number) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, name: editValue } : r)))
    setEditingRow(null)
  }

  function toggleColumn(key: SortKey) {
    setVisibleColumns((prev) => {
      const next = new Set(prev)
      if (next.has(key) && next.size > 1) next.delete(key)
      else next.add(key)
      return next
    })
  }

  return (
    <div data-testid="tables-page">
      <h1 className="page-title">Tables</h1>
      <p className="page-description">A comprehensive data table: sorting, filtering, pagination, selection, inline editing.</p>

      <Section title="Data Table" testId="section-data-table">
        <div className="form-grid mb-0">
          <input
            id="table-search"
            data-testid="table-search"
            className="field-input"
            placeholder="Search name or email…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
          />
          <select
            id="table-status-filter"
            data-testid="table-status-filter"
            className="field-input"
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value)
              setPage(1)
            }}
          >
            <option value="">All statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        <fieldset className="mt-1">
          <legend>Column Visibility</legend>
          {ALL_COLUMNS.map((c) => (
            <label key={c.key} className="checkbox-label" style={{ display: 'inline-flex', marginRight: '1rem' }} htmlFor={`table-column-toggle-${c.key}`}>
              <input
                type="checkbox"
                id={`table-column-toggle-${c.key}`}
                data-testid={`table-column-toggle-${c.key}`}
                checked={visibleColumns.has(c.key)}
                onChange={() => toggleColumn(c.key)}
              />
              <span>{c.label}</span>
            </label>
          ))}
        </fieldset>

        <div className="form-actions mb-0">
          <Button size="sm" testId="table-add-row" onClick={addRow}>
            Add Row
          </Button>
          <span className="status-panel" data-testid="table-selected-count">
            Selected: {selected.size}
          </span>
          <span className="status-panel" data-testid="table-row-count">
            Rows: {filtered.length}
          </span>
        </div>

        <div className="data-table-wrapper mt-1">
          <table className="data-table" id="data-table" data-testid="data-table">
            <thead>
              <tr>
                <th>
                  <input type="checkbox" data-testid="table-select-all" checked={allOnPageSelected} onChange={toggleSelectAllOnPage} aria-label="Select all rows on page" />
                </th>
                {ALL_COLUMNS.filter((c) => visibleColumns.has(c.key)).map((c) => (
                  <th key={c.key} data-testid={`table-header-${c.key}`} onClick={() => toggleSort(c.key)}>
                    {c.label} {sortKey === c.key ? (sortDir === 'asc' ? '▲' : '▼') : ''}
                  </th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageRows.map((row) => (
                <Fragment key={row.id}>
                  <tr data-testid={`table-row-${row.id}`} className={selected.has(row.id) ? 'row-selected' : ''}>
                    <td>
                      <input
                        type="checkbox"
                        data-testid={`table-row-select-${row.id}`}
                        checked={selected.has(row.id)}
                        onChange={() => toggleRowSelected(row.id)}
                        aria-label={`Select row ${row.id}`}
                      />
                    </td>
                    {visibleColumns.has('id') ? <td data-testid={`table-cell-id-${row.id}`}>{row.id}</td> : null}
                    {visibleColumns.has('name') ? (
                      <td data-testid={`table-cell-name-${row.id}`}>
                        {editingRow === row.id ? (
                          <input
                            className="field-input"
                            data-testid={`table-edit-input-${row.id}`}
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                          />
                        ) : (
                          row.name
                        )}
                      </td>
                    ) : null}
                    {visibleColumns.has('email') ? <td data-testid={`table-cell-email-${row.id}`}>{row.email}</td> : null}
                    {visibleColumns.has('role') ? <td data-testid={`table-cell-role-${row.id}`}>{row.role}</td> : null}
                    {visibleColumns.has('status') ? (
                      <td data-testid={`table-cell-status-${row.id}`}>
                        <span className={`badge badge-${row.status.toLowerCase()}`}>{row.status}</span>
                      </td>
                    ) : null}
                    {visibleColumns.has('date') ? <td data-testid={`table-cell-date-${row.id}`}>{row.date}</td> : null}
                    {visibleColumns.has('amount') ? <td data-testid={`table-cell-amount-${row.id}`}>${row.amount}</td> : null}
                    <td style={{ whiteSpace: 'nowrap' }}>
                      <button type="button" className="btn btn-ghost btn-sm" data-testid={`table-expand-${row.id}`} onClick={() => setExpandedRow(expandedRow === row.id ? null : row.id)}>
                        {expandedRow === row.id ? 'Collapse' : 'Expand'}
                      </button>
                      {editingRow === row.id ? (
                        <button type="button" className="btn btn-success btn-sm" data-testid={`table-save-${row.id}`} onClick={() => saveEdit(row.id)}>
                          Save
                        </button>
                      ) : (
                        <button type="button" className="btn btn-secondary btn-sm" data-testid={`table-edit-${row.id}`} onClick={() => startEdit(row)}>
                          Edit
                        </button>
                      )}
                      <button type="button" className="btn btn-danger btn-sm" data-testid={`table-delete-${row.id}`} onClick={() => deleteRow(row.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                  {expandedRow === row.id ? (
                    <tr data-testid={`table-expanded-${row.id}`}>
                      <td colSpan={ALL_COLUMNS.length + 2}>
                        Row detail: {row.name} joined on {row.date} with an amount of ${row.amount}.
                      </td>
                    </tr>
                  ) : null}
                </Fragment>
              ))}
              {pageRows.length === 0 ? (
                <tr>
                  <td colSpan={ALL_COLUMNS.length + 2} data-testid="table-empty-state">
                    No rows match your filters.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>

        <div className="form-actions mt-1">
          <Button size="sm" variant="secondary" testId="table-prev-page" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1}>
            Previous
          </Button>
          <span className="status-panel" data-testid="table-page-indicator">
            Page {page} of {totalPages}
          </span>
          <Button size="sm" variant="secondary" testId="table-next-page" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page >= totalPages}>
            Next
          </Button>
        </div>
      </Section>
    </div>
  )
}
