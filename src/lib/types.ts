/** Transaction row — matches Supabase `transactions` table (see PRD). */
export type TransactionType = "income" | "expense";

export type UserRole = "user" | "admin";

export interface Profile {
  id: string;
  email: string;
  role: UserRole;
  is_blocked: boolean;
  blocked_at: string | null;
  created_at: string;
}

export interface Transaction {
  id: number;
  amount: number;
  type: TransactionType;
  category: string;
  description: string | null;
  date: string;
  created_at: string;
  user_id?: string;
}
