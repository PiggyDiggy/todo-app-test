import React from "react";
import { TransitionGroup } from "react-transition-group";

import type { Todo as TodoType } from "../../App";
import { Todo } from "../Todo";

import styles from "./styles.module.css";

type Props = {
  todos: TodoType[];
  completeTodo: (id: TodoType["id"]) => void;
};

export const TodoList: React.FC<Props> = ({ todos, completeTodo }) => {
  return (
    <TransitionGroup component="ul" className={styles["todo-list"]}>
      {todos.map((todo) => (
        <Todo onClick={completeTodo} todo={todo} key={todo.id} />
      ))}
    </TransitionGroup>
  );
};
