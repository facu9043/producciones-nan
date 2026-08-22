-- Agrega soporte de variantes (ej. "Chocolate negro" / "Chocolate blanco")
-- a productos ya existentes. Correr una sola vez en el SQL Editor de Supabase
-- (el proyecto ya tiene la tabla creada, esto solo agrega la columna nueva).
alter table productos add column if not exists variantes jsonb not null default '[]';
