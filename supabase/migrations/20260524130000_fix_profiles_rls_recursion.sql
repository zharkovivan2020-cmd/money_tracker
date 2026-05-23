-- Fix: infinite recursion in profiles RLS (admin policies queried profiles inside profiles policies)

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

drop policy if exists "Admins read all profiles" on public.profiles;
drop policy if exists "Admins update block status" on public.profiles;

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

drop policy if exists "Users read own transactions" on public.transactions;
drop policy if exists "Users insert own transactions" on public.transactions;
drop policy if exists "Users update own transactions" on public.transactions;
drop policy if exists "Users delete own transactions" on public.transactions;

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
