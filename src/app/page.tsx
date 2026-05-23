import { AlertCircle } from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { HomeDashboard } from "@/components/home-dashboard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";
import {
  computeMonthlySummary,
  filterByType,
} from "@/lib/transactions";
import type { Transaction, TransactionType } from "@/lib/types";

interface HomeProps {
  searchParams: Promise<{ type?: string }>;
}

function parseTypeParam(value?: string): TransactionType | null {
  if (value === "income" || value === "expense") return value;
  return null;
}

function SetupRequired() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-semibold">Money Tracker</h1>
      <Alert className="mt-6">
        <AlertCircle />
        <AlertTitle>Подключите Supabase Cloud</AlertTitle>
        <AlertDescription>
          <ol className="mt-2 list-decimal space-y-2 pl-5">
            <li>
              Создайте проект на{" "}
              <a
                href="https://supabase.com/dashboard"
                className="underline"
                target="_blank"
                rel="noreferrer"
              >
                supabase.com
              </a>
            </li>
            <li>
              Скопируйте Project URL и anon key в{" "}
              <code className="rounded bg-muted px-1">.env.local</code>
            </li>
            <li>
              В SQL Editor выполните{" "}
              <code className="rounded bg-muted px-1">supabase/schema.sql</code>
            </li>
            <li>
              Перезапустите{" "}
              <code className="rounded bg-muted px-1">npm run dev</code>
            </li>
          </ol>
        </AlertDescription>
      </Alert>
    </div>
  );
}

export default async function Home({ searchParams }: HomeProps) {
  const { type: typeParam } = await searchParams;
  const typeFilter = parseTypeParam(typeParam);

  if (!isSupabaseConfigured()) {
    return <SetupRequired />;
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .order("date", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-semibold">Money Tracker</h1>
        <Alert variant="destructive" className="mt-6">
          <AlertCircle />
          <AlertTitle>Не удалось подключиться к Supabase</AlertTitle>
          <AlertDescription>
            <p>{error.message}</p>
            <p className="mt-4">
              Проверьте <code className="rounded bg-muted px-1">.env.local</code>
              : URL и anon key из Supabase Dashboard → Project Settings → API.
              В SQL Editor выполните скрипт{" "}
              <code className="rounded bg-muted px-1">supabase/schema.sql</code>.
            </p>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const transactions = (data ?? []) as Transaction[];
  const summary = computeMonthlySummary(transactions);
  const visible = filterByType(transactions, typeFilter);

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-8 px-4 py-10 sm:px-6">
      <AppHeader />

      <HomeDashboard
        transactions={visible}
        summary={summary}
        activeType={typeFilter}
      />
    </div>
  );
}
