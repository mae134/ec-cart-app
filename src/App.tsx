import { useState } from 'react'
import './App.css'
import { products } from './data/products'
import type { Product } from './types/product'
import ProductList from './components/ProductList'
import Cart from './components/Cart'

type CartItem = Product & {
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

      console.log('Adding new item to cart:', product)

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


    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto flex max-w-6xl overflow-hidden rounded-2xl bg-white shadow">
      <ProductList products={products} onAddToCart={addToCart} />

      <Cart
        cart={cart}
        totalPrice={totalPrice}
        onUpdateQuantity={updateQuantity}
      >
      </Cart>
      </div>
    </div>
  )
}

export default App
