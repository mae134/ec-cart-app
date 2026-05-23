import { supabase } from '../lib/supabase'
import type { CartItem } from '../hooks/useCart'

type CreateOrderParams = {
  customerName: string
  email: string
  address: string
  phone: string
  totalPrice: number
  cart: CartItem[]
  userId: string
}

export async function createOrder(params: CreateOrderParams) {

  // まずはordersテーブルに注文情報を挿入して注文を作成
  const { data: order, error: orderError } = await supabase.from('orders').insert(
    {
      user_id: params.userId,
      customer_name: params.customerName,
      email: params.email,
      address: params.address,
      phone: params.phone,
      total_price: params.totalPrice
    }).select().single()

  if (orderError) {
    throw new Error(orderError.message)
  }

  // 注文が作成できたら、次は注文に紐づくアイテムをorder_itemsテーブルに挿入
  const items = params.cart.map(item => ({
  order_id: order.id,
  product_id: item.id,
  product_name: item.name,
  image_url: item.imageUrl,
  price: item.price,
  quantity: item.quantity
}))

  // 注文に紐づくアイテムをorder_itemsテーブルに挿入
  const { error: itemsError } = await supabase.from('order_items').insert(items)

  if (itemsError) {
    throw new Error(itemsError.message)
  }
}

export async function fetchOrders() {
  const { data, error } = await supabase.from('orders').select(`
      id,
      user_id,
      customer_name,
      email,
      address,
      phone,
      total_price,
      created_at,
      order_items (
        id,
        product_name,
        image_url,
        price,
        quantity
      )
    `).order('created_at', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data
}