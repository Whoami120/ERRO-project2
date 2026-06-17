import express from 'express'
import Room from '../models/Room.js'

const router = express.Router()

// GET all rooms
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find().sort({ createdAt: 1 })
    res.json(rooms)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// GET one room by its id
router.get('/:id', async (req, res) => {
  try {
    const room = await Room.findOne({ id: req.params.id })
    if (!room) return res.status(404).json({ error: 'Room not found' })
    res.json(room)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// CREATE a room
router.post('/', async (req, res) => {
  try {
    const existing = await Room.findOne({ id: req.body.id })
    if (existing) return res.status(400).json({ error: 'A room with this id already exists' })
    const room = await Room.create(req.body)
    res.status(201).json(room)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// UPDATE a room
router.put('/:id', async (req, res) => {
  try {
    const room = await Room.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    )
    if (!room) return res.status(404).json({ error: 'Room not found' })
    res.json(room)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// DELETE a room
router.delete('/:id', async (req, res) => {
  try {
    const room = await Room.findOneAndDelete({ id: req.params.id })
    if (!room) return res.status(404).json({ error: 'Room not found' })
    res.json({ message: 'Room deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router