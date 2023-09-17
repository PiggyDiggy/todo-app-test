import React, { useRef, useEffect } from "react";
import { CSSTransition } from "react-transition-group";

import { Filters } from "../../App";
import styles from "./styles.module.css";

type Props = {
  filter: Filters;
  count: number;
};

export const EmptyListPlaceholder: React.FC<Props> = ({ count, filter }) => {
  const text = `You have no${filter === "all" ? "" : " " + filter} todos left`;
  const previousText = usePrevious(text);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <CSSTransition
      timeout={300}
      in={count === 0}
      unmountOnExit
      mountOnEnter
      nodeRef={ref}
      classNames={{
        enter: styles["placeholder-enter"],
        enterActive: styles["placeholder-enter-active"],
        enterDone: styles["placeholder-enter-done"],
        exitActive: styles["placeholder-exit-active"],
      }}
    >
      {(state) => (
        <div ref={ref} className={styles.placeholder}>
          {state === "exiting" ? previousText : text}
        </div>
      )}
    </CSSTransition>
  );
};

const usePrevious = (value: any) => {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
