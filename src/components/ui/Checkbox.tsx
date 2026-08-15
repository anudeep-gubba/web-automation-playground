import { forwardRef, useId, type InputHTMLAttributes } from 'react'

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  testId?: string
  error?: string
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, testId, id, error, className = '', ...rest }, ref) => {
    const autoId = useId()
    const fieldId = id ?? autoId
    return (
      <div className="field checkbox-field">
        <label htmlFor={fieldId} className="checkbox-label">
          <input ref={ref} type="checkbox" id={fieldId} data-testid={testId} className={`checkbox-input ${className}`.trim()} {...rest} />
          <span>{label}</span>
        </label>
        {error ? (
          <p className="field-error" data-testid={testId ? `${testId}-error` : undefined} role="alert">
            {error}
          </p>
        ) : null}
      </div>
    )
  },
)
Checkbox.displayName = 'Checkbox'
