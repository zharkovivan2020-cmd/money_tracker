import type { User } from "@supabase/supabase-js";
import type { UserRole } from "@/lib/types";
import {
  createServiceRoleClient,
  hasServiceRoleKey,
} from "@/lib/supabase/admin";

export function getAdminEmail(): string | null {
  const email = process.env.ADMIN_EMAIL?.trim();
  return email ? email.toLowerCase() : null;
}

export function resolveRole(email: string | undefined | null): UserRole {
  const adminEmail = getAdminEmail();
  if (!adminEmail || !email) return "user";
  return email.trim().toLowerCase() === adminEmail ? "admin" : "user";
}

export async function syncUserProfile(user: User): Promise<void> {
  if (!user.email || !hasServiceRoleKey()) return;

  const role = resolveRole(user.email);
  const adminClient = createServiceRoleClient();

  await adminClient.from("profiles").upsert(
    {
      id: user.id,
      email: user.email,
      role,
    },
    { onConflict: "id" },
  );
}
