import { supabase } from '../lib/supabase'

type CreateOrderParams = {
  cusutomerName: string
  email: string
  address: string
  phone: string
  totalPrice: number
}

export async function createOrder(params: CreateOrderParams) {

  const { error } = await supabase.from('orders').insert(
    {
      customer_name: params.cusutomerName,
      email: params.email,
      address: params.address,
      phone: params.phone,
      total_price: params.totalPrice
    })

    if(error){
      throw new Error(error.message)
    }
}