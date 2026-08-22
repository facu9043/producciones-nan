import { useEffect, useState } from 'react'
import { fetchResenasAprobadas, crearResena } from '../data/resenasApi'
import { supabaseConfigured } from '../lib/supabase'
import Estrellas from './Estrellas'
import Boton from './Boton'

export default function ResenasSection() {
  const [resenas, setResenas] = useState([])
  const [loading, setLoading] = useState(true)
  const [nombre, setNombre] = useState('')
  const [estrellas, setEstrellas] = useState(0)
  const [comentario, setComentario] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchResenasAprobadas()
      .then(setResenas)
      .finally(() => setLoading(false))
  }, [])

  const promedio = resenas.length
    ? (resenas.reduce((sum, r) => sum + r.estrellas, 0) / resenas.length).toFixed(1)
    : null

  async function handleSubmit(e) {
    e.preventDefault()
    if (!nombre.trim() || !comentario.trim() || estrellas === 0) return
    setEnviando(true)
    setError(null)
    try {
      await crearResena({ nombre: nombre.trim(), estrellas, comentario: comentario.trim() })
      setEnviado(true)
      setNombre('')
      setEstrellas(0)
      setComentario('')
    } catch {
      setError('No se pudo enviar la reseña. Probá de nuevo en un rato.')
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="mt-10">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="font-display text-2xl font-semibold text-choco-900">Lo que dicen nuestros clientes</h2>
        {promedio && (
          <div className="flex items-center gap-2 text-choco-700">
            <Estrellas valor={Math.round(promedio)} size="text-lg" />
            <span className="text-sm font-semibold">
              {promedio} · {resenas.length} reseña{resenas.length !== 1 ? 's' : ''}
            </span>
          </div>
        )}
      </div>

      {!loading && resenas.length === 0 && (
        <p className="mt-3 text-sm text-choco-500">Todavía no hay reseñas — ¡sé la primera persona en dejar una!</p>
      )}

      {resenas.length > 0 && (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {resenas.map((r) => (
            <div key={r.id} className="rounded-2xl bg-white p-4 shadow-sm">
              <Estrellas valor={r.estrellas} size="text-base" />
              <p className="mt-2 text-sm text-choco-600">{r.comentario}</p>
              <p className="mt-2 text-xs font-semibold text-choco-500">— {r.nombre}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 rounded-3xl border border-crema-3 bg-crema-2 p-6">
        <h3 className="font-display text-lg font-semibold text-choco-900">Dejá tu reseña</h3>

        {!supabaseConfigured ? (
          <p className="mt-2 text-sm text-choco-600">
            Todavía no está conectada la base de datos, no se pueden dejar reseñas.
          </p>
        ) : enviado ? (
          <p className="mt-2 rounded-2xl bg-oliva-light p-4 text-sm text-oliva-dark">
            ¡Gracias! Tu reseña se va a publicar apenas la revisemos.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-3">
            <Estrellas valor={estrellas} onChange={setEstrellas} size="text-2xl" />
            <input
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Tu nombre"
              required
              className="rounded-lg border border-crema-3 bg-white px-3 py-2 text-sm outline-none focus:border-ladrillo"
            />
            <textarea
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              placeholder="Contanos qué te pareció"
              required
              rows={3}
              className="rounded-lg border border-crema-3 bg-white px-3 py-2 text-sm outline-none focus:border-ladrillo"
            />
            {error && <p className="text-sm text-vino-dark">{error}</p>}
            <Boton
              as="button"
              type="submit"
              variant="ladrillo"
              disabled={enviando || estrellas === 0}
              className="self-start rounded-full px-6 py-2 text-sm"
            >
              {enviando ? 'Enviando…' : 'Enviar reseña'}
            </Boton>
          </form>
        )}
      </div>
    </div>
  )
}
