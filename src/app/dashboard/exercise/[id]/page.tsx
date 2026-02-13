import { notFound, redirect } from "next/navigation";
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

  if (!user) redirect("/login");

  const exercises = await dbActions.getExercisesForUser(user.email);
  const exercise = exercises.find((e) => e.id === id);

  if (!exercise) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/dashboard"
          className="mb-8 inline-block text-sm text-slate-500 transition-colors hover:text-slate-800"
        >
          ← Wróć do listy
        </Link>

        <ExerciseSession exercise={exercise} />
      </div>
    </div>
  );
}
