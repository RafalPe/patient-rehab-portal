import { describe, it, expect, vi, beforeEach } from "vitest";
import { db } from "@/lib/db";
import { loginAction } from "../loginAction";

vi.mock("next/headers", () => ({
  cookies: vi.fn(() =>
    Promise.resolve({
      set: vi.fn(),
    }),
  ),
}));

const REDIRECT_ERROR = "NEXT_REDIRECT";
vi.mock("next/navigation", () => ({
  redirect: vi.fn((url: string) => {
    const err = new Error(REDIRECT_ERROR);
    (err as Error & { digest: string }).digest =
      `${REDIRECT_ERROR};push;${url};303;`;
    throw err;
  }),
}));

const initialState = { success: false };

function createFormData(data: Record<string, string>): FormData {
  const fd = new FormData();
  for (const [key, value] of Object.entries(data)) {
    fd.append(key, value);
  }
  return fd;
}

beforeEach(() => {
  db.users = [
    {
      id: "1",
      firstName: "Jan",
      lastName: "Kowalski",
      email: "pacjent@test.pl",
      password: "password123",
    },
  ];
});

describe("loginAction", () => {
  it("redirects to /dashboard on successful login", async () => {
    const formData = createFormData({
      email: "pacjent@test.pl",
      password: "password123",
    });

    await expect(loginAction(initialState, formData)).rejects.toThrow(
      REDIRECT_ERROR,
    );
  });

  it("returns error for wrong password", async () => {
    const formData = createFormData({
      email: "pacjent@test.pl",
      password: "wrongpassword",
    });

    const result = await loginAction(initialState, formData);

    expect(result.success).toBe(false);
    expect(result.errors?.form).toBe("Nieprawidłowy e-mail lub hasło");
  });

  it("returns error for non-existent email", async () => {
    const formData = createFormData({
      email: "nieistnieje@test.pl",
      password: "password123",
    });

    const result = await loginAction(initialState, formData);

    expect(result.success).toBe(false);
    expect(result.errors?.form).toBe("Nieprawidłowy e-mail lub hasło");
  });

  it("returns validation errors for empty email", async () => {
    const formData = createFormData({
      email: "",
      password: "password123",
    });

    const result = await loginAction(initialState, formData);

    expect(result.success).toBe(false);
    expect(result.errors?.email).toBeDefined();
  });

  it("returns validation errors for empty password", async () => {
    const formData = createFormData({
      email: "pacjent@test.pl",
      password: "",
    });

    const result = await loginAction(initialState, formData);

    expect(result.success).toBe(false);
    expect(result.errors?.password).toBeDefined();
  });
});
