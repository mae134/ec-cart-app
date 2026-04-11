import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import ProductsPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import { products } from './data/products'
import type { Product } from './types/product'

export type CartItem = Product & {
  quantity: number
}

function App() {
  const [cart, setCart] = useState<CartItem[]>([])

  function addToCart(product: Product) {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }

      return [...prev, { ...product, quantity: 1 }]
    })
  }

  function updateQuantity(productId: number, delta: number) {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity + delta }
            : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProductsPage
            products={products}
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
    </Routes>
  )
}

export default App