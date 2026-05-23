"use client";

import Link from "next/link";
import { ChevronDown, LogOut, Shield, User } from "lucide-react";
import { signOut } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface UserMenuProps {
  email: string;
  isAdmin: boolean;
}

export function UserMenu({ email, isAdmin }: UserMenuProps) {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button variant="outline" className="gap-2">
              <User className="size-4" />
              <span className="max-w-[180px] truncate">{email}</span>
              <ChevronDown className="size-4 opacity-60" />
            </Button>
          }
        />
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuGroup>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-muted-foreground">Аккаунт</span>
                <span className="truncate text-sm font-medium">{email}</span>
              </div>
            </DropdownMenuLabel>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {isAdmin && (
              <DropdownMenuItem render={<Link href="/admin/users" />}>
                <Shield className="size-4" />
                Админка
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              variant="destructive"
              onClick={() =>
                (
                  document.getElementById(
                    "sign-out-form",
                  ) as HTMLFormElement | null
                )?.requestSubmit()
              }
            >
              <LogOut className="size-4" />
              Выйти
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <form id="sign-out-form" action={signOut} className="hidden" />
    </>
  );
}
