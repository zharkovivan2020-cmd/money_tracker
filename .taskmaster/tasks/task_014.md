# Task ID: 14

**Title:** Add middleware session refresh (updateSession)

**Status:** done

**Dependencies:** 13 ✓

**Priority:** high

**Description:** Create src/middleware.ts to refresh auth session on every request via createServerClient.

**Details:**

Implement Supabase updateSession pattern in middleware.ts. Matcher excludes static assets. Session cookies updated before route handlers run.

**Test Strategy:**

Log in; navigate between pages; session persists after refresh. No middleware errors in dev console.
