import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ApiReferencePage } from './ApiReferencePage'
import { API_REFERENCE } from '@/constants/apiReference'

describe('ApiReferencePage', () => {
  it('renders every documented endpoint', () => {
    render(<ApiReferencePage />)
    const total = API_REFERENCE.reduce((sum, group) => sum + group.endpoints.length, 0)
    expect(screen.getAllByRole('group').length + document.querySelectorAll('details').length).toBeGreaterThan(0)
    expect(document.querySelectorAll('[data-testid^="api-endpoint-summary-"]')).toHaveLength(total)
  })

  it('filters endpoints by search query', async () => {
    const user = userEvent.setup()
    render(<ApiReferencePage />)

    await user.type(screen.getByTestId('api-reference-search'), 'products')

    expect(screen.queryByTestId('api-group-orders')).not.toBeInTheDocument()
    expect(screen.getByTestId('api-group-products')).toBeInTheDocument()
  })

  it('shows curl, request and response details when an endpoint is expanded', async () => {
    const user = userEvent.setup()
    render(<ApiReferencePage />)

    const summary = screen.getByTestId('api-endpoint-summary-post-api-auth-login')
    await user.click(summary)

    expect(screen.getByTestId('api-endpoint-curl-post-api-auth-login')).toHaveTextContent('curl')
    expect(screen.getByTestId('api-endpoint-response-post-api-auth-login')).toHaveTextContent('200 OK')
  })
})
