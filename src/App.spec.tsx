import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

import App from "./App";

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
});

const user = userEvent.setup({ delay: null });

describe("App", () => {
  it("рендерит вновь добавленную задачу", async () => {
    render(<App />);

    await user.type(screen.getByRole("textbox"), "newTodo{enter}");
    act(() => {
      jest.runAllTimers();
    });

    expect(screen.getByText("newTodo")).toBeInTheDocument();
  });
  it("фильтрует задачи по статусу", async () => {
    render(<App />);

    await user.click(screen.getByRole("button", { name: "completed" }));
    act(() => {
      jest.runAllTimers();
    });

    expect(screen.getAllByTestId("todo")).toHaveLength(1);
  });
  it("удаляет выполненные задачи по клику на кнопку", async () => {
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Clear completed" }));
    act(() => {
      jest.runAllTimers();
    });

    expect(screen.getAllByTestId("todo")).toHaveLength(2);
  });
  it("показывает сообщение об отсутствии задач", async () => {
    render(<App />);

    await user.click(screen.getByRole("button", { name: "completed" }));
    await user.click(screen.getByRole("button", { name: "Clear completed" }));
    act(() => {
      jest.runAllTimers();
    });

    expect(screen.getByText("You have no completed todos left")).toBeInTheDocument();
  });
});
