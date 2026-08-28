import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../lib/api'
import { useAuthStore } from '../store/authStore'

export default function Login() {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError('')
    try {
      const response = await api.post('/users/login', { email, password })
      login(response.data.user, response.data.token)
      navigate('/products')
    } catch {
      setError('Unable to sign in with those details.')
    }
  }

  return <div className="mx-auto max-w-md bg-white p-8 shadow-xl shadow-slate-200/60"><p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-rose-500">Welcome back</p><h1 className="mb-6 text-3xl font-bold">Sign in</h1><form onSubmit={handleSubmit} className="space-y-4"><label className="block text-sm font-semibold">Email<input required type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="mt-1 w-full border border-slate-200 px-3 py-3" /></label><label className="block text-sm font-semibold">Password<input required type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="mt-1 w-full border border-slate-200 px-3 py-3" /></label>{error && <p className="text-sm text-rose-600">{error}</p>}<button className="w-full bg-slate-900 py-3 font-bold text-white">Sign In</button></form><p className="mt-5 text-sm text-slate-500">New here? Register through the API to create an account.</p><Link to="/" className="mt-3 inline-block text-sm font-semibold text-rose-500">Back to shop</Link></div>
}