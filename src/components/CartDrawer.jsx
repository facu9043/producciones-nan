import { useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { whatsappLinkConMensaje } from '../data/contacto'
import Boton from './Boton'

function armarMensaje(items, totalPrecio) {
  const lineas = items.map((i) => {
    const variante = i.variante ? ` (${i.variante})` : ''
    return `• ${i.cantidad}x ${i.name}${variante} — $${(i.price * i.cantidad).toLocaleString('es-AR')}`
  })
  return [
    '¡Hola! Quería hacer este pedido:',
    '',
    ...lineas,
    '',
    `Total: $${totalPrecio.toLocaleString('es-AR')}`,
  ].join('\n')
}

export default function CartDrawer() {
  const { items, totalPrecio, abierto, cerrarCarrito, actualizarCantidad, quitarDelCarrito } = useCart()

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') cerrarCarrito()
    }
    if (abierto) document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [abierto, cerrarCarrito])

  if (!abierto) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-choco-900/50" onClick={cerrarCarrito}>
      <div
        className="flex h-full w-full max-w-sm flex-col bg-crema shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-crema-3 px-5 py-4">
          <h2 className="font-display text-xl font-semibold text-choco-900">Tu pedido</h2>
          <button onClick={cerrarCarrito} aria-label="Cerrar carrito" className="text-xl text-choco-600">
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <p className="mt-8 text-center text-choco-500">Todavía no agregaste nada.</p>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map((i) => (
                <div key={i.key} className="flex gap-3 rounded-2xl bg-white p-3">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-crema-2 text-2xl">
                    {i.imageUrl ? (
                      <img src={i.imageUrl} alt={i.name} className="h-full w-full rounded-xl object-cover" />
                    ) : (
                      <span>{i.pattern}</span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-1">
                    <p className="text-sm font-semibold text-choco-900">{i.name}</p>
                    {i.variante && <p className="text-xs text-choco-500">{i.variante}</p>}
                    <div className="mt-1 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => actualizarCantidad(i.key, i.cantidad - 1)}
                          aria-label="Restar"
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-crema-2 text-sm text-choco-700"
                        >
                          −
                        </button>
                        <span className="w-4 text-center text-sm text-choco-900">{i.cantidad}</span>
                        <button
                          onClick={() => actualizarCantidad(i.key, i.cantidad + 1)}
                          aria-label="Sumar"
                          className="flex h-6 w-6 items-center justify-center rounded-full bg-crema-2 text-sm text-choco-700"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-sm font-semibold text-choco-900">
                        ${(i.price * i.cantidad).toLocaleString('es-AR')}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => quitarDelCarrito(i.key)}
                    aria-label="Quitar"
                    className="self-start text-xs text-choco-400 hover:text-vino-dark"
                  >
                    Quitar
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-crema-3 px-5 py-4">
            <div className="mb-3 flex items-center justify-between font-display text-lg text-choco-900">
              <span>Total</span>
              <span>${totalPrecio.toLocaleString('es-AR')}</span>
            </div>
            <Boton
              as="a"
              variant="ladrillo"
              href={whatsappLinkConMensaje(armarMensaje(items, totalPrecio))}
              target="_blank"
              rel="noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-full py-3 font-display"
            >
              💬 Hacer pedido por WhatsApp
            </Boton>
          </div>
        )}
      </div>
    </div>
  )
}
