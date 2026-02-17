"use client";

import { useActionState } from "react";
import { registerAction } from "../actions/registerAction";
import { AuthActionState } from "../schemas/types";
import Link from "next/link";
import { FormInput } from "@/features/ui/FormInput";

const initialState: AuthActionState = {
  success: false,
};

export const RegisterForm = () => {
  const [state, formAction, isPending] = useActionState(
    registerAction,
    initialState,
  );

  return (
    <div className="mx-auto w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-xl">
      <div className="bg-linear-to-r from-purple-500 via-pink-500 to-red-500 px-8 py-6">
        <h2 className="text-center text-2xl font-bold text-white">
          Rejestracja
        </h2>
        <p className="mt-1 text-center text-sm text-white/80">
          Załóż konto w portalu
        </p>
      </div>

      <form action={formAction} className="space-y-4 p-8">
        {state.errors?.form && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            {state.errors.form}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="Imię"
            name="firstName"
            type="text"
            defaultValue={state.payload?.firstName}
            required
            placeholder="Jan"
            error={state.errors?.firstName}
            variant="authPurple"
          />
          <FormInput
            label="Nazwisko"
            name="lastName"
            type="text"
            defaultValue={state.payload?.lastName}
            required
            placeholder="Kowalski"
            error={state.errors?.lastName}
            variant="authPurple"
          />
        </div>

        <FormInput
          label="Email"
          name="email"
          type="email"
          defaultValue={state.payload?.email}
          required
          placeholder="twoj@email.pl"
          error={state.errors?.email}
          variant="authPurple"
        />

        <FormInput
          label="Hasło"
          name="password"
          type="password"
          required
          placeholder="••••••••"
          error={state.errors?.password}
          variant="authPurple"
        />

        <FormInput
          label="Potwierdź hasło"
          name="confirmPassword"
          type="password"
          required
          placeholder="••••••••"
          error={state.errors?.confirmPassword}
          variant="authPurple"
        />

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-lg bg-linear-to-r from-purple-500 to-pink-600 px-4 py-3 text-sm font-semibold text-white shadow-md transition-all hover:from-purple-600 hover:to-pink-700 hover:shadow-lg focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:outline-none active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? "Rejestracja..." : "Zarejestruj się"}
        </button>

        <p className="text-center text-sm text-slate-600">
          Masz już konto?{" "}
          <Link
            href="/login"
            className="font-medium text-purple-600 hover:text-purple-500"
          >
            Zaloguj się
          </Link>
        </p>
      </form>
    </div>
  );
};
