"use client";

import { Exercise } from "@/types/models";
import { useExerciseSession } from "@/features/simulation/hooks/useExerciseSession";

export const ExerciseSession = ({ exercise }: { exercise: Exercise }) => {
  const { timeLeft, isActive, isFinishing, handleStart } = useExerciseSession(
    exercise.id,
  );

  return (
    <div className="mx-auto max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
      <h2 className="mb-2 text-2xl font-bold text-slate-900">
        {exercise.deviceName}
      </h2>
      <p className="mb-8 text-slate-500">{exercise.params}</p>

      <div className="mb-8 font-mono text-6xl font-bold text-blue-600">
        {Math.floor(timeLeft / 60)}:
        {(timeLeft % 60).toString().padStart(2, "0")}
      </div>

      {!isActive && timeLeft > 0 && (
        <button
          onClick={handleStart}
          className="w-full rounded-xl bg-blue-600 py-4 font-bold text-white transition-transform hover:bg-blue-700 active:scale-95"
        >
          ROZPOCZNIJ SESJĘ
        </button>
      )}

      {isActive && (
        <div className="animate-pulse font-medium text-blue-500">
          Ćwiczenie w toku...
        </div>
      )}

      {isFinishing && (
        <div className="flex flex-col items-center justify-center gap-2 text-green-600">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-green-600 border-t-transparent"></div>
          <span className="font-medium">
            Przetwarzanie danych z urządzenia...
          </span>
        </div>
      )}
    </div>
  );
};
