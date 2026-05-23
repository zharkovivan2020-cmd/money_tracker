import { listUsers } from "@/app/actions/admin";
import { AdminBreadcrumb } from "@/components/admin/admin-breadcrumb";
import { UsersTable } from "@/components/admin/users-table";
import { AppHeader } from "@/components/app-header";
import { Badge } from "@/components/ui/badge";

export default async function AdminUsersPage() {
  const users = await listUsers();

  return (
    <>
      <AdminBreadcrumb />

      <AppHeader
        title="Админка"
        description="Управление пользователями приложения"
      />

      <div className="flex items-center gap-2">
        <Badge variant="secondary">Всего: {users.length}</Badge>
      </div>

      <UsersTable users={users} />
    </>
  );
}
