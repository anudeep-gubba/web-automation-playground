import type { HTMLAttributes, ReactNode } from 'react'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string
  description?: string
  children: ReactNode
  testId?: string
}

export function Card({ title, description, children, testId, className = '', ...rest }: CardProps) {
  return (
    <div className={`card ${className}`.trim()} data-testid={testId} {...rest}>
      {title ? <h3 className="card-title">{title}</h3> : null}
      {description ? <p className="card-description">{description}</p> : null}
      <div className="card-body">{children}</div>
    </div>
  )
}

export function Section({ title, description, children, testId, className = '', ...rest }: CardProps) {
  return (
    <section className={`playground-section ${className}`.trim()} data-testid={testId} {...rest}>
      {title ? <h2 className="section-title">{title}</h2> : null}
      {description ? <p className="section-description">{description}</p> : null}
      <div className="section-body">{children}</div>
    </section>
  )
}
