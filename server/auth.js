// JWT helpers + auth middleware for the REST API. The secret is a fixed,
// documented, local-only value — this server never leaves localhost in the
// intended use case, so there is no real secret to protect.
import jwt from 'jsonwebtoken'
import { store } from './data.js'

export const JWT_SECRET = 'wap-local-test-secret'
const TOKEN_TTL = '2h'

export function signToken(user) {
  return jwt.sign({ sub: user.id, role: user.role }, JWT_SECRET, { expiresIn: TOKEN_TTL })
}

export function sendError(res, status, error, message, details) {
  res.status(status).json({ error, message, ...(details ? { details } : {}) })
}

export function requireAuth(req, res, next) {
  const header = req.headers.authorization ?? ''
  const [scheme, token] = header.split(' ')
  if (scheme !== 'Bearer' || !token) {
    return sendError(res, 401, 'Unauthorized', 'Missing or malformed Authorization header. Expected: Bearer <token>.')
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET)
    const user = store.users.find((u) => u.id === payload.sub)
    if (!user) return sendError(res, 401, 'Unauthorized', 'Token does not match any known user.')
    req.user = user
    next()
  } catch {
    return sendError(res, 401, 'Unauthorized', 'Invalid or expired token.')
  }
}

export function requireAdmin(req, res, next) {
  if (req.user?.role !== 'admin') {
    return sendError(res, 403, 'Forbidden', 'Admin role required for this operation.')
  }
  next()
}

export function requireSelfOrAdmin(paramName) {
  return function (req, res, next) {
    if (req.user?.role === 'admin' || req.user?.id === req.params[paramName]) return next()
    return sendError(res, 403, 'Forbidden', 'You may only access your own resource.')
  }
}
