import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import type { Todo } from "../../App";

import { TodoList } from ".";

const todos: Todo[] = [
  { title: "test1", completed: true, id: 0 },
  { title: "test2", completed: false, id: 1 },
];

describe("TodoList", () => {
  it("рендерит лист задач", () => {
    render(<TodoList completeTodo={jest.fn()} todos={todos} />);

    expect(screen.getByText("test1")).toBeInTheDocument();
    expect(screen.getByText("test2")).toBeInTheDocument();
  });
});
