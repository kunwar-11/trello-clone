import { BoardForm } from "./BoardForm";
import { BoardOptions } from "./BoardOptions";

export const BoardNav = async ({ data }) => {
  return (
    <nav className="w-full fixed bg-black/50 top-14 h-14 z-[40] flex items-center justify-between px-6 gap-x-4 text-white">
      <BoardForm data={data} />
      <BoardOptions id={data.id} />
    </nav>
  );
};
