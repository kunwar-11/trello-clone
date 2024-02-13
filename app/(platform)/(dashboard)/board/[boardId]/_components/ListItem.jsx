"use client";

import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import { CardForm } from "./CardForm";
import { CardItem } from "./CardItem";
import ListHeader from "./ListHeader";
import { Draggable, Droppable } from "@hello-pangea/dnd";

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
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="shrink-0 h-full w-[272px] select-none"
        >
          <div
            {...provided.dragHandleProps}
            className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2"
          >
            <ListHeader data={data} onAddCard={enableEditing} />
            <Droppable droppableId={data.id} type="card">
              {(provided) => (
                <ol
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={cn(
                    "mx-1 px-1 py-0.5 flex flex-col gap-y-2",
                    data?.cards.length > 0 ? "mt-2" : "mt - 0"
                  )}
                >
                  {data?.cards.map((card, index) => (
                    <CardItem key={card.id} index={index} data={card} />
                  ))}
                  {provided.placeholder}
                </ol>
              )}
            </Droppable>
            <CardForm
              enableEditing={enableEditing}
              isEditing={isEditing}
              ref={textAreaRef}
              listId={data.id}
              disableEditing={disableEditing}
            />
          </div>
        </li>
      )}
    </Draggable>
  );
};
