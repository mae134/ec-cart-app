import type { Product } from '../types/product'

type ProductListProps = {
  products: Product[]
  onAddToCart: (product: Product) => void
}

function ProductList({ products, onAddToCart }: ProductListProps) {
  return (
    <div className="w-2/3 p-6 grid grid-cols-2 gap-4">
      {products.map((product) => (
        <div key={product.id} className="border rounded p-4">
          <p className="font-bold">{product.name}</p>
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