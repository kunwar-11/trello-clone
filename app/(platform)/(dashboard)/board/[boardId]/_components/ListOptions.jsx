"use client";

import { copyList } from "@/actions/copy-list";
import { deleteList } from "@/actions/delete-list";
import { FormButton } from "@/components/forms/form-button";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useAction } from "@/hooks/useAction";
import { MoreHorizontal, X } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";

export const ListOptions = ({ onAddCard, data }) => {
  const closeRef = useRef(null);

  const { execute: executeDelete } = useAction(deleteList, {
    onSuccess: (data) => {
      toast.success(`List  "${data.title}" deleted`);
      closeRef.current?.click();
    },
    onError: (error) => toast.error(error),
  });

  const { execute: executeCopy } = useAction(copyList, {
    onSuccess: (data) => {
      toast.success(`List  "${data.title}" Copied`);
      closeRef.current?.click();
    },
    onError: (error) => toast.error(error),
  });

  const onDelete = (formData) => {
    const id = formData?.get("id");
    const boardId = formData?.get("boardId");

    executeDelete({
      id,
      boardId,
    });
  };

  const onCopy = (formData) => {
    const id = formData?.get("id");
    const boardId = formData?.get("boardId");

    executeCopy({
      id,
      boardId,
    });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="h-auto w-auto p-2" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-0 pb-3 pt-3" side="bottom" align="start">
        <div className="text-sm font-md text-neutral-600 text-center pb-4">
          List Actions
        </div>
        <PopoverClose ref={closeRef} asChild>
          <Button
            className="w-auto h-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant="ghost"
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <Button
          onClick={onAddCard}
          className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          variant="ghost"
        >
          Add Card...
        </Button>
        <form action={onCopy}>
          <input type="hidden" name="id" value={data.id} />
          <input type="hidden" name="boardId" value={data.boardId} />
          <FormButton
            variant="ghost"
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          >
            Copy List...
          </FormButton>
        </form>
        <Separator />
        <form action={onDelete}>
          <input type="hidden" name="id" value={data.id} />
          <input type="hidden" name="boardId" value={data.boardId} />
          <FormButton
            variant="ghost"
            className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
          >
            Delete This List
          </FormButton>
        </form>
      </PopoverContent>
    </Popover>
  );
};
