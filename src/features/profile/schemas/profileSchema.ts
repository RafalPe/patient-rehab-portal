import { z } from "zod";

export const profileSchema = z
  .object({
    firstName: z.string().min(2, { message: "Imię musi mieć min. 2 znaki" }),
    lastName: z.string().min(2, { message: "Nazwisko musi mieć min. 2 znaki" }),

    currentPassword: z.string().optional().or(z.literal("")),

    password: z
      .string()
      .min(6, { message: "Hasło musi mieć min. 6 znaków" })
      .optional()
      .or(z.literal("")),

    confirmPassword: z.string().optional().or(z.literal("")),
  })
  .refine(
    (data) => {
      if (data.password && data.password.length > 0) {
        return !!data.currentPassword && data.currentPassword.length > 0;
      }
      return true;
    },
    {
      message: "Podaj aktualne hasło, aby ustawić nowe",
      path: ["currentPassword"],
    },
  )
  .refine(
    (data) => {
      if (data.password && data.password.length > 0) {
        return data.confirmPassword === data.password;
      }
      return true;
    },
    {
      message: "Hasła nie są zgodne",
      path: ["confirmPassword"],
    },
  );

export type ProfileInput = z.infer<typeof profileSchema>;
