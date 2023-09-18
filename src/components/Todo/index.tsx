import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";

import { cx } from "../../utils";
import type { Todo as TodoType } from "../../App";
import { CheckMark } from "../Icons/CheckMark";

import styles from "./styles.module.css";

type Props = { todo: TodoType; onClick: (id: TodoType["id"]) => void };

export const Todo: React.FC<Props> = ({ todo, onClick, ...props }) => {
  const { title, id, completed } = todo;
  const ref = useRef<HTMLLIElement>(null);
  const height = useRef<number | null>(null);

  const shrink = () => {
    if (!ref.current) return;

    height.current ??= ref.current.offsetHeight;

    ref.current.style.paddingBlock = "0";
    ref.current.style.height = "0";
    ref.current.style.borderWidth = "0";
  };

  const grow = () => {
    if (!ref.current) return;

    ref.current.style.height = `${height.current || ref.current.offsetHeight}px`;
    ref.current.style.paddingBlock = "0.75rem";
    ref.current.style.borderWidth = "initial";
  };

  return (
    <CSSTransition
      {...props}
      onEnter={shrink}
      onEntering={grow}
      onExit={grow}
      onExiting={shrink}
      classNames={{ enterActive: styles["todo-transition"], exitActive: styles["todo-transition"] }}
      timeout={300}
      nodeRef={ref}
    >
      <CSSTransition
        in={completed}
        nodeRef={ref}
        timeout={200}
        classNames={{
          enter: styles["completed-enter"],
          enterActive: styles["completed-enter-active"],
        }}
      >
        <li
          data-testid="todo"
          onClick={() => onClick(id)}
          ref={ref}
          className={cx(styles.todo, { [styles["todo--completed"]]: completed })}
        >
          <div className={styles["todo__completed-circle"]}>
            <div className={styles["todo__completed-icon"]}>
              <CheckMark />
            </div>
          </div>
          <div className={styles.todo__title}>
            <div
              className={cx(styles["line-through"], { [styles["line-through--hidden"]]: height.current! > 50 })}
            ></div>
            {title}
          </div>
        </li>
      </CSSTransition>
    </CSSTransition>
  );
};
