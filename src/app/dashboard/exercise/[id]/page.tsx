import { notFound } from "next/navigation";
import { getCurrentUser } from "@/lib/auth-utils";
import { dbActions } from "@/lib/db";
import { ExerciseSession } from "@/features/simulation/components/ExerciseSession";
import Link from "next/link";

export default async function ExercisePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getCurrentUser();

  const exercises = await dbActions.getExercisesForUser(user!.email);
  const exercise = exercises.find((e) => e.id === id);

  if (!exercise) {
    notFound();
  }

  return (
    <>
      <header className="mb-8">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-500 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-3.5 w-3.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
            Wróć
          </Link>
          <h2 className="text-2xl font-bold text-slate-900">
            Symulacja ćwiczenia
          </h2>
        </div>
      </header>

      <ExerciseSession exercise={exercise} />
    </>
  );
}
