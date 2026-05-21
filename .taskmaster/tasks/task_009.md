# Task ID: 9

**Title:** Optional URL filter for transaction type

**Status:** pending

**Dependencies:** 4

**Priority:** low

**Description:** Filter buttons All / Income / Expense via search params on Server Component.

**Details:**

Buttons above table: Все, Только доходы, Только расходы. Use ?type=income|expense; page reads searchParams and filters Supabase query. Bonus task from PRD section 6.

**Test Strategy:**

Click filters; URL updates and table shows subset; 'Все' shows full list.

## Subtasks

### 9.1. Add filter button UI

**Status:** pending  
**Dependencies:** None  

Link or button group updating searchParams.

**Details:**

Preserve other params if any.

### 9.2. Filter Supabase query by type param

**Status:** pending  
**Dependencies:** 9.1  

Apply .eq('type', param) when type is set.

**Details:**

Default fetch all when param absent.
