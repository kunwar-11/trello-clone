"use client";

import { Button } from "@/components/ui/button";
import { createBoard } from "@/actions/create-board";
import { useAction } from "@/hooks/useAction";

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
        <input
          type="text"
          id="title"
          name="title"
          required
          placeholder="enter board title"
          className="border border-black p-1"
        />
        {fieldErrors?.title ? (
          <>
            {fieldErrors?.title.map((error) => (
              <small key={error} className="text-rose-600">
                {error}
              </small>
            ))}
          </>
        ) : null}
      </div>

      <Button type="submit" size="sm">
        Submit
      </Button>
    </form>
  );
}
