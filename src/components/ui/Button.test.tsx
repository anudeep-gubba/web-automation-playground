import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from './Button'

describe('Button', () => {
  it('renders its label and responds to clicks', async () => {
    const onClick = vi.fn()
    render(
      <Button testId="test-button" onClick={onClick}>
        Click Me
      </Button>,
    )
    const button = screen.getByTestId('test-button')
    expect(button).toHaveTextContent('Click Me')
    await userEvent.click(button)
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('disables the button and shows a loading state', () => {
    render(
      <Button testId="loading-button" loading>
        Submit
      </Button>,
    )
    const button = screen.getByTestId('loading-button')
    expect(button).toBeDisabled()
    expect(button).toHaveTextContent('Loading…')
  })

  it('does not fire onClick when disabled', async () => {
    const onClick = vi.fn()
    render(
      <Button testId="disabled-button" disabled onClick={onClick}>
        Disabled
      </Button>,
    )
    await userEvent.click(screen.getByTestId('disabled-button'))
    expect(onClick).not.toHaveBeenCalled()
  })
})
