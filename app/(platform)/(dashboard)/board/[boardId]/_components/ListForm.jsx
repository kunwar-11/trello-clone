"use client";

import { FormInput } from "@/components/forms/form-input";
import { FormButton } from "@/components/forms/form-button";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useEventListener, useOnClickOutside } from "usehooks-ts";
import { ListWrapper } from "./ListWrapper";
import { useAction } from "@/hooks/useAction";
import { createList } from "@/actions/create-list";
import { toast } from "sonner";

export const ListForm = () => {
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef(null);
  const inputRef = useRef(null);
  const params = useParams();
  const router = useRouter();

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const { execute, fieldErrors } = useAction(createList, {
    onSuccess: (data) => {
      toast.success(`List ${data.title} Created`);
      disableEditing();
      router.refresh();
    },
    onError: (error) => {
      toast.error("Failed To Create List!");
    },
  });

  const onKeyDown = (e) => {
    if (e.key === "Escape") {
      disableEditing();
    }
  };

  const onSubmit = (formData) => {
    const title = formData?.get("title");
    const boardId = formData?.get("boardId");
    execute({
      title,
      boardId,
    });
  };

  useEventListener("keydown", onKeyDown);
  useOnClickOutside(formRef, disableEditing);

  if (isEditing) {
    return (
      <ListWrapper>
        <form
          action={onSubmit}
          ref={formRef}
          className="w-full p-3 rounded-md bg-white space-y-4 shadow-md "
        >
          <FormInput
            ref={inputRef}
            className="text-sm py-1 px-2 h-7 font-medium border-transparent hover:border-input transition"
            id="title"
            placeholder="Enter List Title..."
            error={fieldErrors}
          />
          <input type="hidden" name="boardId" value={params.boardId} />
          <div className="flex items-center gap-x-1">
            <FormButton>Add List</FormButton>
            <Button variant="ghost" size="sm" onClick={disableEditing}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </form>
      </ListWrapper>
    );
  }

  return (
    <ListWrapper>
      <button
        onClick={enableEditing}
        className="w-full p-3 rounded-md space-y-4 shadow-md bg-white/70 hover:bg-white/50 flex items-center font-medium text-sm transition"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add To List
      </button>
    </ListWrapper>
  );
};
