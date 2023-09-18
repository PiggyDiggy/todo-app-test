import { useCallback, useState, useMemo, useRef } from "react";

import { StatusBar } from "./components/StatusBar";
import { EmptyListPlaceholder } from "./components/EmptyListPlaceholder";
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
  1: { title: "Conquer Space", id: 1, completed: false },
  2: { title: "Apply for a job", id: 2, completed: false },
};

const filters = ["all", "completed", "active"] as const;

export type Filters = (typeof filters)[number];

function App() {
  const [todos, setTodos] = useState<TodoCollection>(fakeTodos);
  const [filter, setFilter] = useState<Filters>("all");
  const nextId = useRef(Object.keys(todos).length);

  const completeTodo = useCallback(
    (id: Todo["id"]) => {
      const todo = todos[id];
      if (todo.completed) return;
      setTodos({ ...todos, [id]: { ...todo, completed: true } });
    },
    [todos]
  );

  const createTodo = useCallback(
    (title: Todo["title"]) => {
      const id = nextId.current++
      const newTodo = { title, completed: false, id };
      setTodos({ ...todos, [id]: newTodo });
    },
    [todos]
  );

  const filterTodos = (filter: Filters) => {
    if (filter === "all") {
      return Object.values(todos);
    }
    return Object.values(todos).filter((todo) => (filter === "completed" ? todo.completed : !todo.completed));
  };

  const filteredTodos = useMemo(() => filterTodos(filter), [todos, filter]);

  const changeFilter = useCallback((filter: Filters) => {
    setFilter(filter);
  }, []);

  const removeCompleted = useCallback(() => {
    const newList = Object.values(todos).reduce((acc, todo) => {
      if (!todo.completed) {
        acc[todo.id] = todo;
      }
      return acc;
    }, {} as TodoCollection);
    setTodos(newList);
  }, [todos]);

  return (
    <main>
      <h1 className="main__title">Todos</h1>
      <div className="workspace">
        <StatusBar
          removeCompleted={removeCompleted}
          activeTodosCount={filterTodos("active").length}
          filters={filters}
          current={filter}
          changeFilter={changeFilter}
        />
        <Composer createTodo={createTodo} />
        <TodoList completeTodo={completeTodo} todos={filteredTodos} />
      </div>
      <EmptyListPlaceholder count={filteredTodos.length} filter={filter} />
    </main>
  );
}

export default App;
