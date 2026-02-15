"use client";

import { useActionState } from "react";
import { registerAction } from "../actions/registerAction";
import { AuthActionState } from "../schemas/types";
import Link from "next/link";

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
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-slate-700"
            >
              Imię
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-800 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none"
              placeholder="Jan"
            />
            {state.errors?.firstName && (
              <p className="mt-1 text-xs text-red-500">
                {state.errors.firstName[0]}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-slate-700"
            >
              Nazwisko
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              required
              className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-800 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none"
              placeholder="Kowalski"
            />
            {state.errors?.lastName && (
              <p className="mt-1 text-xs text-red-500">
                {state.errors.lastName[0]}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-slate-700"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-800 shadow-sm placeholder:text-slate-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none"
            placeholder="twoj@email.pl"
          />
          {state.errors?.email && (
            <p className="mt-1 text-xs text-red-500">{state.errors.email[0]}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-slate-700"
          >
            Hasło
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-800 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none"
            placeholder="••••••••"
          />
          {state.errors?.password && (
            <p className="mt-1 text-xs text-red-500">
              {state.errors.password[0]}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-slate-700"
          >
            Potwierdź hasło
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2.5 text-slate-800 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 focus:outline-none"
            placeholder="••••••••"
          />
          {state.errors?.confirmPassword && (
            <p className="mt-1 text-xs text-red-500">
              {state.errors.confirmPassword[0]}
            </p>
          )}
        </div>

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
