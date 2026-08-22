import { useEffect, useState } from 'react'
import { fetchActiveProductos } from '../data/productosApi'
import { CATEGORIAS, ACENTO_POR_CATEGORIA } from '../data/categorias'
import ProductoCard from '../components/ProductoCard'
import Boton from '../components/Boton'
import { supabaseConfigured } from '../lib/supabase'

export default function CatalogoPage() {
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [categoria, setCategoria] = useState('Todos')

  useEffect(() => {
    fetchActiveProductos()
      .then(setProductos)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  const visibles = categoria === 'Todos' ? productos : productos.filter((p) => p.category === categoria)

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="text-center">
        <h1 className="font-display text-4xl font-semibold text-choco-900 sm:text-5xl">
          Nuestro Catálogo 🧁
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-choco-600">
          Panadería y pastelería artesanal, con una línea completa sin TACC: empanadas, tartas,
          pre pizzas, panes, alfajores y tortas para cada ocasión.
        </p>
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-2">
        <Boton
          as="button"
          variant={categoria === 'Todos' ? 'ladrillo' : 'ghost'}
          className="rounded-full px-4 py-2 font-display text-sm"
          onClick={() => setCategoria('Todos')}
        >
          Todos
        </Boton>
        {CATEGORIAS.map((c) => (
          <Boton
            key={c}
            as="button"
            variant={categoria === c ? ACENTO_POR_CATEGORIA[c] : 'ghost'}
            className="rounded-full px-4 py-2 font-display text-sm"
            onClick={() => setCategoria(c)}
          >
            {c}
          </Boton>
        ))}
      </div>

      {!supabaseConfigured && (
        <p className="mt-10 rounded-2xl bg-mostaza-light p-4 text-center text-choco-700">
          El catálogo todavía no está conectado a la base de datos (falta configurar Supabase).
        </p>
      )}

      {loading && <p className="mt-10 text-center text-choco-600">Cargando catálogo…</p>}
      {error && <p className="mt-10 text-center text-choco-600">No se pudo cargar el catálogo: {error}</p>}

      {!loading && !error && supabaseConfigured && visibles.length === 0 && (
        <p className="mt-10 text-center text-choco-600">Todavía no hay productos cargados en esta categoría.</p>
      )}

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {visibles.map((p) => (
          <ProductoCard key={p.id} producto={p} />
        ))}
      </div>
    </div>
  )
}
