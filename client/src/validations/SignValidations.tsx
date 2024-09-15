import * as z from "zod";

export const SignValidation = z.object({
  username: z.string().min(5).max(20),
  password: z.string().min(6),
  hobies: z.array(z.string()),
});
