import z from "zod";

export const signInSchema = z.object({
  name: z.string().min(3, "Name musut be at least 3 characters long"),
  email: z.email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const signUpSchema = z.object({
  email: z.email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const authSchema = z.union([signInSchema, signUpSchema]);

export type SignUp = z.infer<typeof signUpSchema>;
export type SignIn = z.infer<typeof signInSchema>;
