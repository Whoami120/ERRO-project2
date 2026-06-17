import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  id:       { type: String, required: true, unique: true },
  customer: {
    name:    { type: String, required: true },
    phone:   { type: String, required: true },
    city:    { type: String, required: true },
    address: { type: String, required: true },
  },
  items: [{
    productId: String,
    name:      String,
    size:      String,
    qty:       Number,
    price:     Number,
  }],
  total:    { type: Number, required: true },
  currency: { type: String, default: 'MAD' },
  payment:  { type: String, default: 'Cash on Delivery' },
  status:   { type: String, default: 'pending' },
}, { timestamps: true })

const Order = mongoose.model('Order', orderSchema)

export default Order