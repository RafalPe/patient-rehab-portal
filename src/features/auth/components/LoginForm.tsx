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
          <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
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
            className="focus:border-brand-primary focus:ring-brand-primary mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-800 shadow-sm placeholder:text-slate-400 focus:ring-1 focus:outline-none"
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
            className="focus:border-brand-primary focus:ring-brand-primary mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-slate-800 shadow-sm focus:ring-1 focus:outline-none"
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
          className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? "Logowanie..." : "Zaloguj się"}
        </button>
      </form>
    </div>
  );
};
