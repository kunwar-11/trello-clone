"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { CreateList } from "./schema";

async function handler(data) {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized !",
    };
  }

  const { title, boardId } = data;

  let list;

  try {
    const board = await db.board.findUnique({
      where: {
        id: boardId,
      },
    });

    if (!board) {
      return {
        error: "Board Not Found !",
      };
    }

    const lastList = await db.list.findFirst({
      where: {
        boardId,
      },
      orderBy: {
        order: "desc",
      },

      select: {
        order: true,
      },
    });

    const newOrder = lastList?.order ? lastList?.order + 1 : 1;
    list = await db.list.create({
      data: {
        title,
        boardId,
        order: newOrder,
      },
    });
  } catch (error) {
    console.error(error);
    return {
      error: "Failed to create !",
    };
  }

  revalidatePath(`/board/${boardId}`);

  return {
    data: list,
  };
}

export const createList = createSafeAction(CreateList, handler);
