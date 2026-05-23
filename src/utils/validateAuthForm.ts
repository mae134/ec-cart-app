type Params = {
  email: string
  password: string
}

export function validateAuthForm({
  email,
  password,
}: Params): string | null {
  if (!email.trim() || !password.trim()) {
    return 'Please fill in all fields'
  }

  if (!email.includes('@')) {
    return 'Please enter a valid email'
  }

  if (password.length < 6) {
    return 'Password must be at least 6 characters'
  }

  return null
}