import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import '@testing-library/jest-dom/vitest'

import AddToCartButton from './AddToCartButton'

describe('AddToCartButton', () => {
  it('calls onClick and shows Added! when clicked', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    render(<AddToCartButton onClick={handleClick} />)

    const button = screen.getByRole('button', {
      name: /add to cart/i,
    })

    await user.click(button)

    expect(handleClick).toHaveBeenCalledTimes(1)
    expect(button).toHaveTextContent('Added!')
  })
})