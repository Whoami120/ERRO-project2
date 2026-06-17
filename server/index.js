import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import roomsRouter from './routes/rooms.js'
import productsRouter from './routes/products.js'
import ordersRouter from './routes/orders.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'ERRO API running' })
})
app.use('/api/rooms', roomsRouter)
app.use('/api/products', productsRouter)
app.use('/api/orders', ordersRouter)

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {
      console.log(`ERRO API running on http://localhost:${PORT}`)
    })
  })
  .catch(err => {
    console.error('MongoDB connection error:', err.message)
  })