import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";
import { BoardNav } from "./_components/BoardNav";

export async function generateMetadata({ params: { boardId } }) {
  const { orgId } = auth();

  if (!orgId) {
    return {
      title: "Board",
    };
  }

  const board = await db.board.findUnique({
    where: {
      id: boardId,
      orgId,
    },
  });

  return {
    title: board?.title || "Board",
  };
}

const BoardIdLayout = async ({ children, params: { boardId } }) => {
  const { orgId } = auth();

  if (!orgId) {
    redirect("/select-org");
  }

  const board = await db.board.findUnique({
    where: {
      id: boardId,
      orgId,
    },
  });

  if (!board) {
    notFound();
  }

  return (
    <div
      style={{ backgroundImage: `url(${board.imgFullUrl})` }}
      className="relative h-full bg-no-repeat bg-cover bg-center"
    >
      <BoardNav data={board} />
      <div className="absolute inset-0 bg-black/20" />
      <main className="relative pt-28 h-full">{children}</main>
    </div>
  );
};

export default BoardIdLayout;
