import { beforeEach, describe, expect, it } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '@/App'
import { EMAIL_VERIFICATION_CODE } from '@/constants/auth'

function goTo(path: string) {
  window.history.pushState({}, '', path)
}

beforeEach(() => {
  window.localStorage.clear()
  window.sessionStorage.clear()
  goTo('/')
})

describe('Registration -> verification -> login -> logout', () => {
  it('lets a new user register, verify, log in, and log out', async () => {
    const user = userEvent.setup()
    goTo('/register')
    render(<App />)

    await user.type(screen.getByTestId('register-first-name'), 'Integration')
    await user.type(screen.getByTestId('register-last-name'), 'Tester')
    await user.type(screen.getByTestId('register-email'), 'integration@example.com')
    await user.type(screen.getByTestId('register-username'), 'integrationtester')
    await user.type(screen.getByTestId('register-password'), 'Integr@t1on')
    await user.type(screen.getByTestId('register-confirm-password'), 'Integr@t1on')
    await user.type(screen.getByTestId('register-phone'), '5559876543')
    await user.type(screen.getByTestId('register-dob'), '1996-05-20')
    await user.selectOptions(screen.getByTestId('register-country'), 'India')
    await user.click(screen.getByTestId('register-terms'))
    await user.click(screen.getByTestId('register-submit'))

    await waitFor(() => expect(screen.getByTestId('registration-success-page')).toBeInTheDocument())

    await user.click(screen.getByTestId('registration-verify-email-link'))
    await waitFor(() => expect(screen.getByTestId('verify-email-page')).toBeInTheDocument())

    await user.type(screen.getByTestId('verify-email-code'), EMAIL_VERIFICATION_CODE)
    await user.click(screen.getByTestId('verify-email-submit'))

    await waitFor(() => expect(screen.getByTestId('verify-email-success')).toBeInTheDocument())

    await user.click(screen.getByTestId('verify-email-login-link'))
    await waitFor(() => expect(screen.getByTestId('login-page')).toBeInTheDocument())

    await user.type(screen.getByTestId('login-email'), 'integrationtester')
    await user.type(screen.getByTestId('login-password'), 'Integr@t1on')
    await user.click(screen.getByTestId('login-submit'))

    await waitFor(() => expect(screen.getByTestId('dashboard-page')).toBeInTheDocument())
    expect(screen.getByTestId('dashboard-title')).toHaveTextContent('Integration')

    await user.click(screen.getByTestId('logout-button'))
    // Logging out from a protected route immediately fails the auth guard,
    // redirecting to /login rather than lingering on a now-unauthorized page.
    await waitFor(() => expect(screen.getByTestId('login-page')).toBeInTheDocument())
  })

  it('rejects login for a locked account', async () => {
    const user = userEvent.setup()
    goTo('/login')
    render(<App />)

    await user.type(screen.getByTestId('login-email'), 'locked@example.com')
    await user.type(screen.getByTestId('login-password'), 'Locked@123')
    await user.click(screen.getByTestId('login-submit'))

    await waitFor(() => expect(screen.getByTestId('login-error-locked')).toBeInTheDocument())
  })
})

describe('Protected routes', () => {
  it('redirects unauthenticated users from /dashboard to /login', async () => {
    goTo('/dashboard')
    render(<App />)
    await waitFor(() => expect(screen.getByTestId('login-page')).toBeInTheDocument())
  })

  it('redirects a standard user away from the admin dashboard', async () => {
    const user = userEvent.setup()
    goTo('/login')
    render(<App />)

    await user.type(screen.getByTestId('login-email'), 'user@example.com')
    await user.type(screen.getByTestId('login-password'), 'User@123')
    await user.click(screen.getByTestId('login-submit'))
    await waitFor(() => expect(screen.getByTestId('dashboard-page')).toBeInTheDocument())

    goTo('/admin')
    window.dispatchEvent(new PopStateEvent('popstate'))
    await waitFor(() => expect(screen.getByTestId('access-denied-page')).toBeInTheDocument())
  })

  it('renders the 404 page for an unknown route', async () => {
    goTo('/this-route-does-not-exist')
    render(<App />)
    await waitFor(() => expect(screen.getByTestId('not-found-page')).toBeInTheDocument())
  })
})

describe('Password reset', () => {
  it('resets the password and allows login with the new password', async () => {
    const user = userEvent.setup()
    goTo('/forgot-password')
    render(<App />)

    await user.type(screen.getByTestId('forgot-password-email'), 'user@example.com')
    await user.click(screen.getByTestId('forgot-password-submit'))
    await waitFor(() => expect(screen.getByTestId('forgot-password-sent')).toBeInTheDocument())

    await user.click(screen.getByTestId('forgot-password-continue'))
    await waitFor(() => expect(screen.getByTestId('reset-password-page')).toBeInTheDocument())

    await user.type(screen.getByTestId('reset-password-code'), '654321')
    await user.type(screen.getByTestId('reset-password-new'), 'NewUser@123')
    await user.type(screen.getByTestId('reset-password-confirm'), 'NewUser@123')
    await user.click(screen.getByTestId('reset-password-submit'))

    await waitFor(() => expect(screen.getByTestId('reset-password-success')).toBeInTheDocument())

    await user.click(screen.getByTestId('reset-password-login-link'))
    await waitFor(() => expect(screen.getByTestId('login-page')).toBeInTheDocument())

    await user.type(screen.getByTestId('login-email'), 'user@example.com')
    await user.type(screen.getByTestId('login-password'), 'NewUser@123')
    await user.click(screen.getByTestId('login-submit'))

    await waitFor(() => expect(screen.getByTestId('dashboard-page')).toBeInTheDocument())
  })
})
