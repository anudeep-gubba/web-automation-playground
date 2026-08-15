import { Router } from 'express'

export const networkRouter = Router()

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

networkRouter.get('/success', (_req, res) => {
  res.status(200).json({ status: 'ok', data: [1, 2, 3], timestamp: new Date().toISOString() })
})

networkRouter.get('/400', (_req, res) => {
  res.status(400).json({ error: 'Bad Request', message: 'The request was malformed.' })
})
networkRouter.get('/401', (_req, res) => {
  res.status(401).json({ error: 'Unauthorized', message: 'Authentication is required.' })
})
networkRouter.get('/403', (_req, res) => {
  res.status(403).json({ error: 'Forbidden', message: 'You do not have access to this resource.' })
})
networkRouter.get('/404', (_req, res) => {
  res.status(404).json({ error: 'Not Found', message: 'The requested resource does not exist.' })
})
networkRouter.get('/500', (_req, res) => {
  res.status(500).json({ error: 'Internal Server Error', message: 'An unexpected condition occurred.' })
})

networkRouter.get('/delayed', async (_req, res) => {
  await delay(3000)
  res.status(200).json({ status: 'ok', delayedMs: 3000 })
})

// Deliberately never responds — the client aborts via its own timeout to
// simulate a network timeout.
networkRouter.get('/timeout', () => {
  // no-op: intentionally hangs
})

networkRouter.get('/empty', (_req, res) => {
  res.status(204).end()
})

networkRouter.get('/large', (_req, res) => {
  const items = Array.from({ length: 5000 }, (_, i) => ({ id: i + 1, value: `item-${i + 1}` }))
  res.status(200).json({ status: 'ok', count: items.length, items })
})
