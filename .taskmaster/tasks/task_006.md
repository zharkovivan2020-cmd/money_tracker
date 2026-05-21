# Task ID: 6

**Title:** Add transaction via Server Action (CREATE)

**Status:** pending

**Dependencies:** 5

**Priority:** high

**Description:** Form and addTransaction action with zod validation and revalidatePath.

**Details:**

transaction-form.tsx: type radio (income/expense), amount number min 1, category select (Зарплата, Фриланс, Еда, Транспорт, Развлечения, Прочее), description optional max 280, date default today. actions.ts: addTransaction with shared zod schema (client + server). Button '+ Добавить' opens dialog or navigates to form. On success revalidatePath('/').

**Test Strategy:**

Submit valid transaction; appears in table and updates balance cards without manual refresh.

## Subtasks

### 6.1. Define shared zod transaction schema

**Status:** pending  
**Dependencies:** None  

Single schema for form and server action.

**Details:**

Export from lib; validate type enum, amount, category, date.

### 6.2. Implement addTransaction Server Action

**Status:** pending  
**Dependencies:** 6.1  

Insert row via server Supabase client in app/actions.ts.

**Details:**

Return validation errors; call revalidatePath('/') on success.

### 6.3. Build TransactionForm for create mode

**Status:** pending  
**Dependencies:** 6.2  

Client form with server action binding.

**Details:**

Use shadcn Form; dialog or dedicated route per PRD choice.

### 6.4. Wire Add button on home page

**Status:** pending  
**Dependencies:** 6.3  

Open form from '+ Добавить' control.

**Details:**

Accessible from empty state CTA too.
