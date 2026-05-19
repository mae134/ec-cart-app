type Props = {
  searchText: string
  onSearchChange: (value: string) => void
}

function ProductSearch({ searchText, onSearchChange }: Props) {
  return (
    <input
      type="text"
      placeholder="Search products..."
      value={searchText}
      onChange={(e) => onSearchChange(e.target.value)}
      className="mb-6 w-full rounded border p-2"
    />
  )
}

export default ProductSearch