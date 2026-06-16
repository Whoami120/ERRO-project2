// ─── ROOMS STORE — localStorage (temporary until backend) ───────
import { rooms as seedRooms } from './universe.js'

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