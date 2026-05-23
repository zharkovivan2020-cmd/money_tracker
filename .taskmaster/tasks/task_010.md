# Task ID: 10

**Title:** REST API route and Thunder Client testing

**Status:** done

**Dependencies:** 8 ✓

**Priority:** medium

**Description:** Parallel GET /api/transactions and verify CRUD via API for learning comparison.

**Details:**

Create src/app/api/transactions/route.ts with GET returning JSON list. Document difference vs Server Actions. Test with Thunder Client: GET returns 200 and array; optionally POST/PUT/DELETE if implemented for full CRUD exercise per PRD step 9.

**Test Strategy:**

Thunder Client GET /api/transactions returns 200 with transaction JSON matching DB.

## Subtasks

### 10.1. Implement GET /api/transactions

**Status:** pending  
**Dependencies:** None  

Route handler using server Supabase client.

**Details:**

Return JSON array; proper error status codes.

### 10.2. Document Server Actions vs API Routes

**Status:** pending  
**Dependencies:** 10.1  

Short comment in route or AGENTS.md.

**Details:**

When to use each per PRD additional rules.

### 10.3. Run Thunder Client CRUD checks

**Status:** pending  
**Dependencies:** 10.1  

Verify status codes for API operations.

**Details:**

Save example requests if helpful for course.
