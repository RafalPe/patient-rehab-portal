import { getCurrentUser } from "@/lib/auth-utils";
import { ProfileForm } from "@/features/profile/components/ProfileForm";
import { LinkButton } from "@/features/ui/LinkButton";

export default async function ProfilePage() {
  const user = await getCurrentUser();

  return (
    <>
      <header className="mb-8">
        <div className="flex items-center gap-3">
          <LinkButton href="/dashboard">Wróć</LinkButton>
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
