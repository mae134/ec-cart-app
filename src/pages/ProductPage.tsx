import ProductList from '../components/ProductList'
import type { Product } from '../types/product'
import type { CartItem } from '../hooks/useCart'
import { useEffect, useState } from 'react'
import { fetchProducts } from '../api/products'
import Header from '../components/Header'

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
      <Header totalItems={totalItems} />

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
