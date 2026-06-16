import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { CartProvider } from './context/CartContext.jsx'
import Navbar from './components/Navbar.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import Home from './pages/Home.jsx'
import Room from './pages/Room.jsx'
import Product from './pages/Product.jsx'
import Checkout from './pages/Checkout.jsx'
import Admin from './pages/Admin.jsx'

function Layout() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  return (
    <>
      {!isAdmin && <Navbar />}
      {!isAdmin && <CartDrawer />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms/:roomId" element={<Room />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Layout />
      </CartProvider>
    </BrowserRouter>
  )
}

export default App