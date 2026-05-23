import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const env = readFileSync(resolve(root, ".env.local"), "utf8");
const url = env.match(/NEXT_PUBLIC_SUPABASE_URL=(.+)/)?.[1]?.trim();
const anonKey = env.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY=(.+)/)?.[1]?.trim();
const serviceKey = env.match(/SUPABASE_SERVICE_ROLE_KEY=(.+)/)?.[1]?.trim();

if (!url || (!anonKey && !serviceKey)) {
  console.error(
    "Missing Supabase env in .env.local (URL + anon key, or service role for seed after auth)",
  );
  process.exit(1);
}

const key = serviceKey ?? anonKey;
const supabase = createClient(url, key);

if (!serviceKey) {
  console.warn(
    "Tip: with RLS auth, seed needs SUPABASE_SERVICE_ROLE_KEY in .env.local (server-only, never commit).",
  );
}

const { error: delError } = await supabase
  .from("transactions")
  .delete()
  .neq("id", 0);

if (delError) console.warn("Clear:", delError.message);

const today = new Date();
const iso = (d) => d.toISOString().slice(0, 10);
const rows = [
  {
    amount: 85000,
    type: "income",
    category: "Зарплата",
    description: "Оклад за месяц",
    date: iso(today),
  },
  {
    amount: 15000,
    type: "income",
    category: "Фриланс",
    description: "Проект",
    date: iso(new Date(today.getTime() - 3 * 86400000)),
  },
  {
    amount: 3200,
    type: "expense",
    category: "Еда",
    description: "Продукты",
    date: iso(new Date(today.getTime() - 1 * 86400000)),
  },
  {
    amount: 890,
    type: "expense",
    category: "Транспорт",
    description: "Метро",
    date: iso(new Date(today.getTime() - 2 * 86400000)),
  },
  {
    amount: 2500,
    type: "expense",
    category: "Развлечения",
    description: "Кино",
    date: iso(new Date(today.getTime() - 5 * 86400000)),
  },
];

const { error } = await supabase.from("transactions").insert(rows);
if (error) {
  console.error(error.message);
  console.error(
    "If RLS requires user_id, run supabase/migrations/20260523120000_auth_user_id.sql and use service role for seed.",
  );
  process.exit(1);
}

console.log(`Seeded ${rows.length} transactions.`);
