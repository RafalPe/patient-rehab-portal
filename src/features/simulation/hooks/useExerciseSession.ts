"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateExerciseStatusAction } from "@/features/exercises/actions/exerciseActions";
import { useExerciseTimer } from "@/features/simulation/hooks/useExerciseTimer";

export const SIMULATION_DURATION_SECONDS = 15;

export const useExerciseSession = (exerciseId: string) => {
  const router = useRouter();
  const [isFinishing, setIsFinishing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleComplete = async () => {
    setIsFinishing(true);
    const result = await updateExerciseStatusAction(exerciseId, "DONE");

    if (!result.success) {
      setIsFinishing(false);
      setError(result.error ?? "Nie udało się zakończyć ćwiczenia.");
      return;
    }

    router.push("/dashboard");
  };

  const { timeLeft, isActive, start } = useExerciseTimer(
    SIMULATION_DURATION_SECONDS,
    handleComplete,
  );

  const handleStart = async () => {
    setError(null);
    const result = await updateExerciseStatusAction(exerciseId, "IN_PROGRESS");

    if (result.success) {
      start();
    } else {
      setError(result.error ?? "Nie udało się rozpocząć ćwiczenia.");
    }
  };

  return { timeLeft, isActive, isFinishing, error, handleStart };
};
