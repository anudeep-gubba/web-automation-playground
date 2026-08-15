import { Router } from 'express'
import { store, toPublicUser } from '../data.js'
import { requireAuth, sendError, signToken } from '../auth.js'

export const authRouter = Router()

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function findByIdentifier(identifier) {
  const norm = String(identifier ?? '').trim().toLowerCase()
  return store.users.find((u) => u.email.toLowerCase() === norm || u.username.toLowerCase() === norm)
}

const STATUS_ERROR = {
  locked: ['ACCOUNT_LOCKED', 'This account is locked.'],
  disabled: ['ACCOUNT_DISABLED', 'This account is disabled.'],
  unverified: ['ACCOUNT_UNVERIFIED', 'This account has not been verified.'],
}

authRouter.post('/register', (req, res) => {
  const { firstName, lastName, email, username, password, phone } = req.body ?? {}
  const details = {}
  if (!firstName) details.firstName = 'First name is required.'
  if (!lastName) details.lastName = 'Last name is required.'
  if (!email || !EMAIL_REGEX.test(email)) details.email = 'A valid email is required.'
  if (!username || username.length < 3) details.username = 'Username must be at least 3 characters.'
  if (!password || password.length < 8) details.password = 'Password must be at least 8 characters.'
  if (Object.keys(details).length > 0) {
    return sendError(res, 400, 'ValidationError', 'One or more fields are invalid.', details)
  }

  if (store.users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return sendError(res, 409, 'Conflict', 'A user with this email already exists.')
  }
  if (store.users.some((u) => u.username.toLowerCase() === username.toLowerCase())) {
    return sendError(res, 409, 'Conflict', 'A user with this username already exists.')
  }

  const user = {
    id: `api-user-${Date.now()}`,
    firstName,
    lastName,
    email,
    username,
    password,
    phone: phone ?? '',
    role: 'user',
    // API-registered accounts are active immediately — there is no
    // email-verification endpoint on this API (that flow only exists in the
    // browser UI). This is an intentional difference; see README.
    status: 'active',
  }
  store.users.push(user)
  res.status(201).json(toPublicUser(user))
})

authRouter.post('/login', (req, res) => {
  const { identifier, password } = req.body ?? {}
  if (!identifier || !password) {
    return sendError(res, 400, 'ValidationError', 'identifier and password are both required.')
  }

  const user = findByIdentifier(identifier)
  if (!user || user.password !== password) {
    return sendError(res, 401, 'InvalidCredentials', 'Invalid identifier or password.')
  }
  if (user.status !== 'active') {
    const [error, message] = STATUS_ERROR[user.status] ?? ['ACCOUNT_INACTIVE', 'This account cannot log in.']
    return sendError(res, 403, error, message)
  }

  const token = signToken(user)
  res.status(200).json({ token, user: toPublicUser(user) })
})

authRouter.get('/me', requireAuth, (req, res) => {
  res.status(200).json(toPublicUser(req.user))
})

// JWTs are stateless, so there is nothing to invalidate server-side; this
// exists so clients have a symmetric endpoint to call.
authRouter.post('/logout', requireAuth, (_req, res) => {
  res.status(200).json({ status: 'ok' })
})
