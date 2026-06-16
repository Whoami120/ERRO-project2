import { useState } from 'react'
import { getOrders, updateOrderStatus } from '../../data/orders.js'
import './OrdersView.css'

const STATUSES = ['pending', 'confirmed', 'delivered', 'cancelled']

function OrdersView() {
  const [orders, setOrders] = useState(getOrders())

  function changeStatus(orderId, status) {
    updateOrderStatus(orderId, status)
    setOrders(getOrders())
  }

  function formatDate(iso) {
    const d = new Date(iso)
    return d.toLocaleDateString() + ' · ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  if (orders.length === 0) {
    return (
      <div className="orders">
        <h2 className="orders__title">Orders</h2>
        <p className="orders__empty">No orders yet. Place one from the store to see it here.</p>
      </div>
    )
  }

  return (
    <div className="orders">
      <div className="orders__header">
        <h2 className="orders__title">Orders</h2>
        <span className="orders__count">{orders.length} total</span>
      </div>

      <div className="orders__list">
        {orders.map(order => (
          <div key={order.id} className="order">
            <div className="order__top">
              <div>
                <p className="order__id">{order.id}</p>
                <p className="order__date">{formatDate(order.createdAt)}</p>
              </div>
              <span className={`order__status order__status--${order.status}`}>
                {order.status}
              </span>
            </div>

            <div className="order__body">
              <div className="order__customer">
                <p className="order__label">Customer</p>
                <p className="order__name">{order.customer.name}</p>
                <p className="order__detail">{order.customer.phone}</p>
                <p className="order__detail">{order.customer.city}</p>
                <p className="order__detail">{order.customer.address}</p>
              </div>

              <div className="order__items">
                <p className="order__label">Items</p>
                {order.items.map((item, i) => (
                  <div key={i} className="order__item">
                    <span>{item.name} · {item.size} · ×{item.qty}</span>
                    <span>{item.price * item.qty} {order.currency}</span>
                  </div>
                ))}
                <div className="order__total">
                  <span>Total — {order.payment}</span>
                  <span>{order.total} {order.currency}</span>
                </div>
              </div>
            </div>

            <div className="order__actions">
              <span className="order__label">Set status</span>
              <div className="order__status-buttons">
                {STATUSES.map(s => (
                  <button
                    key={s}
                    className={`order__status-btn ${order.status === s ? 'order__status-btn--active' : ''}`}
                    onClick={() => changeStatus(order.id, s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default OrdersView