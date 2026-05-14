import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Cart from '../components/Cart'
import type { CartItem } from '../hooks/useCart'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

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

  // ユーザーの認証状態を取得
  const { user } = useAuth()

  // 認証状態に応じた遷移を行うためのnavigate関数
  const navigate = useNavigate()

  const handleCheckout = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      navigate('/login')
      return
    }

    navigate('/checkout')
  }
  return (
    <div className="min-h-screen bg-gray-200">
      <Header totalItems={totalItems} />

      <main className="mx-auto max-w-4xl p-6">
        <h1 className="mb-6 text-2xl font-bold">Cart</h1>

        {/* カートの中身が空の場合は認証導線 */}
        {cart.length === 0 ? (
          <div className="rounded bg-white p-6 text-center">
            <p className="mb-4">Your cart is empty.</p>

            {/* 認証されていない場合のナビゲーション */}
            {!user && (
              <div className="flex justify-center gap-3">
                <Link to="/login" className="rounded bg-slate-900 px-4 py-2 text-white">
                  Login
                </Link>
                <Link to="/signup" className="rounded bg-gray-300 px-4 py-2 text-gray-900">
                  Sign up
                </Link>
              </div>
            )
            }
          </div>
        ) : (
          <>
            <Cart
              cart={cart}
              totalPrice={totalPrice}
              onUpdateQuantity={onUpdateQuantity}
            />
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={handleCheckout}
                className="rounded bg-yellow-400 px-6 py-3 font-bold text-gray-900 hover:bg-yellow-300"
              >
                Proceed to Checkout
              </button>
              <button
                className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                onClick={() => {
                  const confirmed = window.confirm(
                    'Are you sure you want to clear the cart?',
                  )

                  if (confirmed) {
                    clearCart()
                  }
                }}
              >
                Clear Cart
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default CartPage