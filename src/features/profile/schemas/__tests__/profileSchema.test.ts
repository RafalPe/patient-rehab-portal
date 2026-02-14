import { describe, it, expect } from "vitest";
import { profileSchema } from "@/features/profile/schemas/profileSchema";

describe("profileSchema", () => {
  it("accepts valid first name and last name", () => {
    const result = profileSchema.safeParse({
      firstName: "Jan",
      lastName: "Kowalski",
    });
    expect(result.success).toBe(true);
  });

  it("rejects first name shorter than 2 characters", () => {
    const result = profileSchema.safeParse({
      firstName: "J",
      lastName: "Kowalski",
    });
    expect(result.success).toBe(false);
  });

  it("rejects last name shorter than 2 characters", () => {
    const result = profileSchema.safeParse({
      firstName: "Jan",
      lastName: "K",
    });
    expect(result.success).toBe(false);
  });

  it("accepts empty password (optional field)", () => {
    const result = profileSchema.safeParse({
      firstName: "Jan",
      lastName: "Kowalski",
      password: "",
    });
    expect(result.success).toBe(true);
  });

  it("accepts valid password with currentPassword and matching confirmPassword", () => {
    const result = profileSchema.safeParse({
      firstName: "Jan",
      lastName: "Kowalski",
      currentPassword: "oldpass123",
      password: "newpass123",
      confirmPassword: "newpass123",
    });
    expect(result.success).toBe(true);
  });

  it("rejects password shorter than 6 characters", () => {
    const result = profileSchema.safeParse({
      firstName: "Jan",
      lastName: "Kowalski",
      currentPassword: "oldpass123",
      password: "abc",
      confirmPassword: "abc",
    });
    expect(result.success).toBe(false);
  });

  it("rejects new password when currentPassword is missing", () => {
    const result = profileSchema.safeParse({
      firstName: "Jan",
      lastName: "Kowalski",
      password: "newpass123",
      confirmPassword: "newpass123",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      expect(fieldErrors.currentPassword).toBeDefined();
    }
  });

  it("rejects new password when currentPassword is empty", () => {
    const result = profileSchema.safeParse({
      firstName: "Jan",
      lastName: "Kowalski",
      currentPassword: "",
      password: "newpass123",
      confirmPassword: "newpass123",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      expect(fieldErrors.currentPassword).toBeDefined();
    }
  });

  it("rejects when confirmPassword does not match password", () => {
    const result = profileSchema.safeParse({
      firstName: "Jan",
      lastName: "Kowalski",
      currentPassword: "oldpass123",
      password: "newpass123",
      confirmPassword: "different456",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      expect(fieldErrors.confirmPassword).toBeDefined();
    }
  });

  it("rejects when confirmPassword is missing but password is set", () => {
    const result = profileSchema.safeParse({
      firstName: "Jan",
      lastName: "Kowalski",
      currentPassword: "oldpass123",
      password: "newpass123",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      expect(fieldErrors.confirmPassword).toBeDefined();
    }
  });
});
