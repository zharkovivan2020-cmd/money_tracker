# Task ID: 21

**Title:** Assign admin role from ADMIN_EMAIL env

**Status:** done

**Dependencies:** 20 ✓

**Priority:** high

**Description:** Server-side logic sets role=admin when profile email matches ADMIN_EMAIL.

**Details:**

Read ADMIN_EMAIL on server only. On profile create or update, if lower(email) equals lower(ADMIN_EMAIL) set role admin else user. Never accept role from client forms. Add ADMIN_EMAIL to .env.example.

**Test Strategy:**

No test strategy provided.
