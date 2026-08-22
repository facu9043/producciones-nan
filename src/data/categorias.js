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
