"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import { list } from "postcss";
import { UpdateList } from "./schema";

const { db } = require("@/lib/db");
const { auth } = require("@clerk/nextjs");
const { revalidatePath } = require("next/cache");

const handler = async (data) => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized !",
    };
  }

  const { id, title, boardId } = data;
  let list;

  try {
    list = await db.list.update({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
      data: {
        title,
      },
    });
  } catch (error) {
    return {
      error: "Failed To Update",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: list };
};

export const updateList = createSafeAction(UpdateList, handler);
