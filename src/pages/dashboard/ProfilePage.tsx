import { useState, type FormEvent } from 'react'
import { TextField } from '@/components/ui/TextField'
import { Button } from '@/components/ui/Button'
import { Alert } from '@/components/ui/Alert'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/useToast'
import * as authService from '@/services/authService'
import { isRequired, isValidPhone } from '@/utils/validation'

export function ProfilePage() {
  const { user, refresh } = useAuth()
  const { showToast } = useToast()
  const [editing, setEditing] = useState(false)
  const [firstName, setFirstName] = useState(user?.firstName ?? '')
  const [lastName, setLastName] = useState(user?.lastName ?? '')
  const [phone, setPhone] = useState(user?.phone ?? '')
  const [avatarName, setAvatarName] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  if (!user) return null

  function startEdit() {
    setFirstName(user!.firstName)
    setLastName(user!.lastName)
    setPhone(user!.phone)
    setError(null)
    setEditing(true)
  }

  function cancelEdit() {
    setEditing(false)
    setError(null)
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!isRequired(firstName) || !isRequired(lastName)) {
      setError('First and last name are required.')
      return
    }
    if (!isValidPhone(phone)) {
      setError('Enter a valid phone number.')
      return
    }
    authService.updateProfile(user!.id, { firstName, lastName, phone })
    refresh()
    setEditing(false)
    showToast({ variant: 'success', title: 'Profile updated' })
  }

  return (
    <div data-testid="profile-page" style={{ maxWidth: 560 }}>
      <h1 className="page-title">Profile</h1>

      {error ? (
        <Alert variant="error" testId="profile-error">
          {error}
        </Alert>
      ) : null}

      {!editing ? (
        <div className="card" data-testid="profile-view">
          <dl>
            <dt className="text-muted">Name</dt>
            <dd data-testid="profile-name">
              {user.firstName} {user.lastName}
            </dd>
            <dt className="text-muted">Email</dt>
            <dd data-testid="profile-email">{user.email}</dd>
            <dt className="text-muted">Username</dt>
            <dd data-testid="profile-username">{user.username}</dd>
            <dt className="text-muted">Phone</dt>
            <dd data-testid="profile-phone">{user.phone}</dd>
            <dt className="text-muted">Role</dt>
            <dd data-testid="profile-role">{user.role}</dd>
            <dt className="text-muted">Account Status</dt>
            <dd data-testid="profile-status">{user.status}</dd>
          </dl>
          <div className="form-actions">
            <Button testId="profile-edit-button" onClick={startEdit}>
              Edit Profile
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate data-testid="profile-edit-form" className="card">
          <TextField label="First Name" required value={firstName} onChange={(e) => setFirstName(e.target.value)} id="profile-first-name" testId="profile-first-name" />
          <TextField label="Last Name" required value={lastName} onChange={(e) => setLastName(e.target.value)} id="profile-last-name" testId="profile-last-name" />
          <TextField label="Phone" required value={phone} onChange={(e) => setPhone(e.target.value)} id="profile-phone-input" testId="profile-phone-input" />
          <div className="field">
            <label className="field-label" htmlFor="profile-avatar-upload">
              Profile Image
            </label>
            <input
              type="file"
              id="profile-avatar-upload"
              data-testid="profile-avatar-upload"
              accept="image/*"
              onChange={(e) => setAvatarName(e.target.files?.[0]?.name ?? null)}
            />
            {avatarName ? (
              <p className="field-hint" data-testid="profile-avatar-filename">
                Selected: {avatarName}
              </p>
            ) : null}
          </div>
          <div className="form-actions">
            <Button type="submit" testId="profile-save-button">
              Save
            </Button>
            <Button type="button" variant="secondary" testId="profile-cancel-button" onClick={cancelEdit}>
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}
