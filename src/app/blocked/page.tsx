import { ShieldOff } from "lucide-react";
import { signOut } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function BlockedPage() {
  return (
    <div className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center bg-muted/30 px-4 py-12">
      <Card className="w-full max-w-md shadow-sm">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-destructive/10">
            <ShieldOff className="size-6 text-destructive" />
          </div>
          <CardTitle>Аккаунт заблокирован</CardTitle>
          <CardDescription>
            Доступ к приложению ограничен администратором. Если вы считаете, что
            это ошибка, свяжитесь с владельцем сервиса.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <form action={signOut}>
            <Button type="submit" variant="outline">
              Выйти
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
