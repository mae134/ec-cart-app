import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Cart from '../components/Cart'
import type { CartItem } from '../hooks/useCart'

type Props = {
  cart: CartItem[]
  totalPrice: number
  totalItems: number
  clearCart: () => void
  onUpdateQuantity: (id: number, quantity: number) => void
}

function CartPage({
  cart,
  totalPrice,
  totalItems,
  clearCart,
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
          <div className="mt-6 flex justify-end gap-3">
            <Link
              to="/checkout"
              className="rounded bg-yellow-400 px-6 py-3 font-bold text-gray-900 hover:bg-yellow-300" 
            >
              Proceed to Checkout
            </Link>
            <button className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600" onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        )}
      </main>
    </div>
  )
}

export default CartPage