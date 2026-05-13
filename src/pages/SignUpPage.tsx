import { useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { validateAuthForm } from '../utils/validateAuthForm'

function SignUpPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSignUp = async () => {

    // フォームのバリデーション
    const errorMessage = validateAuthForm({
      email,
      password,
    })

    if (errorMessage) {
      setMessage(errorMessage)
      return
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setMessage(error.message)
      return
    }

    // email確認メッセージの送信は、Supabaseの設定によって異なります。
    if (data.session) {
      setMessage('Account created successfully.')
    } else {
      setMessage('Sign up successful. Please check your email.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-200 p-6">
      <div className="mx-auto max-w-md rounded bg-white p-6">
        <h1 className="text-2xl font-bold">Sign Up</h1>

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

        <div className="mt-6 flex items-center gap-3">
          <button
            type="button"
            onClick={handleSignUp}
            className="rounded bg-slate-900 px-4 py-2 text-white"
          >
            Sign up
          </button>

          <Link
            to="/login"
            className="rounded bg-gray-300 px-4 py-2 text-gray-900"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage