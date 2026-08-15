import { Router } from 'express'
import { store } from '../data.js'
import { requireAdmin, requireAuth, sendError } from '../auth.js'

export const productsRouter = Router()

const SORT_FIELDS = {
  name: (a, b) => a.name.localeCompare(b.name),
  '-name': (a, b) => b.name.localeCompare(a.name),
  price: (a, b) => a.price - b.price,
  '-price': (a, b) => b.price - a.price,
}

// Reads are public (no auth) — a realistic "browse catalog" scenario.
productsRouter.get('/', (req, res) => {
  let items = [...store.products]

  if (req.query.category) {
    items = items.filter((p) => p.category.toLowerCase() === String(req.query.category).toLowerCase())
  }
  if (req.query.minPrice) items = items.filter((p) => p.price >= Number(req.query.minPrice))
  if (req.query.maxPrice) items = items.filter((p) => p.price <= Number(req.query.maxPrice))
  if (req.query.sort && SORT_FIELDS[req.query.sort]) items.sort(SORT_FIELDS[req.query.sort])

  const page = Math.max(1, Number(req.query.page) || 1)
  const pageSize = Math.min(100, Math.max(1, Number(req.query.pageSize) || 20))
  const total = items.length
  const start = (page - 1) * pageSize

  res.status(200).json({ items: items.slice(start, start + pageSize), page, pageSize, total })
})

productsRouter.get('/:id', (req, res) => {
  const product = store.products.find((p) => p.id === Number(req.params.id))
  if (!product) return sendError(res, 404, 'NotFound', `No product with id ${req.params.id}.`)
  res.status(200).json(product)
})

productsRouter.post('/', requireAuth, requireAdmin, (req, res) => {
  const { name, category, price, stock } = req.body ?? {}
  const details = {}
  if (!name) details.name = 'Name is required.'
  if (!category) details.category = 'Category is required.'
  if (typeof price !== 'number' || price < 0) details.price = 'Price must be a non-negative number.'
  if (typeof stock !== 'number' || stock < 0) details.stock = 'Stock must be a non-negative number.'
  if (Object.keys(details).length > 0) {
    return sendError(res, 400, 'ValidationError', 'One or more fields are invalid.', details)
  }

  const product = { id: Math.max(0, ...store.products.map((p) => p.id)) + 1, name, category, price, stock }
  store.products.push(product)
  res.status(201).json(product)
})

productsRouter.put('/:id', requireAuth, requireAdmin, (req, res) => {
  const product = store.products.find((p) => p.id === Number(req.params.id))
  if (!product) return sendError(res, 404, 'NotFound', `No product with id ${req.params.id}.`)

  const { name, category, price, stock } = req.body ?? {}
  if (name !== undefined) product.name = name
  if (category !== undefined) product.category = category
  if (price !== undefined) product.price = price
  if (stock !== undefined) product.stock = stock
  res.status(200).json(product)
})

productsRouter.delete('/:id', requireAuth, requireAdmin, (req, res) => {
  const index = store.products.findIndex((p) => p.id === Number(req.params.id))
  if (index === -1) return sendError(res, 404, 'NotFound', `No product with id ${req.params.id}.`)
  store.products.splice(index, 1)
  res.status(204).end()
})
