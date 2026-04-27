import { Link } from 'react-router-dom'

function OrderCompletePage() {
return (
<div className="min-h-screen bg-gray-200 p-6">
  <div className="mx-auto max-w-3xl bg-white p-6 text-center">
    <h1 className="text-2xl font-bold">Order Complete</h1>

    <p className="mt-4">Thank you for your order.</p>

    <Link to="/" className="mt-6 inline-block rounded bg-slate-900 px-4 py-2 font-medium text-white">
    Back to Products
    </Link>
  </div>
</div>
)
}

export default OrderCompletePage