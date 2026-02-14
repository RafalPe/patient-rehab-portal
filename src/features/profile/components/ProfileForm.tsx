"use client";

import { useActionState } from "react";
import {
  updateProfileAction,
  ProfileActionState,
} from "../actions/profileActions";
import { User } from "@/types/models";

const initialState: ProfileActionState = {
  success: false,
};

export const ProfileForm = ({ user }: { user: User }) => {
  const [state, formAction, isPending] = useActionState(
    updateProfileAction,
    initialState,
  );

  return (
    <form
      action={formAction}
      className="space-y-6 rounded-xl border border-slate-200 bg-white p-8 shadow-sm"
    >
      {state.success && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-4 text-green-700">
          ✅ {state.message}
        </div>
      )}

      {state.message && !state.success && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          ⚠️ {state.message}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Imię
          </label>
          <input
            name="firstName"
            defaultValue={user.firstName}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-800 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          />
          {state.errors?.firstName && (
            <p className="mt-1 text-xs text-red-500">
              {state.errors.firstName[0]}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Nazwisko
          </label>
          <input
            name="lastName"
            defaultValue={user.lastName}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-800 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          />
          {state.errors?.lastName && (
            <p className="mt-1 text-xs text-red-500">
              {state.errors.lastName[0]}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Email (login)
        </label>
        <input
          value={user.email}
          disabled
          className="w-full cursor-not-allowed rounded-md border border-slate-200 bg-slate-100 px-3 py-2 text-slate-500"
        />
        <p className="mt-1 text-xs text-slate-400">Loginu nie można zmienić.</p>
      </div>

      <hr className="border-slate-100" />

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Aktualne hasło
        </label>
        <input
          name="currentPassword"
          type="password"
          placeholder="Wymagane przy zmianie hasła"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-800 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
        />
        {state.errors?.currentPassword && (
          <p className="mt-1 text-xs text-red-500">
            {state.errors.currentPassword[0]}
          </p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Nowe hasło
        </label>
        <input
          name="password"
          type="password"
          placeholder="Pozostaw puste, jeśli nie zmieniasz"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-800 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
        />
        {state.errors?.password && (
          <p className="mt-1 text-xs text-red-500">
            {state.errors.password[0]}
          </p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-slate-700">
          Potwierdź nowe hasło
        </label>
        <input
          name="confirmPassword"
          type="password"
          placeholder="Powtórz nowe hasło"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-800 shadow-sm placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
        />
        {state.errors?.confirmPassword && (
          <p className="mt-1 text-xs text-red-500">
            {state.errors.confirmPassword[0]}
          </p>
        )}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isPending}
          className="cursor-pointer rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
        >
          {isPending ? "Zapisywanie..." : "Zapisz zmiany"}
        </button>
      </div>
    </form>
  );
};
