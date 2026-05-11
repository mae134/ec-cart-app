import type { CartItem as CartItemType } from '../hooks/useCart'

type Props = {
  item: CartItemType
  onUpdateQuantity: (id: number, quantity: number) => void
}

function CartItem({ item, onUpdateQuantity }: Props) {
  return (
    <div className="flex items-center justify-between rounded border p-4 bg-white">
      <div>
        <p className="font-bold">{item.name}</p>
        <p className="text-sm text-gray-600">¥{item.price}</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() =>
            onUpdateQuantity(item.id, -1)
          }
          className="px-2 py-1 border"
        >
          -
        </button>

        <span>{item.quantity}</span>

        <button
          onClick={() =>
            onUpdateQuantity(item.id, 1)
          }
          className="px-2 py-1 border"
        >
          +
        </button>
      </div>
    </div>
  )
}

export default CartItem