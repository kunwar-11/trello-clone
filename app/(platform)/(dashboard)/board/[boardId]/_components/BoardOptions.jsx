"use client";

import { deleteBoard } from "@/actions/delete-board";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
} from "@/components/ui/popover";
import { useAction } from "@/hooks/useAction";
import { MoreHorizontal, X } from "lucide-react";
import { toast } from "sonner";

export const BoardOptions = ({ id }) => {
  const { execute, loading } = useAction(deleteBoard, {
    onError: (error) => {
      toast.error(error);
    },
  });

  const onDelete = () => execute({ id });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant="transparent">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 pt-3 pb-4" side="bottom" align="start">
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Board Actions
        </div>
        <PopoverClose>
          <Button
            className="h-auto w-auto absolute top-2 right-2 p-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button
          className="rounded-none w-full h-auto p-2 px-5 justify-start"
          variant="ghost"
          disabled={loading}
          onClick={onDelete}
        >
          Delete This Board
        </Button>
      </PopoverContent>
    </Popover>
  );
};
