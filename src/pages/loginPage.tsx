import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

function LoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const validateAuthForm = () => {
    if (!email.trim() || !password.trim()) {
      setMessage('Please fill in all fields')
      return false
    }

    if (!email.includes('@')) {
      setMessage('Please enter a valid email')
      return false
    }

    if (password.length < 6) {
      setMessage('Password must be at least 6 characters')
      return false
    }

    return true
  }

  const handleSignUp = async () => {

    if (!validateAuthForm()) {
      return
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setMessage(error.message)
      return
    }

    setMessage('Sign up successful. Please check your email.')
  }

  const handleLogin = async () => {
    
    if (!validateAuthForm()) {
      return
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

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

          <button
            type="button"
            onClick={handleSignUp}
            className="rounded bg-gray-300 px-4 py-2 text-gray-900"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginPage