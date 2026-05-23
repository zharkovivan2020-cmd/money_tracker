# Task ID: 4

**Title:** Display transaction list on home page (READ)

**Status:** done

**Dependencies:** 3 ✓

**Priority:** high

**Description:** Server Component on / fetches and renders all transactions in a table.

**Details:**

Build transaction-list.tsx: columns date, type, category, description, amount. Green for income, red for expense. Empty state with CTA 'Добавить первую' when no rows. page.tsx uses createServerClient to select * from transactions ordered by date desc.

**Test Strategy:**

Load / with seed data; table shows all columns with correct colors; empty DB shows empty state.

## Subtasks

### 4.1. Fetch transactions in page Server Component

**Status:** pending  
**Dependencies:** None  

Query Supabase from src/app/page.tsx.

**Details:**

Handle errors gracefully; pass data to list component.

### 4.2. Build TransactionList component

**Status:** pending  
**Dependencies:** 4.1  

Table UI with shadcn styling and color indicators.

**Details:**

Format dates and currency with thousand separators and ₽.

### 4.3. Implement empty state

**Status:** pending  
**Dependencies:** 4.2  

Show CTA when transactions array is empty.

**Details:**

Link or button placeholder for add flow (wired in task 6).
