create extension if not exists pgcrypto;

create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  language text not null default 'ru',
  source text not null default 'website',
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  public_id text not null unique,
  customer_id uuid not null,
  customer_name text,
  phone text,
  address text,
  city text,
  payment_method text,
  items jsonb not null default '[]'::jsonb,
  subtotal integer not null default 0,
  discount integer not null default 0,
  delivery integer not null default 0,
  total integer not null default 0,
  status text not null default 'Confirmed',
  created_at timestamptz not null default now()
);

create table if not exists public.favorites (
  customer_id uuid not null,
  product_id text not null,
  created_at timestamptz not null default now(),
  primary key (customer_id, product_id)
);

create table if not exists public.profiles (
  customer_id uuid primary key,
  name text,
  email text,
  city text,
  updated_at timestamptz not null default now()
);

create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null,
  message text not null,
  direction text not null check (direction in ('customer', 'support')),
  created_at timestamptz not null default now()
);

alter table public.newsletter_subscribers enable row level security;
alter table public.orders enable row level security;
alter table public.favorites enable row level security;
alter table public.profiles enable row level security;
alter table public.chat_messages enable row level security;

create policy "anon can subscribe"
  on public.newsletter_subscribers for insert
  to anon
  with check (true);

create policy "anon can create orders"
  on public.orders for insert
  to anon
  with check (true);

create policy "anon can manage favorites"
  on public.favorites for all
  to anon
  using (true)
  with check (true);

create policy "anon can upsert profiles"
  on public.profiles for all
  to anon
  using (true)
  with check (true);

create policy "anon can create chat messages"
  on public.chat_messages for insert
  to anon
  with check (true);
