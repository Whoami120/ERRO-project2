import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { saveOrder } from '../data/orders.js'
import './Checkout.css'

function Checkout() {
  const navigate = useNavigate()
  const { items, total, clearCart } = useCart()

  const [form, setForm] = useState({
    name: '', phone: '', city: '', address: '',
  })
  const [errors, setErrors] = useState({})
  const [confirmedOrder, setConfirmedOrder] = useState(null)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: '' })
  }

  function validate() {
    const next = {}
    if (!form.name.trim()) next.name = 'Required'
    if (!form.phone.trim()) next.phone = 'Required'
    else if (!/^[0-9+\s]{8,}$/.test(form.phone)) next.phone = 'Invalid phone'
    if (!form.city.trim()) next.city = 'Required'
    if (!form.address.trim()) next.address = 'Required'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function handleConfirm() {
    if (!validate()) return

    const order = saveOrder({
      customer: form,
      items: items.map(i => ({
        productId: i.product.id,
        name: i.product.name,
        size: i.size,
        qty: i.qty,
        price: i.product.price,
      })),
      total,
      currency: 'MAD',
      payment: 'Cash on Delivery',
    })

    setConfirmedOrder(order)
    clearCart()
  }

  // ── CONFIRMATION SCREEN ──────────────────────────────────────
  if (confirmedOrder) {
    return (
      <div className="checkout-done">
        <p className="checkout-done__eyebrow">Order Placed</p>
        <h1 className="checkout-done__title">Thank you.</h1>
        <p className="checkout-done__order">
          Order <strong>{confirmedOrder.id}</strong>
        </p>
        <p className="checkout-done__msg">
          We will call <strong>{confirmedOrder.customer.phone}</strong> to confirm delivery.
          Pay cash when your pieces arrive.
        </p>
        <button className="checkout-done__home" onClick={() => navigate('/')}>
          Return to the Universe
        </button>
      </div>
    )
  }

  // ── EMPTY CART GUARD ─────────────────────────────────────────
  if (items.length === 0) {
    return (
      <div className="checkout-empty">
        <h1>Nothing to check out.</h1>
        <button onClick={() => navigate('/')}>Return to the Universe</button>
      </div>
    )
  }

  // ── CHECKOUT FORM ────────────────────────────────────────────
  return (
    <div className="checkout">
      <div className="checkout__inner">

        {/* SUMMARY */}
        <div className="checkout__summary">
          <h2 className="checkout__section-title">Order Summary</h2>
          <div className="checkout__items">
            {items.map(item => (
              <div key={`${item.product.id}-${item.size}`} className="checkout-line">
                <div className="checkout-line__image">
                  <img src={item.product.images[0]} alt={item.product.name} />
                </div>
                <div className="checkout-line__info">
                  <p className="checkout-line__name">{item.product.name}</p>
                  <p className="checkout-line__meta">Size {item.size} · Qty {item.qty}</p>
                </div>
                <p className="checkout-line__price">{item.product.price * item.qty} MAD</p>
              </div>
            ))}
          </div>
          <div className="checkout__total">
            <span>Total</span>
            <span>{total} MAD</span>
          </div>
          <p className="checkout__payment-note">Cash on Delivery</p>
        </div>

        {/* FORM */}
        <div className="checkout__form">
          <h2 className="checkout__section-title">Delivery Details</h2>

          <div className="field">
            <label>Full Name</label>
            <input
              name="name" value={form.name} onChange={handleChange}
              placeholder="Your name"
            />
            {errors.name && <span className="field__error">{errors.name}</span>}
          </div>

          <div className="field">
            <label>Phone</label>
            <input
              name="phone" value={form.phone} onChange={handleChange}
              placeholder="06 00 00 00 00"
            />
            {errors.phone && <span className="field__error">{errors.phone}</span>}
          </div>

          <div className="field">
            <label>City</label>
            <input
              name="city" value={form.city} onChange={handleChange}
              placeholder="Casablanca"
            />
            {errors.city && <span className="field__error">{errors.city}</span>}
          </div>

          <div className="field">
            <label>Address</label>
            <textarea
              name="address" value={form.address} onChange={handleChange}
              placeholder="Street, building, apartment..."
              rows={3}
            />
            {errors.address && <span className="field__error">{errors.address}</span>}
          </div>

          <button className="checkout__confirm" onClick={handleConfirm}>
            Confirm Order — {total} MAD
          </button>

          <p className="checkout__disclaimer">
            No online payment. You pay cash when the order arrives.
          </p>
        </div>

      </div>
    </div>
  )
}

export default Checkout