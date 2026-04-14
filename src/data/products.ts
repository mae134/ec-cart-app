import keyboardImg from '../assets/RGB_Mechanical_Keyboard.png'
import completeSetImg from '../assets/A_complete_set_of_technology_gadgets.png'

import type { Product } from '../types/product'

export const products: Product[] = [
  { id: 1, name: 'Keyboard', price: 5980, imageUrl: keyboardImg },
  { id: 2, name: 'Mouse', price: 2980, imageUrl: completeSetImg },
  { id: 3, name: 'Monitor', price: 24800, imageUrl: completeSetImg },
]
