// In-memory, deterministic seed data for the REST API. Resets on server
// restart, or on demand via POST /api/test/reset. Kept intentionally
// separate from the frontend's client-side (localStorage) auth data — the
// two are independent stores, though the seed accounts below intentionally
// mirror src/constants/auth.ts so the same credentials work in both places.

const SEED_USERS = [
  { id: 'api-user-1', firstName: 'Standard', lastName: 'User', email: 'user@example.com', username: 'standarduser', password: 'User@123', phone: '5550100001', role: 'user', status: 'active' },
  { id: 'api-user-2', firstName: 'Admin', lastName: 'User', email: 'admin@example.com', username: 'adminuser', password: 'Admin@123', phone: '5550100002', role: 'admin', status: 'active' },
  { id: 'api-user-3', firstName: 'Locked', lastName: 'User', email: 'locked@example.com', username: 'lockeduser', password: 'Locked@123', phone: '5550100003', role: 'user', status: 'locked' },
  { id: 'api-user-4', firstName: 'Unverified', lastName: 'User', email: 'unverified@example.com', username: 'unverifieduser', password: 'User@123', phone: '5550100004', role: 'user', status: 'unverified' },
  { id: 'api-user-5', firstName: 'Disabled', lastName: 'User', email: 'disabled@example.com', username: 'disableduser', password: 'Disabled@123', phone: '5550100005', role: 'user', status: 'disabled' },
]

const CATEGORIES = ['Electronics', 'Clothing', 'Home', 'Sports', 'Books', 'Toys']
const PRODUCT_NAMES = ['Aurora', 'Nimbus', 'Zenith', 'Vertex', 'Cascade', 'Halo', 'Ember', 'Drift', 'Lumen', 'Rift']

function buildSeedProducts() {
  const products = []
  for (let i = 0; i < 20; i++) {
    products.push({
      id: i + 1,
      name: `${PRODUCT_NAMES[i % PRODUCT_NAMES.length]} ${CATEGORIES[i % CATEGORIES.length]} #${i + 1}`,
      category: CATEGORIES[i % CATEGORIES.length],
      price: 10 + ((i * 37) % 490),
      stock: (i * 13) % 200,
    })
  }
  return products
}

function buildSeedOrders(products) {
  return [
    { id: 1, productId: products[0].id, userId: 'api-user-1', quantity: 2, total: products[0].price * 2, status: 'Delivered', date: '2026-07-01' },
    { id: 2, productId: products[3].id, userId: 'api-user-1', quantity: 1, total: products[3].price, status: 'Shipped', date: '2026-07-15' },
    { id: 3, productId: products[7].id, userId: 'api-user-2', quantity: 3, total: products[7].price * 3, status: 'Pending', date: '2026-08-01' },
  ]
}

function deepClone(value) {
  return JSON.parse(JSON.stringify(value))
}

export const store = {
  users: [],
  products: [],
  orders: [],
  nextOrderId: 1,
}

export function resetData() {
  store.users = deepClone(SEED_USERS)
  store.products = buildSeedProducts()
  store.orders = deepClone(buildSeedOrders(store.products))
  store.nextOrderId = store.orders.length + 1
}

resetData()

export function toPublicUser(user) {
  const { password: _password, ...rest } = user
  return rest
}
