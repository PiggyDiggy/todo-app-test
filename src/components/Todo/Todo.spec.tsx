import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import type { Todo as TodoType } from "../../App";

import { Todo } from ".";

const todo: TodoType = { title: "test1", completed: false, id: 0 };

describe("Todo", () => {
  it("при клике вызывается функция-проп", async () => {
    const completeTodo = jest.fn();
    render(<Todo onClick={completeTodo} todo={todo} />);

    await userEvent.click(screen.getByText("test1"));

    expect(completeTodo).toBeCalled();
  });
});
