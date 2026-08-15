import { useState } from 'react'
import * as authService from '@/services/authService'
import { Button } from '@/components/ui/Button'
import type { AccountStatus, PublicUser } from '@/types'

export function UserManagementPage() {
  const [users, setUsers] = useState<PublicUser[]>(() => authService.listUsers())

  function toggleStatus(user: PublicUser) {
    const next: AccountStatus = user.status === 'active' ? 'locked' : 'active'
    authService.setUserStatus(user.id, next)
    setUsers(authService.listUsers())
  }

  return (
    <div data-testid="user-management-page">
      <h1 className="page-title">User Management</h1>
      <p className="page-description">Admin-only. Toggle account status to see how it affects login for that user.</p>
      <div className="data-table-wrapper">
        <table className="data-table" data-testid="user-management-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} data-testid={`user-row-${u.id}`}>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  <span className={`badge badge-${u.status === 'active' ? 'active' : 'inactive'}`}>{u.status}</span>
                </td>
                <td>
                  <Button size="sm" variant="secondary" testId={`user-toggle-status-${u.id}`} onClick={() => toggleStatus(u)}>
                    {u.status === 'active' ? 'Lock' : 'Activate'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
