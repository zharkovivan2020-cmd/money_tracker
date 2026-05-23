"use client";

import Link from "next/link";
import { useActionState } from "react";
import { AlertCircle } from "lucide-react";
import { signIn, type AuthActionState } from "@/app/actions/auth";
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

interface LoginFormProps {
  authError?: string | null;
}

export function LoginForm({ authError }: LoginFormProps) {
  const [state, formAction, pending] = useActionState(signIn, initialState);
  const errorMessage = authError ?? state.error;

  return (
    <Card className="w-full max-w-md shadow-sm">
      <CardHeader>
        <CardTitle>Вход</CardTitle>
        <CardDescription>Money Tracker — ваши транзакции</CardDescription>
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
              autoComplete="current-password"
              required
            />
            <FieldError errors={state.fieldErrors?.password?.map((m) => ({ message: m }))} />
          </div>

          {errorMessage && (
            <Alert variant="destructive">
              <AlertCircle />
              <AlertTitle>Ошибка входа</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Вход…" : "Войти"}
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
        Нет аккаунта?{" "}
        <Link href="/register" className="text-foreground underline underline-offset-4">
          Зарегистрироваться
        </Link>
      </CardFooter>
    </Card>
  );
}
