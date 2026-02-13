"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateExerciseStatusAction } from "@/features/exercises/actions/exerciseActions";
import { useExerciseTimer } from "@/features/simulation/hooks/useExerciseTimer";

const SIMULATION_DURATION_SECONDS = 15;

export const useExerciseSession = (exerciseId: string) => {
  const router = useRouter();
  const [isFinishing, setIsFinishing] = useState(false);

  const handleComplete = async () => {
    setIsFinishing(true);
    await updateExerciseStatusAction(exerciseId, "DONE");
    router.push("/dashboard");
  };

  const { timeLeft, isActive, start } = useExerciseTimer(
    SIMULATION_DURATION_SECONDS,
    handleComplete,
  );

  const handleStart = async () => {
    start();
    await updateExerciseStatusAction(exerciseId, "IN_PROGRESS");
  };

  return { timeLeft, isActive, isFinishing, handleStart };
};
