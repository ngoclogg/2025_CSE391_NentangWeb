import {
  createContext,
  useReducer,
  useContext,
  useMemo,
  useCallback,
  useState,
} from "react";

const TodoContext = createContext();

function todoReducer(state, action) {
  switch (action.type) {
    case "add":
      return [...state, { id: Date.now(), text: action.payload, done: false }];
    case "toggle":
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, done: !todo.done } : todo
      );
    case "remove":
      return state.filter((todo) => todo.id !== action.payload);
    default:
      return state;
  }
}

export default function Demo3_AdvancedHooks() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const [text, setText] = useState("");

  const contextValue = { todos, dispatch };

  const completedCount = useMemo(
    () => todos.filter((t) => t.done).length,
    [todos]
  );

  const handleAdd = useCallback(() => {
    if (text.trim() !== "") {
      dispatch({ type: "add", payload: text });
      setText("");
    }
  }, [text]);

  return (
    <TodoContext.Provider value={contextValue}>
      <div className="card p-4 mb-4 shadow-sm">
        <h5 className="card-title">Demo 3: useReducer, useMemo, useContext</h5>

        <div className="todo-input-group">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Thêm công việc..."
            className="todo-input"
          />
          <button onClick={handleAdd} className="todo-add-btn">
            Thêm
          </button>
        </div>

        <TodoList />

        <p className="mt-3">
          <span className="badge-progress">
            ✅ {completedCount} / {todos.length} việc đã hoàn thành
          </span>
        </p>
      </div>
    </TodoContext.Provider>
  );
}

function TodoList() {
  const { todos } = useContext(TodoContext);
  return (
    <ul className="list-group">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

function TodoItem({ todo }) {
  const { dispatch } = useContext(TodoContext);
  return (
    <li className="todo-item list-group-item d-flex justify-content-between align-items-center">
      <div>
        <input
          type="checkbox"
          className="form-check-input me-2"
          checked={todo.done}
          onChange={() => dispatch({ type: "toggle", payload: todo.id })}
        />
        <span style={{ textDecoration: todo.done ? "line-through" : "none" }}>
          {todo.text}
        </span>
      </div>
      <button
        className="todo-remove-btn btn btn-sm"
        onClick={() => dispatch({ type: "remove", payload: todo.id })}
      >
        X
      </button>
    </li>
  );
}
