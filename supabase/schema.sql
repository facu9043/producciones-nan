-- ============================================================
-- Producciones Nan — esquema de la base de datos (Supabase)
-- ============================================================
-- Como usarlo: entrar al proyecto de Supabase -> SQL Editor,
-- pegar este archivo completo, y ejecutarlo (Run). Se corre una sola vez.
-- ============================================================

-- 1. Tabla principal de productos
create table if not exists productos (
  id bigint generated always as identity primary key,
  name text not null,
  category text not null,
  price numeric not null default 0,
  image_url text,
  pattern text,                              -- emoji de relleno mientras no hay foto real
  sin_tacc boolean not null default false,
  descripcion text,
  active boolean not null default true,      -- base del switch activar/desactivar del panel
  created_at timestamptz not null default now()
);

alter table productos enable row level security;

-- El publico solo ve los productos activos
create policy "publico lee activos"
  on productos for select
  to anon
  using (active = true);

-- El admin logueado puede leer y editar todo
create policy "admin lee todo"
  on productos for select
  to authenticated
  using (true);

create policy "admin inserta"
  on productos for insert
  to authenticated
  with check (true);

create policy "admin actualiza"
  on productos for update
  to authenticated
  using (true)
  with check (true);

create policy "admin borra"
  on productos for delete
  to authenticated
  using (true);

-- 2. Bucket de fotos de productos
insert into storage.buckets (id, name, public)
values ('productos-images', 'productos-images', true)
on conflict (id) do nothing;

create policy "cualquiera puede ver las fotos"
  on storage.objects for select
  to public
  using (bucket_id = 'productos-images');

create policy "admin logueado puede subir fotos"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'productos-images');

create policy "admin logueado puede reemplazar fotos"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'productos-images');

create policy "admin logueado puede borrar fotos"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'productos-images');

-- 3. Catalogo inicial de ejemplo (opcional).
-- Descomentar y editar con los productos reales de Producciones Nan,
-- o cargarlos directamente desde el panel /admin una vez publicado el sitio.
--
-- insert into productos (name, category, price, sin_tacc, descripcion, active) values
--   ('Pan de molde sin TACC', 'Panificados', 2500, true, 'Con harinas alternativas', true),
--   ('Medialunas x6', 'Dulce de Horno', 3200, false, 'De manteca, bien dulces', true),
--   ('Torta de chocolate sin TACC', 'Tortas y Eventos', 8500, true, 'Bizcochuelo húmedo con ganache', true);
