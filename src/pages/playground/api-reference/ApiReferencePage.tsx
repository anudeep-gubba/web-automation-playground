import { useMemo, useState } from 'react'
import { Section } from '@/components/ui/Card'
import { CopyButton } from '@/components/ui/CopyButton'
import { AUTH_LEVEL_LABEL, API_REFERENCE, type ApiEndpoint } from '@/constants/apiReference'

const METHOD_CLASS: Record<ApiEndpoint['method'], string> = {
  GET: 'badge-active',
  POST: 'badge-pending',
  PUT: 'badge-pending',
  DELETE: 'badge-inactive',
}

function slug(...parts: string[]) {
  return parts
    .join('-')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function ApiReferencePage() {
  const [query, setQuery] = useState('')

  const filteredGroups = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return API_REFERENCE
    return API_REFERENCE.map((group) => ({
      ...group,
      endpoints: group.endpoints.filter(
        (e) => e.path.toLowerCase().includes(q) || e.description.toLowerCase().includes(q) || e.method.toLowerCase().includes(q),
      ),
    })).filter((group) => group.endpoints.length > 0)
  }, [query])

  return (
    <div data-testid="api-reference-page">
      <h1 className="page-title">API Reference</h1>
      <p className="page-description">
        Every endpoint exposed by the local REST API, independent of the browser UI. Start the backend with{' '}
        <code>npm run server</code>, then base every request on <code>http://localhost:4000</code>. Try them with curl,
        Postman, RestAssured, or any HTTP client.
      </p>

      <Section testId="section-api-search" title="Find an endpoint">
        <input
          id="api-reference-search"
          data-testid="api-reference-search"
          className="field-input"
          placeholder="Search by path, method, or description…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </Section>

      {filteredGroups.length === 0 ? (
        <p className="text-muted" data-testid="api-reference-empty">
          No endpoints match "{query}".
        </p>
      ) : (
        filteredGroups.map((group) => (
          <Section key={group.id} testId={`api-group-${group.id}`} title={group.title} description={group.description}>
            <div className="api-endpoint-list">
              {group.endpoints.map((endpoint) => {
                const id = slug(endpoint.method, endpoint.path)
                return (
                  <details key={id} className="api-endpoint" data-testid={`api-endpoint-${id}`}>
                    <summary className="api-endpoint-summary" data-testid={`api-endpoint-summary-${id}`}>
                      <span className={`badge ${METHOD_CLASS[endpoint.method]}`}>{endpoint.method}</span>
                      <code className="api-endpoint-path">{endpoint.path}</code>
                      <span className="badge">{AUTH_LEVEL_LABEL[endpoint.auth]}</span>
                    </summary>
                    <div className="api-endpoint-body">
                      <p>{endpoint.description}</p>

                      {endpoint.requestBody ? (
                        <>
                          <h4 className="api-endpoint-heading">Request body</h4>
                          <pre className="code-block" data-testid={`api-endpoint-request-${id}`}>
                            {endpoint.requestBody}
                          </pre>
                        </>
                      ) : null}

                      <h4 className="api-endpoint-heading">Response</h4>
                      <pre className="code-block" data-testid={`api-endpoint-response-${id}`}>
                        {endpoint.response}
                      </pre>

                      <h4 className="api-endpoint-heading">curl</h4>
                      <pre className="code-block" data-testid={`api-endpoint-curl-${id}`}>
                        {endpoint.curl}
                      </pre>
                      <CopyButton text={endpoint.curl} testId={`api-endpoint-copy-${id}`} />
                    </div>
                  </details>
                )
              })}
            </div>
          </Section>
        ))
      )}
    </div>
  )
}
