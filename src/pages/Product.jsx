import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { roomsApi, productsApi } from '../api/client.js'
import { useCart } from '../context/CartContext.jsx'
import './Product.css'

function Product() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const [product, setProduct] = useState(null)
  const [room, setRoom] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    productsApi.getOne(productId)
      .then(async (prod) => {
        setProduct(prod)
        if (prod.roomId) {
          const r = await roomsApi.getOne(prod.roomId).catch(() => null)
          setRoom(r)
        }
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false))
  }, [productId])

  const [selectedSize, setSelectedSize] = useState(null)
  const [notice, setNotice] = useState('')

  // Apply room theme if the product belongs to a room
  useEffect(() => {
    const root = document.documentElement
    if (room) {
      root.style.setProperty('--room-bg', room.colors.surface)
      root.style.setProperty('--room-accent', room.colors.accent)
      root.style.setProperty('--room-text', room.colors.text)
      root.style.setProperty('--room-muted', room.colors.muted)
      root.style.setProperty('--room-border', room.colors.border)
    }
    return () => {
      root.style.setProperty('--room-bg', '#0a0a0a')
      root.style.setProperty('--room-accent', '#c8a96e')
      root.style.setProperty('--room-text', '#e8e8e8')
      root.style.setProperty('--room-muted', '#888888')
      root.style.setProperty('--room-border', '#2a2a2a')
    }
  }, [room])

  if (loading) {
    return <div className="product-404"><h1>Loading...</h1></div>
  }

  if (!product) {
    return (
      <div className="product-404">
        <h1>This piece does not exist.</h1>
        <button onClick={() => navigate('/')} className="product-404__back">
          Return to the Universe
        </button>
      </div>
    )
  }

  function handleAddToCart() {
    if (!selectedSize) {
      setNotice('Select a size first.')
      return
    }
    addItem(product, selectedSize)
    setNotice('')
  }

  return (
    <div className="product">
      <button className="product__back" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="product__layout">

        {/* IMAGE */}
        <div className="product__media">
          <img src={product.images[0]} alt={product.name} />
        </div>

        {/* DETAILS */}
        <div className="product__details">
          {room && (
            <p className="product__origin">From — {room.name}</p>
          )}
          {!room && (
            <p className="product__origin">ERRO Universe</p>
          )}

          <h1 className="product__name">{product.name}</h1>

          <p className="product__price">
            {product.price} <span>{product.currency}</span>
          </p>

          <p className="product__desc">{product.description}</p>

          {/* SIZES */}
          <div className="product__sizes">
            <p className="product__sizes-label">Size</p>
            <div className="product__sizes-list">
              {product.sizes.map(size => (
                <button
                  key={size}
                  className={`product__size ${selectedSize === size ? 'product__size--active' : ''}`}
                  onClick={() => { setSelectedSize(size); setNotice('') }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* ADD TO CART */}
          <button className="product__add" onClick={handleAddToCart}>
            Add to Cart
          </button>

          {notice && <p className="product__notice">{notice}</p>}

          <p className="product__payment">Cash on Delivery only</p>
        </div>

      </div>
    </div>
  )
}

export default Product