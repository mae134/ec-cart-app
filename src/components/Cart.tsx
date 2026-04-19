type CartItem = {
  id: number
  name: string
  price: number
  quantity: number
}

type CartProps = {
  cart: CartItem[]
  totalPrice: number
  onUpdateQuantity: (productId: number, delta: number) => void
}

function Cart({ cart, totalPrice, onUpdateQuantity }: CartProps) {
  return (
    <div className="w-1/3 p-6 border-l">
      <h2 className="text-xl font-bold mb-4">Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500">Cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="mb-3 border-b pb-3">
              <p className="font-semibold">{item.name}</p>
              <p>¥{item.price}</p>

              <div className="mt-2 flex items-center gap-2">
                <button
                  onClick={() => onUpdateQuantity(item.id, -1)}
                  className="px-3 py-1 rounded bg-gray-200"
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => onUpdateQuantity(item.id, 1)}
                  className="px-3 py-1 rounded bg-gray-200"
                >
                  +
                </button>
              </div>
            </div>
          ))}

          <div className="mt-6 border-t pt-4">
            <p className="text-lg font-bold">Total: ¥{totalPrice}</p>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart
