"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import { CopyList } from "./schema";

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
    const listToCopy = await db.list.findUnique({
      where: {
        id,
        boardId,
        board: {
          orgId,
        },
      },
      include: {
        cards: true,
      },
    });

    if (!listToCopy) {
      return {
        error: "List Not Found",
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
        boardId: listToCopy?.boardId,
        title: `${listToCopy?.title} - copy`,
        order: newOrder,
        cards: {
          createMany: {
            data: listToCopy.cards.map((card) => ({
              title: card.title,
              description: card.description,
              order: card.order,
            })),
          },
        },
      },
      include: {
        cards: true,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Failed To Copy",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return {
    data: list,
  };
};

export const copyList = createSafeAction(CopyList, handler);
