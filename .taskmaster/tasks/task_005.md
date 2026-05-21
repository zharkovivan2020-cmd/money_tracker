# Task ID: 5

**Title:** Build monthly balance summary cards

**Status:** pending

**Dependencies:** 4

**Priority:** high

**Description:** BalanceSummary component shows income, expense, and balance for current month.

**Details:**

Create balance-summary.tsx with three shadcn Cards above the table. Sum amount where type=income and type=expense for current calendar month. Balance = income - expense. Display like '65 000 ₽' with locale formatting.

**Test Strategy:**

With seed data, card totals match manual SQL sums for the month.

## Subtasks

### 5.1. Compute monthly aggregates

**Status:** pending  
**Dependencies:** None  

Filter transactions by current month in server or component.

**Details:**

Use transaction date field; timezone consistent with user locale.

### 5.2. Render three summary cards

**Status:** pending  
**Dependencies:** 5.1  

Income, Expense, Balance labels in Russian per PRD.

**Details:**

Integrate into page.tsx above TransactionList.

### 5.3. Format currency display

**Status:** pending  
**Dependencies:** 5.2  

Thousand separators and ruble symbol.

**Details:**

Use Intl.NumberFormat ru-RU or equivalent.
