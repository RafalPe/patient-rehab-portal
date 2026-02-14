import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth-utils";
import { ProfileForm } from "@/features/profile/components/ProfileForm";
import Link from "next/link";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/dashboard"
          className="mb-8 inline-block text-sm text-slate-500 transition-colors hover:text-slate-800"
        >
          ← Wróć do listy ćwiczeń
        </Link>

        <h1 className="mb-2 text-2xl font-bold text-slate-900">Twój Profil</h1>
        <p className="mb-8 text-slate-500">
          Zarządzaj swoimi danymi osobowymi.
        </p>

        <ProfileForm user={user} />
      </div>
    </div>
  );
}
