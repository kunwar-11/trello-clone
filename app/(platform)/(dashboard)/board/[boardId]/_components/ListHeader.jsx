"use client";

import { updateList } from "@/actions/update-list";
import { FormInput } from "@/components/forms/form-input";
import { useAction } from "@/hooks/useAction";
import { list } from "postcss";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { ListOptions } from "./ListOptions";

export const ListHeader = ({ data, onAddCard }) => {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);
  const formRef = useRef(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef?.current.focus();
      inputRef?.current.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };

  const { execute } = useAction(updateList, {
    onSuccess: (data) => {
      toast.success(`Renamed To ${data.title}`);
      disableEditing();
    },
    onError: (error) => toast.error(error),
  });

  const handleSubmit = (formData) => {
    const title = formData?.get("title");
    const id = formData?.get("id");
    const boardId = formData?.get("boardId");

    if (title === data.title) {
      return disableEditing();
    }

    execute({
      title,
      id,
      boardId,
    });
  };

  const onBlur = () => {
    formRef?.current.requestSubmit();
  };

  return (
    <div className="pt-2 px-2 text-sm font-semibold flex justify-between items-start gap-x-2">
      {isEditing ? (
        <form ref={formRef} className="flex-1 px-[2px]" action={handleSubmit}>
          <input type="hidden" name="id" value={data.id} />
          <input type="hidden" name="boardId" value={data.boardId} />
          <FormInput
            id="title"
            onBlur={onBlur}
            placeholder="Enter List Title"
            ref={inputRef}
            defaultValue={data.title}
            className="w-full text-sm px-[7px] py-1 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white"
          />
        </form>
      ) : (
        <div
          className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent"
          onClick={enableEditing}
        >
          {data?.title}
        </div>
      )}
      <ListOptions onAddCard={onAddCard} data={data} />
    </div>
  );
};

export default ListHeader;
