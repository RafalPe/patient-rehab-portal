import Link from "next/link";
import { InfoIcon } from "@/features/ui/icons/InfoIcon";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 px-4 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-br from-blue-100 to-indigo-100">
        <InfoIcon className="h-10 w-10 text-blue-600" />
      </div>
      <h2 className="mb-2 text-3xl font-bold tracking-tight text-slate-900">
        404 - Strona nie znaleziona
      </h2>
      <p className="mb-8 max-w-md text-slate-600">
        Przykro nam, ale strona której szukasz nie istnieje lub została
        przeniesiona.
      </p>
      <Link
        href="/dashboard"
        className="rounded-lg bg-blue-600 px-6 py-2.5 font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
      >
        Wróć do Panelu
      </Link>
    </div>
  );
}
