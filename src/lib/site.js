// Identificador de este sitio dentro de la base de datos compartida
// "tiendas-web" (columna site_id en categories/products/reviews/sites).
// Cada tienda que vive en el mismo proyecto de Supabase define su propio
// VITE_SITE_ID.
export const SITE_ID = import.meta.env.VITE_SITE_ID || 'nan'
