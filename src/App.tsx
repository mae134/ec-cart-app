import { Routes, Route } from 'react-router-dom'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import ProductDetailPage from './pages/ProductDetailPage'
import useCart from './hooks/useCart'
import CheckoutPage from './pages/CheckoutPage'
import OrderCompletePage from './pages/OrderCompletePage'

function App() {
  // カートの状態と操作関数をuseCartフックから取得
  const { cart, addToCart, updateQuantity, totalPrice } = useCart()

  return (
    <Routes>

      {/* 商品欄ページ */}
      <Route
        path="/"
        element={<ProductPage cart={cart} onAddToCart={addToCart} />}
      />

      {/* カートページ */}
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
      {/* 商品詳細ページ */}
      <Route path="/product/:id" element={<ProductDetailPage/>} />

      {/* チェックアウトページ */}
      <Route
        path="/checkout"
        element={<CheckoutPage cart={cart} totalPrice={totalPrice} />}
      />

        {/* 注文完了ページ */}
      <Route path="/order-complete" element={<OrderCompletePage />} />
    </Routes>
  )
}

export default App
