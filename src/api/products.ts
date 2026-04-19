import { supabase } from '../lib/supabase'
import type { Product } from '../types/product'

type ProductRow = {
  id: number
  name: string
  price: number
  image_url: string
}

export async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('id', { ascending: true })

  if (error) {
    throw new Error(error.message)
  }

  return (data as ProductRow[]).map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    imageUrl: item.image_url,
  }))
}