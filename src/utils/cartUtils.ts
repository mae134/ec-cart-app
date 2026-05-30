export function calculateTotalItems(cart: { quantity: number }[]): number {
  return cart.reduce((total, item) => total + item.quantity, 0)
}
