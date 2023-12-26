import { db } from "@/lib/db";
import { BoardItem } from "./_component/BoardItem";
import { CreateBoard } from "./_component/CreateBoardForm";

async function OrganizationIdPage() {
  const boards = await db.board.findMany();

  return (
    <div>
      <CreateBoard />
      <div>
        {boards.map((board) => (
          <BoardItem key={board.id} id={board.id} title={board.title} />
        ))}
      </div>
    </div>
  );
}

export default OrganizationIdPage;
