import { Link } from 'react-router-dom'
import type { CartItem } from '../hooks/useCart'

type Props = {
  cart: CartItem[]
  totalPrice: number
}

function CheckoutPage({ cart, totalPrice }: Props) {
  return (
    <div className="min-h-screen bg-gray-200 p-6">
      <div className="mx-auto max-w-3xl bg-white p-6">
        <h1 className="text-2xl font-bold">Checkout</h1>

        <p className="mt-4">Items: {cart.length}</p>
        <p className="mt-2 font-bold">Total: ¥{totalPrice}</p>

        <Link
          to="/order-complete"
          className="mt-6 inline-block rounded bg-yellow-400 px-4 py-2 font-medium text-gray-900"
        >
          Place Order
        </Link>

        <Link to="/cart" className="ml-4 text-blue-600 hover:underline">
          Back to Cart
        </Link>
      </div>
    </div>
  )
}

export default CheckoutPage