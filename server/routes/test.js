import { Router } from 'express'
import { resetData } from '../data.js'

export const testRouter = Router()

// Resets users/products/orders back to their seeded state. Intentionally
// unauthenticated — this is a test-only convenience endpoint, not part of
// the "real" API surface.
testRouter.post('/reset', (_req, res) => {
  resetData()
  res.status(200).json({ status: 'reset' })
})
