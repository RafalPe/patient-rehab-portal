import { getCurrentUser } from "@/lib/auth-utils";
import { ProfileForm } from "@/features/profile/components/ProfileForm";
import Link from "next/link";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  return (
    <>
      <header className="mb-8">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-500 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-3.5 w-3.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
            Wróć
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">Twój Profil</h1>
        </div>
        <p className="mt-1 text-slate-500">
          Zarządzaj swoimi danymi osobowymi.
        </p>
      </header>

      <ProfileForm user={user!} />
    </>
  );
}
