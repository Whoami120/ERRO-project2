// ─── ERRO API CLIENT ────────────────────────────────────────────
const BASE = '/api'

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || `Request failed: ${res.status}`)
  }
  return res.json()
}

// ── ROOMS ──
export const roomsApi = {
  getAll:  ()            => request('/rooms'),
  getOne:  (id)          => request(`/rooms/${id}`),
  create:  (room)        => request('/rooms', { method: 'POST', body: JSON.stringify(room) }),
  update:  (id, updates) => request(`/rooms/${id}`, { method: 'PUT', body: JSON.stringify(updates) }),
  remove:  (id)          => request(`/rooms/${id}`, { method: 'DELETE' }),
}

// ── PRODUCTS ──
export const productsApi = {
  getAll:       ()            => request('/products'),
  getOne:       (id)          => request(`/products/${id}`),
  getByRoom:    (roomId)      => request(`/products?roomId=${roomId}`),
  getUniverse:  ()            => request('/products?roomId=null'),
  create:       (product)     => request('/products', { method: 'POST', body: JSON.stringify(product) }),
  update:       (id, updates) => request(`/products/${id}`, { method: 'PUT', body: JSON.stringify(updates) }),
  remove:       (id)          => request(`/products/${id}`, { method: 'DELETE' }),
}

// ── ORDERS ──
export const ordersApi = {
  getAll:        ()           => request('/orders'),
  create:        (order)      => request('/orders', { method: 'POST', body: JSON.stringify(order) }),
  updateStatus:  (id, status) => request(`/orders/${id}`, { method: 'PUT', body: JSON.stringify({ status }) }),
}