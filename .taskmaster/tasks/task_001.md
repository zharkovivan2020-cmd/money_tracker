# Task ID: 1

**Title:** Bootstrap Next.js project and UI stack

**Status:** pending

**Dependencies:** None

**Priority:** high

**Description:** Create the Money Tracker Next.js 16 app with TypeScript, Tailwind CSS 4, and shadcn/ui foundation.

**Details:**

Initialize money-tracker with App Router under src/app. Install and configure Tailwind CSS 4, shadcn/ui (Card, Input, Button, Form). Set up layout.tsx, globals.css, and base folder structure per PRD: src/components/ui, src/lib. No auth in this module.

**Test Strategy:**

Run dev server; verify home route renders with shadcn components and no TypeScript errors.

## Subtasks

### 1.1. Scaffold Next.js 16 App Router project

**Status:** pending  
**Dependencies:** None  

Create project with TypeScript and src/ directory layout.

**Details:**

Use create-next-app or equivalent with App Router, TypeScript, src directory.

### 1.2. Configure Tailwind CSS 4

**Status:** pending  
**Dependencies:** 1.1  

Wire Tailwind 4 with globals.css and PostCSS if required.

**Details:**

Follow Tailwind 4 setup for Next.js; ensure styles apply on /.

### 1.3. Install shadcn/ui primitives

**Status:** pending  
**Dependencies:** 1.2  

Add Card, Input, Button, Form components to src/components/ui.

**Details:**

Run shadcn init and add required components per PRD.

### 1.4. Create placeholder home page

**Status:** pending  
**Dependencies:** 1.3  

Add src/app/page.tsx and layout.tsx shell for later features.

**Details:**

Minimal page with app title; ready for transaction list integration.
