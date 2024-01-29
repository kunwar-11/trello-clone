import { FormPopup } from "@/components/forms/form-popover";
import { Skeleton } from "@/components/ui/skeleton";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { HelpCircle, Plus, User2 } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Hint } from "./Hint";

export const BoardList = async () => {
  const { orgId } = auth();

  if (!orgId) {
    redirect("/select-org");
  }

  const boards = await db.board.findMany({
    where: {
      orgId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-2">
      <div className="flex items-center text-lg font-semibold text-neutral-700 mb-4">
        <User2 className="h-6 w-6 mr-2" />
        Your Boards
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:gird-cols-4 gap-4">
        {boards.map((board) => (
          <Link
            href={`/board/${board.id}`}
            key={board.id}
            className="relative group aspect-video bg-no-repeat bg-center bg-cover h-full w-full p-2 overflow-hidden rounded-sm"
            style={{ backgroundImage: `url(${board.imgThumbUrl})` }}
          >
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition" />
            <p className="relative font-semibold text-white">{board.title}</p>
          </Link>
        ))}
        <FormPopup side="right" sideOffset={10}>
          <div
            role="button"
            className="aspect-video relative h-full w-full bg-muted rouned-sm  flex flex-col gap-y-2 items-center justify-center hover:opacity-75 transition"
          >
            <p className="text-sm flex items-center">
              Create New Board <Plus className="w-5 h-5 ml-2" />
            </p>
            <span className="text-xs">5 remaining</span>
            <Hint
              sideOffset={40}
              description={`
            Free Workspaces can have upto 5 open boards. For Unlimited Boards upgrade the workspace.
          `}
            >
              <HelpCircle className="absolute bottom-2 right-2 h-[14px] w-[14px]" />
            </Hint>
          </div>
        </FormPopup>
      </div>
    </div>
  );
};

BoardList.Skeleton = function BoardListSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:gird-cols-4 gap-4">
      <Skeleton className="aspect-video h-full w-full p-2"></Skeleton>
      <Skeleton className="aspect-video h-full w-full p-2"></Skeleton>
      <Skeleton className="aspect-video h-full w-full p-2"></Skeleton>
      <Skeleton className="aspect-video h-full w-full p-2"></Skeleton>
      <Skeleton className="aspect-video h-full w-full p-2"></Skeleton>
    </div>
  );
};
