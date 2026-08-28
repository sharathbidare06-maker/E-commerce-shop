import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Products from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Orders from './pages/Orders'
import Profile from './pages/Profile'
import Login from './pages/Login'
import AdminProducts from './pages/AdminProducts'
import Wishlist from './pages/Wishlist'
import Inventory from './pages/Inventory'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/admin/inventory" element={<Inventory />} />
      </Routes>
    </Layout>
  )
}

export default App
