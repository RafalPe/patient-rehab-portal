import { ExerciseStatus } from "@/types/models";

export const STATUS_LABELS: Record<ExerciseStatus, string> = {
  TODO: "Do zrobienia",
  IN_PROGRESS: "Rozpoczęte",
  DONE: "Wykonane",
};
