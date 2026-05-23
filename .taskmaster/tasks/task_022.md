# Task ID: 22

**Title:** RLS policies for profiles and blocked users on transactions

**Status:** done

**Dependencies:** 20 ✓, 21 ✓

**Priority:** high

**Description:** profiles RLS for self read and admin read/update block fields; transactions deny blocked users.

**Details:**

profiles SELECT own row; admin SELECT all profiles; admin UPDATE is_blocked and blocked_at on other users only. transactions policies add check that auth.uid() profile is not blocked for all CRUD.

**Test Strategy:**

No test strategy provided.
