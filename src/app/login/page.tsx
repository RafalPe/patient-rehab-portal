import { LoginForm } from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md">
        <LoginForm />
        <p className="mt-8 text-center text-xs text-slate-400">
          Demo danych: <span className="font-medium">pacjent@test.pl</span> /{" "}
          <span className="font-medium">password123</span>
        </p>
      </div>
    </main>
  );
}
