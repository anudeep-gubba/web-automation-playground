import { beforeEach, describe, expect, it } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LocalStoragePage } from '@/pages/playground/local-storage/LocalStoragePage'
import { SessionStoragePage } from '@/pages/playground/session-storage/SessionStoragePage'

beforeEach(() => {
  window.localStorage.clear()
  window.sessionStorage.clear()
})

describe('Local Storage module', () => {
  it('sets a key/value pair and persists it across remounts (simulated reload)', async () => {
    const user = userEvent.setup()
    const { unmount } = render(<LocalStoragePage />)

    await user.type(screen.getByTestId('local-storage-key'), 'greeting')
    await user.type(screen.getByTestId('local-storage-value'), 'hello world')
    await user.click(screen.getByTestId('local-storage-set'))

    await waitFor(() => expect(screen.getByTestId('local-storage-row-greeting')).toBeInTheDocument())
    expect(window.localStorage.getItem('greeting')).toBe(JSON.stringify('hello world'))

    unmount()
    render(<LocalStoragePage />)
    expect(screen.getByTestId('local-storage-row-greeting')).toBeInTheDocument()
  })

  it('clears all entries', async () => {
    const user = userEvent.setup()
    render(<LocalStoragePage />)

    await user.type(screen.getByTestId('local-storage-key'), 'a')
    await user.type(screen.getByTestId('local-storage-value'), 'b')
    await user.click(screen.getByTestId('local-storage-set'))
    await waitFor(() => expect(screen.getByTestId('local-storage-row-a')).toBeInTheDocument())

    await user.click(screen.getByTestId('local-storage-clear'))
    await waitFor(() => expect(screen.getByTestId('local-storage-empty')).toBeInTheDocument())
  })
})

describe('Session Storage module', () => {
  it('writes to sessionStorage, not localStorage', async () => {
    const user = userEvent.setup()
    render(<SessionStoragePage />)

    await user.type(screen.getByTestId('session-storage-key'), 'temp')
    await user.type(screen.getByTestId('session-storage-value'), 'value')
    await user.click(screen.getByTestId('session-storage-set'))

    await waitFor(() => expect(screen.getByTestId('session-storage-row-temp')).toBeInTheDocument())
    expect(window.sessionStorage.getItem('temp')).not.toBeNull()
    expect(window.localStorage.getItem('temp')).toBeNull()
  })
})
