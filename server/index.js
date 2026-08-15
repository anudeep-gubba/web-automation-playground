// Bootstrap: starts the HTTP + WebSocket servers. Route/app wiring lives in
// server/app.js so it can be imported standalone in tests.

import { createServer } from 'node:http'
import { WebSocketServer } from 'ws'
import { createApp } from './app.js'

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000

const app = createApp()
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
  console.log(`REST API reference: http://localhost:${PORT}/api`)
})
