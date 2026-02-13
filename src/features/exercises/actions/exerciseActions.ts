"use server";

import { dbActions } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth-utils";
import { revalidatePath } from "next/cache";
import { toISODateString } from "@/types/models";

export async function updateExerciseStatusAction(
  exerciseId: string,
  status: "IN_PROGRESS" | "DONE",
) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  const now = new Date();
  const timestamp = toISODateString(now);

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

  return success;
}
