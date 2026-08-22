import { supabase, supabaseConfigured } from '../lib/supabase'
import { PATRON_POR_CATEGORIA } from './categorias'

const TABLA = 'productos'
const BUCKET = 'productos-images'

// Postgres devuelve `numeric` como string (PostgREST) — convertir siempre a Number.
function mapRow(row) {
  return {
    id: row.id,
    name: row.name,
    category: row.category,
    price: Number(row.price),
    imageUrl: row.image_url,
    pattern: row.pattern || PATRON_POR_CATEGORIA[row.category] || '🧁',
    sinTacc: row.sin_tacc,
    descripcion: row.descripcion || '',
    active: row.active,
    createdAt: row.created_at,
  }
}

export async function fetchActiveProductos() {
  if (!supabaseConfigured) return []
  const { data, error } = await supabase
    .from(TABLA)
    .select('*')
    .eq('active', true)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data.map(mapRow)
}

export async function fetchAllProductos() {
  if (!supabaseConfigured) return []
  const { data, error } = await supabase
    .from(TABLA)
    .select('*')
    .order('created_at', { ascending: false })
  if (error) throw error
  return data.map(mapRow)
}

export async function fetchProductoById(id) {
  if (!supabaseConfigured) return null
  const { data, error } = await supabase.from(TABLA).select('*').eq('id', id).single()
  if (error) throw error
  return mapRow(data)
}

// Crea un producto en blanco, inactivo por defecto — nunca se muestra a medio
// completar en el sitio público. El dueño lo activa cuando termina de cargarlo.
export async function createProducto() {
  const { data, error } = await supabase
    .from(TABLA)
    .insert({ name: 'Producto nuevo', category: 'Otros', price: 0, active: false })
    .select()
    .single()
  if (error) throw error
  return mapRow(data)
}

export async function updateProducto(id, fields) {
  const payload = {}
  if ('name' in fields) payload.name = fields.name
  if ('category' in fields) payload.category = fields.category
  if ('price' in fields) payload.price = fields.price
  if ('sinTacc' in fields) payload.sin_tacc = fields.sinTacc
  if ('descripcion' in fields) payload.descripcion = fields.descripcion
  if ('active' in fields) payload.active = fields.active
  if ('imageUrl' in fields) payload.image_url = fields.imageUrl

  const { data, error } = await supabase.from(TABLA).update(payload).eq('id', id).select().single()
  if (error) throw error
  return mapRow(data)
}

export async function deleteProducto(id) {
  const { error } = await supabase.from(TABLA).delete().eq('id', id)
  if (error) throw error
}

export async function uploadProductoImage(id, file) {
  const ext = file.name.split('.').pop()
  const path = `${id}-${Date.now()}.${ext}`

  const { error: uploadError } = await supabase.storage.from(BUCKET).upload(path, file, {
    upsert: true,
  })
  if (uploadError) throw uploadError

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return updateProducto(id, { imageUrl: data.publicUrl })
}
