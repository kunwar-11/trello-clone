import { z } from "zod";

export const CreateCard = z.object({
  title: z.string({
    required_error: "Board name is Required",
    invalid_type_error: "Board name is Required",
  }),
  boardId: z.string(),
  listId: z.string(),
});
