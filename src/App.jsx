import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import PlantCare from './pages/PlantCare'
import Blogs from './pages/Blogs'
import Cabinet from './pages/Cabinet'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { OrdersProvider } from './context/OrdersContext'
import './styles/App.css'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <OrdersProvider>
          <Router>
            <Header />
            <main className="app_content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop/:productId" element={<ProductDetail />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/plant-care" element={<PlantCare />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/cabinet" element={<Cabinet />} />
              </Routes>
            </main>
            <Footer />
          </Router>
        </OrdersProvider>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
