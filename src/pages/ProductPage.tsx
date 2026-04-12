import { Link } from 'react-router-dom'
import ProductList from '../components/ProductList'
import type { Product } from '../types/product'
import type { CartItem } from '../hooks/useCart'


type Props = {
  products: Product[]
  cart: CartItem[]
  onAddToCart: (product: Product) => void
}

function ProductsPage({ products, cart, onAddToCart }: Props) {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

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
        <ProductList products={products} onAddToCart={onAddToCart} />
      </main>
    </div>
  )
}

export default ProductsPage