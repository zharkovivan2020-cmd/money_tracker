# Task ID: 19

**Title:** Add user_id column, scoped actions, and RLS policies

**Status:** done

**Dependencies:** 18 ✓

**Priority:** high

**Description:** Tie transactions to auth.users; enforce auth.uid() = user_id in database policies.

**Details:**

Migration: user_id uuid references auth.users on transactions. Server Actions set user_id from supabase.auth.getUser() never from form. Replace open RLS with SELECT/INSERT/UPDATE/DELETE policies auth.uid() = user_id. revalidatePath('/') after mutations.

**Test Strategy:**

Two users see only their own transactions; cannot read or write another user's rows via UI or direct API.
