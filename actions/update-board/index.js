"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateBoard } from "./schema";

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

  const { id, title } = data;
  let board;

  try {
    board = await db.board.update({
      where: {
        id,
        orgId,
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

  revalidatePath(`/board/${id}`);
  return { data: board };
};

export const updateBoard = createSafeAction(UpdateBoard, handler);
