# Task ID: 2

**Title:** Configure Supabase clients and middleware

**Status:** done

**Dependencies:** 1 ✓

**Priority:** high

**Description:** Set up Supabase project integration with @supabase/ssr (browser + server clients and middleware).

**Details:**

Create Supabase project; add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local. Install @supabase/ssr only (not deprecated auth-helpers). Implement src/lib/supabase/client.ts (createBrowserClient), server.ts (createServerClient), and src/middleware.ts for session refresh. Never expose service role key to browser.

**Test Strategy:**

App builds; middleware runs without errors; server client can connect when keys are set.

## Subtasks

### 2.1. Create Supabase project and env vars

**Status:** done  
**Dependencies:** None  

Obtain URL and anon key; document in .env.example.

**Details:**

Copy keys to .env.local; keep .env.local gitignored.

### 2.2. Install @supabase/ssr

**Status:** done  
**Dependencies:** 2.1  

Add package and remove any auth-helpers usage if present.

**Details:**

npm install @supabase/ssr @supabase/supabase-js

### 2.3. Implement browser and server clients

**Status:** done  
**Dependencies:** 2.2  

Create client.ts and server.ts under src/lib/supabase.

**Details:**

Follow @supabase/ssr Next.js App Router patterns for cookie handling.

### 2.4. Add middleware for session refresh

**Status:** done  
**Dependencies:** 2.3  

Create src/middleware.ts updating Supabase session on requests.

**Details:**

Match official SSR middleware example; exclude static assets as needed.
