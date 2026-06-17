import { useParams, useNavigate, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { getRoomById, getProductsByRoom } from '../data/store.js'
import './Room.css'

function Room() {
  const { roomId } = useParams()
  const navigate = useNavigate()
  const room = getRoomById(roomId)
  const roomProducts = getProductsByRoom(roomId)

  // Apply room theme to the whole page
  useEffect(() => {
    if (!room) return
    const root = document.documentElement
    root.style.setProperty('--room-bg', room.colors.surface)
    root.style.setProperty('--room-accent', room.colors.accent)
    root.style.setProperty('--room-text', room.colors.text)
    root.style.setProperty('--room-muted', room.colors.muted)
    root.style.setProperty('--room-border', room.colors.border)

    // Reset to default universe theme when leaving the room
    return () => {
      root.style.setProperty('--room-bg', '#0a0a0a')
      root.style.setProperty('--room-accent', '#c8a96e')
      root.style.setProperty('--room-text', '#e8e8e8')
      root.style.setProperty('--room-muted', '#888888')
      root.style.setProperty('--room-border', '#2a2a2a')
    }
  }, [room])

  if (!room) {
    return (
      <div className="room-404">
        <h1>This room does not exist.</h1>
        <Link to="/" className="room-404__back">Return to the Universe</Link>
      </div>
    )
  }

  return (
    <div className="room">

      {/* ROOM HERO */}
      <section
        className="room__hero"
        style={{ backgroundImage: `url(${room.bg})` }}
      >
        <div className="room__hero-overlay" />
        <button className="room__back" onClick={() => navigate('/')}>
          ← Universe
        </button>
        <div className="room__hero-content">
          <p className="room__eyebrow">Drop</p>
          <h1 className="room__name">{room.name}</h1>
          <p className="room__tagline">{room.tagline}</p>
          <p className="room__mood">{room.mood}</p>
        </div>
      </section>

      {/* ROOM PRODUCTS */}
      <section className="room__products">
        <div className="container">
          <div className="room__products-header">
            <p className="room__products-label">The Collection</p>
            <p className="room__products-count">
              {roomProducts.length} {roomProducts.length === 1 ? 'piece' : 'pieces'}
            </p>
          </div>

          <div className="room__grid">
            {roomProducts.map(product => (
              <div
                key={product.id}
                className="room-product"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className="room-product__image">
                  <img src={product.images[0]} alt={product.name} />
                </div>
                <div className="room-product__info">
                  <h3 className="room-product__name">{product.name}</h3>
                  <p className="room-product__price">
                    {product.price} <span>{product.currency}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

export default Room