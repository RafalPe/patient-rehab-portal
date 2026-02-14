import { getCurrentUser } from "@/lib/auth-utils";
import { dbActions } from "@/lib/db";
import { ExerciseList } from "@/features/exercises/components/ExerciseList";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const exercises = await dbActions.getExercisesForUser(user!.email);

  return (
    <>
      <header className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Twoje ćwiczenia</h2>
        <p className="text-slate-500">Lista przypisanych zadań na dzisiaj</p>
      </header>

      <ExerciseList exercises={exercises} />
    </>
  );
}
