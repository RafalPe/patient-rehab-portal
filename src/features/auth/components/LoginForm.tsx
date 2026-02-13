"use client";

import { useActionState } from "react";
import { loginAction } from "../actions/loginAction";
import { AuthActionState } from "../schemas/types";

const initialState: AuthActionState = {
  success: false,
};

export const LoginForm = () => {
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState,
  );

  return (
    <div className="mx-auto mt-10 w-full max-w-md rounded-xl bg-white p-8 shadow-lg">
      <h2 className="mb-6 text-center text-2xl font-bold text-slate-800">
        Panel Pacjenta
      </h2>

      <form action={formAction} className="space-y-4">
        {state.errors?.form && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 border border-red-200">
            {state.errors.form}
          </div>
        )}

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
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
            placeholder="pacjent@test.pl"
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
            className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 shadow-sm focus:border-brand-primary focus:outline-none focus:ring-1 focus:ring-brand-primary"
          />
          {state.errors?.password && (
            <p className="mt-1 text-xs text-red-500">
              {state.errors.password[0]}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isPending ? "Logowanie..." : "Zaloguj się"}
        </button>
      </form>
    </div>
  );
};
