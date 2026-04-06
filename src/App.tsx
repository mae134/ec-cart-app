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
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
  
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
  
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  
  
  return (
    <div className="p-6 grid grid-cols-2 gap-4">
      {products.map(p => (
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
    </div>
  )
}

export default App
