import { LoginForm } from "@/features/auth/components/LoginForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ expired?: string; registered?: string }>;
}) {
  const { expired, registered } = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md">
        {expired && (
          <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 p-4 text-center text-sm text-amber-700">
            Sesja wygasła. Zaloguj się ponownie.
          </div>
        )}
        {registered && (
          <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-4 text-center text-sm text-green-700">
            Utworzono konto, można się zalogować.
          </div>
        )}
        <LoginForm />
        <p className="mt-8 text-center text-xs text-slate-400">
          Demo: <span className="font-medium">pacjent@test.pl</span> /{" "}
          <span className="font-medium">password123</span>
          <br />
          lub <span className="font-medium">anna.nowak@test.pl</span> /{" "}
          <span className="font-medium">password123</span>
        </p>
      </div>
    </main>
  );
}
