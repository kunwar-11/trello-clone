"use client";

import { updateBoard } from "@/actions/update-board";
import { FormInput } from "@/components/forms/form-input";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/useAction";
import { useRef, useState } from "react";
import { toast } from "sonner";

export const BoardForm = ({ data }) => {
  const { execute } = useAction(updateBoard, {
    onSuccess: (data) => {
      toast.success(`Board ${data.title} Updated!`);
      disbaleEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const [isEditing, setIsEditing] = useState(false);
  const formRef = useRef(null);
  const inputRef = useRef(null);

  const disbaleEditing = () => setIsEditing(false);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const onSubmit = (formData) => {
    const title = formData.get("title");
    execute({ title, id: data.id });
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  if (isEditing) {
    return (
      <form
        action={onSubmit}
        className="flex items-center gap-x-2"
        ref={formRef}
      >
        <FormInput
          id="title"
          defaultValue={data.title}
          ref={inputRef}
          onBlur={onBlur}
          className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
        />
      </form>
    );
  }
  return (
    <Button
      onClick={enableEditing}
      variant="transparent"
      className="font-bold text-lg h-auto w-auto p-1 px-2"
    >
      {data.title}
    </Button>
  );
};
