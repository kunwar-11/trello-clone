"use client";

import { Button } from "@/components/ui/button";
import { createBoard } from "@/actions/create-board";
import { useAction } from "@/hooks/useAction";
import { FormInput } from "@/components/forms/form-input";
import { FormButton } from "@/components/forms/form-button";

export function CreateBoard() {
  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });
  const onSubmit = (formData) => {
    const title = formData.get("title");
    execute({ title });
  };

  return (
    <form action={onSubmit} className="flex items-center gap-x-4">
      <div className="flex flex-col gap-y-2">
        <FormInput
          type="text"
          id="title"
          name="title"
          required
          placeholder="enter board title"
          error={fieldErrors}
          label="Board Title"
        />
      </div>

      <FormButton>Save</FormButton>
    </form>
  );
}
