// @vitest-environment node
//
// Integration tests for the local REST API (server/app.js), exercised via
// supertest against the Express app directly — no real socket is opened.
import { beforeEach, describe, expect, it } from 'vitest'
import request from 'supertest'
import { createApp } from '../../server/app.js'
import { resetData } from '../../server/data.js'

const app = createApp()

async function loginAs(identifier, password) {
  const res = await request(app).post('/api/auth/login').send({ identifier, password })
  return res.body.token
}

beforeEach(() => {
  resetData()
})

describe('GET /api', () => {
  it('lists the available endpoint groups', async () => {
    const res = await request(app).get('/api')
    expect(res.status).toBe(200)
    expect(res.body.endpoints).toHaveProperty('auth')
    expect(res.body.endpoints).toHaveProperty('products')
  })
})

describe('POST /api/auth/register', () => {
  it('creates a new active user', async () => {
    const res = await request(app).post('/api/auth/register').send({
      firstName: 'New',
      lastName: 'Person',
      email: 'newperson@example.com',
      username: 'newperson',
      password: 'NewUser@123',
    })
    expect(res.status).toBe(201)
    expect(res.body.status).toBe('active')
    expect(res.body).not.toHaveProperty('password')
  })

  it('rejects a duplicate email with 409', async () => {
    const res = await request(app).post('/api/auth/register').send({
      firstName: 'Dup',
      lastName: 'User',
      email: 'user@example.com',
      username: 'dupuser',
      password: 'NewUser@123',
    })
    expect(res.status).toBe(409)
  })

  it('rejects an invalid payload with 400 and field details', async () => {
    const res = await request(app).post('/api/auth/register').send({ firstName: '' })
    expect(res.status).toBe(400)
    expect(res.body.details).toBeTruthy()
  })
})

describe('POST /api/auth/login', () => {
  it('returns a token for valid credentials', async () => {
    const res = await request(app).post('/api/auth/login').send({ identifier: 'standarduser', password: 'User@123' })
    expect(res.status).toBe(200)
    expect(res.body.token).toBeTruthy()
    expect(res.body.user.email).toBe('user@example.com')
  })

  it('returns 401 for a wrong password', async () => {
    const res = await request(app).post('/api/auth/login').send({ identifier: 'standarduser', password: 'wrong' })
    expect(res.status).toBe(401)
  })

  it('returns 403 for a locked account', async () => {
    const res = await request(app).post('/api/auth/login').send({ identifier: 'lockeduser', password: 'Locked@123' })
    expect(res.status).toBe(403)
    expect(res.body.error).toBe('ACCOUNT_LOCKED')
  })
})

describe('GET /api/auth/me', () => {
  it('returns 401 without a token', async () => {
    const res = await request(app).get('/api/auth/me')
    expect(res.status).toBe(401)
  })

  it('returns the authenticated user with a valid token', async () => {
    const token = await loginAs('standarduser', 'User@123')
    const res = await request(app).get('/api/auth/me').set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(res.body.username).toBe('standarduser')
  })
})

describe('GET /api/users', () => {
  it('returns 403 for a non-admin token', async () => {
    const token = await loginAs('standarduser', 'User@123')
    const res = await request(app).get('/api/users').set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(403)
  })

  it('returns the user list for an admin token', async () => {
    const token = await loginAs('adminuser', 'Admin@123')
    const res = await request(app).get('/api/users').set('Authorization', `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(res.body.items.length).toBeGreaterThan(0)
  })
})

describe('GET /api/products', () => {
  it('is publicly readable without auth', async () => {
    const res = await request(app).get('/api/products?page=1&pageSize=5')
    expect(res.status).toBe(200)
    expect(res.body.items.length).toBeLessThanOrEqual(5)
  })

  it('filters by category', async () => {
    const res = await request(app).get('/api/products?category=Books')
    expect(res.status).toBe(200)
    expect(res.body.items.every((p) => p.category === 'Books')).toBe(true)
  })

  it('rejects product creation without an admin token', async () => {
    const token = await loginAs('standarduser', 'User@123')
    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Test', category: 'Books', price: 10, stock: 5 })
    expect(res.status).toBe(403)
  })

  it('allows product creation with an admin token', async () => {
    const token = await loginAs('adminuser', 'Admin@123')
    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Test Widget', category: 'Books', price: 10, stock: 5 })
    expect(res.status).toBe(201)
    expect(res.body.name).toBe('Test Widget')
  })
})

describe('POST /api/orders', () => {
  it('creates an order for the authenticated user', async () => {
    const token = await loginAs('standarduser', 'User@123')
    const res = await request(app).post('/api/orders').set('Authorization', `Bearer ${token}`).send({ productId: 1, quantity: 2 })
    expect(res.status).toBe(201)
    expect(res.body.status).toBe('Pending')
  })

  it('rejects an unknown productId with 400', async () => {
    const token = await loginAs('standarduser', 'User@123')
    const res = await request(app).post('/api/orders').set('Authorization', `Bearer ${token}`).send({ productId: 999999, quantity: 1 })
    expect(res.status).toBe(400)
  })

  it("prevents a user from viewing another user's order", async () => {
    const adminToken = await loginAs('adminuser', 'Admin@123')
    const created = await request(app).post('/api/orders').set('Authorization', `Bearer ${adminToken}`).send({ productId: 1, quantity: 1 })

    const userToken = await loginAs('standarduser', 'User@123')
    const res = await request(app).get(`/api/orders/${created.body.id}`).set('Authorization', `Bearer ${userToken}`)
    expect(res.status).toBe(403)
  })
})

describe('POST /api/test/reset', () => {
  it('restores seeded data after mutation', async () => {
    const token = await loginAs('adminuser', 'Admin@123')
    await request(app).delete('/api/products/1').set('Authorization', `Bearer ${token}`)

    const before = await request(app).get('/api/products/1')
    expect(before.status).toBe(404)

    await request(app).post('/api/test/reset')

    const after = await request(app).get('/api/products/1')
    expect(after.status).toBe(200)
  })
})
