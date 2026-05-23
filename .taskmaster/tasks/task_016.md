# Task ID: 16

**Title:** Build login page, signIn action, and sign out

**Status:** done

**Dependencies:** 15 ✓

**Priority:** high

**Description:** Add /login with signInWithPassword; header sign out button.

**Details:**

src/app/(auth)/login/page.tsx, login-form.tsx, auth Server Actions signIn/signOut. Redirect to / on success; friendly error under form on failure. Sign out in header via supabase.auth.signOut().

**Test Strategy:**

Login with valid credentials reaches dashboard; invalid password shows error; sign out returns to logged-out state.
