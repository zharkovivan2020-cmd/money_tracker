# Money Tracker — notes for AI

- Stack: Next.js 16 App Router, Tailwind 4, shadcn/ui, Supabase (`@supabase/ssr`), Server Actions, Zod.
- Env: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (or `PUBLISHABLE_KEY`).
- Admin (server-only): `ADMIN_EMAIL` (default owner: zharkovivan2020@gmail.com), `SUPABASE_SERVICE_ROLE_KEY` for role sync and user deletion.
- DB: run `supabase/schema.sql` (new) or migrations in order (`20260321120000_transactions.sql`, `20260523120000_auth_user_id.sql`, `20260524120000_profiles_roles.sql`, `20260524130000_fix_profiles_rls_recursion.sql`); seed with `npm run db:seed` (optional `SUPABASE_SERVICE_ROLE_KEY` for seed after auth).
- Auth: `src/app/actions/auth.ts`, `src/middleware.ts`, `/login`, `/register`, `/auth/callback`. Supabase Dashboard → Authentication → Providers: Email (+ Google/GitHub for OAuth). Redirect URLs: `http://localhost:3000/auth/callback` and production URL.
- Admin: `/admin/users`, `src/app/actions/admin.ts`, `src/lib/admin.ts`, `src/lib/profile.ts`. Blocked users → `/blocked`.
- CRUD: `src/app/actions.ts` (UI), `src/app/api/transactions/route.ts` (REST). Rows scoped by `user_id` + RLS.
- Deploy: Vercel + same env vars; never expose service role to the browser.
