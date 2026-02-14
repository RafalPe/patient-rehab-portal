"use server";

import { dbActions } from "@/lib/db";
import { getCurrentUser } from "@/lib/auth-utils";
import { profileSchema } from "../schemas/profileSchema";
import { revalidatePath } from "next/cache";

export type ProfileActionState = {
  success: boolean;
  message?: string;
  errors?: {
    firstName?: string[];
    lastName?: string[];
    password?: string[];
  };
};

export async function updateProfileAction(
  _prevState: ProfileActionState,
  formData: FormData,
): Promise<ProfileActionState> {
  const user = await getCurrentUser();
  if (!user) return { success: false, message: "Nieautoryzowany dostęp" };

  const rawData = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    password: formData.get("password"),
  };

  const validated = profileSchema.safeParse(rawData);

  if (!validated.success) {
    return {
      success: false,
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const updateData: { firstName: string; lastName: string; password?: string } =
    {
      firstName: validated.data.firstName,
      lastName: validated.data.lastName,
    };

  if (validated.data.password && validated.data.password.length > 0) {
    updateData.password = validated.data.password;
  }

  const success = await dbActions.updateUser(user.email, updateData);

  if (!success) {
    return { success: false, message: "Błąd podczas zapisu do bazy danych." };
  }

  revalidatePath("/dashboard");
  return { success: true, message: "Dane zostały zaktualizowane!" };
}
