import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { PLAYGROUND_NAV } from '@/constants/navigation'

describe('Sidebar', () => {
  it('renders a navigation link for every playground module', () => {
    render(
      <MemoryRouter>
        <Sidebar mobileOpen={false} />
      </MemoryRouter>,
    )
    const nav = screen.getByTestId('sidebar-nav')
    expect(nav).toBeInTheDocument()
    PLAYGROUND_NAV.forEach((item) => {
      expect(screen.getByTestId(item.testId)).toHaveTextContent(item.label)
    })
  })
})
