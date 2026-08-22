import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabaseConfigured = Boolean(url && anonKey)

if (!supabaseConfigured) {
  console.warn(
    'Supabase no está configurado todavía: falta VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY en el .env'
  )
}

// Cliente único: el resto del código siempre importa este, nunca crea uno nuevo.
export const supabase = supabaseConfigured
  ? createClient(url, anonKey)
  : null
