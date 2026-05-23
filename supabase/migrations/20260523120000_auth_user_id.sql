-- Auth: tie transactions to users and enforce RLS (module 7)

alter table public.transactions
  add column if not exists user_id uuid references auth.users (id) on delete cascade;

drop policy if exists "Allow public read" on public.transactions;
drop policy if exists "Allow public insert" on public.transactions;
drop policy if exists "Allow public update" on public.transactions;
drop policy if exists "Allow public delete" on public.transactions;

create policy "Users read own transactions"
  on public.transactions for select
  using (auth.uid() = user_id);

create policy "Users insert own transactions"
  on public.transactions for insert
  with check (auth.uid() = user_id);

create policy "Users update own transactions"
  on public.transactions for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users delete own transactions"
  on public.transactions for delete
  using (auth.uid() = user_id);
