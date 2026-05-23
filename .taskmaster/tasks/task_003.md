# Task ID: 3

**Title:** Create transactions table and RLS policies

**Status:** done

**Dependencies:** 2 ✓

**Priority:** high

**Description:** Define the transactions schema in Supabase with open RLS for the learning module.

**Details:**

Table transactions: id int8 PK auto, amount numeric(10,2), type text (income|expense), category text, description text nullable max 280, date date, created_at timestamptz default now(). Enable RLS; policies allow SELECT/INSERT/UPDATE/DELETE for all (educational only). Seed 5 test rows covering income and expense categories from PRD.

**Test Strategy:**

Query table in Supabase SQL editor; confirm 5 seed rows and policies allow anon CRUD.

## Subtasks

### 3.1. Create transactions table in Supabase

**Status:** pending  
**Dependencies:** None  

Use Table Editor or SQL with correct column types.

**Details:**

Match PRD schema exactly; amount as numeric not string.

### 3.2. Enable RLS and permissive policies

**Status:** pending  
**Dependencies:** 3.1  

Add policies for anon access for this module.

**Details:**

Document that Module 7 will restrict by auth.uid().

### 3.3. Seed five sample transactions

**Status:** pending  
**Dependencies:** 3.2  

Mix income/expense and categories: Зарплата, Еда, etc.

**Details:**

Use realistic amounts and dates within current month for balance testing.

### 3.4. Add Transaction TypeScript types

**Status:** pending  
**Dependencies:** 3.1  

Create src/lib/types.ts for Transaction row type.

**Details:**

No any types; amount as number in app layer.
