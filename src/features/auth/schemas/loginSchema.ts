import { z } from "zod";

export const loginSchema = z.object({
  email: z.email({ error: "Wprowadź poprawny adres e-mail" }),
  password: z.string().check(z.minLength(1, { error: "Hasło jest wymagane" })),
});

export type LoginInput = z.infer<typeof loginSchema>;
