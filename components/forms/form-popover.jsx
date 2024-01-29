"use client";

import { createBoard } from "@/actions/create-board";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAction } from "@/hooks/useAction";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { FormButton } from "./form-button";
import { FormInput } from "./form-input";
import { FormPicker } from "./forms-picker";

export const FormPopup = ({
  children,
  side = "bottom",
  align,
  sideOffset = 0,
}) => {
  const closeRef = useRef(null);
  const router = useRouter();

  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      toast.success("Board Created");
      closeRef.current?.click();
      router.push(`/board/${data.id}`);
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (formData) => {
    const title = formData.get("title");
    const image = formData.get("image");
    execute({
      title,
      image,
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        side={side}
        sideOffset={sideOffset}
        className="w-80 pt-3"
      >
        <div className="text-sm font-medium text-center text-neutral-600 pb-4">
          Create Board
        </div>
        <PopoverClose asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
            variant="ghost"
            ref={closeRef}
          >
            <X className="h-4 w-4" />
          </Button>
        </PopoverClose>
        <form className="space-y-4" action={onSubmit}>
          <div className="space-y-4">
            <FormPicker id="image" errors={fieldErrors} />
            <FormInput
              id="title"
              label="Board Title"
              type="text"
              error={fieldErrors}
            />
          </div>
          <FormButton className="w-full">Create</FormButton>
        </form>
      </PopoverContent>
    </Popover>
  );
};
