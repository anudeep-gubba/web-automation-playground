import { forwardRef, useId, type ReactNode, type SelectHTMLAttributes } from 'react'

export interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  error?: string
  testId?: string
  children: ReactNode
}

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ label, error, testId, id, className = '', children, ...rest }, ref) => {
    const autoId = useId()
    const fieldId = id ?? autoId
    return (
      <div className="field">
        <label htmlFor={fieldId} className="field-label">
          {label}
          {rest.required ? <span className="required-marker" aria-hidden="true"> *</span> : null}
        </label>
        <select
          ref={ref}
          id={fieldId}
          data-testid={testId}
          className={`field-input ${error ? 'field-input-error' : ''} ${className}`.trim()}
          aria-invalid={error ? true : undefined}
          {...rest}
        >
          {children}
        </select>
        {error ? (
          <p className="field-error" data-testid={testId ? `${testId}-error` : undefined} role="alert">
            {error}
          </p>
        ) : null}
      </div>
    )
  },
)
SelectField.displayName = 'SelectField'
