import { z } from "zod";

export const registerSchema = z
  .object({
    firstName: z.string().min(2, { message: "Imię musi mieć min. 2 znaki" }),
    lastName: z.string().min(2, { message: "Nazwisko musi mieć min. 2 znaki" }),
    email: z.email({ error: "Wprowadź poprawny adres e-mail" }),
    password: z.string().min(6, { message: "Hasło musi mieć min. 6 znaków" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Hasła nie są zgodne",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof registerSchema>;
