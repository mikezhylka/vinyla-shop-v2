import { z } from "zod";

const specialSymbol = /[^a-zA-Z0-9]/;
const uppercaseLetters = /[A-Z]/;

export const CreateUserSchema = z.object({
  email: z.email("Please, type correct email (f.e., user@mail.com)"),
  password: z
    .string()
    .min(8, "Password must have at least 8 characters")
    .regex(
      uppercaseLetters,
      "Password must contain at least one uppercase letter",
    )
    .regex(
      specialSymbol,
      "Password must contain at least one special character",
    ),
  name: z.string().min(1, "Name is required"),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
export type LoginDto = z.infer<typeof LoginSchema>;
