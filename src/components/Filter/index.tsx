import React from "react";
import type { Filters } from "../../App";

type Props = {
  filters: readonly ("all" | "completed" | "active")[];
  changeFilter: (filter: Filters) => void;
};

export const Filter: React.FC<Props> = ({ filters, changeFilter }) => {
  return (
    <div>
      <ul>
        {filters.map((filter) => (
          <li>
            <button onClick={() => changeFilter(filter)}>{filter}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
