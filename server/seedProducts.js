import dotenv from 'dotenv'
import mongoose from 'mongoose'
import Product from './models/Product.js'

dotenv.config()

const seedProducts = [
  // Void Protocol
  {
    id: 'vp-001', roomId: 'void-protocol', name: 'Signal Jacket',
    description: 'A structured oversized jacket built for dead frequencies. Cold-washed black with minimal seaming.',
    price: 890, currency: 'MAD', sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80'], inStock: true,
  },
  {
    id: 'vp-002', roomId: 'void-protocol', name: 'Null Tee',
    description: 'A raw-hem oversized tee. The fabric is washed until memory fades.',
    price: 290, currency: 'MAD', sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80'], inStock: true,
  },
  {
    id: 'vp-003', roomId: 'void-protocol', name: 'Protocol Cargo',
    description: 'Technical cargo trousers. Pockets placed for purpose, not decoration.',
    price: 650, currency: 'MAD', sizes: ['S', 'M', 'L', 'XL'],
    images: ['https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80'], inStock: true,
  },
  // Red Ceremony
  {
    id: 'rc-001', roomId: 'red-ceremony', name: 'Altar Coat',
    description: 'A long dramatic coat in deep burgundy. For those who enter rooms and own them.',
    price: 1200, currency: 'MAD', sizes: ['S', 'M', 'L', 'XL'],
    images: ['https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80'], inStock: true,
  },
  {
    id: 'rc-002', roomId: 'red-ceremony', name: 'Ceremony Shirt',
    description: 'Oversized silk-touch shirt. The collar is a statement. The cuffs are a promise.',
    price: 450, currency: 'MAD', sizes: ['XS', 'S', 'M', 'L'],
    images: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80'], inStock: true,
  },
  // ERRO Universe (no room)
  {
    id: 'u-001', roomId: null, name: 'Core Tee',
    description: 'The simplest thing we make. Heavyweight cotton, dropped shoulders, no logo. Just fabric and silence.',
    price: 220, currency: 'MAD', sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80'], inStock: true,
  },
  {
    id: 'u-002', roomId: null, name: 'Void Hoodie',
    description: 'Oversized. Heavy. The kind of hoodie you never take off.',
    price: 390, currency: 'MAD', sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: ['https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80'], inStock: true,
  },
  {
    id: 'u-003', roomId: null, name: 'Base Longsleeve',
    description: 'Fitted at the body, long at the cuff. A foundation piece for every room.',
    price: 260, currency: 'MAD', sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: ['https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80'], inStock: true,
  },
  {
    id: 'u-004', roomId: null, name: 'Erro Cap',
    description: 'Six-panel unstructured cap. Washed black. No excess.',
    price: 180, currency: 'MAD', sizes: ['One Size'],
    images: ['https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80'], inStock: true,
  },
]

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected. Seeding products...')
    await Product.deleteMany({})
    await Product.insertMany(seedProducts)
    console.log(`Seeded ${seedProducts.length} products.`)
  } catch (err) {
    console.error('Seed error:', err.message)
  } finally {
    await mongoose.disconnect()
    process.exit()
  }
}

run()