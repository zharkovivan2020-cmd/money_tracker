# Task ID: 7

**Title:** Delete transaction via Server Action (DELETE)

**Status:** done

**Dependencies:** 6 ✓

**Priority:** medium

**Description:** Row delete with confirm dialog and deleteTransaction action.

**Details:**

Trash icon per row; confirm 'Точно удалить?'. deleteTransaction(id) in actions.ts; revalidatePath('/') after delete.

**Test Strategy:**

Delete a row; confirm dialog works; row and balance update after confirm.

## Subtasks

### 7.1. Implement deleteTransaction action

**Status:** pending  
**Dependencies:** None  

Delete by id with server client.

**Details:**

Validate id; handle not found.

### 7.2. Add trash button and confirm UI

**Status:** pending  
**Dependencies:** 7.1  

Per-row delete in TransactionList.

**Details:**

Use browser confirm or shadcn AlertDialog.
