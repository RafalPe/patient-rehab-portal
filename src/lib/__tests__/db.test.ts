import { describe, it, expect, beforeEach } from "vitest";
import { db, dbActions } from "@/lib/db";
import { ISODateString } from "@/types/models";

beforeEach(() => {
  db.users = [
    {
      id: "1",
      firstName: "Jan",
      lastName: "Kowalski",
      email: "pacjent@test.pl",
      password: "password123",
    },
    {
      id: "2",
      firstName: "Anna",
      lastName: "Nowak",
      email: "anna.nowak@test.pl",
      password: "password123",
    },
  ];

  db.exercises = {
    "1": [
      {
        id: "ex1",
        deviceName: "Rotor kończyn górnych",
        params: "Czas: 15 min, Obciążenie: 5kg",
        status: "TODO",
      },
      {
        id: "ex2",
        deviceName: "Bieżnia rehabilitacyjna",
        params: "Czas: 10 min, Prędkość: 4km/h",
        status: "TODO",
      },
    ],
    "2": [
      {
        id: "ex3",
        deviceName: "Rower stacjonarny",
        params: "Czas: 20 min, Opór: 3",
        status: "TODO",
      },
    ],
  };
});

describe("dbActions.findUserByEmail", () => {
  it("returns user when email exists", async () => {
    const user = await dbActions.findUserByEmail("pacjent@test.pl");
    expect(user).toBeDefined();
    expect(user?.firstName).toBe("Jan");
    expect(user?.lastName).toBe("Kowalski");
  });

  it("returns undefined for non-existent email", async () => {
    const user = await dbActions.findUserByEmail("nie@istnieje.pl");
    expect(user).toBeUndefined();
  });
});

describe("dbActions.updateUser", () => {
  it("updates user data and returns true", async () => {
    const result = await dbActions.updateUser("pacjent@test.pl", {
      firstName: "Janusz",
    });
    expect(result).toBe(true);

    const user = await dbActions.findUserByEmail("pacjent@test.pl");
    expect(user?.firstName).toBe("Janusz");
  });

  it("returns false for non-existent user", async () => {
    const result = await dbActions.updateUser("nie@istnieje.pl", {
      firstName: "Test",
    });
    expect(result).toBe(false);
  });
});

describe("dbActions.getExercisesForUser", () => {
  it("returns exercises for existing user", async () => {
    const exercises = await dbActions.getExercisesForUser("1");
    expect(exercises).toHaveLength(2);
    expect(exercises[0].deviceName).toBe("Rotor kończyn górnych");
  });

  it("returns empty array for non-existent user", async () => {
    const exercises = await dbActions.getExercisesForUser("999");
    expect(exercises).toEqual([]);
  });
});

describe("dbActions.updateExerciseStatus", () => {
  it("updates status from TODO to IN_PROGRESS", async () => {
    const result = await dbActions.updateExerciseStatus(
      "1",
      "ex1",
      "IN_PROGRESS",
      { startedAt: "2026-02-14T12:00:00Z" as ISODateString },
    );
    expect(result).toBe(true);

    const exercises = await dbActions.getExercisesForUser("1");
    const ex = exercises.find((e) => e.id === "ex1");
    expect(ex?.status).toBe("IN_PROGRESS");
    expect(ex?.startedAt).toBe("2026-02-14T12:00:00Z");
  });

  it("updates status from IN_PROGRESS to DONE with timestamps", async () => {
    await dbActions.updateExerciseStatus("1", "ex1", "IN_PROGRESS", {
      startedAt: "2026-02-14T12:00:00Z" as ISODateString,
    });

    const result = await dbActions.updateExerciseStatus("1", "ex1", "DONE", {
      completedAt: "2026-02-14T12:15:00Z" as ISODateString,
    });
    expect(result).toBe(true);

    const exercises = await dbActions.getExercisesForUser("1");
    const ex = exercises.find((e) => e.id === "ex1");
    expect(ex?.status).toBe("DONE");
    expect(ex?.completedAt).toBe("2026-02-14T12:15:00Z");
  });

  it("prevents changing status from DONE to other value", async () => {
    await dbActions.updateExerciseStatus("1", "ex1", "IN_PROGRESS");
    await dbActions.updateExerciseStatus("1", "ex1", "DONE");

    const result = await dbActions.updateExerciseStatus(
      "1",
      "ex1",
      "IN_PROGRESS",
    );
    expect(result).toBe(false);
  });

  it("returns false for non-existent exercise", async () => {
    const result = await dbActions.updateExerciseStatus(
      "1",
      "ex999",
      "IN_PROGRESS",
    );
    expect(result).toBe(false);
  });

  it("returns false for non-existent user", async () => {
    const result = await dbActions.updateExerciseStatus(
      "999",
      "ex1",
      "IN_PROGRESS",
    );
    expect(result).toBe(false);
  });
});
