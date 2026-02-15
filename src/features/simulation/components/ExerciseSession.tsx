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
          <defs>
            <linearGradient
              id="progressGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#14b8a6" />
            </linearGradient>
          </defs>
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="#f1f5f9"
            strokeWidth={STROKE_WIDTH}
          />
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="url(#progressGradient)"
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
        <div className="absolute inset-0 flex items-center justify-center font-mono text-5xl font-bold text-slate-800">
          {Math.floor(timeLeft / 60)}:
          {(timeLeft % 60).toString().padStart(2, "0")}
        </div>
      </div>

      {!isActive && timeLeft > 0 && (
        <button
          aria-label="Rozpocznij sesję"
          onClick={handleStart}
          disabled={!!error}
          className={`w-full rounded-xl py-4 font-bold text-white shadow-md transition-all ${
            error
              ? "cursor-not-allowed bg-slate-300 shadow-none"
              : "cursor-pointer bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 hover:shadow-lg active:scale-95"
          }`}
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
