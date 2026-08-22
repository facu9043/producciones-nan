// Categorías fijas del catálogo — se muestran como <select> en el admin
// para no romper los filtros públicos con errores de tipeo. Cada línea de
// producto tiene su propio color de acento (ver src/index.css) para que la
// amplitud del catálogo se note a simple vista.
export const CATEGORIAS = ['Dulce de Horno', 'Panificados', 'Salado Sin TACC', 'Tortas y Eventos', 'Otros']

export const ACENTO_POR_CATEGORIA = {
  'Dulce de Horno': 'mostaza',
  Panificados: 'terracota',
  'Salado Sin TACC': 'oliva',
  'Tortas y Eventos': 'vino',
  Otros: 'ghost',
}

// Emoji de relleno visual por categoría, mientras el producto no tenga foto real.
export const PATRON_POR_CATEGORIA = {
  'Dulce de Horno': '🥐',
  Panificados: '🍞',
  'Salado Sin TACC': '🥟',
  'Tortas y Eventos': '🎂',
  Otros: '🧁',
}

// Clases de Tailwind por acento — compartidas entre ProductoCard, ProductoModal y el admin.
export const FONDO_POR_ACENTO = {
  mostaza: 'bg-mostaza-light',
  terracota: 'bg-terracota-light',
  oliva: 'bg-oliva-light',
  vino: 'bg-vino-light',
  ghost: 'bg-crema-3',
}

export const TEXTO_POR_ACENTO = {
  mostaza: 'text-mostaza-dark',
  terracota: 'text-terracota-dark',
  oliva: 'text-oliva-dark',
  vino: 'text-vino-dark',
  ghost: 'text-choco-600',
}
