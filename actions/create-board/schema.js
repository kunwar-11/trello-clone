import { z } from "zod";

export const BoardSchema = z.object({
  title: z
    .string({
      required_error: "Board name is Required",
      invalid_type_error: "Board name is Required",
    })
    .min(3, {
      message: "Title is too short",
    }),
});
