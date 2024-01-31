"use client";

import { useRef, useState } from "react";
import { CardForm } from "./CardForm";
import ListHeader from "./ListHeader";

export const ListItem = ({ index, data }) => {
  const [isEditing, setIsEditing] = useState(false);
  const textAreaRef = useRef(null);

  const enableEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      textAreaRef.current?.focus();
    });
  };

  const disableEditing = () => {
    setIsEditing(false);
  };
  return (
    <li className="shrink-0 h-full w-[272px] select-none">
      <div className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2">
        <ListHeader data={data} onAddCard={enableEditing} />
        <CardForm
          enableEditing={enableEditing}
          isEditing={isEditing}
          ref={textAreaRef}
          listId={data.id}
          disableEditing={disableEditing}
        />
      </div>
    </li>
  );
};
