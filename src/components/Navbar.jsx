import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import './Navbar.css'

function Navbar() {
  const { count, openCart } = useCart()

  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img src="/logo.png" alt="" className="navbar__logo-img" />
          <span className="navbar__logo-text">ERRO</span>
        </Link>

        <button className="navbar__cart" onClick={openCart} aria-label="Cart">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="8" cy="21" r="1"/>
            <circle cx="19" cy="21" r="1"/>
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
          </svg>
          {count > 0 && <span className="navbar__cart-count">{count}</span>}
        </button>
      </div>
    </nav>
  )
}

export default Navbar