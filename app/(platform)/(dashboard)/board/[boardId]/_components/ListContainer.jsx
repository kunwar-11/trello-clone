"use client";
import { useEffect, useState } from "react";
import { ListForm } from "./ListForm";
import { ListItem } from "./ListItem";

export const ListContainer = ({ boardId, data }) => {
  const [orderedData, setOrderData] = useState(data);

  useEffect(() => {
    setOrderData(data);
  }, [data]);

  return (
    <ol className="flex gap-x-3 h-full">
      {orderedData.map((list, index) => (
        <ListItem key={list.id} index={index} data={list} />
      ))}
      <ListForm />
      <div className="flex-shrink-0 w-1" />
    </ol>
  );
};
