import type { Transaction, TransactionType } from "@/lib/types";

export function getMonthBounds(reference = new Date()) {
  const start = new Date(reference.getFullYear(), reference.getMonth(), 1);
  const end = new Date(reference.getFullYear(), reference.getMonth() + 1, 0);
  const toIso = (d: Date) => d.toISOString().slice(0, 10);
  return { start: toIso(start), end: toIso(end) };
}

export function computeMonthlySummary(transactions: Transaction[]) {
  const { start, end } = getMonthBounds();
  const inMonth = transactions.filter((t) => t.date >= start && t.date <= end);

  const income = inMonth
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const expense = inMonth
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount), 0);

  return { income, expense, balance: income - expense };
}

export function filterByType(
  transactions: Transaction[],
  type?: TransactionType | null,
) {
  if (!type) return transactions;
  return transactions.filter((t) => t.type === type);
}
