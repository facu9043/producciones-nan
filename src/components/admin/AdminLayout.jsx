import { Outlet, Link, NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Boton from '../Boton'

const tabs = [
  { to: '/admin', label: 'Productos', end: true },
  { to: '/admin/resenas', label: 'Reseñas' },
]

export default function AdminLayout() {
  const { signOut } = useAuth()

  return (
    <div className="min-h-screen bg-crema">
      <header className="border-b-2 border-crema-3 bg-white px-6 py-4">
        <div className="flex items-center justify-between">
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
        </div>

        <nav className="mt-4 flex gap-2">
          {tabs.map((t) => (
            <NavLink
              key={t.to}
              to={t.to}
              end={t.end}
              className={({ isActive }) =>
                `rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  isActive ? 'bg-ladrillo-light text-ladrillo-dark' : 'text-choco-600 hover:bg-crema-2'
                }`
              }
            >
              {t.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <Outlet />
      </main>
    </div>
  )
}
