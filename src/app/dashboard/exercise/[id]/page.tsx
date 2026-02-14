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
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="text-sm text-slate-400 transition-colors hover:text-slate-700"
          >
            ← Wróć
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
