const VALORES = [
  {
    icono: '🌾',
    titulo: 'Sin TACC',
    texto: 'Elaboramos opciones especialmente pensadas para celíacos, sin resignar sabor.',
    fondo: 'bg-oliva-light',
    color: 'text-oliva-dark',
  },
  {
    icono: '✨',
    titulo: 'A tu medida',
    texto: 'Cada pedido se prepara de forma personalizada, cuidando cada detalle.',
    fondo: 'bg-mostaza-light',
    color: 'text-mostaza-dark',
  },
  {
    icono: '🍯',
    titulo: 'Ingredientes seleccionados',
    texto: 'Elegimos con cuidado cada ingrediente para garantizar calidad en cada bocado.',
    fondo: 'bg-terracota-light',
    color: 'text-terracota-dark',
  },
  {
    icono: '💛',
    titulo: 'Hecho con amor',
    texto: 'Cada producto sale de nuestra cocina con la misma dedicación que si fuera para casa.',
    fondo: 'bg-vino-light',
    color: 'text-vino-dark',
  },
]

export default function SobreNosotrosPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <div className="text-center">
        <span className="text-5xl">👩‍🍳</span>
        <h1 className="mt-3 font-display text-4xl font-semibold text-choco-900 sm:text-5xl">
          Sobre Nosotros
        </h1>
      </div>

      <div className="mt-8 rounded-3xl border border-crema-3 bg-white p-6 sm:p-10">
        <p className="text-lg leading-relaxed text-choco-600">
          <strong className="text-choco-900">Producciones Nan</strong> es un emprendimiento
          artesanal dedicado a la elaboración de productos de panadería y pastelería casera,
          especialmente opciones <strong className="text-choco-900">sin TACC</strong> y
          preparaciones dulces.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-choco-600">
          Nos caracteriza la elaboración personalizada, el cuidado en cada detalle, la
          utilización de ingredientes seleccionados y el compromiso con la calidad. Nuestra
          identidad transmite cercanía, dedicación, creatividad y amor por la cocina artesanal.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {VALORES.map((v) => (
          <div key={v.titulo} className={`rounded-2xl p-5 ${v.fondo}`}>
            <span className="text-3xl">{v.icono}</span>
            <h3 className={`mt-2 font-display text-lg font-semibold ${v.color}`}>{v.titulo}</h3>
            <p className="mt-1 text-sm text-choco-700">{v.texto}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
