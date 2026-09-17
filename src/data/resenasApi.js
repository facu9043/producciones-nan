import { supabase, supabaseConfigured } from '../lib/supabase'
import { SITE_ID } from '../lib/site'

// Tabla compartida con las demás tiendas de tiendas-web (antes "resenas",
// propia de este proyecto). Los nombres de columna en inglés (name/rating/
// comment/approved) vienen del esquema compartido; se siguen exponiendo en
// español hacia el resto de la app para no tocar ningún componente.
const TABLA = 'reviews'

function mapRow(row) {
  return {
    id: row.id,
    nombre: row.name,
    estrellas: Number(row.rating),
    comentario: row.comment,
    aprobado: row.approved,
    createdAt: row.created_at,
  }
}

export async function fetchResenasAprobadas() {
  if (!supabaseConfigured) return []
  const { data, error } = await supabase
    .from(TABLA)
    .select('*')
    .eq('site_id', SITE_ID)
    .eq('approved', true)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data.map(mapRow)
}

export async function fetchAllResenas() {
  if (!supabaseConfigured) return []
  const { data, error } = await supabase
    .from(TABLA)
    .select('*')
    .eq('site_id', SITE_ID)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data.map(mapRow)
}

// Cualquier visitante puede llamar esto sin loguearse — la política de RLS
// fuerza approved = false pase lo que pase, así que nunca se publica sola.
export async function crearResena({ nombre, estrellas, comentario }) {
  const { error } = await supabase
    .from(TABLA)
    .insert({ site_id: SITE_ID, name: nombre, rating: estrellas, comment: comentario, approved: false })
  if (error) throw error
}

export async function aprobarResena(id) {
  const { error } = await supabase.from(TABLA).update({ approved: true }).eq('site_id', SITE_ID).eq('id', id)
  if (error) throw error
}

export async function eliminarResena(id) {
  const { error } = await supabase.from(TABLA).delete().eq('site_id', SITE_ID).eq('id', id)
  if (error) throw error
}
