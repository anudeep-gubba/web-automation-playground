// Express app definition, separated from server/index.js's listen()/
// WebSocket bootstrap so it can be imported directly in tests (via
// supertest) without opening a real socket.

import express from 'express'
import cors from 'cors'

import { authRouter } from './routes/auth.js'
import { usersRouter } from './routes/users.js'
import { productsRouter } from './routes/products.js'
import { ordersRouter } from './routes/orders.js'
import { networkRouter } from './routes/network.js'
import { testRouter } from './routes/test.js'

export function createApp() {
  const app = express()
  app.use(cors())
  app.use(express.json())

  app.get('/api', (_req, res) => {
    res.status(200).json({
      name: 'Web Automation Playground API',
      endpoints: {
        auth: ['POST /api/auth/register', 'POST /api/auth/login', 'GET /api/auth/me', 'POST /api/auth/logout'],
        users: ['GET /api/users', 'GET /api/users/:id', 'POST /api/users', 'PUT /api/users/:id', 'DELETE /api/users/:id'],
        products: ['GET /api/products', 'GET /api/products/:id', 'POST /api/products', 'PUT /api/products/:id', 'DELETE /api/products/:id'],
        orders: ['GET /api/orders', 'GET /api/orders/:id', 'POST /api/orders', 'PUT /api/orders/:id', 'DELETE /api/orders/:id'],
        network: ['GET /api/network/success', 'GET /api/network/{400,401,403,404,500}', 'GET /api/network/delayed', 'GET /api/network/timeout', 'GET /api/network/empty', 'GET /api/network/large'],
        test: ['POST /api/test/reset'],
        websocket: ['ws://localhost:4000/ws'],
      },
      docs: 'See README.md "Local backend / REST API" section for request/response examples.',
    })
  })

  app.get('/api/health', (_req, res) => {
    res.status(200).json({ status: 'ok' })
  })

  app.use('/api/auth', authRouter)
  app.use('/api/users', usersRouter)
  app.use('/api/products', productsRouter)
  app.use('/api/orders', ordersRouter)
  app.use('/api/network', networkRouter)
  app.use('/api/test', testRouter)

  // Fallback error handler so a thrown/rejected error inside a route becomes
  // a clean JSON 500 instead of an HTML stack trace or a hung connection.
  // eslint-disable-next-line no-unused-vars
  app.use((err, _req, res, _next) => {
    console.error(err)
    res.status(500).json({ error: 'Internal Server Error', message: 'An unexpected condition occurred.' })
  })

  return app
}
