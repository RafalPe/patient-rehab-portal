import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth-utils";
import { logoutAction } from "@/features/auth/actions/logoutAction";
import { Tooltip } from "@/features/ui/Tooltip";
import Link from "next/link";
import { SettingsIcon } from "@/features/ui/icons/SettingsIcon";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login?expired=true");
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-slate-100">
      <nav className="border-b border-slate-200 bg-white shadow-sm">
        <div className="h-1 bg-linear-to-r from-blue-500 via-teal-400 to-emerald-500" />
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <Link
            href="/dashboard"
            aria-label="Portal Pacjenta"
            className="flex items-center gap-2 text-xl font-bold text-slate-900 transition-colors hover:text-blue-600"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-blue-500 to-teal-400 text-sm font-bold text-white">
              P
            </span>
            Portal Pacjenta
          </Link>
          <div className="flex items-center gap-3 text-sm text-slate-600">
            <span>
              Witaj,{" "}
              <span className="font-semibold text-slate-800">
                {user.firstName} {user.lastName}
              </span>
            </span>
            <div className="h-5 w-px bg-slate-200" />
            <Tooltip label="Ustawienia profilu">
              <Link
                href="/dashboard/profile"
                className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-blue-600"
              >
                <SettingsIcon className="h-5 w-5" />
              </Link>
            </Tooltip>
            <form action={logoutAction}>
              <button
                type="submit"
                className="cursor-pointer rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-500 transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                Wyloguj
              </button>
            </form>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
    </div>
  );
}
