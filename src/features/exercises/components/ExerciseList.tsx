import { Exercise } from "@/types/models";

interface ExerciseListProps {
  exercises: Exercise[];
}

export const ExerciseList = ({ exercises }: ExerciseListProps) => {
  if (exercises.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white py-12 text-center">
        <p className="text-slate-500">Brak przypisanych ćwiczeń na dzisiaj.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
      {exercises.map((ex) => (
        <div
          key={ex.id}
          className="transition-hover flex flex-col justify-between gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md md:flex-row md:items-center"
        >
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {ex.deviceName}
            </h3>
            <p className="text-sm text-slate-600">{ex.params}</p>
          </div>

          <div className="flex items-center gap-4">
            <span
              className={`rounded-full px-3 py-1 text-xs font-medium ${
                ex.status === "DONE"
                  ? "bg-green-100 text-green-700"
                  : ex.status === "IN_PROGRESS"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-slate-100 text-slate-700"
              }`}
            >
              {ex.status}
            </span>

            <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
              Rozpocznij
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
