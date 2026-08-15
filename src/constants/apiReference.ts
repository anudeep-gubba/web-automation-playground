// Documentation data for the API Reference playground module. Kept in sync
// by hand with server/routes/*.js — there is no runtime codegen, so update
// both sides together when the API changes.

export type AuthLevel = 'public' | 'auth' | 'admin' | 'self-or-admin'

export interface ApiEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  path: string
  auth: AuthLevel
  description: string
  requestBody?: string
  response: string
  curl: string
}

export interface ApiGroup {
  id: string
  title: string
  description: string
  endpoints: ApiEndpoint[]
}

export const AUTH_LEVEL_LABEL: Record<AuthLevel, string> = {
  public: 'Public',
  auth: 'Authenticated',
  admin: 'Admin only',
  'self-or-admin': 'Self or admin',
}

const BASE = 'http://localhost:4000'

export const API_REFERENCE: ApiGroup[] = [
  {
    id: 'auth',
    title: 'Auth',
    description: 'Register, log in, and inspect the current session. Tokens are Bearer JWTs with a 2-hour expiry.',
    endpoints: [
      {
        method: 'POST',
        path: '/api/auth/register',
        auth: 'public',
        description: 'Create a new user. Unlike the browser UI, API-registered accounts are active immediately (no email verification step exists on the API).',
        requestBody: '{\n  "firstName": "New",\n  "lastName": "Person",\n  "email": "newperson@example.com",\n  "username": "newperson",\n  "password": "NewUser@123",\n  "phone": "5551234567"\n}',
        response: '201 Created\n{ "id": "api-user-...", "firstName": "New", "status": "active", ... }\n\n400 ValidationError (missing/invalid fields, see "details")\n409 Conflict (email or username already taken)',
        curl: `curl -X POST ${BASE}/api/auth/register \\\n  -H 'Content-Type: application/json' \\\n  -d '{"firstName":"New","lastName":"Person","email":"newperson@example.com","username":"newperson","password":"NewUser@123"}'`,
      },
      {
        method: 'POST',
        path: '/api/auth/login',
        auth: 'public',
        description: 'Log in with an email or username. Returns a Bearer token plus the public user record.',
        requestBody: '{ "identifier": "standarduser", "password": "User@123" }',
        response: '200 OK\n{ "token": "eyJ...", "user": { "id": "api-user-1", ... } }\n\n400 ValidationError (missing identifier/password)\n401 InvalidCredentials\n403 ACCOUNT_LOCKED | ACCOUNT_DISABLED | ACCOUNT_UNVERIFIED',
        curl: `curl -X POST ${BASE}/api/auth/login \\\n  -H 'Content-Type: application/json' \\\n  -d '{"identifier":"standarduser","password":"User@123"}'`,
      },
      {
        method: 'GET',
        path: '/api/auth/me',
        auth: 'auth',
        description: 'Return the user matching the current Bearer token.',
        response: '200 OK\n{ "id": "api-user-1", "username": "standarduser", ... }\n\n401 Unauthorized (missing/invalid/expired token)',
        curl: `curl ${BASE}/api/auth/me -H "Authorization: Bearer $TOKEN"`,
      },
      {
        method: 'POST',
        path: '/api/auth/logout',
        auth: 'auth',
        description: 'Stateless JWTs cannot be revoked server-side; this endpoint exists purely so clients have a symmetric call to make.',
        response: '200 OK\n{ "status": "ok" }',
        curl: `curl -X POST ${BASE}/api/auth/logout -H "Authorization: Bearer $TOKEN"`,
      },
    ],
  },
  {
    id: 'users',
    title: 'Users',
    description: 'Listing and creating users is admin-only; reading/updating a single user is allowed for that user or an admin.',
    endpoints: [
      {
        method: 'GET',
        path: '/api/users?page=1&pageSize=20',
        auth: 'admin',
        description: 'Paginated list of all users. A valid non-admin token gives a clean 403 here.',
        response: '200 OK\n{ "items": [...], "page": 1, "pageSize": 20, "total": 5 }\n\n403 Forbidden (non-admin token)',
        curl: `curl "${BASE}/api/users?page=1&pageSize=20" -H "Authorization: Bearer $ADMIN_TOKEN"`,
      },
      {
        method: 'GET',
        path: '/api/users/:id',
        auth: 'self-or-admin',
        description: 'Fetch a single user by id.',
        response: '200 OK\n{ "id": "...", ... }\n\n403 Forbidden (not self, not admin)\n404 NotFound',
        curl: `curl ${BASE}/api/users/api-user-1 -H "Authorization: Bearer $TOKEN"`,
      },
      {
        method: 'POST',
        path: '/api/users',
        auth: 'admin',
        description: 'Create a user (admin-only alternative to self-service registration).',
        requestBody: '{ "firstName": "...", "lastName": "...", "email": "...", "username": "...", "password": "...", "role": "user" }',
        response: '201 Created\n{ "id": "...", ... }\n\n400 ValidationError\n409 Conflict (duplicate email)',
        curl: `curl -X POST ${BASE}/api/users -H "Authorization: Bearer $ADMIN_TOKEN" -H 'Content-Type: application/json' -d '{...}'`,
      },
      {
        method: 'PUT',
        path: '/api/users/:id',
        auth: 'self-or-admin',
        description: 'Update firstName/lastName/phone. Only an admin may also change status or role, even on their own account.',
        requestBody: '{ "firstName": "Updated" }',
        response: '200 OK\n{ "id": "...", "firstName": "Updated", ... }\n\n403 Forbidden\n404 NotFound',
        curl: `curl -X PUT ${BASE}/api/users/api-user-1 -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' -d '{"firstName":"Updated"}'`,
      },
      {
        method: 'DELETE',
        path: '/api/users/:id',
        auth: 'admin',
        description: 'Delete a user.',
        response: '204 No Content\n\n403 Forbidden (non-admin)\n404 NotFound',
        curl: `curl -X DELETE ${BASE}/api/users/api-user-1 -H "Authorization: Bearer $ADMIN_TOKEN"`,
      },
    ],
  },
  {
    id: 'products',
    title: 'Products',
    description: 'The product catalog is publicly readable (no token needed); writes are admin-only.',
    endpoints: [
      {
        method: 'GET',
        path: '/api/products?category=&minPrice=&maxPrice=&sort=&page=&pageSize=',
        auth: 'public',
        description: 'List products with optional category/price filters, sort (name, -name, price, -price), and pagination.',
        response: '200 OK\n{ "items": [...], "page": 1, "pageSize": 20, "total": 20 }',
        curl: `curl "${BASE}/api/products?category=Electronics&page=1&pageSize=5"`,
      },
      {
        method: 'GET',
        path: '/api/products/:id',
        auth: 'public',
        description: 'Fetch a single product.',
        response: '200 OK\n{ "id": 1, "name": "...", ... }\n\n404 NotFound',
        curl: `curl ${BASE}/api/products/1`,
      },
      {
        method: 'POST',
        path: '/api/products',
        auth: 'admin',
        description: 'Create a product.',
        requestBody: '{ "name": "Test Widget", "category": "Books", "price": 10, "stock": 5 }',
        response: '201 Created\n{ "id": 21, "name": "Test Widget", ... }\n\n400 ValidationError\n403 Forbidden (non-admin)',
        curl: `curl -X POST ${BASE}/api/products -H "Authorization: Bearer $ADMIN_TOKEN" -H 'Content-Type: application/json' -d '{"name":"Test Widget","category":"Books","price":10,"stock":5}'`,
      },
      {
        method: 'PUT',
        path: '/api/products/:id',
        auth: 'admin',
        description: 'Update any subset of name/category/price/stock.',
        requestBody: '{ "price": 25 }',
        response: '200 OK\n{ "id": 1, "price": 25, ... }\n\n404 NotFound',
        curl: `curl -X PUT ${BASE}/api/products/1 -H "Authorization: Bearer $ADMIN_TOKEN" -H 'Content-Type: application/json' -d '{"price":25}'`,
      },
      {
        method: 'DELETE',
        path: '/api/products/:id',
        auth: 'admin',
        description: 'Delete a product.',
        response: '204 No Content\n\n404 NotFound',
        curl: `curl -X DELETE ${BASE}/api/products/1 -H "Authorization: Bearer $ADMIN_TOKEN"`,
      },
    ],
  },
  {
    id: 'orders',
    title: 'Orders',
    description: 'Every endpoint requires a token. Non-admins only ever see and manage their own orders.',
    endpoints: [
      {
        method: 'GET',
        path: '/api/orders?status=&page=&pageSize=',
        auth: 'auth',
        description: "List orders — an admin's token returns everyone's orders; any other token returns only that user's own.",
        response: '200 OK\n{ "items": [...], "page": 1, "pageSize": 20, "total": 3 }',
        curl: `curl ${BASE}/api/orders -H "Authorization: Bearer $TOKEN"`,
      },
      {
        method: 'GET',
        path: '/api/orders/:id',
        auth: 'auth',
        description: "Fetch a single order. Viewing someone else's order (without admin) returns 403.",
        response: '200 OK\n{ "id": 1, "productId": 1, "userId": "api-user-1", ... }\n\n403 Forbidden\n404 NotFound',
        curl: `curl ${BASE}/api/orders/1 -H "Authorization: Bearer $TOKEN"`,
      },
      {
        method: 'POST',
        path: '/api/orders',
        auth: 'auth',
        description: 'Place an order for the authenticated user against an existing product.',
        requestBody: '{ "productId": 1, "quantity": 2 }',
        response: '201 Created\n{ "id": 4, "status": "Pending", "total": 20, ... }\n\n400 ValidationError (unknown productId, or quantity < 1)',
        curl: `curl -X POST ${BASE}/api/orders -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' -d '{"productId":1,"quantity":2}'`,
      },
      {
        method: 'PUT',
        path: '/api/orders/:id',
        auth: 'admin',
        description: 'Change an order\'s status (Pending/Shipped/Delivered/Cancelled). Admin only, regardless of order owner.',
        requestBody: '{ "status": "Shipped" }',
        response: '200 OK\n{ "id": 4, "status": "Shipped", ... }\n\n400 ValidationError (invalid status)\n403 Forbidden (non-admin)\n404 NotFound',
        curl: `curl -X PUT ${BASE}/api/orders/4 -H "Authorization: Bearer $ADMIN_TOKEN" -H 'Content-Type: application/json' -d '{"status":"Shipped"}'`,
      },
      {
        method: 'DELETE',
        path: '/api/orders/:id',
        auth: 'auth',
        description: 'Cancel an order. Owners may only cancel while it is still "Pending"; an admin can cancel any order.',
        response: '204 No Content\n\n403 Forbidden (not owner/admin)\n404 NotFound\n409 Conflict (non-Pending order, non-admin caller)',
        curl: `curl -X DELETE ${BASE}/api/orders/4 -H "Authorization: Bearer $TOKEN"`,
      },
    ],
  },
  {
    id: 'network',
    title: 'Network simulation',
    description: 'Also driven interactively from the Network playground page. Every response is deterministic.',
    endpoints: [
      { method: 'GET', path: '/api/network/success', auth: 'public', description: 'Always 200.', response: '200 OK\n{ "status": "ok", "data": [1,2,3], "timestamp": "..." }', curl: `curl ${BASE}/api/network/success` },
      { method: 'GET', path: '/api/network/400', auth: 'public', description: 'Always 400.', response: '400 Bad Request', curl: `curl ${BASE}/api/network/400` },
      { method: 'GET', path: '/api/network/401', auth: 'public', description: 'Always 401.', response: '401 Unauthorized', curl: `curl ${BASE}/api/network/401` },
      { method: 'GET', path: '/api/network/403', auth: 'public', description: 'Always 403.', response: '403 Forbidden', curl: `curl ${BASE}/api/network/403` },
      { method: 'GET', path: '/api/network/404', auth: 'public', description: 'Always 404.', response: '404 Not Found', curl: `curl ${BASE}/api/network/404` },
      { method: 'GET', path: '/api/network/500', auth: 'public', description: 'Always 500.', response: '500 Internal Server Error', curl: `curl ${BASE}/api/network/500` },
      { method: 'GET', path: '/api/network/delayed', auth: 'public', description: 'Responds 200 after a fixed 3s delay.', response: '200 OK (after 3000ms)\n{ "status": "ok", "delayedMs": 3000 }', curl: `curl ${BASE}/api/network/delayed` },
      { method: 'GET', path: '/api/network/timeout', auth: 'public', description: 'Never responds — pair with a client-side timeout/AbortController.', response: '(hangs indefinitely)', curl: `curl --max-time 3 ${BASE}/api/network/timeout` },
      { method: 'GET', path: '/api/network/empty', auth: 'public', description: 'Always 204 with no body.', response: '204 No Content', curl: `curl -i ${BASE}/api/network/empty` },
      { method: 'GET', path: '/api/network/large', auth: 'public', description: 'Returns a 5,000-item JSON array.', response: '200 OK\n{ "status": "ok", "count": 5000, "items": [...] }', curl: `curl ${BASE}/api/network/large` },
    ],
  },
  {
    id: 'test',
    title: 'Test utility',
    description: 'Not part of the "real" API surface — a convenience for resetting state between test runs.',
    endpoints: [
      {
        method: 'POST',
        path: '/api/test/reset',
        auth: 'public',
        description: 'Restore users, products and orders to their seeded state. Unauthenticated on purpose.',
        response: '200 OK\n{ "status": "reset" }',
        curl: `curl -X POST ${BASE}/api/test/reset`,
      },
    ],
  },
]
