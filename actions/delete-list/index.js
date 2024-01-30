"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import { DeleteList } from "./schema";

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

  const { id, boardId } = data;
  let list;

  try {
    list = await db.list.delete({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed To Delete",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return {
    data: list,
  };
};

export const deleteList = createSafeAction(DeleteList, handler);
