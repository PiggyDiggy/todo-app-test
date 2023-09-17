import React from "react";

import { Filters } from "../../App";
import styles from "./styles.module.css";

type Props = {
  filter: Filters;
  count: number;
};

export const EmptyListPlaceholder: React.FC<Props> = ({ count, filter }) => {
  return (
    <>
      {count === 0 && (
        <div className={styles.placeholder}>{`You have no${filter === "all" ? "" : " " + filter} todos left`}</div>
      )}
    </>
  );
};
