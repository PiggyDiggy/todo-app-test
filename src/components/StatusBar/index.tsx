import React from "react";

import type { Filters } from "../../App";
import { Filter } from "../Filter";

import styles from "./styles.module.css";

type Props = {
  filters: readonly Filters[];
  current: Filters;
  changeFilter: (filter: Filters) => void;
  activeTodosCount: number;
  removeCompleted: () => void;
};

export const StatusBar: React.FC<Props> = ({ activeTodosCount, filters, current, changeFilter, removeCompleted }) => {
  return (
    <div className={styles["status-bar"]}>
      <div>
        {activeTodosCount} item{activeTodosCount === 1 ? "" : "s"} left
      </div>
      <Filter current={current} changeFilter={changeFilter} filters={filters} />
      <button className={styles.button} onClick={removeCompleted}>Clear completed</button>
    </div>
  );
};
