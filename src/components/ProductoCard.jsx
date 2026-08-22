import { ACENTO_POR_CATEGORIA } from '../data/categorias'

const FONDO_POR_ACENTO = {
  mostaza: 'bg-mostaza-light',
  terracota: 'bg-terracota-light',
  oliva: 'bg-oliva-light',
  vino: 'bg-vino-light',
  ghost: 'bg-crema-3',
}

const TEXTO_POR_ACENTO = {
  mostaza: 'text-mostaza-dark',
  terracota: 'text-terracota-dark',
  oliva: 'text-oliva-dark',
  vino: 'text-vino-dark',
  ghost: 'text-choco-600',
}

export default function ProductoCard({ producto }) {
  const acento = ACENTO_POR_CATEGORIA[producto.category] || 'ghost'

  return (
    <div className="flex flex-col overflow-hidden rounded-3xl border border-crema-3 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
      <div className={`flex h-40 items-center justify-center text-6xl ${FONDO_POR_ACENTO[acento]}`}>
        {producto.imageUrl ? (
          <img src={producto.imageUrl} alt={producto.name} className="h-full w-full object-cover" />
        ) : (
          <span>{producto.pattern}</span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 p-4 text-left">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-semibold text-choco-700">{producto.name}</h3>
          {producto.sinTacc && (
            <span className="shrink-0 rounded-full bg-oliva-light px-2 py-0.5 text-xs font-semibold text-oliva-dark">
              Sin TACC
            </span>
          )}
        </div>
        <span className={`text-xs font-semibold uppercase tracking-wide ${TEXTO_POR_ACENTO[acento]}`}>
          {producto.category}
        </span>
        {producto.descripcion && (
          <p className="mt-1 line-clamp-2 text-sm text-choco-600">{producto.descripcion}</p>
        )}
        <p className="mt-auto pt-2 font-display text-xl text-choco-900">
          ${producto.price.toLocaleString('es-AR')}
        </p>
      </div>
    </div>
  )
}
