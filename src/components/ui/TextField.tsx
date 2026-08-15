import { forwardRef, useId, type InputHTMLAttributes } from 'react'

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  hint?: string
  testId?: string
  containerClassName?: string
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, hint, testId, id, containerClassName = '', className = '', ...rest }, ref) => {
    const autoId = useId()
    const fieldId = id ?? autoId
    const errorId = `${fieldId}-error`
    const hintId = `${fieldId}-hint`

    return (
      <div className={`field ${containerClassName}`.trim()}>
        <label htmlFor={fieldId} className="field-label">
          {label}
          {rest.required ? <span className="required-marker" aria-hidden="true"> *</span> : null}
        </label>
        <input
          ref={ref}
          id={fieldId}
          data-testid={testId}
          className={`field-input ${error ? 'field-input-error' : ''} ${className}`.trim()}
          aria-invalid={error ? true : undefined}
          aria-describedby={[error ? errorId : null, hint ? hintId : null].filter(Boolean).join(' ') || undefined}
          {...rest}
        />
        {hint ? (
          <p id={hintId} className="field-hint">
            {hint}
          </p>
        ) : null}
        {error ? (
          <p id={errorId} className="field-error" data-testid={testId ? `${testId}-error` : undefined} role="alert">
            {error}
          </p>
        ) : null}
      </div>
    )
  },
)
TextField.displayName = 'TextField'
