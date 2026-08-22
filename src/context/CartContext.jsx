import { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'producciones-nan-carrito'

function lineKey(productoId, variante) {
  return `${productoId}::${variante || ''}`
}

function cargarInicial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(cargarInicial)
  const [abierto, setAbierto] = useState(false)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  // Si ya está la misma línea (producto + variante), suma cantidad.
  // Si es una variante distinta del mismo producto, queda como línea separada.
  function agregarAlCarrito(producto, variante, cantidad) {
    const key = lineKey(producto.id, variante)
    setItems((prev) => {
      const existente = prev.find((i) => i.key === key)
      if (existente) {
        return prev.map((i) => (i.key === key ? { ...i, cantidad: i.cantidad + cantidad } : i))
      }
      return [
        ...prev,
        {
          key,
          productoId: producto.id,
          name: producto.name,
          price: producto.price,
          imageUrl: producto.imageUrl,
          pattern: producto.pattern,
          variante: variante || null,
          cantidad,
        },
      ]
    })
    setAbierto(true)
  }

  function actualizarCantidad(key, cantidad) {
    if (cantidad < 1) return
    setItems((prev) => prev.map((i) => (i.key === key ? { ...i, cantidad } : i)))
  }

  function quitarDelCarrito(key) {
    setItems((prev) => prev.filter((i) => i.key !== key))
  }

  function vaciarCarrito() {
    setItems([])
  }

  const totalItems = items.reduce((sum, i) => sum + i.cantidad, 0)
  const totalPrecio = items.reduce((sum, i) => sum + i.cantidad * i.price, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalPrecio,
        abierto,
        abrirCarrito: () => setAbierto(true),
        cerrarCarrito: () => setAbierto(false),
        agregarAlCarrito,
        actualizarCantidad,
        quitarDelCarrito,
        vaciarCarrito,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
