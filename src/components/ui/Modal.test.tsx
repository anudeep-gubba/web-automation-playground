import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Modal } from './Modal'

describe('Modal', () => {
  it('renders nothing when closed', () => {
    render(
      <Modal open={false} onClose={vi.fn()} title="Test Modal" testId="test-modal">
        <p>Body</p>
      </Modal>,
    )
    expect(screen.queryByTestId('test-modal')).not.toBeInTheDocument()
  })

  it('renders its title and body when open', () => {
    render(
      <Modal open onClose={vi.fn()} title="Test Modal" testId="test-modal">
        <p>Body content</p>
      </Modal>,
    )
    expect(screen.getByTestId('test-modal')).toBeInTheDocument()
    expect(screen.getByText('Test Modal')).toBeInTheDocument()
    expect(screen.getByText('Body content')).toBeInTheDocument()
  })

  it('calls onClose when the close button is clicked', async () => {
    const onClose = vi.fn()
    render(
      <Modal open onClose={onClose} title="Test Modal" testId="test-modal">
        <p>Body</p>
      </Modal>,
    )
    await userEvent.click(screen.getByTestId('test-modal-close'))
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('calls onClose when Escape is pressed', async () => {
    const onClose = vi.fn()
    render(
      <Modal open onClose={onClose} title="Test Modal" testId="test-modal">
        <p>Body</p>
      </Modal>,
    )
    await userEvent.keyboard('{Escape}')
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('calls onClose on backdrop click', async () => {
    const onClose = vi.fn()
    render(
      <Modal open onClose={onClose} title="Test Modal" testId="test-modal">
        <p>Body</p>
      </Modal>,
    )
    await userEvent.click(screen.getByTestId('test-modal-backdrop'))
    expect(onClose).toHaveBeenCalledOnce()
  })
})
