import { getCurrentUser } from "@/lib/auth-utils";
import { ProfileForm } from "@/features/profile/components/ProfileForm";
import Link from "next/link";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  return (
    <>
      <header className="mb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="text-sm text-slate-400 transition-colors hover:text-slate-700"
          >
            ← Wróć
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">Twój Profil</h1>
        </div>
        <p className="text-slate-500">Zarządzaj swoimi danymi osobowymi.</p>
      </header>

      <ProfileForm user={user!} />
    </>
  );
}
