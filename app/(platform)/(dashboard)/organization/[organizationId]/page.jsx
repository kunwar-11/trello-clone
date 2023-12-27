import { Separator } from "@/components/ui/separator";
import { BoardList } from "./_component/BoardList";
import { Info } from "./_component/Info";

async function OrganizationIdPage() {
  return (
    <div className="w-full mb-20">
      <Info />
      <Separator className="my-4" />
      <BoardList />
    </div>
  );
}

export default OrganizationIdPage;
