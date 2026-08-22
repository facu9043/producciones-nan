import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const links = [
  { to: '/', label: 'Catálogo', end: true },
  { to: '/sobre-nosotros', label: 'Sobre Nosotros' },
  { to: '/contacto', label: 'Contacto' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const { totalItems, abrirCarrito } = useCart()

  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-full font-display font-medium transition-colors ${
      isActive ? 'bg-ladrillo-light text-ladrillo-dark' : 'text-choco-600 hover:bg-crema-2'
    }`

  return (
    <header className="sticky top-0 z-40 bg-crema/90 backdrop-blur border-b-2 border-crema-3">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <NavLink to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Producciones Nan" className="h-11 w-11 rounded-full" />
          <span className="font-display text-2xl font-semibold text-choco-900">
            Producciones <span className="text-ladrillo">Nan</span>
          </span>
        </NavLink>

        <nav className="hidden gap-2 sm:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={abrirCarrito}
            aria-label="Ver carrito"
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-crema-2 text-lg text-choco-700"
          >
            🛒
            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-ladrillo px-1 text-xs font-semibold text-on-fill">
                {totalItems}
              </span>
            )}
          </button>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-crema-2 text-choco-700 sm:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Abrir menú"
          >
            {open ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-crema-3 bg-crema px-4 py-3 sm:hidden">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass} onClick={() => setOpen(false)}>
              {l.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}
