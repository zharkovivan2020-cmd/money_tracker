# Task ID: 23

**Title:** Service role Supabase client and admin guards

**Status:** done

**Dependencies:** 20 ✓

**Priority:** high

**Description:** createServiceRoleClient server-only; isAdmin and requireAdmin helpers.

**Details:**

src/lib/supabase/admin.ts with SUPABASE_SERVICE_ROLE_KEY. src/lib/admin.ts: getProfile, isAdmin, requireAdmin using getUser plus profiles query. Guards throw or redirect for non-admin callers.

**Test Strategy:**

No test strategy provided.
