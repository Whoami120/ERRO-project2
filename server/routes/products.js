import express from 'express'
import Product from '../models/Product.js'

const router = express.Router()

// GET all products (optional ?roomId= filter)
router.get('/', async (req, res) => {
  try {
    const filter = {}
    if (req.query.roomId === 'null') {
      filter.roomId = null
    } else if (req.query.roomId) {
      filter.roomId = req.query.roomId
    }
    const products = await Product.find(filter).sort({ createdAt: 1 })
    res.json(products)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET one product by its id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id })
    if (!product) return res.status(404).json({ error: 'Product not found' })
    res.json(product)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// CREATE a product
router.post('/', async (req, res) => {
  try {
    const existing = await Product.findOne({ id: req.body.id })
    if (existing) return res.status(400).json({ error: 'A product with this id already exists' })
    const product = await Product.create(req.body)
    res.status(201).json(product)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// UPDATE a product
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    )
    if (!product) return res.status(404).json({ error: 'Product not found' })
    res.json(product)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// DELETE a product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ id: req.params.id })
    if (!product) return res.status(404).json({ error: 'Product not found' })
    res.json({ message: 'Product deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router