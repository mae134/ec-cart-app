import type { CartItem as CartItemType } from '../hooks/useCart'

type Props = {
  item: CartItemType
  onUpdateQuantity: (id: number, quantity: number) => void
}

function CartItem({ item, onUpdateQuantity }: Props) {
  return (
    <div className="flex gap-4 rounded border bg-white p-4">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="h-24 w-24 flex-shrink-0 rounded bg-white object-contain"
      />

      <div className="min-w-0 flex flex-col gap-2">
        <p className="break-words font-bold">{item.name}</p>
        <p className="break-words text-sm text-gray-600">¥{item.price}</p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onUpdateQuantity(item.id, -1)}
            className="rounded border px-3 py-1 hover:bg-gray-100"
          >
            -
          </button>

          <span className="min-w-[24px] text-center font-medium">
            {item.quantity}
          </span>

          <button
            type="button"
            onClick={() => onUpdateQuantity(item.id, 1)}
            className="rounded border px-3 py-1 hover:bg-gray-100"
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartItem