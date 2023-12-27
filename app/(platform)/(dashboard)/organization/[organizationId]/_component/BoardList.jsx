import { FormPopup } from "@/components/forms/form-popover";
import { HelpCircle, Plus, User2 } from "lucide-react";
import { Hint } from "./Hint";

export const BoardList = () => {
  return (
    <div className="space-y-2">
      <div className="flex items-center text-lg font-semibold text-neutral-700 mb-4">
        <User2 className="h-6 w-6 mr-2" />
        Your Boards
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:gird-cols-4 gap-4">
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
