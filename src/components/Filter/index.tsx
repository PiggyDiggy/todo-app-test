import React from "react";

import { cx } from "../../utils";
import type { Filters } from "../../App";
import styles from "./style.module.css";

type Props = {
  filters: readonly Filters[];
  current: Filters;
  changeFilter: (filter: Filters) => void;
};

export const Filter: React.FC<Props> = ({ current, filters, changeFilter }) => {
  return (
    <div>
      <ul className={styles.filters}>
        {filters.map((filter, i) => (
          <li key={i} className={cx({ [styles["filter--active"]]: current === filter })}>
            <button className={styles.filter__button} onClick={() => changeFilter(filter)}>
              {filter}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
