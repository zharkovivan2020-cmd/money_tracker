-- Supabase Cloud: Dashboard → SQL Editor → New query → Run (таблица + RLS)
-- Тестовые данные: npm run db:seed  или выполните supabase/seed.sql

create table if not exists public.transactions (
  id bigint generated always as identity primary key,
  amount numeric(10, 2) not null,
  type text not null check (type in ('income', 'expense')),
  category text not null,
  description text,
  date date not null,
  created_at timestamptz not null default now()
);

alter table public.transactions enable row level security;

create policy "Allow public read"
  on public.transactions for select
  using (true);

create policy "Allow public insert"
  on public.transactions for insert
  with check (true);

create policy "Allow public update"
  on public.transactions for update
  using (true);

create policy "Allow public delete"
  on public.transactions for delete
  using (true);
