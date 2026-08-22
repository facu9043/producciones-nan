-- Reseñas de clientes (estrellas + comentario) en "Sobre Nosotros".
-- Correr una sola vez en el SQL Editor de Supabase.

create table if not exists resenas (
  id bigint generated always as identity primary key,
  nombre text not null,
  estrellas smallint not null check (estrellas between 1 and 5),
  comentario text not null,
  aprobado boolean not null default false,
  created_at timestamptz not null default now()
);

alter table resenas enable row level security;

-- El público solo ve las reseñas ya aprobadas
create policy "publico lee aprobadas"
  on resenas for select
  to anon
  using (aprobado = true);

-- Cualquier visitante puede dejar una reseña, pero SIEMPRE queda pendiente
-- (aprobado = false) sin importar qué mande el cliente en el insert.
create policy "publico deja resena pendiente"
  on resenas for insert
  to anon
  with check (aprobado = false);

-- El admin logueado ve todo (pendientes y aprobadas) y puede aprobar/borrar
create policy "admin lee todo"
  on resenas for select
  to authenticated
  using (true);

create policy "admin actualiza"
  on resenas for update
  to authenticated
  using (true)
  with check (true);

create policy "admin borra"
  on resenas for delete
  to authenticated
  using (true);
