-- ========================================================
-- DOCENTIA - ESQUEMA DE BASE DE DATOS Y STORAGE (SUPABASE)
-- ========================================================
-- Puedes copiar y pegar este script en el SQL Editor de tu panel de Supabase:
-- https://supabase.com/dashboard/project/yiulfgvapwjdtwdywdwh/sql

-- 1. HABILITAR EXTENSIÓN UUID
create extension if not exists "uuid-ossp";

-- 2. TABLA DE PERFILES DE USUARIO
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  full_name text not null,
  role text check (role in ('docente', 'escuela', 'superadmin')) not null default 'docente',
  is_super_admin boolean default false,
  institution_name text,
  cct text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. TABLA DE VACANTES DOCENTES
create table if not exists public.vacancies (
  id text primary key,
  title text not null,
  school_name text not null,
  school_type text check (school_type in ('publica', 'privada')) default 'privada',
  school_logo text,
  cct text,
  educational_level text not null,
  subjects jsonb default '[]'::jsonb,
  description text not null,
  salary_min numeric(12, 2) not null default 15000,
  salary_max numeric(12, 2),
  salary_period text check (salary_period in ('mensual', 'quincenal', 'hora')) default 'mensual',
  contract_duration text default 'Ciclo Escolar',
  contract_type text not null default 'planta_permanente',
  schedule_type text default 'tiempo_completo',
  shift text default 'matutino',
  modality text default 'presencial',
  location jsonb default '{"state": "Ciudad de México", "city": "", "address": ""}'::jsonb,
  required_documents jsonb default '[]'::jsonb,
  requirements jsonb default '{"minDegree": "Licenciatura", "requireProfessionalLicense": true, "minExperienceYears": 1}'::jsonb,
  is_urgent_substitute boolean default false,
  status text check (status in ('activa', 'en_proceso', 'cerrada')) default 'activa',
  applicants_count integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. TABLA DE POSTULACIONES
create table if not exists public.applications (
  id uuid default uuid_generate_v4() primary key,
  vacancy_id text references public.vacancies(id) on delete cascade,
  teacher_id text not null,
  teacher_name text not null,
  teacher_email text not null,
  teacher_cct text,
  attached_documents jsonb default '[]'::jsonb,
  applied_at timestamp with time zone default timezone('utc'::text, now()) not null,
  status text check (status in ('en_revision', 'clase_muestra', 'entrevista', 'aceptado', 'rechazado')) default 'en_revision'
);

-- 5. TABLA DE SUSCRIPCIONES Y PAGOS
create table if not exists public.subscriptions (
  id uuid default uuid_generate_v4() primary key,
  user_id text not null,
  user_email text not null,
  plan_type text not null, -- docente_5usd, escuela_10usd
  amount_usd numeric(10, 2) not null,
  status text check (status in ('activo', 'cancelado', 'pendiente')) default 'activo',
  stripe_session_id text,
  stripe_subscription_id text,
  renews_at date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. HABILITAR ROW LEVEL SECURITY (RLS)
alter table public.profiles enable row level security;
alter table public.vacancies enable row level security;
alter table public.applications enable row level security;
alter table public.subscriptions enable row level security;

-- Políticas de lectura pública de vacantes (Cualquier visitante puede ver vacantes)
create policy "Vacantes visibles para todos" on public.vacancies for select using (true);
create policy "Creación de vacantes" on public.vacancies for insert with check (true);
create policy "Actualización de vacantes" on public.vacancies for update using (true);

-- Políticas de postulaciones
create policy "Postulaciones visibles" on public.applications for select using (true);
create policy "Crear postulación" on public.applications for insert with check (true);

-- 7. CONFIGURACIÓN DE STORAGE BUCKET PARA EXPEDIENTES DOCENTES
insert into storage.buckets (id, name, public)
values ('docentia-documents', 'docentia-documents', true)
on conflict (id) do nothing;

create policy "Acceso público de lectura a documentos de expedientes"
on storage.objects for select
using ( bucket_id = 'docentia-documents' );

create policy "Subida de documentos de expedientes"
on storage.objects for insert
with check ( bucket_id = 'docentia-documents' );
