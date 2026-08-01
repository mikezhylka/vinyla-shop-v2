import * as z from "zod";

export const updatePasswordDefaultValues = {
  currentPassword: "",
  newPassword: "",
  repeatedNewPassword: "",
};

export type UpdatePasswordFormValues = z.infer<typeof updatePasswordSchema>;

export const updatePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "This place must not be empty"),
    newPassword: z.string().min(8, "Password must have at least 8 characters"),
    repeatedNewPassword: z
      .string()
      .min(8, "Password must have at least 8 characters"),
  })
  .refine((data) => data.newPassword === data.repeatedNewPassword, {
    message: "New passwords are not equal to each other",
    path: ["repeatedNewPassword"],
  });
