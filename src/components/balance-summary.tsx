import { TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatMoney } from "@/lib/format";

interface BalanceSummaryProps {
  income: number;
  expense: number;
  balance: number;
}

export function BalanceSummary({ income, expense, balance }: BalanceSummaryProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-emerald-600">
            Доходы
          </CardTitle>
          <TrendingUp className="size-4 text-emerald-600" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold tabular-nums">
            {formatMoney(income)}
          </p>
          <Badge variant="secondary" className="mt-2">
            за месяц
          </Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-red-600">
            Расходы
          </CardTitle>
          <TrendingDown className="size-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold tabular-nums">
            {formatMoney(expense)}
          </p>
          <Badge variant="secondary" className="mt-2">
            за месяц
          </Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Баланс</CardTitle>
          <Wallet className="size-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold tabular-nums">
            {formatMoney(balance)}
          </p>
          <Badge variant="secondary" className="mt-2">
            за месяц
          </Badge>
        </CardContent>
      </Card>
    </div>
  );
}
