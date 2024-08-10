import { z } from "zod";

export const loginValidationSchema = z.object({
  email: z.string().email(t("invalidEmail")),
  password: z.string().min(8, t("passwordMinLength")),
});

export const registerValidationSchema = z
  .object({
    name: z.string().min(1, t("fullNameRequired")),
    email: z.string().email(t("invalidEmail")),
    password: z.string().min(8, t("passwordMinLength")),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: t("passwordsMustMatch"),
    path: ["confirmPassword"],
  });
