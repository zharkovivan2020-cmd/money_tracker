const AUTH_ERROR_MESSAGES: Record<string, string> = {
  oauth: "Не удалось войти через соцсеть. Попробуйте снова или используйте email.",
  auth: "Ошибка входа. Попробуйте ещё раз.",
};

export function resolveAuthError(code?: string | null): string | null {
  if (!code) return null;
  return AUTH_ERROR_MESSAGES[code] ?? "Ошибка аутентификации.";
}
