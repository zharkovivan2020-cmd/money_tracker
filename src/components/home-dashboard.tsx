"use client";

import { useState, useTransition } from "react";
import { Plus } from "lucide-react";
import { BalanceSummary } from "@/components/balance-summary";
import { TransactionForm } from "@/components/transaction-form";
import { TransactionList } from "@/components/transaction-list";
import { TransactionTypeTabs } from "@/components/transaction-type-tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Transaction | null>(null);
  const [, startTransition] = useTransition();

  const openCreate = () => {
    setEditing(null);
    setOpen(true);
  };

  const openEdit = (transaction: Transaction) => {
    setEditing(transaction);
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
    setEditing(null);
  };

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (!next) setEditing(null);
  };

  return (
    <>
      <BalanceSummary {...summary} />

      <TransactionTypeTabs activeType={activeType} />

      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <div>
            <CardTitle>Транзакции</CardTitle>
            <CardDescription>Клик по строке — редактирование</CardDescription>
          </div>
          <Button type="button" onClick={openCreate}>
            <Plus className="size-4" />
            Добавить
          </Button>
        </CardHeader>
        <CardContent>
          <TransactionList
            transactions={transactions}
            onEdit={openEdit}
            onCreate={openCreate}
          />
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editing ? "Редактировать транзакцию" : "Новая транзакция"}
            </DialogTitle>
            <DialogDescription>
              {editing
                ? "Измените поля и сохраните."
                : "Заполните данные о доходе или расходе."}
            </DialogDescription>
          </DialogHeader>
          <TransactionForm
            key={editing?.id ?? "new"}
            transaction={editing}
            onDone={() => {
              startTransition(() => closeDialog());
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
