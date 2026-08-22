import { Outlet, Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Boton from '../Boton'

export default function AdminLayout() {
  const { signOut } = useAuth()

  return (
    <div className="min-h-screen bg-crema">
      <header className="flex items-center justify-between border-b-2 border-crema-3 bg-white px-6 py-4">
        <Link to="/admin" className="font-display text-xl font-semibold text-choco-900">
          🧁 Panel de administración
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/" target="_blank" className="text-sm text-choco-600 hover:underline">
            Ver sitio
          </Link>
          <Boton as="button" variant="ghost" onClick={signOut} className="rounded-full px-4 py-1.5 text-sm">
            Cerrar sesión
          </Boton>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <Outlet />
      </main>
    </div>
  )
}
