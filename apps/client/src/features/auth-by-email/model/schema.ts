import * as z from "zod";

export type LoginFormValues = z.infer<typeof loginSchema>;

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please, type correct email (f.e., user@mail.com)"),
  password: z.string().min(6, "Password has too small characters"),
});
