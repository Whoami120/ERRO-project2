import { createContext, useContext, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  // Each cart line is unique by product + size
  function addItem(product, size) {
    setItems(prev => {
      const existing = prev.find(
        i => i.product.id === product.id && i.size === size
      )
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id && i.size === size
            ? { ...i, qty: i.qty + 1 }
            : i
        )
      }
      return [...prev, { product, size, qty: 1 }]
    })
    setIsOpen(true)
  }

  function removeItem(productId, size) {
    setItems(prev =>
      prev.filter(i => !(i.product.id === productId && i.size === size))
    )
  }

  function updateQty(productId, size, qty) {
    if (qty < 1) return
    setItems(prev =>
      prev.map(i =>
        i.product.id === productId && i.size === size
          ? { ...i, qty }
          : i
      )
    )
  }

  function clearCart() {
    setItems([])
  }

  const count = items.reduce((sum, i) => sum + i.qty, 0)
  const total = items.reduce((sum, i) => sum + i.product.price * i.qty, 0)

  return (
    <CartContext.Provider value={{
      items, count, total, isOpen,
      addItem, removeItem, updateQty, clearCart,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}