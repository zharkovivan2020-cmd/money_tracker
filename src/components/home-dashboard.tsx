"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { BalanceSummary } from "@/components/balance-summary";
import { TransactionForm } from "@/components/transaction-form";
import { TransactionList } from "@/components/transaction-list";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Transaction, TransactionType } from "@/lib/types";

interface HomeDashboardProps {
  transactions: Transaction[];
  summary: { income: number; expense: number; balance: number };
  activeType: TransactionType | null;
}

export function HomeDashboard({
  transactions,
  summary,
  activeType,
}: HomeDashboardProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [editing, setEditing] = useState<Transaction | null>(null);

  const openCreate = () => {
    setEditing(null);
    dialogRef.current?.showModal();
  };

  const openEdit = (transaction: Transaction) => {
    setEditing(transaction);
    dialogRef.current?.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
    setEditing(null);
  };

  const filterClass = (type: TransactionType | null) =>
    activeType === type
      ? "bg-primary text-primary-foreground"
      : "bg-secondary text-secondary-foreground";

  return (
    <>
      <BalanceSummary {...summary} />

      <div className="flex flex-wrap gap-2">
        <Link
          href="/"
          className={`rounded-full px-3 py-1 text-sm font-medium ${filterClass(null)}`}
        >
          Все
        </Link>
        <Link
          href="/?type=income"
          className={`rounded-full px-3 py-1 text-sm font-medium ${filterClass("income")}`}
        >
          Только доходы
        </Link>
        <Link
          href="/?type=expense"
          className={`rounded-full px-3 py-1 text-sm font-medium ${filterClass("expense")}`}
        >
          Только расходы
        </Link>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <div>
            <CardTitle>Транзакции</CardTitle>
            <CardDescription>
              Клик по строке — редактирование
            </CardDescription>
          </div>
          <Button type="button" onClick={openCreate}>
            + Добавить
          </Button>
        </CardHeader>
        <CardContent>
          <TransactionList transactions={transactions} onEdit={openEdit} />
        </CardContent>
      </Card>

      <dialog
        ref={dialogRef}
        className="w-full max-w-md rounded-lg border bg-background p-0 shadow-lg backdrop:bg-black/40 open:backdrop:bg-black/40"
        onClose={() => setEditing(null)}
      >
        <div className="border-b px-4 py-3">
          <h2 className="font-semibold">
            {editing ? "Редактировать транзакцию" : "Новая транзакция"}
          </h2>
        </div>
        <div className="p-4">
          <TransactionForm
            key={editing?.id ?? "new"}
            transaction={editing}
            onDone={closeDialog}
          />
        </div>
      </dialog>
    </>
  );
}
