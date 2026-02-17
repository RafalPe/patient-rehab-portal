"use client";

import { useEffect } from "react";

import { AlertIcon } from "@/features/ui/icons/AlertIcon";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-red-100">
        <AlertIcon className="h-10 w-10 text-red-600" />
      </div>
      <h2 className="mb-2 text-3xl font-bold tracking-tight text-slate-900">
        Ups! Coś poszło nie tak.
      </h2>
      <p className="mb-8 max-w-md text-slate-600">
        Wystąpił nieoczekiwany błąd aplikacji. Spróbuj odświeżyć stronę.
      </p>
      <div className="flex gap-4">
        <button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
          className="rounded-lg bg-blue-600 px-6 py-2.5 font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
        >
          Spróbuj ponownie
        </button>
        <a
          href="/dashboard"
          className="rounded-lg border border-slate-300 bg-white px-6 py-2.5 font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:outline-none"
        >
          Wróć do Panelu
        </a>
      </div>
    </div>
  );
}
