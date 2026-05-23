# Task ID: 18

**Title:** Protect app routes with middleware redirects

**Status:** done

**Dependencies:** 14 ✓, 16 ✓

**Priority:** high

**Description:** Restrict transaction pages to authenticated users; redirect logged-in users away from auth pages.

**Details:**

Extend middleware: unauthenticated access to / and /dashboard → redirect /login. Authenticated /login and /register → redirect /. Use getUser() or session from updateSession.

**Test Strategy:**

Logged out: / redirects to /login. Logged in: /login redirects to /. Dashboard loads only when authenticated.
