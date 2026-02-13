import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth-utils";
import { dbActions } from "@/lib/db";
import { ExerciseList } from "@/features/exercises/components/ExerciseList";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const exercises = await dbActions.getExercisesForUser(user.email);

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="border-b border-slate-200 bg-white px-4 py-4">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <h1 className="text-xl font-bold text-slate-900">Portal Pacjenta</h1>
          <div className="text-sm text-slate-600">
            Witaj,{" "}
            <span className="font-semibold">
              {user.firstName} {user.lastName}
            </span>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-5xl px-4 py-8">
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900">Twoje ćwiczenia</h2>
          <p className="text-slate-500">Lista przypisanych zadań na dzisiaj</p>
        </header>

        <ExerciseList exercises={exercises} />
      </main>
    </div>
  );
}
