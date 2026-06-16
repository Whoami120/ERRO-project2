// ─── ORDERS — LOCAL STORAGE (temporary until backend) ───────────

const STORAGE_KEY = 'erro_orders'

export function getOrders() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveOrder(order) {
  const orders = getOrders()
  const newOrder = {
    ...order,
    id: 'ERRO-' + Date.now().toString().slice(-6),
    createdAt: new Date().toISOString(),
    status: 'pending',
  }
  orders.unshift(newOrder)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders))
  return newOrder
}

export function updateOrderStatus(orderId, status) {
  const orders = getOrders().map(o =>
    o.id === orderId ? { ...o, status } : o
  )
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders))
}