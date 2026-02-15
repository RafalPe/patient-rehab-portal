"use server";

import { z } from "zod";
import { registerSchema } from "../schemas/registerSchema";
import { dbActions } from "@/lib/db";
import { AuthActionState } from "../schemas/types";
import { redirect } from "next/navigation";

export async function registerAction(
  prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const validated = registerSchema.safeParse(
    Object.fromEntries(formData.entries()),
  );

  if (!validated.success) {
    return {
      success: false,
      errors: z.flattenError(validated.error).fieldErrors,
    };
  }

  const { email, password, firstName, lastName } = validated.data;

  try {
    await dbActions.createUser({
      email,
      password,
      firstName,
      lastName,
    });
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        errors: {
          form: error.message,
        },
      };
    }
    return {
      success: false,
      errors: {
        form: "Wystąpił nieoczekiwany błąd podczas rejestracji.",
      },
    };
  }

  redirect("/login?registered=true");
}
