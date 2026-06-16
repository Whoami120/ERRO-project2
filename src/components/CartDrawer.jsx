import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import './CartDrawer.css'

function CartDrawer() {
  const navigate = useNavigate()
  const {
    items, total, isOpen,
    closeCart, removeItem, updateQty,
  } = useCart()

  function goToCheckout() {
    closeCart()
    navigate('/checkout')
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={`cart-backdrop ${isOpen ? 'cart-backdrop--open' : ''}`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <aside className={`cart ${isOpen ? 'cart--open' : ''}`}>
        <div className="cart__header">
          <h2 className="cart__title">Your Cart</h2>
          <button className="cart__close" onClick={closeCart}>✕</button>
        </div>

        {items.length === 0 ? (
          <div className="cart__empty">
            <p>The cart is empty.</p>
            <span>Stars uncollected.</span>
          </div>
        ) : (
          <>
            <div className="cart__items">
              {items.map(item => (
                <div key={`${item.product.id}-${item.size}`} className="cart-item">
                  <div className="cart-item__image">
                    <img src={item.product.images[0]} alt={item.product.name} />
                  </div>
                  <div className="cart-item__info">
                    <h3 className="cart-item__name">{item.product.name}</h3>
                    <p className="cart-item__size">Size {item.size}</p>
                    <p className="cart-item__price">
                      {item.product.price} {item.product.currency}
                    </p>
                    <div className="cart-item__qty">
                      <button onClick={() => updateQty(item.product.id, item.size, item.qty - 1)}>−</button>
                      <span>{item.qty}</span>
                      <button onClick={() => updateQty(item.product.id, item.size, item.qty + 1)}>+</button>
                    </div>
                  </div>
                  <button
                    className="cart-item__remove"
                    onClick={() => removeItem(item.product.id, item.size)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="cart__footer">
              <div className="cart__total">
                <span>Total</span>
                <span>{total} MAD</span>
              </div>
              <button className="cart__checkout" onClick={goToCheckout}>
                Checkout — Cash on Delivery
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  )
}

export default CartDrawer