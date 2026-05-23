# Task ID: 15

**Title:** Build registration page and signUp action

**Status:** done

**Dependencies:** 14 ✓

**Priority:** high

**Description:** Add /register with email, password, confirm password; zod validation; signUp Server Action.

**Details:**

src/app/(auth)/register/page.tsx and components/auth/register-form.tsx. Server Action calls supabase.auth.signUp. Password min 8 chars, passwords match. Show «Проверьте почту» after success. revalidatePath as needed.

**Test Strategy:**

Register new user; validation errors show for weak/mismatched passwords; success message displays.
