import React from "react";
import type { Todo as TodoType } from "../../App";

type Props = { todo: TodoType; onClick: (id: TodoType["id"]) => void };

export const Todo: React.FC<Props> = ({ todo, onClick }) => {
  const { title, id, completed } = todo;
  return (
    <div onClick={() => onClick(id)}>
      {title} - {String(completed)}
    </div>
  );
};
