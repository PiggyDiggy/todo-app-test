import { useCallback, useState } from "react";

import { TodoList } from "./components/TodoList";
import "./App.css";

export type Todo = {
  title: string;
  completed: boolean;
  id: number;
};

export type TodoCollection = Record<Todo["id"], Todo>;

const fakeTodos = {
  0: { title: "First Todo", id: 0, completed: true },
  1: { title: "Make input to create new todo", id: 1, completed: false },
  2: { title: "Create functionality to complete todo", id: 2, completed: false },
  3: { title: "Style everything up", id: 3, completed: false },
};

function App() {
  const [todos, setTodos] = useState<TodoCollection>(fakeTodos);

  const completeTodo = useCallback((id: Todo["id"]) => {
    const modifiedTodo = { ...todos[id], completed: true };
    setTodos((todos) => ({ ...todos, [id]: modifiedTodo }));
  }, []);

  return (
    <main>
      <TodoList completeTodo={completeTodo} todos={Object.values(todos)} />
    </main>
  );
}

export default App;
