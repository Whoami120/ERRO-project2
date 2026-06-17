// ─── ROOMS STORE — localStorage (temporary until backend) ───────
import {
  rooms as seedRooms,
  products as seedRoomProducts,
  universeProducts as seedUniverseProducts,
} from './universe.js'

const ROOMS_KEY = 'erro_rooms'

export function getRooms() {
  try {
    const raw = localStorage.getItem(ROOMS_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    // ignore parse errors and fall through to seed
  }
  // First load — seed from the static rooms
  localStorage.setItem(ROOMS_KEY, JSON.stringify(seedRooms))
  return seedRooms
}

export function saveRooms(rooms) {
  localStorage.setItem(ROOMS_KEY, JSON.stringify(rooms))
}

export function getRoomById(id) {
  return getRooms().find(r => r.id === id) || null
}

export function createRoom(room) {
  const rooms = getRooms()
  const newRoom = {
    ...room,
    products: room.products || [],
  }
  rooms.push(newRoom)
  saveRooms(rooms)
  return newRoom
}

export function updateRoom(id, updates) {
  const rooms = getRooms().map(r =>
    r.id === id ? { ...r, ...updates } : r
  )
  saveRooms(rooms)
}

export function deleteRoom(id) {
  const rooms = getRooms().filter(r => r.id !== id)
  saveRooms(rooms)
}

// Wipe the stored rooms and re-seed (useful during development)
export function resetRooms() {
  localStorage.removeItem(ROOMS_KEY)
  return getRooms()
}

// ─── PRODUCTS STORE ─────────────────────────────────────────────
const PRODUCTS_KEY = 'erro_products'

export function getProducts() {
  try {
    const raw = localStorage.getItem(PRODUCTS_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    // ignore and re-seed
  }
  // First load — seed from static products (room products + universe products)
  const seeded = [...seedRoomProducts, ...seedUniverseProducts]
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(seeded))
  return seeded
}

export function saveProducts(products) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products))
}

export function getProductById(id) {
  return getProducts().find(p => p.id === id) || null
}

export function getProductsByRoom(roomId) {
  return getProducts().filter(p => p.roomId === roomId)
}

export function getUniverseProducts() {
  return getProducts().filter(p => p.roomId === null || p.roomId === undefined)
}

export function createProduct(product) {
  const products = getProducts()
  const newProduct = {
    ...product,
    id: product.id || 'p-' + Date.now().toString().slice(-6),
  }
  products.push(newProduct)
  saveProducts(products)
  return newProduct
}

export function updateProduct(id, updates) {
  const products = getProducts().map(p =>
    p.id === id ? { ...p, ...updates } : p
  )
  saveProducts(products)
}

export function deleteProduct(id) {
  const products = getProducts().filter(p => p.id !== id)
  saveProducts(products)
}

export function resetProducts() {
  localStorage.removeItem(PRODUCTS_KEY)
  return getProducts()
}