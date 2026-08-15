import { useState } from 'react'
import { Section } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/hooks/useToast'
import * as authService from '@/services/authService'
import { COUNTRIES, DOWNLOAD_FILES, ORDERS, PRODUCTS, SEARCH_CATALOG, SIMPLE_LIST_ITEMS, TABLE_ROWS } from '@/constants/testData'

const DATASETS = [
  { key: 'users', label: 'Users', get: () => authService.listUsers() },
  { key: 'products', label: 'Products', get: () => PRODUCTS },
  { key: 'orders', label: 'Orders', get: () => ORDERS },
  { key: 'table-rows', label: 'Table Rows', get: () => TABLE_ROWS },
  { key: 'lists', label: 'List Items', get: () => SIMPLE_LIST_ITEMS },
  { key: 'countries', label: 'Countries', get: () => COUNTRIES },
  { key: 'files', label: 'Downloadable Files', get: () => DOWNLOAD_FILES },
  { key: 'search-results', label: 'Search Catalog', get: () => SEARCH_CATALOG },
]

export function TestDataPage() {
  const [selected, setSelected] = useState(DATASETS[0].key)
  const { showToast } = useToast()

  const dataset = DATASETS.find((d) => d.key === selected)!
  const data = dataset.get()

  function handleReset() {
    authService.resetToSeedData()
    showToast({ variant: 'success', title: 'Test data reset', description: 'Users reset to seed accounts.' })
  }

  return (
    <div data-testid="test-data-page">
      <h1 className="page-title">Test Data</h1>
      <p className="page-description">All datasets are deterministic (seeded), so runs are repeatable across executions.</p>

      <Section title="Reset" testId="section-reset-data">
        <Button variant="danger" testId="reset-test-data" onClick={handleReset}>
          Reset Users to Seed Data
        </Button>
      </Section>

      <Section title="Datasets" testId="section-datasets">
        <div className="form-actions mb-0">
          {DATASETS.map((d) => (
            <button
              key={d.key}
              type="button"
              className={`btn btn-sm ${selected === d.key ? 'btn-primary' : 'btn-secondary'}`}
              data-testid={`dataset-tab-${d.key}`}
              onClick={() => setSelected(d.key)}
            >
              {d.label}
            </button>
          ))}
        </div>
        <p className="status-panel mt-1" data-testid="dataset-count">
          Count: {Array.isArray(data) ? data.length : 0}
        </p>
        <pre className="code-block mt-1" data-testid="dataset-json" style={{ maxHeight: 320, overflow: 'auto' }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      </Section>
    </div>
  )
}
