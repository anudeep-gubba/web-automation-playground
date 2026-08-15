import { useMemo, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TextField } from '@/components/ui/TextField'
import { SelectField } from '@/components/ui/SelectField'
import { Checkbox } from '@/components/ui/Checkbox'
import { Button } from '@/components/ui/Button'
import { Alert } from '@/components/ui/Alert'
import { COUNTRIES } from '@/constants/testData'
import { ROUTES } from '@/constants/routes'
import * as authService from '@/services/authService'
import { checkPasswordStrength, isAdult, isRequired, isValidDate, isValidEmail, isValidPhone, isValidUsername } from '@/utils/validation'
import type { FieldErrors } from '@/types'

interface FormState {
  firstName: string
  lastName: string
  email: string
  username: string
  password: string
  confirmPassword: string
  phone: string
  dateOfBirth: string
  country: string
  terms: boolean
}

const initialState: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  username: '',
  password: '',
  confirmPassword: '',
  phone: '',
  dateOfBirth: '',
  country: '',
  terms: false,
}

function validateField(name: keyof FormState, values: FormState): string | undefined {
  switch (name) {
    case 'firstName':
      return isRequired(values.firstName) ? undefined : 'First name is required.'
    case 'lastName':
      return isRequired(values.lastName) ? undefined : 'Last name is required.'
    case 'email':
      if (!isRequired(values.email)) return 'Email is required.'
      if (!isValidEmail(values.email)) return 'Enter a valid email address.'
      return undefined
    case 'username':
      if (!isRequired(values.username)) return 'Username is required.'
      if (!isValidUsername(values.username)) return '3-20 characters: letters, numbers, underscore only.'
      return undefined
    case 'password': {
      if (!isRequired(values.password)) return 'Password is required.'
      const strength = checkPasswordStrength(values.password)
      return strength.valid ? undefined : `Weak password. Missing: ${strength.reasons.join(', ')}`
    }
    case 'confirmPassword':
      if (!isRequired(values.confirmPassword)) return 'Please confirm your password.'
      return values.confirmPassword === values.password ? undefined : 'Passwords do not match.'
    case 'phone':
      if (!isRequired(values.phone)) return 'Phone number is required.'
      return isValidPhone(values.phone) ? undefined : 'Enter a valid phone number (7-15 digits).'
    case 'dateOfBirth':
      if (!isRequired(values.dateOfBirth)) return 'Date of birth is required.'
      if (!isValidDate(values.dateOfBirth)) return 'Enter a valid date.'
      return isAdult(values.dateOfBirth) ? undefined : 'You must be at least 13 years old.'
    case 'country':
      return isRequired(values.country) ? undefined : 'Country is required.'
    case 'terms':
      return values.terms ? undefined : 'You must accept the Terms and Conditions.'
    default:
      return undefined
  }
}

export function RegisterPage() {
  const [values, setValues] = useState<FormState>(initialState)
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({})
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  const errors = useMemo<FieldErrors>(() => {
    const result: FieldErrors = {}
    ;(Object.keys(values) as (keyof FormState)[]).forEach((key) => {
      result[key] = validateField(key, values)
    })
    return result
  }, [values])

  const isValid = Object.values(errors).every((e) => !e)

  function handleChange<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  function handleBlur(key: keyof FormState) {
    setTouched((prev) => ({ ...prev, [key]: true }))
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      username: true,
      password: true,
      confirmPassword: true,
      phone: true,
      dateOfBirth: true,
      country: true,
      terms: true,
    })
    if (!isValid) return

    setSubmitting(true)
    setSubmitError(null)
    const result = authService.register({ ...values, termsAccepted: values.terms })
    setSubmitting(false)
    if (!result.ok) {
      setSubmitError(result.message ?? 'Registration failed.')
      return
    }
    navigate('/registration-success', { state: { email: values.email } })
  }

  function shown(key: keyof FormState) {
    return touched[key] ? errors[key] : undefined
  }

  return (
    <div data-testid="register-page" style={{ maxWidth: 640, margin: '0 auto' }}>
      <h1 className="page-title">Create Account</h1>
      <p className="page-description">Registration is fully local and deterministic — no real email is sent.</p>

      {submitError ? (
        <Alert variant="error" testId="register-error">
          {submitError}
        </Alert>
      ) : null}

      <form onSubmit={handleSubmit} noValidate data-testid="register-form">
        <div className="form-grid">
          <TextField
            label="First Name"
            required
            value={values.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            onBlur={() => handleBlur('firstName')}
            error={shown('firstName')}
            id="register-first-name"
            testId="register-first-name"
          />
          <TextField
            label="Last Name"
            required
            value={values.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            onBlur={() => handleBlur('lastName')}
            error={shown('lastName')}
            id="register-last-name"
            testId="register-last-name"
          />
        </div>

        <TextField
          label="Email"
          type="email"
          required
          value={values.email}
          onChange={(e) => handleChange('email', e.target.value)}
          onBlur={() => handleBlur('email')}
          error={shown('email')}
          id="register-email"
          testId="register-email"
        />
        <TextField
          label="Username"
          required
          value={values.username}
          onChange={(e) => handleChange('username', e.target.value)}
          onBlur={() => handleBlur('username')}
          error={shown('username')}
          id="register-username"
          testId="register-username"
        />

        <div className="form-grid">
          <TextField
            label="Password"
            type="password"
            required
            value={values.password}
            onChange={(e) => handleChange('password', e.target.value)}
            onBlur={() => handleBlur('password')}
            error={shown('password')}
            hint="Min 8 chars, upper, lower, number, special character."
            id="register-password"
            testId="register-password"
          />
          <TextField
            label="Confirm Password"
            type="password"
            required
            value={values.confirmPassword}
            onChange={(e) => handleChange('confirmPassword', e.target.value)}
            onBlur={() => handleBlur('confirmPassword')}
            error={shown('confirmPassword')}
            id="register-confirm-password"
            testId="register-confirm-password"
          />
        </div>

        <div className="form-grid">
          <TextField
            label="Phone"
            type="tel"
            required
            value={values.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            onBlur={() => handleBlur('phone')}
            error={shown('phone')}
            id="register-phone"
            testId="register-phone"
          />
          <TextField
            label="Date of Birth"
            type="date"
            required
            value={values.dateOfBirth}
            onChange={(e) => handleChange('dateOfBirth', e.target.value)}
            onBlur={() => handleBlur('dateOfBirth')}
            error={shown('dateOfBirth')}
            id="register-dob"
            testId="register-dob"
          />
        </div>

        <SelectField
          label="Country"
          required
          value={values.country}
          onChange={(e) => handleChange('country', e.target.value)}
          onBlur={() => handleBlur('country')}
          error={shown('country')}
          id="register-country"
          testId="register-country"
        >
          <option value="">Select a country</option>
          {COUNTRIES.map((c) => (
            <option key={c.name} value={c.name}>
              {c.name}
            </option>
          ))}
        </SelectField>

        <Checkbox
          label="I accept the Terms and Conditions"
          checked={values.terms}
          onChange={(e) => handleChange('terms', e.target.checked)}
          onBlur={() => handleBlur('terms')}
          error={shown('terms')}
          id="register-terms"
          testId="register-terms"
        />

        <div className="form-actions">
          <Button type="submit" testId="register-submit" loading={submitting} disabled={touched.terms && !isValid}>
            Register
          </Button>
        </div>
      </form>

      <p className="mt-2">
        Already have an account?{' '}
        <Link to={ROUTES.login} data-testid="register-login-link">
          Login
        </Link>
      </p>
    </div>
  )
}
