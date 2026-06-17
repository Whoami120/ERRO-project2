import { useState } from 'react'
import { Link } from 'react-router-dom'
import OrdersView from '../components/admin/OrdersView.jsx'
import RoomsManager from '../components/admin/RoomsManager.jsx'
import ProductsManager from '../components/admin/ProductsManager.jsx'
import './Admin.css'

// Temporary front-end gate only. Real auth comes with the backend.
const ADMIN_PASSWORD = 'erro2026'

function Admin() {
  const [authed, setAuthed] = useState(
    sessionStorage.getItem('erro_admin') === 'yes'
  )
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [tab, setTab] = useState('orders')

  function handleLogin() {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('erro_admin', 'yes')
      setAuthed(true)
      setError('')
    } else {
      setError('Wrong password.')
    }
  }

  function handleLogout() {
    sessionStorage.removeItem('erro_admin')
    setAuthed(false)
    setPassword('')
  }

  // ── LOGIN GATE ───────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="admin-login">
        <div className="admin-login__box">
          <p className="admin-login__eyebrow">ERRO Control</p>
          <h1 className="admin-login__title">Admin Access</h1>
          <input
            type="password"
            value={password}
            onChange={e => { setPassword(e.target.value); setError('') }}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            placeholder="Password"
            className="admin-login__input"
          />
          {error && <p className="admin-login__error">{error}</p>}
          <button className="admin-login__btn" onClick={handleLogin}>
            Enter
          </button>
          <Link to="/" className="admin-login__back">← Back to site</Link>
        </div>
      </div>
    )
  }

  // ── DASHBOARD SHELL ──────────────────────────────────────────
  return (
    <div className="admin">
      <aside className="admin__sidebar">
        <div className="admin__brand">
          <span className="admin__brand-name">ERRO</span>
          <span className="admin__brand-sub">Control Panel</span>
        </div>

        <nav className="admin__nav">
          <button
            className={`admin__nav-item ${tab === 'orders' ? 'admin__nav-item--active' : ''}`}
            onClick={() => setTab('orders')}
          >Orders</button>
          <button
            className={`admin__nav-item ${tab === 'rooms' ? 'admin__nav-item--active' : ''}`}
            onClick={() => setTab('rooms')}
          >Rooms</button>
          <button
            className={`admin__nav-item ${tab === 'products' ? 'admin__nav-item--active' : ''}`}
            onClick={() => setTab('products')}
          >Products</button>
        </nav>

        <div className="admin__sidebar-footer">
          <Link to="/" className="admin__view-site">View Site →</Link>
          <button className="admin__logout" onClick={handleLogout}>Log out</button>
        </div>
      </aside>

      <main className="admin__main">
        {tab === 'orders' && <OrdersView />}
        {tab === 'rooms' && <RoomsManager />}
        {tab === 'products' && <ProductsManager />}
      </main>
    </div>
  )
}

export default Admin