import { useEffect, useRef, useState } from 'react'

type Props = {
  onClick: () => void
  className?: string
}

function AddToCartButton({ onClick, className = '' }: Props) {
  const [added, setAdded] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const addedDisplayTime = 1500

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  const handleAddToCart = () => {
    onClick()

    setAdded(true)

    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    timerRef.current = window.setTimeout(() => {
      setAdded(false)
    }, addedDisplayTime)
  }

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      className={`mt-2 rounded bg-yellow-400 px-6 py-3 font-bold text-gray-900 hover:bg-yellow-300 ${className}`}
    >
      {added ? 'Added!' : 'Add to Cart'}
    </button>
  )
}

export default AddToCartButton