import { useParams, Link } from 'react-router-dom'
import type { Product } from '../types/product'
import { fetchProductById } from '../api/products'
import { useEffect, useState } from 'react'


function ProductDetailPage() {

  // URLパラメータから商品IDを取得
  const { id } = useParams()
  
  const [product, setProduct] = useState<Product | null>(null)

  useEffect(() => {
    async function load() {
      if (!id) return
      const data = await fetchProductById(Number(id))
      setProduct(data)
    }

    load()
  }, [id])

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
