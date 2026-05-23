import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

type Props = {
  totalItems: number
  searchText: string
  onSearchChange: (value: string) => void
}

function Header({ totalItems, searchText, onSearchChange }: Props) {
  const { user, logout } = useAuth()

  return (
    <header className="bg-slate-900 px-6 py-4 text-white">
      <div className="flex-wrap flex-col lg:flex-row mx-auto flex max-w-7xl items-center justify-between">
        {/* ロゴ */}
        <h1 className="text-xl font-bold">
          <Link to="/">EC Store</Link>
        </h1>

        {/* 検索フォーム */}
        <input
          type="text"
          placeholder="Search products..."
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
          className="order-3 w-full rounded border px-3 py-2 bg-white text-black lg:order-2 lg:w-128"
        />

        {/* ナビゲーション */}
        <div className="order-2 w-full lg:order-3 lg:flex lg:w-auto lg:items-center lg:gap-3">
          {user && (
            <span className="mb-2 block break-all text-sm text-white lg:mb-0 lg:block">
              {user.email}
            </span>
          )}

          <div className="flex flex-wrap gap-3 justify-items-start lg:flex lg:items-center lg:gap-3">
            {user ? (
              <button
                type="button"
                onClick={logout}
                className="rounded bg-red-500 px-2 py-2 text-xs text-white hover:bg-red-600 lg:px-3 lg:text-sm"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="rounded bg-slate-700 px-2 py-2 text-center text-xs text-white hover:bg-slate-600 lg:px-3 lg:text-sm"
              >
                Login
              </Link>
            )}

            <Link
              to="/orders"
              className="rounded bg-slate-700 px-2 py-2 text-center text-xs text-white hover:bg-slate-600 lg:px-3 lg:text-sm"
            >
              Orders
            </Link>

            <Link
              to="/cart"
              className="rounded bg-yellow-400 px-2 py-2 text-center text-xs font-medium text-gray-900 hover:bg-yellow-300 lg:px-4 lg:text-sm"
            >
              Cart ({totalItems})
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header