"use client";

import { Exercise } from "@/types/models";
import {
  useExerciseSession,
  SIMULATION_DURATION_SECONDS,
} from "@/features/simulation/hooks/useExerciseSession";

const RADIUS = 80;
const STROKE_WIDTH = 8;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const SIZE = (RADIUS + STROKE_WIDTH) * 2;

export const ExerciseSession = ({ exercise }: { exercise: Exercise }) => {
  const { timeLeft, isActive, isFinishing, error, handleStart } =
    useExerciseSession(exercise.id);

  const ringDashOffset = isActive || timeLeft === 0 ? CIRCUMFERENCE : 0;

  return (
    <div className="mx-auto max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      <h2 className="mb-2 text-2xl font-bold text-slate-900">
        {exercise.deviceName}
      </h2>
      <p className="mb-8 text-slate-500">{exercise.params}</p>

      <div
        className="relative mx-auto mb-8"
        style={{ width: SIZE, height: SIZE }}
      >
        <svg width={SIZE} height={SIZE} className="-rotate-90">
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth={STROKE_WIDTH}
          />
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="#2563eb"
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={ringDashOffset}
            style={{
              transition: isActive
                ? `stroke-dashoffset ${SIMULATION_DURATION_SECONDS}s linear`
                : "none",
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center font-mono text-5xl font-bold text-blue-600">
          {Math.floor(timeLeft / 60)}:
          {(timeLeft % 60).toString().padStart(2, "0")}
        </div>
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
