"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin, getCurrentUser, getProfile } from "@/lib/admin";
import { createClient } from "@/lib/supabase/server";
import {
  createServiceRoleClient,
  hasServiceRoleKey,
} from "@/lib/supabase/admin";
import type { Profile } from "@/lib/types";

export type AdminActionState = {
  error?: string;
  success?: boolean;
};

export async function listUsers(): Promise<Profile[]> {
  await requireAdmin();

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as Profile[];
}

export async function setUserBlocked(
  userId: string,
  blocked: boolean,
): Promise<AdminActionState> {
  const { user } = await requireAdmin();

  if (userId === user.id) {
    return { error: "Нельзя заблокировать свой аккаунт" };
  }

  const target = await getProfile(userId);
  if (!target) {
    return { error: "Пользователь не найден" };
  }

  if (target.role === "admin") {
    return { error: "Нельзя заблокировать администратора" };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("profiles")
    .update({
      is_blocked: blocked,
      blocked_at: blocked ? new Date().toISOString() : null,
    })
    .eq("id", userId)
    .eq("role", "user");

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/users");
  return { success: true };
}

export async function blockUser(userId: string): Promise<AdminActionState> {
  return setUserBlocked(userId, true);
}

export async function unblockUser(userId: string): Promise<AdminActionState> {
  return setUserBlocked(userId, false);
}

export async function deleteUser(userId: string): Promise<AdminActionState> {
  const { user } = await requireAdmin();

  if (userId === user.id) {
    return { error: "Нельзя удалить свой аккаунт" };
  }

  const target = await getProfile(userId);
  if (!target) {
    return { error: "Пользователь не найден" };
  }

  if (target.role === "admin") {
    return { error: "Нельзя удалить администратора" };
  }

  if (!hasServiceRoleKey()) {
    return {
      error:
        "Для удаления пользователей добавьте SUPABASE_SERVICE_ROLE_KEY в .env.local",
    };
  }

  const adminClient = createServiceRoleClient();
  const { error } = await adminClient.auth.admin.deleteUser(userId);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/users");
  return { success: true };
}

export async function blockUserFormAction(formData: FormData) {
  const userId = String(formData.get("userId") ?? "");
  if (!userId) return;
  await blockUser(userId);
}

export async function unblockUserFormAction(formData: FormData) {
  const userId = String(formData.get("userId") ?? "");
  if (!userId) return;
  await unblockUser(userId);
}

export async function deleteUserFormAction(formData: FormData) {
  const userId = String(formData.get("userId") ?? "");
  if (!userId) return;
  await deleteUser(userId);
}

export async function getAdminContext() {
  const user = await getCurrentUser();
  if (!user) return { user: null, profile: null, isAdmin: false };

  const profile = await getProfile(user.id);
  return {
    user,
    profile,
    isAdmin: profile?.role === "admin" && !profile.is_blocked,
  };
}
