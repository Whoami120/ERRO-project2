import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import './Navbar.css'

function Navbar() {
  const { count, openCart } = useCart()

  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <Link to="/" className="navbar__logo">ERRO</Link>

        <button className="navbar__cart" onClick={openCart}>
          Cart
          {count > 0 && <span className="navbar__cart-count">{count}</span>}
        </button>
      </div>
    </nav>
  )
}

export default Navbar