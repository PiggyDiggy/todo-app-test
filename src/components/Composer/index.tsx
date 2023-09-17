import React, { useState } from "react";

import type { Todo } from "../../App";

type Props = {
  createTodo: (title: Todo["title"]) => void;
};

export const Composer: React.FC<Props> = ({ createTodo }) => {
  const [value, setValue] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createTodo(value);
    setValue("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};
