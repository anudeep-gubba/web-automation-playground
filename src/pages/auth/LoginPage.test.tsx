import { beforeEach, describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { LoginPage } from './LoginPage'
import { AuthProvider } from '@/context/AuthContext'
import { DEMO_ACCOUNTS } from '@/constants/auth'

function renderLoginPage() {
  return render(
    <MemoryRouter>
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    </MemoryRouter>,
  )
}

beforeEach(() => {
  window.localStorage.clear()
  window.sessionStorage.clear()
})

describe('LoginPage demo accounts panel', () => {
  it('lists every demo account with its status', () => {
    renderLoginPage()
    DEMO_ACCOUNTS.forEach((acc) => {
      expect(screen.getByTestId(`login-account-${acc.username}`)).toHaveTextContent(acc.status)
    })
  })

  it('autofills the form when "Use" is clicked on the admin account', async () => {
    const user = userEvent.setup()
    renderLoginPage()

    await user.click(screen.getByTestId('login-quickfill-adminuser'))

    expect(screen.getByTestId('login-email')).toHaveValue('admin@example.com')
    expect(screen.getByTestId('login-password')).toHaveValue('Admin@123')
  })

  it('logs in successfully after using quick-fill', async () => {
    const user = userEvent.setup()
    renderLoginPage()

    await user.click(screen.getByTestId('login-quickfill-standarduser'))
    await user.click(screen.getByTestId('login-submit'))

    expect(window.sessionStorage.getItem('wap_session')).not.toBeNull()
  })
})
