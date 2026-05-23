-- Supabase Cloud: Dashboard → SQL Editor → New query → Run (таблица + RLS)
-- Auth migration: supabase/migrations/20260523120000_auth_user_id.sql
-- Roles/admin: supabase/migrations/20260524120000_profiles_roles.sql
-- Тестовые данные: npm run db:seed  (требует SUPABASE_SERVICE_ROLE_KEY в .env.local)

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  role text not null default 'user' check (role in ('user', 'admin')),
  is_blocked boolean not null default false,
  blocked_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists profiles_email_idx on public.profiles (lower(email));
create index if not exists profiles_role_idx on public.profiles (role);
create index if not exists profiles_is_blocked_idx on public.profiles (is_blocked);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, coalesce(new.email, ''), 'user')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'admin'
      and is_blocked = false
  );
$$;

create or replace function public.is_user_blocked()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select coalesce(
    (
      select is_blocked
      from public.profiles
      where id = auth.uid()
    ),
    false
  );
$$;

grant execute on function public.is_admin() to authenticated;
grant execute on function public.is_user_blocked() to authenticated;

create policy "Users read own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Admins read all profiles"
  on public.profiles for select
  using (public.is_admin());

create policy "Admins update block status"
  on public.profiles for update
  using (
    public.is_admin()
    and id <> auth.uid()
    and role = 'user'
  )
  with check (public.is_admin());

create table if not exists public.transactions (
  id bigint generated always as identity primary key,
  amount numeric(10, 2) not null,
  type text not null check (type in ('income', 'expense')),
  category text not null,
  description text,
  date date not null,
  created_at timestamptz not null default now(),
  user_id uuid references auth.users (id) on delete cascade
);

alter table public.transactions enable row level security;

create policy "Users read own transactions"
  on public.transactions for select
  using (auth.uid() = user_id and not public.is_user_blocked());

create policy "Users insert own transactions"
  on public.transactions for insert
  with check (auth.uid() = user_id and not public.is_user_blocked());

create policy "Users update own transactions"
  on public.transactions for update
  using (auth.uid() = user_id and not public.is_user_blocked())
  with check (auth.uid() = user_id and not public.is_user_blocked());

create policy "Users delete own transactions"
  on public.transactions for delete
  using (auth.uid() = user_id and not public.is_user_blocked());
