import { z } from "zod";

export const registerSchema = z
  .object({
    first_name: z
      .string()
      .min(2, "First name must be at least 2 characters")
      .max(50),

    last_name: z
      .string()
      .min(2, "Last name must be at least 2 characters")
      .max(50),

    address: z.string().min(5, "Address must be at least 5 characters"),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),

    password: z.string().min(8, "Password must be at least 8 characters long"),

    confirm_password: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export type registerPayload = z.infer<typeof registerSchema>;
