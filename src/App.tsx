import { Routes, Route } from 'react-router-dom'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import ProductDetailPage from './pages/ProductDetailPage'
import useCart from './hooks/useCart'
import CheckoutPage from './pages/CheckoutPage'
import OrderCompletePage from './pages/OrderCompletePage'
import OrdersPage from './pages/OrdersPage'

function App() {
  // カートの状態と操作関数をuseCartフックから取得
  const { cart, addToCart, updateQuantity, totalPrice, clearCart } = useCart()

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
            totalItems={cart.reduce((sum, item) => sum + item.quantity, 0)}
            onUpdateQuantity={updateQuantity}
          />
        }
      />
      {/* 商品詳細ページ */}
      <Route path="/product/:id" element={<ProductDetailPage />} />

      {/* チェックアウトページ */}
      <Route
        path="/checkout"
        element={<CheckoutPage cart={cart} totalPrice={totalPrice} clearCart={clearCart} />}
      />

      {/* 注文完了ページ */}
      <Route path="/order-complete" element={<OrderCompletePage />} />

      {/* 注文履歴ページ */}
      <Route path="/orders" element={<OrdersPage />} />
    </Routes>
  )
}

export default App
