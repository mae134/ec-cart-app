import { Routes, Route } from 'react-router-dom'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import ProductDetailPage from './pages/ProductDetailPage'
import useCart  from './hooks/useCart'

function App() {

  // カートの状態と操作関数をuseCartフックから取得
  const { cart, addToCart, updateQuantity, totalPrice } = useCart()

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProductPage
            cart={cart}
            onAddToCart={addToCart}
          />
        }
      />
      <Route
        path="/cart"
        element={
          <CartPage
            cart={cart}
            totalPrice={totalPrice}
            onUpdateQuantity={updateQuantity}
          />
        }
      />
      <Route path="/product/:id" element={<ProductDetailPage />} />
    </Routes>
  )
}

export default App