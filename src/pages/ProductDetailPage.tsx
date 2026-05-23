import { useParams, Link } from 'react-router-dom'
import type { Product } from '../types/product'
import { fetchProductById } from '../api/products'
import { useEffect, useState } from 'react'
import AddToCartButton from '../components/AddToCartButton'

type Props = {
  onAddToCart: (product: Product) => void
}

function ProductDetailPage({ onAddToCart }: Props) {

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
    <div className="min-h-screen bg-gray-200 p-4 md:p-6">
      <div className="mx-auto grid max-w-6xl gap-8 rounded bg-white p-6 lg:grid-cols-2">
        <div className="rounded bg-gray-50 p-4">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="aspect-square w-full object-contain"
          />
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold md:text-3xl">
            {product.name}
          </h1>

          <p className="text-2xl font-semibold text-red-500">
            ¥{product.price}
          </p>

          <p className="text-sm text-gray-600">
            This product is available for online purchase.
          </p>

          <AddToCartButton
            onClick={() => onAddToCart(product)}
            className="w-full md:w-fit"
          />

          <Link to="/" className="mt-4 text-blue-600 hover:underline">
            ← Back to Products
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage
