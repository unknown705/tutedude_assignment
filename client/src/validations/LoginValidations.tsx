import z from "zod";

export const LoginValidation = z.object({
  username: z.string().min(5).max(20),
  password: z.string().min(6),
});
