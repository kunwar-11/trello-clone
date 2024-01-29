"use server";

import { createSafeAction } from "@/lib/create-safe-action";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { BoardSchema } from "./schema";

async function handler(data) {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthorized !",
    };
  }

  const { title, image } = data;
  const [imgid, imgThumbUrl, imgFullUrl, imgLinkHtml, imgUserName] =
    image.split("|");

  if (!imgid || !imgThumbUrl || !imgFullUrl || !imgLinkHtml || !imgUserName) {
    return {
      error: "Missing Fields ! Failed To Create Board",
    };
  }
  let board;

  try {
    board = await db.board.create({
      data: {
        title,
        orgId,
        imgid,
        imgThumbUrl,
        imgFullUrl,
        imgLinkHtml,
        imgUserName,
      },
    });
  } catch (error) {
    console.error(error);
    return {
      error: "Failed to create !",
    };
  }

  revalidatePath(`/board/${board.id}`);

  return {
    data: board,
  };
}

export const createBoard = createSafeAction(BoardSchema, handler);
