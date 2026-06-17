import express from 'express'
import Order from '../models/Order.js'

const router = express.Router()

// GET all orders (newest first) — admin
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 })
    res.json(orders)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// CREATE an order — customer checkout
router.post('/', async (req, res) => {
  try {
    const id = 'ERRO-' + Date.now().toString().slice(-6)
    const order = await Order.create({ ...req.body, id, status: 'pending' })
    res.status(201).json(order)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// UPDATE order status — admin
router.put('/:id', async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate(
      { id: req.params.id },
      { status: req.body.status },
      { new: true }
    )
    if (!order) return res.status(404).json({ error: 'Order not found' })
    res.json(order)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

export default router