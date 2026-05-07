import { Link, useNavigate } from 'react-router-dom'
import type { CartItem } from '../hooks/useCart'
import { useState } from 'react'
import { createOrder } from '../api/orders'

type Props = {
  cart: CartItem[]
  totalPrice: number
  clearCart: () => void
}

function CheckoutPage({ cart, totalPrice, clearCart }: Props) {

  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '', 
    phone: '',
  })
  const navigate = useNavigate()

  const handleSubmit = async () => {

    // 以下各バリデーション
    // カートが空なら注文できない
    if (cart.length === 0) {
      alert('Your cart is empty')
      return
    }

    // 各項目の入力チェック
    if (!form.name.trim() || !form.email.trim() || !form.address.trim() || !form.phone.trim()) {
      alert('Please fill in all fields')
      return
    }

    // 簡単なメールアドレス
    if (!form.email.includes('@')) {
      alert('Please enter a valid email')
      return
    }

    try {
      await createOrder({
        customerName: form.name,
        email: form.email,
        address: form.address,
        phone: form.phone,
        totalPrice,
        cart
      })

            // カートをクリア
      clearCart()
      // オーダー完了画面へ遷移
      navigate('/order-complete')
    } catch (error) {
      alert('Failed to place order')
      return
    }
  }

  return (
    <div className="min-h-screen bg-gray-200 p-6">
      <div className="mx-auto max-w-3xl bg-white p-6">
        <h1 className="text-2xl font-bold">Checkout</h1>

        <p className="mt-4">Items: {cart.length}</p>
        <p className="mt-2 font-bold">Total: ¥{totalPrice}</p>

        <div className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="w-full rounded border p-2"
          />

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className="w-full rounded border p-2"
          />

          <input
            type="text"
            placeholder="Address"
            value={form.address}
            onChange={(e) =>
              setForm({ ...form, address: e.target.value })
            }
            className="w-full rounded border p-2"
          />

          <input
            type="text"
            placeholder="Phone"
            value={form.phone}
            onChange={(e) =>
              setForm({ ...form, phone: e.target.value })
            }
            className="w-full rounded border p-2"
          />
        </div>

        {/* 入力チェック後に遷移するため、Linkではなくbuttonを使う */}
        <button
          type="button"
          onClick={handleSubmit}
          className="mt-6 inline-block rounded bg-yellow-400 px-4 py-2 font-medium text-gray-900"
        >
          Place Order
        </button>

        <Link to="/cart" className="ml-4 text-blue-600 hover:underline">
          Back to Cart
        </Link>
      </div>
    </div>
  )
}

export default CheckoutPage