import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

type Props = {
  totalItems: number
}

function Header({ totalItems }: Props) {
  const { user, logout } = useAuth()

  return (
    <header className="bg-slate-900 px-6 py-4 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* ロゴ */}
        <h1 className="text-xl font-bold">
          <Link to="/">EC Store</Link>
        </h1>

        {/* ナビゲーション */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm text-white">
                {user.email}
              </span>

              <button
                type="button"
                onClick={logout}
                className="rounded bg-red-500 px-3 py-2 text-sm text-white hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="rounded bg-slate-700 px-3 py-2 text-sm text-white hover:bg-slate-600"
            >
              Login
            </Link>
          )}
          <Link
            to="/orders"
            className="rounded bg-slate-700 px-3 py-2 text-sm text-white hover:bg-slate-600"
          >
            Orders
          </Link>

          <Link
            to="/cart"
            className="rounded bg-yellow-400 px-4 py-2 font-medium text-gray-900 hover:bg-yellow-300"
          >
            Cart ({totalItems})
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header