import { useEffect, useState } from 'react'
import { fetchAllResenas, aprobarResena, eliminarResena } from '../../data/resenasApi'
import Estrellas from '../../components/Estrellas'
import Boton from '../../components/Boton'

export default function AdminResenas() {
  const [resenas, setResenas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchAllResenas()
      .then(setResenas)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  async function handleAprobar(id) {
    await aprobarResena(id)
    setResenas((prev) => prev.map((r) => (r.id === id ? { ...r, aprobado: true } : r)))
  }

  async function handleEliminar(id) {
    if (!confirm('¿Eliminar esta reseña? No se puede deshacer.')) return
    await eliminarResena(id)
    setResenas((prev) => prev.filter((r) => r.id !== id))
  }

  const pendientes = resenas.filter((r) => !r.aprobado)
  const aprobadas = resenas.filter((r) => r.aprobado)

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-choco-900">Reseñas</h1>
      <p className="mt-2 text-sm text-choco-500">
        Las reseñas nuevas quedan pendientes hasta que las apruebes — recién ahí se ven en "Sobre Nosotros".
      </p>

      {loading && <p className="mt-8 text-choco-600">Cargando reseñas…</p>}
      {error && <p className="mt-8 text-choco-600">Error al cargar: {error}</p>}

      {!loading && !error && (
        <>
          <h2 className="mt-8 font-display text-lg font-semibold text-choco-900">
            Pendientes {pendientes.length > 0 && `(${pendientes.length})`}
          </h2>
          {pendientes.length === 0 ? (
            <p className="mt-2 text-sm text-choco-500">No hay reseñas esperando aprobación.</p>
          ) : (
            <div className="mt-3 flex flex-col gap-3">
              {pendientes.map((r) => (
                <div key={r.id} className="flex flex-col gap-2 rounded-2xl border border-mostaza bg-mostaza-light/40 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <Estrellas valor={r.estrellas} size="text-sm" />
                    <p className="mt-1 text-sm text-choco-700">{r.comentario}</p>
                    <p className="mt-1 text-xs font-semibold text-choco-500">— {r.nombre}</p>
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <Boton as="button" variant="oliva" onClick={() => handleAprobar(r.id)} className="rounded-full px-4 py-1.5 text-sm">
                      Aprobar
                    </Boton>
                    <button onClick={() => handleEliminar(r.id)} className="text-xs text-choco-400 hover:text-vino-dark">
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <h2 className="mt-10 font-display text-lg font-semibold text-choco-900">Publicadas</h2>
          {aprobadas.length === 0 ? (
            <p className="mt-2 text-sm text-choco-500">Todavía no aprobaste ninguna reseña.</p>
          ) : (
            <div className="mt-3 flex flex-col gap-3">
              {aprobadas.map((r) => (
                <div key={r.id} className="flex flex-col gap-2 rounded-2xl border border-crema-3 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <Estrellas valor={r.estrellas} size="text-sm" />
                    <p className="mt-1 text-sm text-choco-700">{r.comentario}</p>
                    <p className="mt-1 text-xs font-semibold text-choco-500">— {r.nombre}</p>
                  </div>
                  <button onClick={() => handleEliminar(r.id)} className="shrink-0 text-xs text-choco-400 hover:text-vino-dark">
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}
