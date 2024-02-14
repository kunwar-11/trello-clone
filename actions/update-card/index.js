"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateCard } from "./schema";

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

  const { id, boardId, ...values } = data;
  let card;

  try {
    card = await db.card.update({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      },
      data: {
        ...values,
      },
    });
  } catch (error) {
    return {
      error: "Failed To Update",
    };
  }

  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const updateCard = createSafeAction(UpdateCard, handler);
