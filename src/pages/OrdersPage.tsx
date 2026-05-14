import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchOrders } from '../api/orders'

type OrderItem = {
  id: number
  product_name: string
  image_url: string
  price: number
  quantity: number
}

type Order = {
  id: number
  customer_name: string
  email: string
  address: string
  phone: string
  total_price: number
  created_at: string
  order_items: OrderItem[]
}

function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadOrders() {
      try {
        const data = await fetchOrders()
        setOrders(data as Order[])
      } catch {
        setError('Failed to load orders')
      } finally {
        setLoading(false)
      }
    }

    loadOrders()
  }, [])

  return (
    <div className="min-h-screen bg-gray-200 p-6">
      <div className="mx-auto max-w-5xl bg-white p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Order History</h1>

          <Link to="/" className="text-blue-600 hover:underline">
            Back to Products
          </Link>
        </div>

        {loading && <p>Loading orders...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && orders.length === 0 && (
          <p>No orders found.</p>
        )}

        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="rounded border p-4">
              <div className="mb-3 flex justify-between">
                <div>
                  <p className="font-bold">Order #{order.id}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(order.created_at).toLocaleString()}
                  </p>
                </div>

                <p className="font-bold">¥{order.total_price}</p>
              </div>

              <p className="text-sm">Customer: {order.customer_name}</p>
              <p className="text-sm">Email: {order.email}</p>
              <p className="text-sm">Address: {order.address}</p>

              <div className="mt-4 border-t pt-3">
                <p className="mb-2 font-semibold">Items</p>

                {order.order_items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-sm"
                  >
                    <img
                      src={item.image_url}
                      alt={item.product_name}
                      className="h-20 w-20 rounded object-cover"
                    />
                    <span>
                      {item.product_name} × {item.quantity}
                    </span>
                    <span>¥{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OrdersPage