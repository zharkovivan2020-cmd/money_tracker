# Task ID: 20

**Title:** Add profiles table migration and signup trigger

**Status:** done

**Dependencies:** 19 ✓

**Priority:** high

**Description:** Create profiles table with role and is_blocked; trigger on auth signup; backfill existing users.

**Details:**

Migration supabase/migrations/YYYYMMDD_profiles_roles.sql: profiles table (id uuid PK references auth.users, email, role default user, is_blocked default false, blocked_at, created_at). Trigger or function on auth.users insert to create profile row. Backfill existing auth.users without profiles. Update schema.sql.

**Test Strategy:**

No test strategy provided.
