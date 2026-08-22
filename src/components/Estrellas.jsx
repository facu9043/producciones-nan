export default function Estrellas({ valor, onChange, size = 'text-xl' }) {
  const interactivo = typeof onChange === 'function'

  return (
    <div className={`flex gap-0.5 ${size}`}>
      {[1, 2, 3, 4, 5].map((n) =>
        interactivo ? (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            aria-label={`${n} estrella${n > 1 ? 's' : ''}`}
            className="leading-none"
          >
            <span className={n <= valor ? 'text-mostaza' : 'text-crema-3'}>★</span>
          </button>
        ) : (
          <span key={n} className={n <= valor ? 'text-mostaza' : 'text-crema-3'}>
            ★
          </span>
        )
      )}
    </div>
  )
}
