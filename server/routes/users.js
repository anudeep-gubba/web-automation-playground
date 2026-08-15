import { Router } from 'express'
import { store, toPublicUser } from '../data.js'
import { requireAdmin, requireAuth, requireSelfOrAdmin, sendError } from '../auth.js'

export const usersRouter = Router()

usersRouter.use(requireAuth)

function paginate(items, req) {
  const page = Math.max(1, Number(req.query.page) || 1)
  const pageSize = Math.min(100, Math.max(1, Number(req.query.pageSize) || 20))
  const start = (page - 1) * pageSize
  return { items: items.slice(start, start + pageSize), page, pageSize, total: items.length }
}

// Admin-only listing mirrors the UI's admin-gated User Management page, and
// gives a clean 403 scenario to test with a valid-but-non-admin token.
usersRouter.get('/', requireAdmin, (req, res) => {
  res.status(200).json(paginate(store.users.map(toPublicUser), req))
})

usersRouter.get('/:id', requireSelfOrAdmin('id'), (req, res) => {
  const user = store.users.find((u) => u.id === req.params.id)
  if (!user) return sendError(res, 404, 'NotFound', `No user with id "${req.params.id}".`)
  res.status(200).json(toPublicUser(user))
})

usersRouter.post('/', requireAdmin, (req, res) => {
  const { firstName, lastName, email, username, password, phone, role } = req.body ?? {}
  const details = {}
  if (!firstName) details.firstName = 'First name is required.'
  if (!lastName) details.lastName = 'Last name is required.'
  if (!email) details.email = 'Email is required.'
  if (!username) details.username = 'Username is required.'
  if (!password || password.length < 8) details.password = 'Password must be at least 8 characters.'
  if (Object.keys(details).length > 0) {
    return sendError(res, 400, 'ValidationError', 'One or more fields are invalid.', details)
  }
  if (store.users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return sendError(res, 409, 'Conflict', 'A user with this email already exists.')
  }

  const user = {
    id: `api-user-${Date.now()}`,
    firstName,
    lastName,
    email,
    username,
    password,
    phone: phone ?? '',
    role: role === 'admin' ? 'admin' : 'user',
    status: 'active',
  }
  store.users.push(user)
  res.status(201).json(toPublicUser(user))
})

usersRouter.put('/:id', requireSelfOrAdmin('id'), (req, res) => {
  const user = store.users.find((u) => u.id === req.params.id)
  if (!user) return sendError(res, 404, 'NotFound', `No user with id "${req.params.id}".`)

  const { firstName, lastName, phone, status, role } = req.body ?? {}
  if (firstName !== undefined) user.firstName = firstName
  if (lastName !== undefined) user.lastName = lastName
  if (phone !== undefined) user.phone = phone
  // Only an admin may change status/role, even on their own account.
  if (req.user.role === 'admin') {
    if (status !== undefined) user.status = status
    if (role !== undefined) user.role = role
  }
  res.status(200).json(toPublicUser(user))
})

usersRouter.delete('/:id', requireAdmin, (req, res) => {
  const index = store.users.findIndex((u) => u.id === req.params.id)
  if (index === -1) return sendError(res, 404, 'NotFound', `No user with id "${req.params.id}".`)
  store.users.splice(index, 1)
  res.status(204).end()
})
