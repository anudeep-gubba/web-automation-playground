// Minimal, deterministic local backend for the Web Automation Playground.
// Serves the Network module's simulated HTTP responses and a WebSocket echo
// server for the WebSocket module. Entirely local — no external services.

import express from 'express'
import cors from 'cors'
import { createServer } from 'node:http'
import { WebSocketServer } from 'ws'

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000

const app = express()
app.use(cors())
app.use(express.json())

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

app.get('/api/network/success', async (_req, res) => {
  res.status(200).json({ status: 'ok', data: [1, 2, 3], timestamp: new Date().toISOString() })
})

app.get('/api/network/400', (_req, res) => {
  res.status(400).json({ error: 'Bad Request', message: 'The request was malformed.' })
})
app.get('/api/network/401', (_req, res) => {
  res.status(401).json({ error: 'Unauthorized', message: 'Authentication is required.' })
})
app.get('/api/network/403', (_req, res) => {
  res.status(403).json({ error: 'Forbidden', message: 'You do not have access to this resource.' })
})
app.get('/api/network/404', (_req, res) => {
  res.status(404).json({ error: 'Not Found', message: 'The requested resource does not exist.' })
})
app.get('/api/network/500', (_req, res) => {
  res.status(500).json({ error: 'Internal Server Error', message: 'An unexpected condition occurred.' })
})

app.get('/api/network/delayed', async (_req, res) => {
  await delay(3000)
  res.status(200).json({ status: 'ok', delayedMs: 3000 })
})

// Deliberately never responds — the client aborts via its own timeout to
// simulate a network timeout.
app.get('/api/network/timeout', () => {
  // no-op: intentionally hangs
})

app.get('/api/network/empty', (_req, res) => {
  res.status(204).end()
})

app.get('/api/network/large', (_req, res) => {
  const items = Array.from({ length: 5000 }, (_, i) => ({ id: i + 1, value: `item-${i + 1}` }))
  res.status(200).json({ status: 'ok', count: items.length, items })
})

app.get('/api/health', (_req, res) => {
  res.status(200).json({ status: 'ok' })
})

const httpServer = createServer(app)
const wss = new WebSocketServer({ server: httpServer, path: '/ws' })

wss.on('connection', (socket) => {
  socket.send('Connected to Web Automation Playground WebSocket server.')
  socket.on('message', (data) => {
    socket.send(`Echo: ${data.toString()}`)
  })
})

httpServer.listen(PORT, () => {
  console.log(`Web Automation Playground local backend listening on http://localhost:${PORT}`)
})
