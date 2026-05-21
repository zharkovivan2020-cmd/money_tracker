/** Transaction row — matches Supabase `transactions` table (see PRD). */
export type TransactionType = "income" | "expense";

export interface Transaction {
  id: number;
  amount: number;
  type: TransactionType;
  category: string;
  description: string | null;
  date: string;
  created_at: string;
}
