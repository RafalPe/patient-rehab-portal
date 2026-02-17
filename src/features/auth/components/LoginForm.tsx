"use client";

import { useActionState } from "react";
import { loginAction } from "../actions/loginAction";
import { AuthActionState } from "../schemas/types";
import Link from "next/link";
import { FormInput } from "@/features/ui/FormInput";

const initialState: AuthActionState = {
  success: false,
};

export const LoginForm = () => {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState,
  );

  return (
    <div className="mx-auto w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl">
      <div className="bg-linear-to-r from-blue-500 via-teal-400 to-emerald-500 px-8 py-6">
        <h2 className="text-center text-2xl font-bold text-white">
          Panel Pacjenta
        </h2>
        <p className="mt-1 text-center text-sm text-white/80">
          Zaloguj się, aby kontynuować
        </p>
      </div>

      <form action={formAction} className="space-y-5 p-8">
        {state.errors?.form && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            {state.errors.form}
          </div>
        )}

        <FormInput
          label="Email"
          name="email"
          type="email"
          required
          placeholder="pacjent@test.pl"
          error={state.errors?.email}
          variant="auth"
        />

        <FormInput
          label="Hasło"
          name="password"
          type="password"
          required
          placeholder="••••••••"
          error={state.errors?.password}
          variant="auth"
        />

        <button
          type="submit"
          disabled={isPending}
          className="w-full cursor-pointer rounded-lg bg-linear-to-r from-blue-500 to-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-md transition-all hover:from-blue-600 hover:to-blue-700 hover:shadow-lg focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? "Logowanie..." : "Zaloguj się"}
        </button>

        <p className="text-center text-sm text-slate-600">
          Nie masz konta?{" "}
          <Link
            href="/register"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Zarejestruj się
          </Link>
        </p>
      </form>
    </div>
  );
};
