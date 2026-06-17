import mongoose from 'mongoose'

const roomSchema = new mongoose.Schema({
  id:      { type: String, required: true, unique: true },
  name:    { type: String, required: true },
  tagline: { type: String, default: '' },
  mood:    { type: String, default: '' },
  status:  { type: String, default: 'open' },
  bg:      { type: String, default: '' },
  colors: {
    accent:  { type: String, default: '#c8a96e' },
    surface: { type: String, default: '#0d0a07' },
    text:    { type: String, default: '#e0d5c5' },
    muted:   { type: String, default: '#6b5a3a' },
    border:  { type: String, default: '#2a2015' },
  },
  products: { type: [String], default: [] },
}, { timestamps: true })

const Room = mongoose.model('Room', roomSchema)

export default Room