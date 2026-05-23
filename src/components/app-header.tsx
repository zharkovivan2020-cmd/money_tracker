import { getAdminContext } from "@/app/actions/admin";
import { createClient } from "@/lib/supabase/server";
import { UserMenu } from "@/components/user-menu";

interface AppHeaderProps {
  title?: string;
  description?: string;
}

export async function AppHeader({
  title = "Money Tracker",
  description = "Доходы, расходы и баланс за месяц",
}: AppHeaderProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { isAdmin } = await getAdminContext();

  return (
    <header className="flex flex-wrap items-start justify-between gap-4">
      <div className="space-y-1">
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      {user?.email && <UserMenu email={user.email} isAdmin={isAdmin} />}
    </header>
  );
}
