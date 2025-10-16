import { z } from "zod";

export const postSchema = z.object({
  postedby: z.string(),
  images: z.array(z.string()),
  caption: z.string(),
  tags: z.array(z.string()),
  location: z.string(),
  isCommentAllowed: z.boolean(),
});
