import { Exercise } from "@/types/models";
import { STATUS_LABELS } from "../utils/statusLabels";
import Link from "next/link";

interface ExerciseListProps {
  exercises: Exercise[];
}

const STATUS_STYLES = {
  TODO: {
    border: "border-l-slate-300",
    badge: "bg-slate-100 text-slate-600",
    dot: "bg-slate-400",
  },
  IN_PROGRESS: {
    border: "border-l-blue-400",
    badge: "bg-blue-50 text-blue-700",
    dot: "bg-blue-500",
  },
  DONE: {
    border: "border-l-emerald-400",
    badge: "bg-emerald-50 text-emerald-700",
    dot: "bg-emerald-500",
  },
} as const;

export const ExerciseList = ({ exercises }: ExerciseListProps) => {
  if (exercises.length === 0) {
    return (
      <div className="rounded-xl border-2 border-dashed border-slate-200 bg-white py-16 text-center">
        <p className="text-lg text-slate-400">
          Brak przypisanych ćwiczeń na dzisiaj.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {exercises.map((ex) => {
        const styles = STATUS_STYLES[ex.status];

        return (
          <div
            key={ex.id}
            className={`flex flex-col justify-between gap-4 rounded-xl border border-l-4 border-slate-200 ${styles.border} bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md md:flex-row md:items-center`}
          >
            <div>
              <h3 className="text-base font-semibold text-slate-900">
                {ex.deviceName}
              </h3>
              <p className="mt-0.5 text-sm text-slate-500">{ex.params}</p>
              {ex.status === "DONE" && (ex.startedAt || ex.completedAt) && (
                <div className="mt-2 space-y-0.5 text-xs text-slate-400">
                  {ex.startedAt && (
                    <p>
                      Rozpoczęto:{" "}
                      {new Date(ex.startedAt).toLocaleString("pl-PL")}
                    </p>
                  )}
                  {ex.completedAt && (
                    <p>
                      Zakończono:{" "}
                      {new Date(ex.completedAt).toLocaleString("pl-PL")}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${styles.badge}`}
              >
                <span
                  className={`inline-block h-1.5 w-1.5 rounded-full ${styles.dot}`}
                />
                {STATUS_LABELS[ex.status]}
              </span>

              {ex.status !== "DONE" && (
                <Link
                  href={`/dashboard/exercise/${ex.id}`}
                  className="rounded-lg bg-linear-to-r from-blue-500 to-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:from-blue-600 hover:to-blue-700 hover:shadow active:scale-95"
                >
                  {ex.status === "IN_PROGRESS" ? "Kontynuuj" : "Rozpocznij"}
                </Link>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
