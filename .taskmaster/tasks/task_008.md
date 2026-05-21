# Task ID: 8

**Title:** Edit transaction via Server Action (UPDATE)

**Status:** pending

**Dependencies:** 6

**Priority:** medium

**Description:** Reuse form in edit mode with updateTransaction and pre-filled values.

**Details:**

Row click opens TransactionForm with existing data. updateTransaction(id, data) in actions.ts; same zod schema; revalidatePath('/') on success.

**Test Strategy:**

Edit amount and category; table and balance reflect changes after save.

## Subtasks

### 8.1. Implement updateTransaction action

**Status:** pending  
**Dependencies:** None  

Update row by id in actions.ts.

**Details:**

Partial updates allowed per schema fields.

### 8.2. Extend TransactionForm for edit mode

**Status:** pending  
**Dependencies:** 8.1  

Accept initial values and transaction id prop.

**Details:**

Switch action between add and update.

### 8.3. Open form on row click

**Status:** pending  
**Dependencies:** 8.2  

Wire TransactionList row click to edit form.

**Details:**

Avoid conflict with delete button click propagation.
