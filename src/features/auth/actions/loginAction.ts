"use server";

import { z } from "zod";
import { dbActions } from "@/lib/db";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AuthActionState } from "../schemas/types";
import { loginSchema } from "../schemas/loginSchema";

export async function loginAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const rawData = Object.fromEntries(formData);
  const validated = loginSchema.safeParse(rawData);

  if (!validated.success) {
    return {
      success: false,
      errors: z.flattenError(validated.error).fieldErrors,
    };
  }

  const user = await dbActions.findUserByEmail(validated.data.email);

  if (!user || user.password !== validated.data.password) {
    return {
      success: false,
      errors: { form: "Nieprawidłowy e-mail lub hasło" },
    };
  }

  const cookieStore = await cookies();
  cookieStore.set("session_user", user.email, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24,
  });

  redirect("/dashboard");
}
