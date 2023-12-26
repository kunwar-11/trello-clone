import { deleteBoard } from "@/actions/delete-board";

const { Button } = require("@/components/ui/button");

export function BoardItem({ title, id }) {
  const deleteBoardItem = deleteBoard.bind(null, id);
  return (
    <form className="flex gap-x-2 items-center" action={deleteBoardItem}>
      <p>Board Title : {title}</p>
      <Button size="sm" variant="destructive" type="submit">
        Delete
      </Button>
    </form>
  );
}
