"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { UpdateCardOrder } from "./schema";

async function handler(data) {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized !",
    };
  }

  const { items, boardId } = data;

  let updatedCards;

  try {
    const transaction = items.map((card) =>
      db.card.update({
        where: {
          id: card.id,
          list: {
            board: {
              orgId,
            },
          },
        },

        data: {
          order: card.order,
          listId: card.listId,
        },
      })
    );

    updatedCards = await db.$transaction(transaction);
  } catch (error) {
    console.error(error);
    return {
      error: "Failed to Re Order !",
    };
  }

  revalidatePath(`/board/${boardId}`);

  return {
    data: updatedCards,
  };
}

export const updateCardOrder = createSafeAction(UpdateCardOrder, handler);
