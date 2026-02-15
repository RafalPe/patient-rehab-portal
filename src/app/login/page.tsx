import { LoginForm } from "@/features/auth/components/LoginForm";
import { AuthFlashMessage } from "@/features/auth/components/AuthFlashMessage";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md">
        <Suspense fallback={null}>
          <AuthFlashMessage />
        </Suspense>
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
