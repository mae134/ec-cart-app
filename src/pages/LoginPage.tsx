import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { validateAuthForm } from '../utils/validateAuthForm'
import { useAuth } from '../contexts/AuthContext'

function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const { login } = useAuth()

  const handleLogin = async () => {

    // フォームのバリデーション
    const errorMessage = validateAuthForm({
      email,
      password,
    })

    if (errorMessage) {
      setMessage(errorMessage)
      return
    }

    const error = await login(email, password)

    if (error) {
      setMessage(error.message)
      return
    }

    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-200 p-6">
      <div className="mx-auto max-w-md rounded bg-white p-6">
        <h1 className="text-2xl font-bold">Login</h1>

        <div className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded border p-2"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded border p-2"
          />
        </div>

        {message && <p className="mt-4 text-sm text-red-500">{message}</p>}

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={handleLogin}
            className="rounded bg-slate-900 px-4 py-2 text-white"
          >
            Login
          </button>

          <Link
            to="/signup"
            className="rounded bg-gray-300 px-4 py-2 text-gray-900"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage