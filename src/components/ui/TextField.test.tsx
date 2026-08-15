import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TextField } from './TextField'

describe('TextField', () => {
  it('associates the label with the input and forwards typed input', async () => {
    const onChange = vi.fn()
    render(<TextField label="Email" id="email-field" testId="email-field" onChange={onChange} />)
    const input = screen.getByLabelText('Email')
    await userEvent.type(input, 'a')
    expect(onChange).toHaveBeenCalled()
  })

  it('renders an accessible error message linked via aria-describedby', () => {
    render(<TextField label="Email" id="email-field" testId="email-field" error="Required" />)
    const input = screen.getByTestId('email-field')
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(screen.getByTestId('email-field-error')).toHaveTextContent('Required')
  })
})
