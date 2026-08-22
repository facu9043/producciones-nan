import { useEffect, useState } from 'react'
import { fetchAllProductos, createProducto } from '../../data/productosApi'
import ProductoRow from '../../components/admin/ProductoRow'
import Boton from '../../components/Boton'

export default function AdminDashboard() {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [creando, setCreando] = useState(false)

  useEffect(() => {
    fetchAllProductos()
      .then(setProductos)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  async function handleAgregar() {
    setCreando(true)
    try {
      const nuevo = await createProducto()
      setProductos((prev) => [nuevo, ...prev])
    } finally {
      setCreando(false)
    }
  }

  function handleChange(actualizado) {
    setProductos((prev) => prev.map((p) => (p.id === actualizado.id ? actualizado : p)))
  }

  function handleDelete(id) {
    setProductos((prev) => prev.filter((p) => p.id !== id))
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-semibold text-choco-900">Productos</h1>
        <Boton as="button" variant="ladrillo" onClick={handleAgregar} disabled={creando} className="rounded-full px-5 py-2 font-display">
          {creando ? 'Agregando…' : '+ Agregar producto'}
        </Boton>
      </div>

      <p className="mt-2 text-sm text-choco-500">
        Los productos nuevos arrancan <strong>inactivos</strong>: completalos y activalos cuando
        estén listos para mostrarse en el sitio.
      </p>

      {loading && <p className="mt-8 text-choco-600">Cargando productos…</p>}
      {error && <p className="mt-8 text-choco-600">Error al cargar: {error}</p>}
      {!loading && !error && productos.length === 0 && (
        <p className="mt-8 text-choco-600">Todavía no cargaste ningún producto.</p>
      )}

      <div className="mt-6 flex flex-col gap-4">
        {productos.map((p) => (
          <ProductoRow key={p.id} producto={p} onChange={handleChange} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  )
}
