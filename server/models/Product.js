import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  id:          { type: String, required: true, unique: true },
  roomId:      { type: String, default: null },   // null = ERRO Universe
  name:        { type: String, required: true },
  description: { type: String, default: '' },
  price:       { type: Number, required: true },
  currency:    { type: String, default: 'MAD' },
  sizes:       { type: [String], default: [] },
  images:      { type: [String], default: [] },
  inStock:     { type: Boolean, default: true },
}, { timestamps: true })

const Product = mongoose.model('Product', productSchema)

export default Product