import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import { BoardList } from "./_component/BoardList";
import { Info } from "./_component/Info";

async function OrganizationIdPage() {
  return (
    <div className="w-full mb-20">
      <Info />
      <Separator className="my-4" />
      <Suspense fallback={<BoardList.Skeleton />}>
        <BoardList />
      </Suspense>
    </div>
  );
}

export default OrganizationIdPage;
