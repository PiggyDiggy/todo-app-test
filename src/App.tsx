import { useCallback, useState } from "react";

import { Filter } from "./components/Filter";
import { Composer } from "./components/Composer";
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

const filters = ["all", "completed", "active"] as const;

export type Filters = (typeof filters)[number];

function App() {
  const [todos, setTodos] = useState<TodoCollection>(fakeTodos);
  const [filter, setFilter] = useState<Filters>("all");

  const completeTodo = useCallback(
    (id: Todo["id"]) => {
      const modifiedTodo = { ...todos[id], completed: true };
      setTodos({ ...todos, [id]: modifiedTodo });
    },
    [todos]
  );

  const createTodo = useCallback(
    (title: Todo["title"]) => {
      const id = Object.values(todos).length;
      const newTodo = { title, completed: false, id };
      setTodos({ ...todos, [id]: newTodo });
    },
    [todos]
  );

  const filterTodos = () => {
    if (filter === "all") {
      return Object.values(todos);
    }
    return Object.values(todos).filter((todo) => (filter === "completed" ? todo.completed : !todo.completed));
  };

  const changeFilter = useCallback((filter: Filters) => {
    setFilter(filter);
  }, []);

  return (
    <main>
      <Filter changeFilter={changeFilter} filters={filters} />
      <Composer createTodo={createTodo} />
      <TodoList completeTodo={completeTodo} todos={filterTodos()} />
    </main>
  );
}

export default App;
