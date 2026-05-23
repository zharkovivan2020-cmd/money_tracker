# Task ID: 13

**Title:** Verify @supabase/ssr client setup

**Status:** done

**Dependencies:** 12 ✓

**Priority:** high

**Description:** Ensure browser and server Supabase clients exist and match PRD-2 patterns.

**Details:**

Confirm @supabase/ssr is installed. src/lib/supabase/client.ts uses createBrowserClient; server.ts uses createServerClient with cookies. Do not use deprecated @supabase/auth-helpers-nextjs.

**Test Strategy:**

Import both clients from a test page or action without TypeScript errors; env vars NEXT_PUBLIC_SUPABASE_URL and anon key present.
