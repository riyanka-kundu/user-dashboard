import z from "zod";

export const ForgotPasswordSchema = z.object({
  email: z.email("Please enter a valid email address"),
});

export type TForgotPassword = z.infer<typeof ForgotPasswordSchema>;
