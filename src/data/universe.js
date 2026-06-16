// ─── ERRO UNIVERSE — MOCK DATA ──────────────────────────────────

export const universe = {
  name: 'ERRO',
  tagline: 'Enter the Universe',
  description: 'ERRO is not a store. It is a collection of worlds.',
}

// ─── UNIVERSE PRODUCTS (no room — free stars) ───────────────────
export const universeProducts = [
  {
    id: 'u-001',
    roomId: null,
    name: 'Core Tee',
    description: 'The simplest thing we make. Heavyweight cotton, dropped shoulders, no logo. Just fabric and silence.',
    price: 220,
    currency: 'MAD',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
    ],
    inStock: true,
  },
  {
    id: 'u-002',
    roomId: null,
    name: 'Void Hoodie',
    description: 'Oversized. Heavy. The kind of hoodie you never take off.',
    price: 390,
    currency: 'MAD',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=800&q=80',
    ],
    inStock: true,
  },
  {
    id: 'u-003',
    roomId: null,
    name: 'Base Longsleeve',
    description: 'Fitted at the body, long at the cuff. A foundation piece for every room.',
    price: 260,
    currency: 'MAD',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: [
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80',
    ],
    inStock: true,
  },
  {
    id: 'u-004',
    roomId: null,
    name: 'Erro Cap',
    description: 'Six-panel unstructured cap. Washed black. No excess.',
    price: 180,
    currency: 'MAD',
    sizes: ['ONE SIZE'],
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&q=80',
    ],
    inStock: true,
  },
]

// ─── ROOMS / DROPS ───────────────────────────────────────────────
export const rooms = [
  {
    id: 'void-protocol',
    name: 'Void Protocol',
    tagline: 'Where silence has a shape.',
    mood: 'Cold. Minimal. Like the inside of a forgotten satellite.',
    status: 'open',
    bg: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=1600&q=80',
    colors: {
      accent:  '#4fc3f7',
      surface: '#050d14',
      text:    '#b0d4e8',
      muted:   '#3a5566',
      border:  '#0d2233',
    },
    products: ['vp-001', 'vp-002', 'vp-003'],
  },
  {
    id: 'red-ceremony',
    name: 'Red Ceremony',
    tagline: 'Power is a ritual.',
    mood: 'Intense. Theatrical. Every piece feels like an offering.',
    status: 'open',
    bg: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80',
    colors: {
      accent:  '#c0392b',
      surface: '#0f0505',
      text:    '#e8d5d5',
      muted:   '#6b3030',
      border:  '#2a0f0f',
    },
    products: ['rc-001', 'rc-002'],
  },
  {
    id: 'dust-memory',
    name: 'Dust & Memory',
    tagline: 'Everything beautiful decays.',
    mood: 'Melancholic. Warm decay. Vintage futures.',
    status: 'coming-soon',
    bg: 'https://images.unsplash.com/photo-1509023464722-18d996393ca8?w=1600&q=80',
    colors: {
      accent:  '#c8a96e',
      surface: '#0d0a07',
      text:    '#e0d5c5',
      muted:   '#6b5a3a',
      border:  '#2a2015',
    },
    products: [],
  },
]

// ─── ROOM PRODUCTS ───────────────────────────────────────────────
export const products = [
  // ── Void Protocol ──────────────────────────────────────────────
  {
    id: 'vp-001',
    roomId: 'void-protocol',
    name: 'Signal Jacket',
    description: 'A structured oversized jacket built for dead frequencies. Cold-washed black with minimal seaming.',
    price: 890,
    currency: 'MAD',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80'],
    inStock: true,
  },
  {
    id: 'vp-002',
    roomId: 'void-protocol',
    name: 'Null Tee',
    description: 'A raw-hem oversized tee. The fabric is washed until memory fades.',
    price: 290,
    currency: 'MAD',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80'],
    inStock: true,
  },
  {
    id: 'vp-003',
    roomId: 'void-protocol',
    name: 'Protocol Cargo',
    description: 'Technical cargo trousers. Pockets placed for purpose, not decoration.',
    price: 650,
    currency: 'MAD',
    sizes: ['S', 'M', 'L', 'XL'],
    images: ['https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&q=80'],
    inStock: true,
  },

  // ── Red Ceremony ───────────────────────────────────────────────
  {
    id: 'rc-001',
    roomId: 'red-ceremony',
    name: 'Altar Coat',
    description: 'A long dramatic coat in deep burgundy. For those who enter rooms and own them.',
    price: 1200,
    currency: 'MAD',
    sizes: ['S', 'M', 'L', 'XL'],
    images: ['https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800&q=80'],
    inStock: true,
  },
  {
    id: 'rc-002',
    roomId: 'red-ceremony',
    name: 'Ceremony Shirt',
    description: 'Oversized silk-touch shirt. The collar is a statement. The cuffs are a promise.',
    price: 450,
    currency: 'MAD',
    sizes: ['XS', 'S', 'M', 'L'],
    images: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80'],
    inStock: true,
  },
]

// ─── HELPERS ────────────────────────────────────────────────────
export function getRoomById(id) {
  return rooms.find(r => r.id === id) || null
}

export function getProductById(id) {
  return products.find(p => p.id === id)
    || universeProducts.find(p => p.id === id)
    || null
}

export function getProductsByRoom(roomId) {
  return products.filter(p => p.roomId === roomId)
}