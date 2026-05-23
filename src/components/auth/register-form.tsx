"use client";

import Link from "next/link";
import { useActionState } from "react";
import { AlertCircle } from "lucide-react";
import { signUp, type AuthActionState } from "@/app/actions/auth";
import { SocialButtons } from "@/components/auth/social-buttons";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldError } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";

const initialState: AuthActionState = {};

export function RegisterForm() {
  const [state, formAction, pending] = useActionState(signUp, initialState);

  if (state.success && state.message) {
    return (
      <Card className="w-full max-w-md shadow-sm">
        <CardHeader>
          <CardTitle>Проверьте почту</CardTitle>
          <CardDescription>{state.message}</CardDescription>
        </CardHeader>
        <CardFooter className="justify-center">
          <Link href="/login" className="text-sm underline underline-offset-4">
            Перейти ко входу
          </Link>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md shadow-sm">
      <CardHeader>
        <CardTitle>Регистрация</CardTitle>
        <CardDescription>Создайте аккаунт Money Tracker</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <form action={formAction} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
            />
            <FieldError errors={state.fieldErrors?.email?.map((m) => ({ message: m }))} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Пароль</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              minLength={8}
              required
            />
            <FieldError errors={state.fieldErrors?.password?.map((m) => ({ message: m }))} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Подтверждение пароля</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              required
            />
            <FieldError
              errors={state.fieldErrors?.confirmPassword?.map((m) => ({
                message: m,
              }))}
            />
          </div>

          {state.error && (
            <Alert variant="destructive">
              <AlertCircle />
              <AlertTitle>Ошибка регистрации</AlertTitle>
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Регистрация…" : "Зарегистрироваться"}
          </Button>
        </form>

        <div className="relative">
          <Separator />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-xs text-muted-foreground">
            или
          </span>
        </div>

        <SocialButtons />
      </CardContent>
      <CardFooter className="justify-center text-sm text-muted-foreground">
        Уже есть аккаунт?{" "}
        <Link href="/login" className="text-foreground underline underline-offset-4">
          Войти
        </Link>
      </CardFooter>
    </Card>
  );
}
