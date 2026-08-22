import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function RequireAuth({ children }) {
  const { session, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-crema font-body text-choco-600">
        Cargando…
      </div>
    )
  }

  if (!session) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}
