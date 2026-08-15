import { useState, type FormEvent } from 'react'
import { TextField } from '@/components/ui/TextField'
import { Button } from '@/components/ui/Button'
import { Alert } from '@/components/ui/Alert'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/useToast'
import * as authService from '@/services/authService'
import { isRequired } from '@/utils/validation'

export function SettingsPage() {
  const { user } = useAuth()
  const { showToast } = useToast()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  if (!user) return null

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setSuccess(false)
    if (!isRequired(currentPassword) || !isRequired(newPassword) || !isRequired(confirmPassword)) {
      setError('All fields are required.')
      return
    }
    const result = authService.changePassword(user!.id, currentPassword, newPassword, confirmPassword)
    if (!result.ok) {
      setError(result.message ?? 'Password change failed.')
      return
    }
    setError(null)
    setSuccess(true)
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    showToast({ variant: 'success', title: 'Password changed' })
  }

  return (
    <div data-testid="settings-page" style={{ maxWidth: 480 }}>
      <h1 className="page-title">Settings</h1>
      <h2 className="section-title">Change Password</h2>

      {error ? (
        <Alert variant="error" testId="change-password-error">
          {error}
        </Alert>
      ) : null}
      {success ? (
        <Alert variant="success" testId="change-password-success">
          Password changed successfully.
        </Alert>
      ) : null}

      <form onSubmit={handleSubmit} noValidate data-testid="change-password-form">
        <TextField
          label="Current Password"
          type="password"
          required
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          id="change-password-current"
          testId="change-password-current"
        />
        <TextField
          label="New Password"
          type="password"
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          id="change-password-new"
          testId="change-password-new"
        />
        <TextField
          label="Confirm Password"
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          id="change-password-confirm"
          testId="change-password-confirm"
        />
        <div className="form-actions">
          <Button type="submit" testId="change-password-submit">
            Change Password
          </Button>
        </div>
      </form>
    </div>
  )
}
