# Money Tracker — notes for AI

- Stack: Next.js 16 App Router, Tailwind 4, shadcn/ui, Supabase (`@supabase/ssr`), Server Actions, Zod.
- Env: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (or `PUBLISHABLE_KEY`).
- DB: run `supabase/schema.sql` in Supabase SQL Editor; seed with `npm run db:seed`.
- CRUD: `src/app/actions.ts` (UI), `src/app/api/transactions/route.ts` (REST).
- Deploy: Vercel + same env vars; never expose service role to the browser.
