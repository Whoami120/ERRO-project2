import dotenv from 'dotenv'
import mongoose from 'mongoose'
import Room from './models/Room.js'

dotenv.config()

const seedRooms = [
  {
    id: 'void-protocol',
    name: 'Void Protocol',
    tagline: 'Where silence has a shape.',
    mood: 'Cold. Minimal. Like the inside of a forgotten satellite.',
    status: 'open',
    bg: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1600&q=80',
    colors: { accent: '#4fc3f7', surface: '#050d14', text: '#b0d4e8', muted: '#3a5566', border: '#0d2233' },
    products: ['vp-001', 'vp-002', 'vp-003'],
  },
  {
    id: 'red-ceremony',
    name: 'Red Ceremony',
    tagline: 'Power is a ritual.',
    mood: 'Intense. Theatrical. Every piece feels like an offering.',
    status: 'open',
    bg: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80',
    colors: { accent: '#c0392b', surface: '#0f0505', text: '#e8d5d5', muted: '#6b3030', border: '#2a0f0f' },
    products: ['rc-001', 'rc-002'],
  },
  {
    id: 'dust-memory',
    name: 'Dust & Memory',
    tagline: 'Everything beautiful decays.',
    mood: 'Melancholic. Warm decay. Vintage futures.',
    status: 'coming-soon',
    bg: 'https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=1600&q=80',
    colors: { accent: '#c8a96e', surface: '#0d0a07', text: '#e0d5c5', muted: '#6b5a3a', border: '#2a2015' },
    products: [],
  },
]

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected. Seeding rooms...')
    await Room.deleteMany({})           // clear existing
    await Room.insertMany(seedRooms)    // insert fresh
    console.log(`Seeded ${seedRooms.length} rooms.`)
  } catch (err) {
    console.error('Seed error:', err.message)
  } finally {
    await mongoose.disconnect()
    process.exit()
  }
}

run()