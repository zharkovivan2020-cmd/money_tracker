"use client";

import { useState, useTransition } from "react";
import {
  Ban,
  MoreHorizontal,
  Trash2,
  UserCheck,
  Users,
} from "lucide-react";
import {
  blockUser,
  deleteUser,
  unblockUser,
} from "@/app/actions/admin";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/lib/format";
import { showErrorToast, showSuccessToast } from "@/lib/toast";
import type { Profile } from "@/lib/types";

interface UsersTableProps {
  users: Profile[];
}

export function UsersTable({ users }: UsersTableProps) {
  if (users.length === 0) {
    return (
      <Empty className="border">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <Users />
          </EmptyMedia>
          <EmptyTitle>Пользователей пока нет</EmptyTitle>
          <EmptyDescription>
            Когда кто-то зарегистрируется, он появится в этом списке.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Email</TableHead>
          <TableHead>Роль</TableHead>
          <TableHead>Статус</TableHead>
          <TableHead>Регистрация</TableHead>
          <TableHead className="w-12 text-right">Действия</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <UserRow key={user.id} user={user} />
        ))}
      </TableBody>
    </Table>
  );
}

function UserRow({ user }: { user: Profile }) {
  const [pending, startTransition] = useTransition();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const isAdmin = user.role === "admin";

  function runBlockToggle() {
    startTransition(async () => {
      const result = user.is_blocked
        ? await unblockUser(user.id)
        : await blockUser(user.id);

      if (result.error) {
        showErrorToast(result.error);
        return;
      }

      showSuccessToast(
        user.is_blocked ? "Пользователь разблокирован" : "Пользователь заблокирован",
      );
    });
  }

  function runDelete() {
    startTransition(async () => {
      const result = await deleteUser(user.id);
      setDeleteOpen(false);

      if (result.error) {
        showErrorToast(result.error);
        return;
      }

      showSuccessToast("Пользователь удалён");
    });
  }

  return (
    <TableRow>
      <TableCell className="font-medium">{user.email}</TableCell>
      <TableCell>
        <Badge variant={isAdmin ? "default" : "secondary"}>{user.role}</Badge>
      </TableCell>
      <TableCell>
        {user.is_blocked ? (
          <Badge variant="destructive">Заблокирован</Badge>
        ) : (
          <Badge className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
            Активен
          </Badge>
        )}
      </TableCell>
      <TableCell className="text-muted-foreground">
        {formatDate(user.created_at.slice(0, 10))}
      </TableCell>
      <TableCell className="text-right">
        {!isAdmin && (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    disabled={pending}
                    aria-label="Действия"
                  />
                }
              >
                <MoreHorizontal className="size-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={runBlockToggle}>
                  {user.is_blocked ? (
                    <>
                      <UserCheck className="size-4" />
                      Разблокировать
                    </>
                  ) : (
                    <>
                      <Ban className="size-4" />
                      Заблокировать
                    </>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => setDeleteOpen(true)}
                >
                  <Trash2 className="size-4" />
                  Удалить
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Удалить пользователя?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Аккаунт {user.email} и все его транзакции будут удалены
                    без возможности восстановления.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Отмена</AlertDialogCancel>
                  <AlertDialogAction
                    variant="destructive"
                    onClick={runDelete}
                    disabled={pending}
                  >
                    Удалить
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </>
        )}
      </TableCell>
    </TableRow>
  );
}
