import { Link } from 'react-router-dom'
import Cart from '../components/Cart'
import type { CartItem } from '../hooks/useCart'

type Props = {
  cart: CartItem[]
  totalPrice: number
  onUpdateQuantity: (id: number, delta: number) => void
}

function CartPage({ cart, totalPrice, onUpdateQuantity }: Props) {
  return (
    <div className="min-h-screen bg-gray-200">
      <header className="bg-slate-900 px-6 py-4 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <h1 className="text-xl font-bold">Your Cart</h1>
          <Link
            to="/"
            className="rounded bg-white px-4 py-2 font-medium text-slate-900"
          >
            Back to Products
          </Link>
          <Link
            to="/checkout"
            className="mt-4 block rounded bg-yellow-400 px-4 py-2 text-center font-medium text-gray-900"
          >
            Proceed to Checkout
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl p-6">
        <Cart
          cart={cart}
          totalPrice={totalPrice}
          onUpdateQuantity={onUpdateQuantity}
        />
      </main>
    </div>
  )
}

export default CartPage
