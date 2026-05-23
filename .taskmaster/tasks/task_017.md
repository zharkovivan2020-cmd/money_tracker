# Task ID: 17

**Title:** Add OAuth (Google, GitHub) and auth callback

**Status:** done

**Dependencies:** 16 ✓

**Priority:** medium

**Description:** Social login buttons and OAuth callback route handler.

**Details:**

components/auth/social-buttons.tsx on login and register. signInWithOAuth for google and github. src/app/auth/callback/route.ts exchanges code for session. Enable providers in Supabase dashboard.

**Test Strategy:**

OAuth flow completes and user lands on / with active session for each enabled provider.
