"use client";

import { Trash2 } from "lucide-react";
import { deleteTransactionFormAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { formatDate, formatMoney } from "@/lib/format";
import type { Transaction } from "@/lib/types";

interface TransactionListProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
}

export function TransactionList({ transactions, onEdit }: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Пока нет записей — добавьте первую транзакцию.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-md border">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="border-b bg-muted/50">
          <tr>
            <th className="px-3 py-2 font-medium">Дата</th>
            <th className="px-3 py-2 font-medium">Тип</th>
            <th className="px-3 py-2 font-medium">Категория</th>
            <th className="px-3 py-2 font-medium">Описание</th>
            <th className="px-3 py-2 font-medium text-right">Сумма</th>
            <th className="px-3 py-2 w-12" />
          </tr>
        </thead>
        <tbody>
          {transactions.map((t) => (
            <tr
              key={t.id}
              className="cursor-pointer border-b last:border-0 hover:bg-muted/30"
              onClick={() => onEdit(t)}
            >
              <td className="px-3 py-2 whitespace-nowrap">
                {formatDate(t.date)}
              </td>
              <td className="px-3 py-2">
                <span
                  className={
                    t.type === "income"
                      ? "text-emerald-600 font-medium"
                      : "text-red-600 font-medium"
                  }
                >
                  {t.type === "income" ? "Доход" : "Расход"}
                </span>
              </td>
              <td className="px-3 py-2">{t.category}</td>
              <td className="px-3 py-2 text-muted-foreground max-w-[200px] truncate">
                {t.description ?? "—"}
              </td>
              <td
                className={`px-3 py-2 text-right font-medium tabular-nums ${
                  t.type === "income" ? "text-emerald-600" : "text-red-600"
                }`}
              >
                {t.type === "expense" ? "−" : "+"}
                {formatMoney(Number(t.amount))}
              </td>
              <td className="px-3 py-2" onClick={(e) => e.stopPropagation()}>
                <form
                  action={deleteTransactionFormAction}
                  onSubmit={(e) => {
                    if (!confirm("Точно удалить?")) e.preventDefault();
                  }}
                >
                  <input type="hidden" name="id" value={t.id} />
                  <Button
                    type="submit"
                    variant="ghost"
                    size="icon"
                    aria-label="Удалить"
                  >
                    <Trash2 className="size-4 text-muted-foreground" />
                  </Button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
