import type { CartItem as CartItemType } from '../hooks/useCart'
import CartItem from './CartItem'

type Props = {
  cart: CartItemType[]
  totalPrice: number
  onUpdateQuantity: (id: number, quantity: number) => void
}

function Cart({ cart, totalPrice, onUpdateQuantity }: Props) {
  if (cart.length === 0) {
    return <p>Your cart is empty.</p>
  }

  return (
    <div className="space-y-4">
      {/* 商品リスト */}
      {cart.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onUpdateQuantity={onUpdateQuantity}
        />
      ))}

      {/* 合計 */}
      <div className="mt-6 border-t pt-4">
        <p className="text-xl font-bold">
          Total: ¥{totalPrice}
        </p>
      </div>
    </div>
  )
}

export default Cart