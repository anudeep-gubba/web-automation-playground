import { useMemo, useState, type FormEvent } from 'react'
import { Section } from '@/components/ui/Card'
import { TextField } from '@/components/ui/TextField'
import { SelectField } from '@/components/ui/SelectField'
import { Checkbox } from '@/components/ui/Checkbox'
import { Button } from '@/components/ui/Button'
import { Alert } from '@/components/ui/Alert'
import { COUNTRIES, SKILLS } from '@/constants/testData'
import { isRequired, isValidEmail, isValidPhone, isValidUrl } from '@/utils/validation'
import type { FieldErrors } from '@/types'

interface FormState {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  dateOfBirth: string
  gender: string
  country: string
  state: string
  skills: string[]
  website: string
  comments: string
  terms: boolean
}

const initial: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  dateOfBirth: '',
  gender: '',
  country: '',
  state: '',
  skills: [],
  website: '',
  comments: '',
  terms: false,
}

function validate(values: FormState): FieldErrors {
  const errors: FieldErrors = {}
  if (!isRequired(values.firstName)) errors.firstName = 'First name is required.'
  if (!isRequired(values.lastName)) errors.lastName = 'Last name is required.'
  if (!isRequired(values.email)) errors.email = 'Email is required.'
  else if (!isValidEmail(values.email)) errors.email = 'Enter a valid email address.'
  if (isRequired(values.phone) && !isValidPhone(values.phone)) errors.phone = 'Enter a valid phone number.'
  if (!isRequired(values.password)) errors.password = 'Password is required.'
  else if (values.password.length < 8) errors.password = 'Minimum 8 characters.'
  if (values.confirmPassword !== values.password) errors.confirmPassword = 'Passwords do not match.'
  if (!isRequired(values.dateOfBirth)) errors.dateOfBirth = 'Date of birth is required.'
  if (!isRequired(values.gender)) errors.gender = 'Please select a gender.'
  if (!isRequired(values.country)) errors.country = 'Country is required.'
  if (isRequired(values.website) && !isValidUrl(values.website)) errors.website = 'Enter a valid URL (https://...).'
  if (values.comments.length > 500) errors.comments = 'Maximum 500 characters.'
  if (!values.terms) errors.terms = 'You must accept the Terms and Conditions.'
  return errors
}

export function FormsPage() {
  const [values, setValues] = useState<FormState>(initial)
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({})
  const [submitted, setSubmitted] = useState(false)

  const errors = useMemo(() => validate(values), [values])
  const isValid = Object.keys(errors).length === 0
  const states = COUNTRIES.find((c) => c.name === values.country)?.states ?? []

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((prev) => ({ ...prev, [key]: value }))
  }
  function blur(key: keyof FormState) {
    setTouched((prev) => ({ ...prev, [key]: true }))
  }
  function shown(key: keyof FormState) {
    return touched[key] || submitted ? errors[key] : undefined
  }
  function toggleSkill(skill: string) {
    setValues((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill) ? prev.skills.filter((s) => s !== skill) : [...prev.skills, skill],
    }))
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setSubmitted(true)
    setTouched(Object.fromEntries(Object.keys(values).map((k) => [k, true])))
  }

  function handleReset() {
    setValues(initial)
    setTouched({})
    setSubmitted(false)
  }

  const formCompleted = submitted && isValid

  return (
    <div data-testid="forms-page">
      <h1 className="page-title">Forms</h1>
      <p className="page-description">Registration-style form with required/optional fields, blur and submit validation.</p>

      <Section testId="registration-form-section" title="Registration Form">
        {formCompleted ? (
          <Alert variant="success" testId="forms-submit-success">
            Form submitted successfully.
          </Alert>
        ) : null}

        <form onSubmit={handleSubmit} noValidate data-testid="registration-form">
          <div className="form-grid">
            <TextField
              label="First Name"
              required
              value={values.firstName}
              onChange={(e) => set('firstName', e.target.value)}
              onBlur={() => blur('firstName')}
              error={shown('firstName')}
              id="forms-first-name"
              testId="forms-first-name"
            />
            <TextField
              label="Last Name"
              required
              value={values.lastName}
              onChange={(e) => set('lastName', e.target.value)}
              onBlur={() => blur('lastName')}
              error={shown('lastName')}
              id="forms-last-name"
              testId="forms-last-name"
            />
          </div>

          <TextField
            label="Email"
            type="email"
            required
            value={values.email}
            onChange={(e) => set('email', e.target.value)}
            onBlur={() => blur('email')}
            error={shown('email')}
            id="forms-email"
            testId="forms-email"
          />
          <TextField
            label="Phone"
            type="tel"
            hint="Optional"
            value={values.phone}
            onChange={(e) => set('phone', e.target.value)}
            onBlur={() => blur('phone')}
            error={shown('phone')}
            id="forms-phone"
            testId="forms-phone"
          />

          <div className="form-grid">
            <TextField
              label="Password"
              type="password"
              required
              value={values.password}
              onChange={(e) => set('password', e.target.value)}
              onBlur={() => blur('password')}
              error={shown('password')}
              id="forms-password"
              testId="forms-password"
            />
            <TextField
              label="Confirm Password"
              type="password"
              required
              value={values.confirmPassword}
              onChange={(e) => set('confirmPassword', e.target.value)}
              onBlur={() => blur('confirmPassword')}
              error={shown('confirmPassword')}
              id="forms-confirm-password"
              testId="forms-confirm-password"
            />
          </div>

          <TextField
            label="Date of Birth"
            type="date"
            required
            value={values.dateOfBirth}
            onChange={(e) => set('dateOfBirth', e.target.value)}
            onBlur={() => blur('dateOfBirth')}
            error={shown('dateOfBirth')}
            id="forms-dob"
            testId="forms-dob"
          />

          <fieldset>
            <legend>
              Gender <span className="required-marker">*</span>
            </legend>
            {['Female', 'Male', 'Other'].map((g) => (
              <label key={g} className="checkbox-label" style={{ display: 'block' }} htmlFor={`forms-gender-${g}`}>
                <input
                  type="radio"
                  id={`forms-gender-${g}`}
                  data-testid={`forms-gender-${g.toLowerCase()}`}
                  name="forms-gender"
                  value={g}
                  checked={values.gender === g}
                  onChange={(e) => set('gender', e.target.value)}
                  onBlur={() => blur('gender')}
                />
                <span>{g}</span>
              </label>
            ))}
            {shown('gender') ? (
              <p className="field-error" data-testid="forms-gender-error">
                {shown('gender')}
              </p>
            ) : null}
          </fieldset>

          <div className="form-grid">
            <SelectField
              label="Country"
              required
              value={values.country}
              onChange={(e) => {
                set('country', e.target.value)
                set('state', '')
              }}
              onBlur={() => blur('country')}
              error={shown('country')}
              id="forms-country"
              testId="forms-country"
            >
              <option value="">Select a country</option>
              {COUNTRIES.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </SelectField>
            <SelectField
              label="State"
              value={values.state}
              onChange={(e) => set('state', e.target.value)}
              disabled={states.length === 0}
              id="forms-state"
              testId="forms-state"
            >
              <option value="">Select a state</option>
              {states.map((s) => (
                <option key={s.name} value={s.name}>
                  {s.name}
                </option>
              ))}
            </SelectField>
          </div>

          <fieldset>
            <legend>Skills</legend>
            {SKILLS.map((skill) => (
              <label key={skill} className="checkbox-label" style={{ display: 'inline-flex', marginRight: '1rem' }} htmlFor={`forms-skill-${skill}`}>
                <input
                  type="checkbox"
                  id={`forms-skill-${skill}`}
                  data-testid={`forms-skill-${skill}`}
                  checked={values.skills.includes(skill)}
                  onChange={() => toggleSkill(skill)}
                />
                <span>{skill}</span>
              </label>
            ))}
          </fieldset>

          <TextField
            label="Website"
            type="url"
            hint="Optional. e.g. https://example.com"
            value={values.website}
            onChange={(e) => set('website', e.target.value)}
            onBlur={() => blur('website')}
            error={shown('website')}
            id="forms-website"
            testId="forms-website"
          />

          <div className="field">
            <label className="field-label" htmlFor="forms-profile-image">
              Profile Image
            </label>
            <input id="forms-profile-image" data-testid="forms-profile-image" type="file" accept="image/*" />
          </div>

          <div className="field">
            <label className="field-label" htmlFor="forms-comments">
              Comments
            </label>
            <textarea
              id="forms-comments"
              data-testid="forms-comments"
              className="field-input"
              rows={4}
              maxLength={500}
              value={values.comments}
              onChange={(e) => set('comments', e.target.value)}
              onBlur={() => blur('comments')}
            />
            {shown('comments') ? (
              <p className="field-error" data-testid="forms-comments-error">
                {shown('comments')}
              </p>
            ) : null}
          </div>

          <Checkbox
            label="Terms and Conditions"
            checked={values.terms}
            onChange={(e) => set('terms', e.target.checked)}
            onBlur={() => blur('terms')}
            error={shown('terms')}
            id="forms-terms"
            testId="forms-terms"
          />

          <div className="form-actions">
            <Button type="submit" testId="forms-submit">
              Submit
            </Button>
            <Button type="button" variant="secondary" testId="forms-reset" onClick={handleReset}>
              Reset
            </Button>
          </div>
        </form>
      </Section>
    </div>
  )
}
