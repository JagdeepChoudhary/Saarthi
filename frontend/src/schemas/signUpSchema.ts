import { z } from "zod";

export const name = z
  .string()
  .min(3, "Name must be at least 3 characters")
  .max(20, "Name must be no more than 20 characters")
  .regex(/^[a-zA-Z]+$/, "Name must not contain special characters");

export const username = z
  .string()
  .min(2, "Username must be at least 2 characters")
  .max(20, "Username must be no more than 20 characters")
  .regex(
    /^[a-zA-Z0-9._]+$/,
    "Username must not contain special characters except . and _"
  );

export const role = z.enum([
  "student",
  "recruiter",
  "placement_cell",
  "mentor",
  "supervisor",
]);

export const signUpSchema = z.object({
  name: name,
  username: username,
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  role: role,
});
