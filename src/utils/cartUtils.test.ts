import { describe, expect, it } from 'vitest'
import { calculateTotalItems } from './cartUtils'

describe('calculateTotalItems', () => {
  it('returns total quantity of cart items', () => {
    const cart = [{ quantity: 2 }, { quantity: 3 }]

    expect(calculateTotalItems(cart)).toBe(5)
  })

  it('returns 0 when cart is empty', () => {
    expect(calculateTotalItems([])).toBe(0)
  })
})
