import { User, Exercise, ISODateString } from "@/types/models";

interface InMemoryDb {
  users: User[];
  exercises: Record<string, Exercise[]>;
}

const initialData: InMemoryDb = {
  users: [
    {
      id: "1",
      firstName: "Jan",
      lastName: "Kowalski",
      email: "pacjent@test.pl",
      password: "password123", // In production: use bcrypt to hash
    },
  ],
  exercises: {
    "pacjent@test.pl": [
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
  },
};

const globalForDb = global as unknown as { db: InMemoryDb };
export const db = globalForDb.db || initialData;
if (process.env.NODE_ENV !== "production") globalForDb.db = db;

// Async signatures are intentional — prepared for future DB/API replacement
export const dbActions = {
  findUserByEmail: async (email: string): Promise<User | undefined> => {
    return db.users.find((u) => u.email === email);
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

  getExercisesForUser: async (email: string): Promise<Exercise[]> => {
    return db.exercises[email] || [];
  },

  updateExerciseStatus: async (
    email: string,
    exerciseId: string,
    status: Exercise["status"],
    timestamps?: { startedAt?: ISODateString; completedAt?: ISODateString },
  ): Promise<boolean> => {
    const userExs = db.exercises[email];
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
};
