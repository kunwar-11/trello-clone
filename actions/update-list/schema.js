import { z } from "zod";

export const UpdateList = z.object({
  title: z
    .string({
      required_error: "Title is Required",
      invalid_type_error: "Title is Invalid",
    })
    .min(3, "Title is too short"),

  id: z.string(),
  boardId: z.string(),
});
