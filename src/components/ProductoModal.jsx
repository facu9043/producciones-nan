import { useEffect, useState } from 'react'
import { ACENTO_POR_CATEGORIA, FONDO_POR_ACENTO } from '../data/categorias'
import { useCart } from '../context/CartContext'
import Boton from './Boton'

export default function ProductoModal({ producto, onClose }) {
  const { agregarAlCarrito } = useCart()
  const [seleccionando, setSeleccionando] = useState(false)
  const [cantidad, setCantidad] = useState(1)
  const [variante, setVariante] = useState(producto.variantes[0] || null)
  const [agregado, setAgregado] = useState(false)

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const acento = ACENTO_POR_CATEGORIA[producto.category] || 'ghost'
  const tieneVariantes = producto.variantes.length > 0

  function confirmarAgregado() {
    agregarAlCarrito(producto, variante, cantidad)
    setAgregado(true)
    setTimeout(onClose, 700)
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={producto.name}
      className="fixed inset-0 z-50 flex items-center justify-center bg-choco-900/50 px-4 py-8"
      onClick={onClose}
    >
      <div
        className="flex max-h-full w-full max-w-lg flex-col overflow-y-auto rounded-3xl bg-white shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`relative flex h-56 shrink-0 items-center justify-center text-8xl sm:h-72 ${FONDO_POR_ACENTO[acento]}`}>
          {producto.imageUrl ? (
            <img src={producto.imageUrl} alt={producto.name} className="h-full w-full object-cover" />
          ) : (
            <span>{producto.pattern}</span>
          )}
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-lg text-choco-700 shadow-sm"
          >
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-3 p-6">
          <div className="flex items-start justify-between gap-2">
            <h2 className="font-display text-2xl font-semibold text-choco-900">{producto.name}</h2>
            {producto.sinTacc && (
              <span className="shrink-0 rounded-full bg-oliva-light px-2 py-0.5 text-xs font-semibold text-oliva-dark">
                Sin TACC
              </span>
            )}
          </div>
          <span className="text-xs font-semibold uppercase tracking-wide text-choco-500">{producto.category}</span>

          {producto.descripcion && (
            <p className="text-sm leading-relaxed text-choco-600">{producto.descripcion}</p>
          )}

          <p className="font-display text-2xl text-choco-900">${producto.price.toLocaleString('es-AR')}</p>

          {!seleccionando && (
            <Boton
              as="button"
              variant="ladrillo"
              className="mt-2 w-full rounded-full py-3 font-display"
              onClick={() => setSeleccionando(true)}
            >
              Añadir al carrito
            </Boton>
          )}

          {seleccionando && !agregado && (
            <div className="mt-2 flex flex-col gap-4 rounded-2xl bg-crema-2 p-4">
              {tieneVariantes && (
                <div>
                  <p className="mb-2 text-sm font-semibold text-choco-700">Elegí una opción</p>
                  <div className="flex flex-wrap gap-2">
                    {producto.variantes.map((v) => (
                      <button
                        key={v}
                        onClick={() => setVariante(v)}
                        className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                          variante === v ? 'bg-ladrillo text-on-fill' : 'bg-white text-choco-600'
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-choco-700">Cantidad</p>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setCantidad((c) => Math.max(1, c - 1))}
                    aria-label="Restar"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg text-choco-700"
                  >
                    −
                  </button>
                  <span className="w-6 text-center font-display text-lg text-choco-900">{cantidad}</span>
                  <button
                    onClick={() => setCantidad((c) => c + 1)}
                    aria-label="Sumar"
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg text-choco-700"
                  >
                    +
                  </button>
                </div>
              </div>

              <Boton
                as="button"
                variant="ladrillo"
                className="w-full rounded-full py-3 font-display"
                onClick={confirmarAgregado}
              >
                Agregar {cantidad} · ${(producto.price * cantidad).toLocaleString('es-AR')}
              </Boton>
            </div>
          )}

          {agregado && (
            <p className="mt-2 rounded-2xl bg-oliva-light p-4 text-center font-display text-oliva-dark">
              ¡Agregado al carrito! 🧁
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
