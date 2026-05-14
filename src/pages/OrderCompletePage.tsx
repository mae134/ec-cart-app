import { Link } from 'react-router-dom'

function OrderCompletePage() {
  return (
    <div className="min-h-screen bg-gray-200 p-6">
      <div className="mx-auto max-w-3xl bg-white p-6 text-center">
        <h1 className="text-2xl font-bold">Order Complete</h1>

        <p className="mt-4">Thank you for your order.</p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/"
            className="rounded bg-slate-900 px-6 py-3 font-medium text-white hover:bg-slate-800"
          >
            Back to Products
          </Link>

          <Link
            to="/orders"
            className="rounded border border-slate-300 bg-white px-6 py-3 font-medium text-slate-900 hover:bg-slate-100"
          >
            View Order History
          </Link>
        </div>
      </div>
    </div>
  )
}

export default OrderCompletePage