import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { supabaseConfigured } from '../../lib/supabase'
import Boton from '../../components/Boton'

export default function AdminLogin() {
  const { session, signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  if (session) return <Navigate to="/admin" replace />

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const { error } = await signIn(email, password)
    setLoading(false)
    if (error) {
      setError('Email o contraseña incorrectos.')
      return
    }
    navigate('/admin')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-crema px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-3xl border border-crema-3 bg-white p-8 shadow-sm"
      >
        <div className="text-center">
          <span className="text-4xl">🧁</span>
          <h1 className="mt-2 font-display text-2xl font-semibold text-choco-900">
            Producciones Nan
          </h1>
          <p className="text-sm text-choco-500">Panel de administración</p>
        </div>

        {!supabaseConfigured && (
          <p className="mt-4 rounded-xl bg-mostaza-light p-3 text-center text-sm text-choco-700">
            Supabase no está configurado todavía — completar el archivo .env.
          </p>
        )}

        <div className="mt-6 flex flex-col gap-3">
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-xl border border-crema-3 px-4 py-2 outline-none focus:border-ladrillo"
          />
          <input
            type="password"
            required
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-xl border border-crema-3 px-4 py-2 outline-none focus:border-ladrillo"
          />
        </div>

        {error && <p className="mt-3 text-center text-sm text-vino-dark">{error}</p>}

        <Boton
          as="button"
          type="submit"
          variant="ladrillo"
          disabled={loading || !supabaseConfigured}
          className="mt-6 w-full rounded-full py-2.5 font-display"
        >
          {loading ? 'Entrando…' : 'Entrar'}
        </Boton>
      </form>
    </div>
  )
}
