import { LoginForm } from "@/components/auth/login-form";
import { resolveAuthError } from "@/lib/auth-errors";

interface LoginPageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { error } = await searchParams;
  const authError = resolveAuthError(error);

  return <LoginForm authError={authError} />;
}
