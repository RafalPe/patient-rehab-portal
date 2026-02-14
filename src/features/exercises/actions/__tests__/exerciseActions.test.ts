import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { db } from "@/lib/db";
import { updateExerciseStatusAction } from "../exerciseActions";

vi.mock("@/lib/auth-utils", () => ({
  getCurrentUser: vi.fn(),
}));

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

import { getCurrentUser } from "@/lib/auth-utils";
const mockedGetCurrentUser = vi.mocked(getCurrentUser);

beforeEach(() => {
  vi.useFakeTimers();

  db.users = [
    {
      id: "1",
      firstName: "Jan",
      lastName: "Kowalski",
      email: "pacjent@test.pl",
      password: "password123",
    },
  ];

  db.exercises = {
    "pacjent@test.pl": [
      {
        id: "ex1",
        deviceName: "Rotor kończyn górnych",
        params: "Czas: 15 min, Obciążenie: 5kg",
        status: "TODO",
      },
    ],
  };
});

afterEach(() => {
  vi.useRealTimers();
});

describe("updateExerciseStatusAction", () => {
  it("updates status from TODO to IN_PROGRESS (happy path)", async () => {
    mockedGetCurrentUser.mockResolvedValue(db.users[0]);

    const result = await updateExerciseStatusAction("ex1", "IN_PROGRESS");

    expect(result.success).toBe(true);
    expect(db.exercises["pacjent@test.pl"][0].status).toBe("IN_PROGRESS");
    expect(db.exercises["pacjent@test.pl"][0].startedAt).toBeDefined();
  });

  it("updates status to DONE and sets completedAt", async () => {
    db.exercises["pacjent@test.pl"][0].status = "IN_PROGRESS";
    mockedGetCurrentUser.mockResolvedValue(db.users[0]);

    const resultPromise = updateExerciseStatusAction("ex1", "DONE");
    await vi.advanceTimersByTimeAsync(3000);
    const result = await resultPromise;

    expect(result.success).toBe(true);
    expect(db.exercises["pacjent@test.pl"][0].status).toBe("DONE");
    expect(db.exercises["pacjent@test.pl"][0].completedAt).toBeDefined();
  });

  it("rejects status change when exercise is already DONE", async () => {
    db.exercises["pacjent@test.pl"][0].status = "DONE";
    mockedGetCurrentUser.mockResolvedValue(db.users[0]);

    const result = await updateExerciseStatusAction("ex1", "IN_PROGRESS");

    expect(result.success).toBe(false);
    expect(result.error).toBe("To ćwiczenie zostało już wykonane.");
  });

  it("returns error when user is not authenticated", async () => {
    mockedGetCurrentUser.mockResolvedValue(null);

    const result = await updateExerciseStatusAction("ex1", "IN_PROGRESS");

    expect(result.success).toBe(false);
    expect(result.error).toBe("Sesja wygasła. Zaloguj się ponownie.");
  });

  it("returns failure when exercise does not belong to user", async () => {
    mockedGetCurrentUser.mockResolvedValue({
      id: "99",
      firstName: "Obcy",
      lastName: "Użytkownik",
      email: "obcy@test.pl",
      password: "pass",
    });

    const result = await updateExerciseStatusAction("ex1", "IN_PROGRESS");

    expect(result.success).toBe(false);
  });
});
