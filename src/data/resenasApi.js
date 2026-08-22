import { supabase, supabaseConfigured } from '../lib/supabase'

const TABLA = 'resenas'

function mapRow(row) {
  return {
    id: row.id,
    nombre: row.nombre,
    estrellas: Number(row.estrellas),
    comentario: row.comentario,
    aprobado: row.aprobado,
    createdAt: row.created_at,
  }
}

export async function fetchResenasAprobadas() {
  if (!supabaseConfigured) return []
  const { data, error } = await supabase
    .from(TABLA)
    .select('*')
    .eq('aprobado', true)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data.map(mapRow)
}

export async function fetchAllResenas() {
  if (!supabaseConfigured) return []
  const { data, error } = await supabase.from(TABLA).select('*').order('created_at', { ascending: false })
  if (error) throw error
  return data.map(mapRow)
}

// Cualquier visitante puede llamar esto sin loguearse — la política de RLS
// fuerza aprobado = false pase lo que pase, así que nunca se publica sola.
export async function crearResena({ nombre, estrellas, comentario }) {
  const { error } = await supabase.from(TABLA).insert({ nombre, estrellas, comentario, aprobado: false })
  if (error) throw error
}

export async function aprobarResena(id) {
  const { error } = await supabase.from(TABLA).update({ aprobado: true }).eq('id', id)
  if (error) throw error
}

export async function eliminarResena(id) {
  const { error } = await supabase.from(TABLA).delete().eq('id', id)
  if (error) throw error
}
