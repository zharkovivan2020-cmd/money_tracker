"use client";

import { useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { TransactionType } from "@/lib/types";

interface TransactionTypeTabsProps {
  activeType: TransactionType | null;
}

export function TransactionTypeTabs({ activeType }: TransactionTypeTabsProps) {
  const router = useRouter();
  const value = activeType ?? "all";

  return (
    <Tabs
      value={value}
      onValueChange={(next) => {
        if (next === "all") router.push("/");
        else router.push(`/?type=${next}`);
      }}
    >
      <TabsList>
        <TabsTrigger value="all">Все</TabsTrigger>
        <TabsTrigger value="income">Доходы</TabsTrigger>
        <TabsTrigger value="expense">Расходы</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
