import type { ReactNode } from 'react'

export function Alert({
  variant = 'info',
  children,
  testId,
}: {
  variant?: 'success' | 'error' | 'warning' | 'info'
  children: ReactNode
  testId?: string
}) {
  return (
    <div className={`toast toast-${variant}`} style={{ boxShadow: 'none' }} role="alert" data-testid={testId}>
      <div>{children}</div>
    </div>
  )
}
