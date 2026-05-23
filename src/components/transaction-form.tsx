"use client";

import { useRef, useTransition } from "react";
import {
  addTransaction,
  updateTransactionFromForm,
} from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CATEGORIES } from "@/lib/transaction-schema";
import { showErrorToast, showSuccessToast } from "@/lib/toast";
import type { Transaction } from "@/lib/types";

interface TransactionFormProps {
  transaction?: Transaction | null;
  onDone?: () => void;
}

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

export function TransactionForm({ transaction, onDone }: TransactionFormProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [pending, startTransition] = useTransition();
  const isEdit = Boolean(transaction);

  return (
    <form
      ref={formRef}
      action={(formData) => {
        startTransition(async () => {
          const result = isEdit
            ? await updateTransactionFromForm(formData)
            : await addTransaction(formData);

          if (result && "error" in result && result.error) {
            const err = result.error as string | Record<string, string[]>;
            const message =
              typeof err === "string"
                ? err
                : Object.values(err).flat().join(", ");
            showErrorToast(message || "Не удалось сохранить");
            return;
          }

          formRef.current?.reset();
          showSuccessToast(
            isEdit ? "Транзакция обновлена" : "Транзакция добавлена",
          );
          onDone?.();
        });
      }}
      className="grid gap-4"
    >
      {isEdit && transaction && (
        <input type="hidden" name="transactionId" value={transaction.id} />
      )}

      <fieldset className="grid gap-2">
        <legend className="text-sm font-medium">Тип</legend>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="type"
              value="income"
              defaultChecked={transaction?.type !== "expense"}
              required
            />
            Доход
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="type"
              value="expense"
              defaultChecked={transaction?.type === "expense"}
              required
            />
            Расход
          </label>
        </div>
      </fieldset>

      <div className="grid gap-2">
        <Label htmlFor="amount">Сумма</Label>
        <Input
          id="amount"
          name="amount"
          type="number"
          min={1}
          step="0.01"
          required
          defaultValue={transaction?.amount ?? ""}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="category">Категория</Label>
        <select
          id="category"
          name="category"
          required
          defaultValue={transaction?.category ?? CATEGORIES[0]}
          className="border-input bg-background h-9 w-full rounded-md border px-3 text-sm shadow-xs"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Описание</Label>
        <Input
          id="description"
          name="description"
          maxLength={280}
          defaultValue={transaction?.description ?? ""}
          placeholder="Необязательно"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="date">Дата</Label>
        <Input
          id="date"
          name="date"
          type="date"
          required
          defaultValue={transaction?.date ?? todayIso()}
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => onDone?.()}
          disabled={pending}
        >
          Отмена
        </Button>
        <Button type="submit" disabled={pending}>
          {pending ? "Сохранение…" : "Сохранить"}
        </Button>
      </div>
    </form>
  );
}
