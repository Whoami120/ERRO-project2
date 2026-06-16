import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import { universeProducts } from '../data/universe.js'
import { getRooms } from '../data/store.js'
import './Home.css'

function Home() {
  const navigate = useNavigate()
  const universeRef = useRef(null)
  const rooms = getRooms()

  function scrollDown() {
    universeRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="home">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="home__hero">
        <div className="home__noise" />
        <div className="home__hero-content">
          <p className="home__eyebrow">Collection 01</p>
          <h1 className="home__title">ERRO</h1>
          <p className="home__sub">Not a store. A universe.</p>
          <button className="home__enter" onClick={scrollDown}>
            Enter the Universe
          </button>
        </div>
        <p className="home__footer">
          Morocco — Cash on Delivery — Limited Drops
        </p>
      </section>

      {/* ── UNIVERSE PRODUCTS ────────────────────────────────── */}
      <section className="home__universe" ref={universeRef}>
        <div className="container">
          <div className="section-header">
            <p className="section-eyebrow">The Universe</p>
            <h2 className="section-title">Foundation Pieces</h2>
            <p className="section-desc">
              Stars with no galaxy. These pieces belong to no room — they belong to everyone.
            </p>
          </div>

          <div className="product-grid">
            {universeProducts.map(product => (
              <div
                key={product.id}
                className="product-card"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className="product-card__image">
                  <img src={product.images[0]} alt={product.name} />
                </div>
                <div className="product-card__info">
                  <h3 className="product-card__name">{product.name}</h3>
                  <p className="product-card__price">
                    {product.price} <span>{product.currency}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ROOMS MAP ────────────────────────────────────────── */}
      <section className="home__rooms">
        <div className="container">
          <div className="section-header">
            <p className="section-eyebrow">The Drops</p>
            <h2 className="section-title">Enter a Room</h2>
            <p className="section-desc">
              Each drop is a world. Step inside and the universe shifts around you.
            </p>
          </div>

          <div className="rooms-grid">
            {rooms.map(room => (
              <div
                key={room.id}
                className={`room-card ${room.status === 'coming-soon' ? 'room-card--locked' : ''}`}
                style={{ '--room-card-accent': room.colors.accent }}
                onClick={() => room.status === 'open' && navigate(`/rooms/${room.id}`)}
              >
                <div className="room-card__bg">
                  <img src={room.bg} alt={room.name} />
                </div>
                <div className="room-card__overlay" />
                <div className="room-card__content">
                  {room.status === 'coming-soon' && (
                    <span className="room-card__badge">Coming Soon</span>
                  )}
                  <h3 className="room-card__name">{room.name}</h3>
                  <p className="room-card__tagline">{room.tagline}</p>
                  {room.status === 'open' && (
                    <span className="room-card__enter">Enter →</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home