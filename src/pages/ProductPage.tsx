import { Link } from 'react-router-dom'
import ProductList from '../components/ProductList'
import type { Product } from '../types/product'
import type { CartItem } from '../hooks/useCart'
import { useEffect, useState } from 'react'
import { fetchProducts } from '../api/products'

type Props = {
  cart: CartItem[]
  onAddToCart: (product: Product) => void
}

function ProductPage({ cart, onAddToCart }: Props) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchProducts()
        setProducts(data)
      } catch {
        setError('Failed to load products')
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  return (
    <div className="min-h-screen bg-gray-200">
      <header className="bg-slate-900 px-6 py-4 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <h1 className="text-xl font-bold">EC Store</h1>
          <Link
            to="/cart"
            className="rounded bg-yellow-400 px-4 py-2 font-medium text-gray-900"
          >
            Cart ({totalItems})
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl p-6">
        {loading && <p>Loading products...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <ProductList products={products} onAddToCart={onAddToCart} />
        )}
      </main>
    </div>
  )
}

export default ProductPage
