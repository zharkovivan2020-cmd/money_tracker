# Task ID: 11

**Title:** Deploy to Vercel with Supabase env

**Status:** done

**Dependencies:** 10 ✓

**Priority:** medium

**Description:** Production deploy with environment variables and git push autodeploy.

**Details:**

Connect repo to Vercel; set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel project settings. Push to main; verify *.vercel.app shows live data. Do not add service role to client env.

**Test Strategy:**

Production URL loads home page, lists transactions, and create flow works against Supabase.

## Subtasks

### 11.1. Configure Vercel project and env vars

**Status:** done  
**Dependencies:** None  

Add Supabase public keys in dashboard.

**Details:**

Match .env.local variable names.

### 11.2. Deploy and smoke test production

**Status:** done  
**Dependencies:** 11.1  

git push main; verify deployment URL.

**Details:**

Check RLS still allows anon for demo.
