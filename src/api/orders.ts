import type { CartItem } from '../hooks/useCart'
import { supabase } from '../lib/supabase'

type CreateOrderParams = {
  customerName: string
  email: string
  address: string
  phone: string
  totalPrice: number
  cart: CartItem[]
}

export async function createOrder(params: CreateOrderParams) {

  // まずはordersテーブルに注文情報を挿入して注文を作成
  const { data: order, error: orderError } = await supabase.from('orders').insert(
    {
      customer_name: params.customerName,
      email: params.email,
      address: params.address,
      phone: params.phone,
      total_price: params.totalPrice
    }).select().single()

    if(orderError){
      throw new Error(orderError.message)
    }

  // 注文が作成できたら、次は注文に紐づくアイテムをorder_itemsテーブルに挿入
  const items = params.cart.map(item => ({
    order_id: order.id,
    product_id: item.id,
    product_name: item.name,
    price: item.price,
    quantity: item.quantity
  }))

  // 注文に紐づくアイテムをorder_itemsテーブルに挿入
  const { error: itemsError } = await supabase.from('order_items').insert(items)

  if(itemsError){
    throw new Error(itemsError.message)
  }
}