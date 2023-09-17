import React, { useState } from "react";

import { cx } from "../../utils";
import type { Todo } from "../../App";
import { AngleDown } from "../Icons/AngleDown";

import styles from "./styles.module.css";

type Props = {
  createTodo: (title: Todo["title"]) => void;
};

export const Composer: React.FC<Props> = ({ createTodo }) => {
  const [value, setValue] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const val = value.trim();
    if (!val) return;
    createTodo(val);
    setValue("");
  };

  return (
    <div>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={cx(styles.placeholder, { [styles["placeholder--hidden"]]: value })}>What needs to be done?</div>
        <button className={styles["submit-btn"]} type="submit" title="Submit">
          <AngleDown />
        </button>
        <input className={styles.input} type="text" value={value} onChange={(e) => setValue(e.target.value)} />
      </form>
    </div>
  );
};
