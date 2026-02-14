import { z } from "zod";

export const profileSchema = z.object({
  firstName: z.string().min(2, { message: "Imię musi mieć min. 2 znaki" }),
  lastName: z.string().min(2, { message: "Nazwisko musi mieć min. 2 znaki" }),

  password: z
    .string()
    .min(6, { message: "Hasło musi mieć min. 6 znaków" })
    .optional()
    .or(z.literal("")),
});

export type ProfileInput = z.infer<typeof profileSchema>;
