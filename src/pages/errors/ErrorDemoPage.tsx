const ERROR_STATES = [
  { code: '401', title: 'Unauthorized', testId: 'error-401', message: 'Authentication is required to access this resource.' },
  { code: '403', title: 'Forbidden', testId: 'error-403', message: 'You do not have permission to access this resource.' },
  { code: '404', title: 'Not Found', testId: 'error-404', message: 'The requested resource could not be found.' },
  { code: '500', title: 'Internal Error', testId: 'error-500', message: 'The server encountered an unexpected condition.' },
  { code: 'NET', title: 'Network Error', testId: 'error-network', message: 'Unable to reach the server. Check your connection.' },
]

export function ErrorDemoPage() {
  return (
    <div data-testid="error-demo-page">
      <h1 className="page-title">Error Pages</h1>
      <p className="page-description">Static, stable-identifier renderings of each error state for locator testing.</p>
      <div className="grid-2">
        {ERROR_STATES.map((state) => (
          <div className="card" key={state.code} data-testid={state.testId}>
            <h3 className="card-title">
              {state.code} — {state.title}
            </h3>
            <p className="card-description">{state.message}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
