import { HomeDashboard } from "@/components/home-dashboard";
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
      <div className="mt-6 space-y-3 rounded-lg border bg-muted/30 p-4 text-sm">
        <p className="font-medium">Подключите Supabase Cloud</p>
        <ol className="list-decimal space-y-2 pl-5 text-muted-foreground">
          <li>
            Создайте проект на{" "}
            <a
              href="https://supabase.com/dashboard"
              className="text-foreground underline"
              target="_blank"
              rel="noreferrer"
            >
              supabase.com
            </a>
          </li>
          <li>
            Скопируйте <strong>Project URL</strong> и <strong>anon public</strong>{" "}
            key в <code className="rounded bg-muted px-1">.env.local</code>
          </li>
          <li>
            В SQL Editor выполните{" "}
            <code className="rounded bg-muted px-1">supabase/schema.sql</code>
          </li>
          <li>
            Перезапустите <code className="rounded bg-muted px-1">npm run dev</code>
          </li>
        </ol>
      </div>
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
        <div className="mt-6 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm">
          <p className="font-medium text-destructive">
            Не удалось подключиться к Supabase
          </p>
          <p className="mt-2 text-muted-foreground">{error.message}</p>
          <p className="mt-4 text-muted-foreground">
            Проверьте <code className="rounded bg-muted px-1">.env.local</code>:
            URL и anon key из Supabase Dashboard → Project Settings → API.
            В SQL Editor выполните скрипт{" "}
            <code className="rounded bg-muted px-1">supabase/schema.sql</code>.
          </p>
        </div>
      </div>
    );
  }

  const transactions = (data ?? []) as Transaction[];
  const summary = computeMonthlySummary(transactions);
  const visible = filterByType(transactions, typeFilter);

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-8 px-4 py-10 sm:px-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight">Money Tracker</h1>
        <p className="text-muted-foreground">
          Доходы, расходы и баланс за месяц
        </p>
      </header>

      <HomeDashboard
        transactions={visible}
        summary={summary}
        activeType={typeFilter}
      />
    </div>
  );
}
