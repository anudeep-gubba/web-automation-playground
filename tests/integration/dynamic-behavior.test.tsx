import { act } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { DynamicElementsPage } from '@/pages/playground/dynamic-elements/DynamicElementsPage'

describe('Dynamic Elements module', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  it('shows an element only after the deterministic delay elapses', () => {
    render(<DynamicElementsPage />)

    expect(screen.queryByTestId('dynamic-appeared-element')).not.toBeInTheDocument()
    fireEvent.click(screen.getByTestId('dynamic-appear-trigger'))
    expect(screen.queryByTestId('dynamic-appeared-element')).not.toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(3000)
    })
    expect(screen.getByTestId('dynamic-appeared-element')).toBeInTheDocument()
  })

  it('enables a disabled button after the deterministic delay', () => {
    render(<DynamicElementsPage />)

    expect(screen.getByTestId('dynamic-enabled-target')).toBeDisabled()
    fireEvent.click(screen.getByTestId('dynamic-enable-trigger'))

    act(() => {
      vi.advanceTimersByTime(3000)
    })
    expect(screen.getByTestId('dynamic-enabled-target')).toBeEnabled()
  })
})
