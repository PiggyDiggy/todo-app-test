import React from "react";

import { cx } from "../../utils";
import type { Todo as TodoType } from "../../App";
import { CheckMark } from "../Icons/CheckMark";

import styles from "./styles.module.css";

type Props = { todo: TodoType; onClick: (id: TodoType["id"]) => void };

export const Todo: React.FC<Props> = ({ todo, onClick }) => {
  const { title, id, completed } = todo;
  return (
    <li className={cx(styles.todo, { [styles["todo--completed"]]: completed })} onClick={() => onClick(id)}>
      <div className={styles["todo__completed-circle"]}>
        <div className={styles["todo__completed-icon"]}>
          <CheckMark />
        </div>
      </div>
      <div>{title}</div>
    </li>
  );
};
