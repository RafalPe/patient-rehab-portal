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

  const rawData = Object.fromEntries(formData.entries());
  const validated = registerSchema.safeParse(rawData);

  if (!validated.success) {
    return {
      success: false,
      errors: z.flattenError(validated.error).fieldErrors,
      payload: {
        firstName: rawData.firstName as string,
        lastName: rawData.lastName as string,
        email: rawData.email as string,
      },
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
        payload: {
          firstName,
          lastName,
          email,
        },
      };
    }
    return {
      success: false,
      errors: {
        form: "Wystąpił nieoczekiwany błąd podczas rejestracji.",
      },
      payload: {
        firstName,
        lastName,
        email,
      },
    };
  }

  redirect("/login?registered=true");
}
