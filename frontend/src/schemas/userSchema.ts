import { z } from "zod";
import { name, username } from "./signUpSchema";
export const userSchemaZod = z.object({
  name: name,
  username: username,
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
