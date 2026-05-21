import { z } from "zod";

export const CATEGORIES = [
  "Зарплата",
  "Фриланс",
  "Еда",
  "Транспорт",
  "Развлечения",
  "Прочее",
] as const;

export const transactionSchema = z.object({
  type: z.enum(["income", "expense"]),
  amount: z.coerce.number().min(1, "Минимум 1"),
  category: z.enum(CATEGORIES),
  description: z
    .string()
    .max(280, "Не более 280 символов")
    .optional()
    .transform((v) => (v?.trim() ? v.trim() : null)),
  date: z.string().min(1, "Укажите дату"),
});

export type TransactionFormValues = z.infer<typeof transactionSchema>;
