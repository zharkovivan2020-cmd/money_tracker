# Task ID: 24

**Title:** Admin Server Actions for user management

**Status:** done

**Dependencies:** 22 ✓, 23 ✓

**Priority:** high

**Description:** listUsers, setUserBlocked, deleteUser with requireAdmin and service role where needed.

**Details:**

src/app/actions/admin.ts. listUsers via service role or admin-scoped query. setUserBlocked and unblock update profiles. deleteUser uses auth.admin.deleteUser; prevent self-delete and deleting other admins. revalidatePath('/admin/users') after mutations.

**Test Strategy:**

No test strategy provided.
