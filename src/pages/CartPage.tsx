import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Cart from '../components/Cart'
import type { CartItem } from '../hooks/useCart'

type Props = {
  cart: CartItem[]
  totalPrice: number
  totalItems: number
  onUpdateQuantity: (id: number, quantity: number) => void
}

function CartPage({
  cart,
  totalPrice,
  totalItems,
  onUpdateQuantity,
}: Props) {
  return (
    <div className="min-h-screen bg-gray-200">
      <Header totalItems={totalItems} />

      <main className="mx-auto max-w-4xl p-6">
        <h1 className="mb-6 text-2xl font-bold">Cart</h1>

        <Cart
          cart={cart}
          totalPrice={totalPrice}
          onUpdateQuantity={onUpdateQuantity}
        />

        {cart.length > 0 && (
          <div className="mt-6 flex justify-end">
            <Link
              to="/checkout"
              className="rounded bg-yellow-400 px-6 py-3 font-bold text-gray-900 hover:bg-yellow-300"
            >
              Proceed to Checkout
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}

export default CartPage