"use server";

import { revalidatePath } from "next/cache";
import { transactionSchema } from "@/lib/transaction-schema";
import { createClient } from "@/lib/supabase/server";

export async function addTransaction(formData: FormData) {
  const parsed = transactionSchema.safeParse({
    type: formData.get("type"),
    amount: formData.get("amount"),
    category: formData.get("category"),
    description: formData.get("description"),
    date: formData.get("date"),
  });

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  const supabase = await createClient();
  const { error } = await supabase.from("transactions").insert(parsed.data);

  if (error) {
    return { error: { _form: [error.message] } };
  }

  revalidatePath("/");
  return { success: true };
}

export async function updateTransaction(id: number, formData: FormData) {
  const parsed = transactionSchema.safeParse({
    type: formData.get("type"),
    amount: formData.get("amount"),
    category: formData.get("category"),
    description: formData.get("description"),
    date: formData.get("date"),
  });

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  const supabase = await createClient();
  const { error } = await supabase
    .from("transactions")
    .update(parsed.data)
    .eq("id", id);

  if (error) {
    return { error: { _form: [error.message] } };
  }

  revalidatePath("/");
  return { success: true };
}

export async function updateTransactionFromForm(formData: FormData) {
  const id = Number(formData.get("transactionId"));
  if (!Number.isFinite(id)) {
    return { error: { _form: ["Некорректный id"] } };
  }
  return updateTransaction(id, formData);
}

export async function deleteTransaction(id: number) {
  const supabase = await createClient();
  const { error } = await supabase.from("transactions").delete().eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/");
  return { success: true };
}

export async function deleteTransactionFormAction(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!Number.isFinite(id)) return;
  await deleteTransaction(id);
}
