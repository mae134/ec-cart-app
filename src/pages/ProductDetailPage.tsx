import { useParams, Link } from 'react-router-dom'
import { products } from '../data/products'

function ProductDetailPage() {
  const { id } = useParams()

  const product = products.find((p) => p.id === Number(id))

  if (!product) {
    return <p>Product not found</p>
  }

  return (
    <div className="min-h-screen bg-gray-200 p-6">
      <div className="mx-auto max-w-4xl bg-white p-6">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="mb-6 h-64 w-full object-contain bg-white"
        />

        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="mt-4 text-lg">¥{product.price}</p>

        <Link to="/" className="mt-6 inline-block text-blue-500">
          ← Back
        </Link>
      </div>
    </div>
  )
}

export default ProductDetailPage
