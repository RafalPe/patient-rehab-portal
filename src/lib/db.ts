import { User, Exercise, ISODateString } from "@/types/models";
import { v4 as uuidv4 } from "uuid";

interface InMemoryDb {
  users: User[];
  exercises: Record<string, Exercise[]>;
}

const initialData: InMemoryDb = Object.freeze({
  users: [
    {
      id: "1",
      firstName: "Jan",
      lastName: "Kowalski",
      email: "pacjent@test.pl",
      password: "password123", // In production: use bcrypt to hash
    },
    {
      id: "2",
      firstName: "Anna",
      lastName: "Nowak",
      email: "anna.nowak@test.pl",
      password: "password123",
    },
    {
      id: "3",
      firstName: "E2E",
      lastName: "Tester",
      email: "e2e@test.pl",
      password: "password123",
    },
  ],
  exercises: {
    "1": [
      {
        id: "ex1",
        deviceName: "Rotor kończyn górnych",
        params: "Czas: 15 min, Obciążenie: 5kg",
        status: "TODO" as const,
      },
      {
        id: "ex2",
        deviceName: "Bieżnia rehabilitacyjna",
        params: "Czas: 10 min, Prędkość: 4km/h",
        status: "TODO" as const,
      },
    ],
    "2": [
      {
        id: "ex3",
        deviceName: "Rower stacjonarny",
        params: "Czas: 20 min, Opór: 3",
        status: "TODO" as const,
      },
      {
        id: "ex4",
        deviceName: "Steper",
        params: "Czas: 10 min, Poziom: 2",
        status: "TODO" as const,
      },
    ],
    "3": [
      {
        id: "ex_e2e",
        deviceName: "Testowa Bieżnia",
        params: "Czas: 5 min, Prędkość: 2km/h",
        status: "TODO" as const,
      },
    ],
  },
} as InMemoryDb);

const globalForDb = global as unknown as { db: InMemoryDb };
export const db = globalForDb.db || JSON.parse(JSON.stringify(initialData));

if (process.env.NODE_ENV !== "production") globalForDb.db = db;

// Async signatures are intentional — prepared for future DB/API replacement
export const dbActions = {
  // Test utility to reset DB state
  resetDb: () => {
    const fresh = JSON.parse(JSON.stringify(initialData));
    db.users = fresh.users;
    db.exercises = fresh.exercises;
  },

  findUserByEmail: async (email: string): Promise<User | undefined> => {
    return db.users.find((u) => u.email === email);
  },

  findUserById: async (id: string): Promise<User | undefined> => {
    return db.users.find((u) => u.id === id);
  },

  updateUser: async (
    email: string,
    data: Partial<Omit<User, "email" | "id">>,
  ): Promise<boolean> => {
    const userIndex = db.users.findIndex((u) => u.email === email);
    if (userIndex === -1) return false;

    db.users[userIndex] = { ...db.users[userIndex], ...data };
    return true;
  },

  getExercisesForUser: async (userId: string): Promise<Exercise[]> => {
    return db.exercises[userId] || [];
  },

  updateExerciseStatus: async (
    userId: string,
    exerciseId: string,
    status: Exercise["status"],
    timestamps?: { startedAt?: ISODateString; completedAt?: ISODateString },
  ): Promise<boolean> => {
    const userExs = db.exercises[userId];
    if (!userExs) return false;

    const exIndex = userExs.findIndex((e) => e.id === exerciseId);
    if (exIndex === -1) return false;

    const currentEx = userExs[exIndex];

    if (currentEx.status === "DONE" && status !== "DONE") return false;

    userExs[exIndex] = {
      ...currentEx,
      status,
      ...(timestamps?.startedAt !== undefined && {
        startedAt: timestamps.startedAt,
      }),
      ...(timestamps?.completedAt !== undefined && {
        completedAt: timestamps.completedAt,
      }),
    };

    return true;
  },

  createUser: async (user: Omit<User, "id">): Promise<User> => {
    const exists = db.users.some((u) => u.email === user.email);
    if (exists) {
      throw new Error("Użytkownik o podanym adresie email już istnieje.");
    }

    const newUser: User = {
      ...user,
      id: uuidv4(),
    };

    db.users.push(newUser);
    // Since there is no admin role to assign specific exercises to users,
    // every newly created user gets this default exercise.
    db.exercises[newUser.id] = [
      {
        id: "ex1",
        deviceName: "Rotor kończyn górnych",
        params: "Czas: 15 min, Obciążenie: 5kg",
        status: "TODO",
      },
    ];

    return newUser;
  },
};
