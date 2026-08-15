export function Spinner({ testId = 'spinner', label = 'Loading' }: { testId?: string; label?: string }) {
  return (
    <span className="spinner" role="status" aria-label={label} data-testid={testId}>
      <span className="spinner-circle" aria-hidden="true" />
    </span>
  )
}

export function SkeletonLine({ width = '100%', testId }: { width?: string; testId?: string }) {
  return <span className="skeleton-line" style={{ width }} data-testid={testId} aria-hidden="true" />
}
