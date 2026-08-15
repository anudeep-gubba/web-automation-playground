import { Router } from 'express'
import { store } from '../data.js'
import { requireAuth, sendError } from '../auth.js'

export const ordersRouter = Router()

ordersRouter.use(requireAuth)

const ORDER_STATUSES = ['Pending', 'Shipped', 'Delivered', 'Cancelled']

function canView(order, user) {
  return user.role === 'admin' || order.userId === user.id
}

ordersRouter.get('/', (req, res) => {
  let items = req.user.role === 'admin' ? [...store.orders] : store.orders.filter((o) => o.userId === req.user.id)
  if (req.query.status) items = items.filter((o) => o.status === req.query.status)

  const page = Math.max(1, Number(req.query.page) || 1)
  const pageSize = Math.min(100, Math.max(1, Number(req.query.pageSize) || 20))
  const total = items.length
  const start = (page - 1) * pageSize

  res.status(200).json({ items: items.slice(start, start + pageSize), page, pageSize, total })
})

ordersRouter.get('/:id', (req, res) => {
  const order = store.orders.find((o) => o.id === Number(req.params.id))
  if (!order) return sendError(res, 404, 'NotFound', `No order with id ${req.params.id}.`)
  if (!canView(order, req.user)) return sendError(res, 403, 'Forbidden', 'You may only view your own orders.')
  res.status(200).json(order)
})

ordersRouter.post('/', (req, res) => {
  const { productId, quantity } = req.body ?? {}
  const product = store.products.find((p) => p.id === Number(productId))
  if (!product) {
    return sendError(res, 400, 'ValidationError', 'productId does not reference a known product.', { productId: 'Unknown product.' })
  }
  if (!Number.isInteger(quantity) || quantity < 1) {
    return sendError(res, 400, 'ValidationError', 'quantity must be a positive integer.', { quantity: 'Must be a positive integer.' })
  }

  const order = {
    id: store.nextOrderId++,
    productId: product.id,
    userId: req.user.id,
    quantity,
    total: product.price * quantity,
    status: 'Pending',
    date: new Date().toISOString().slice(0, 10),
  }
  store.orders.push(order)
  res.status(201).json(order)
})

ordersRouter.put('/:id', (req, res) => {
  const order = store.orders.find((o) => o.id === Number(req.params.id))
  if (!order) return sendError(res, 404, 'NotFound', `No order with id ${req.params.id}.`)

  const { status } = req.body ?? {}
  if (req.user.role !== 'admin') {
    return sendError(res, 403, 'Forbidden', 'Only an admin may update order status.')
  }
  if (!ORDER_STATUSES.includes(status)) {
    return sendError(res, 400, 'ValidationError', `status must be one of: ${ORDER_STATUSES.join(', ')}.`)
  }
  order.status = status
  res.status(200).json(order)
})

ordersRouter.delete('/:id', (req, res) => {
  const index = store.orders.findIndex((o) => o.id === Number(req.params.id))
  if (index === -1) return sendError(res, 404, 'NotFound', `No order with id ${req.params.id}.`)
  const order = store.orders[index]
  if (!canView(order, req.user)) return sendError(res, 403, 'Forbidden', 'You may only cancel your own orders.')
  if (order.status !== 'Pending' && req.user.role !== 'admin') {
    return sendError(res, 409, 'Conflict', `Cannot cancel an order with status "${order.status}".`)
  }
  store.orders.splice(index, 1)
  res.status(204).end()
})
