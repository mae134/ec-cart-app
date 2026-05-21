import type { Product } from '../types/product'
import { Link } from 'react-router-dom'

type ProductListProps = {
  products: Product[]
  onAddToCart: (product: Product) => void
}

function ProductList({ products, onAddToCart }: ProductListProps) {
  return (
    // レスポンシブな商品グリッド。
    // 画面幅に応じて、160px以上（md以上では220px以上）の商品カードを自動配置する
    <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-4 p-4 md:grid-cols-[repeat(auto-fit,minmax(220px,1fr))] md:p-6">
      {products.map((product) => (
        <div key={product.id} className="border rounded bg-white p-4">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="mb-4 aspect-square w-full rounded bg-white object-contain"
          ></img>
          <Link to={`/product/${product.id}`}>
            <p className="font-bold text-blue-600 hover:underline">
              {product.name}
            </p>
          </Link>
          <p>¥{product.price}</p>
          <button
            onClick={() => onAddToCart(product)}
            className="mt-2 px-4 py-1 bg-blue-500 text-white rounded"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  )
}

export default ProductList
