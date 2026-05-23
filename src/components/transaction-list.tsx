"use client";

import { useState, useTransition } from "react";
import { Plus, Receipt, Trash2 } from "lucide-react";
import { deleteTransaction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate, formatMoney } from "@/lib/format";
import { showErrorToast, showSuccessToast } from "@/lib/toast";
import type { Transaction } from "@/lib/types";

interface TransactionListProps {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onCreate?: () => void;
}

export function TransactionList({
  transactions,
  onEdit,
  onCreate,
}: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <Empty className="border">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Receipt />
          </EmptyMedia>
          <EmptyTitle>Транзакций пока нет</EmptyTitle>
          <EmptyDescription>
            Добавьте первую запись о доходе или расходе.
          </EmptyDescription>
        </EmptyHeader>
        {onCreate && (
          <EmptyContent>
            <Button type="button" onClick={onCreate}>
              <Plus className="size-4" />
              Добавить первую
            </Button>
          </EmptyContent>
        )}
      </Empty>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Дата</TableHead>
          <TableHead>Тип</TableHead>
          <TableHead>Категория</TableHead>
          <TableHead>Описание</TableHead>
          <TableHead className="text-right">Сумма</TableHead>
          <TableHead className="w-12" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((t) => (
          <TransactionRow key={t.id} transaction={t} onEdit={onEdit} />
        ))}
      </TableBody>
    </Table>
  );
}

function TransactionRow({
  transaction: t,
  onEdit,
}: {
  transaction: Transaction;
  onEdit: (transaction: Transaction) => void;
}) {
  const [pending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(async () => {
      const result = await deleteTransaction(t.id);
      if (result.error) {
        showErrorToast(result.error);
        return;
      }
      showSuccessToast("Транзакция удалена");
    });
  }

  return (
    <TableRow
      className="cursor-pointer"
      onClick={() => onEdit(t)}
      data-pending={pending ? "" : undefined}
    >
      <TableCell>{formatDate(t.date)}</TableCell>
      <TableCell>
        <Badge
          variant={t.type === "income" ? "secondary" : "destructive"}
          className={
            t.type === "income"
              ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
              : undefined
          }
        >
          {t.type === "income" ? "Доход" : "Расход"}
        </Badge>
      </TableCell>
      <TableCell>{t.category}</TableCell>
      <TableCell className="max-w-[200px] truncate text-muted-foreground">
        {t.description ?? "—"}
      </TableCell>
      <TableCell
        className={`text-right font-medium tabular-nums ${
          t.type === "income" ? "text-emerald-600" : "text-red-600"
        }`}
      >
        {t.type === "expense" ? "−" : "+"}
        {formatMoney(Number(t.amount))}
      </TableCell>
      <TableCell onClick={(e) => e.stopPropagation()}>
        <AlertDialog>
          <AlertDialogTrigger
            render={
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="Удалить"
                disabled={pending}
              />
            }
          >
            <Trash2 className="size-4 text-muted-foreground" />
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Удалить транзакцию?</AlertDialogTitle>
              <AlertDialogDescription>
                Запись «{t.category}» на {formatMoney(Number(t.amount))} будет
                удалена без возможности восстановления.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Отмена</AlertDialogCancel>
              <AlertDialogAction variant="destructive" onClick={handleDelete}>
                Удалить
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </TableCell>
    </TableRow>
  );
}
