"use client";
import { useEffect, useState } from "react";
import { ListForm } from "./ListForm";
import { ListItem } from "./ListItem";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useAction } from "@/hooks/useAction";
import { updateListOrder } from "@/actions/update-list-order";
import { toast } from "sonner";
import { updateCardOrder } from "@/actions/update-card-order";

export const ListContainer = ({ boardId, data }) => {
  const [orderedData, setOrderData] = useState(data);

  useEffect(() => {
    setOrderData(data);
  }, [data]);

  const { execute: executeListOrder } = useAction(updateListOrder, {
    onSuccess: () => toast.success("List Reordered"),
    onError: (error) => toast.error(error),
  });

  const { execute: executeCardOrder } = useAction(updateCardOrder, {
    onSuccess: () => toast.success("Card Reordered"),
    onError: (error) => toast.error(error),
  });

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragEnd = (result) => {
    const { destination, source, type } = result;
    console.log(destination, source, type);

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    //User  Moves a List
    if (type === "list") {
      const reorderdList = reorder(
        orderedData,
        source.index,
        destination.index
      ).map((item, index) => ({ ...item, order: index }));
      setOrderData(reorderdList);
      //server actions for same
      executeListOrder({ items: reorderdList, boardId });
    }

    //User Moves a Card
    if (type === "card") {
      const newOrderedData = [...orderedData];
      const sourceList = newOrderedData.find(
        (each) => each.id === source.droppableId
      );
      const destinationList = newOrderedData.find(
        (each) => each.id === destination.droppableId
      );

      if (!sourceList || !destinationList) {
        return;
      }

      //Check if Card exists on source and destinationList

      if (!sourceList.cards) {
        sourceList.cards = [];
      }

      if (!destinationList.cards) {
        destinationList.cards = [];
      }

      //Moved Card in Same List
      if (source.droppableId === destination.droppableId) {
        const reorderedCard = reorder(
          sourceList.cards,
          source.index,
          destination.index
        );

        reorderedCard.forEach((card, index) => (card.order = index));

        sourceList.cards = reorderedCard;
        setOrderData(newOrderedData);
        //server actions for the same
        executeCardOrder({ boardId, items: reorderedCard });
      } else {
        //user moves card to different list

        //remove card from ource list
        const [movedCard] = sourceList.cards.splice(source.index, 1);

        //assign the new listId to the moved card
        movedCard.listId = destination.droppableId;

        //add card to the destination list
        destinationList.cards.splice(destination.index, 0, movedCard);

        //update the order of lists
        sourceList.cards.forEach((each, index) => {
          each.order = index;
        });

        destinationList.cards.forEach((each, index) => {
          each.order = index;
        });
        setOrderData(newOrderedData);
        //server actions for same
        executeCardOrder({ boardId, items: destinationList.cards });
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex gap-x-3 h-full"
          >
            {orderedData.map((list, index) => (
              <ListItem key={list.id} index={index} data={list} />
            ))}
            {provided.placeholder}
            <ListForm />
            <div className="flex-shrink-0 w-1" />
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  );
};
