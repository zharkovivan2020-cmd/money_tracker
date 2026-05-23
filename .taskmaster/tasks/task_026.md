# Task ID: 26

**Title:** Middleware and routes for blocked users and admin protection

**Status:** done

**Dependencies:** 22 ✓, 23 ✓

**Priority:** high

**Description:** Redirect blocked users to /blocked; protect /admin routes.

**Details:**

Extend middleware or app layout: if profile.is_blocked redirect to /blocked except on /blocked and sign-out flows. Add src/app/blocked/page.tsx with blocked message. admin layout calls requireAdmin. Regular users get 404 or redirect from /admin.

**Test Strategy:**

No test strategy provided.
