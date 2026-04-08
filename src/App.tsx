import { useState } from 'react'
import './App.css'
import { products } from './data/products'
import type { Product } from './types/product'

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
    <div className="p-6 grid grid-cols-2 gap-4">
      {products.map((p) => (
        <div key={p.id} className="border rounded p-4">
          <p className="font-bold">{p.name}</p>
          <p>¥{p.price}</p>
          <button
            className="mt-2 px-4 py-1 bg-blue-500 text-white rounded"
            onClick={() => addToCart(p)}
          >
            Add to Cart
          </button>
        </div>
      ))}

      {cart.length === 0 ? (
        <p className="text-gray-500">Cart is empty</p>
      ) : (
        cart.map((item) => (
          <div key={item.id} className="mb-3 border-b pb-3">
            <p className="font-semibold">{item.name}</p>
            <p>¥{item.price}</p>

            <div className="mt-2 flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, -1)}
                className="px-3 py-1 rounded bg-gray-200"
              >
                -
              </button>

              <span>{item.quantity}</span>

              <button
                onClick={() => updateQuantity(item.id, 1)}
                className="px-3 py-1 rounded bg-gray-200"
              >
                +
              </button>
            </div>
          </div>
        ))
      )}
      <div className="mt-6 border-t pt-4">
        <p className="text-lg font-bold">Total: ¥{totalPrice}</p>
      </div>
    </div>
  )
}

export default App
