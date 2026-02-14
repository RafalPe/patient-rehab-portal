"use server";

import { dbActions } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth-utils";
import { revalidatePath } from "next/cache";
import { toISODateString } from "@/types/models";

export type ExerciseActionResult = {
  success: boolean;
  error?: string;
};

export async function updateExerciseStatusAction(
  exerciseId: string,
  status: "IN_PROGRESS" | "DONE",
): Promise<ExerciseActionResult> {
  try {
    const user = await getCurrentUser();
    if (!user)
      return { success: false, error: "Sesja wygasła. Zaloguj się ponownie." };

    const exercises = await dbActions.getExercisesForUser(user.email);
    const currentExercise = exercises.find((e) => e.id === exerciseId);

    if (currentExercise?.status === "DONE") {
      return { success: false, error: "To ćwiczenie zostało już wykonane." };
    }

    const now = new Date();
    const timestamp = toISODateString(now);

    if (status === "DONE") {
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }

    const success = await dbActions.updateExerciseStatus(
      user.email,
      exerciseId,
      status,
      {
        ...(status === "IN_PROGRESS" && { startedAt: timestamp }),
        ...(status === "DONE" && { completedAt: timestamp }),
      },
    );

    if (success) {
      revalidatePath("/dashboard");
    }

    return { success };
  } catch {
    return { success: false, error: "Wystąpił nieoczekiwany błąd serwera." };
  }
}
