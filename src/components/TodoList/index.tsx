import React from "react";

import type { Todo as TodoType } from "../../App";
import { Todo } from "../Todo";

type Props = {
  todos: TodoType[];
  completeTodo: (id: TodoType["id"]) => void;
};

export const TodoList: React.FC<Props> = ({ todos, completeTodo }) => {
  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <Todo onClick={completeTodo} todo={todo} key={todo.id} />
        ))}
      </ul>
    </div>
  );
};
