import { useState, useEffect } from "react";
import "./ToDoApp.css";

function ToDoApp() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAdd = (e) => {
    e.preventDefault();

    if (inputValue.trim() === "") return;
    const newTask = {
      id: Date.now(),
      taskValue: inputValue,
      completed: false,
    };

    setTasks((prev) => [...prev, newTask]);
    setInputValue("");
  };

  function toggleTask(taskToToggle) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskToToggle
          ? { ...task, completed: !task.completed }
          : task,
      ),
    );
  }

  const deleteTask = (idToDelete) => {
    setTasks((prev) => prev.filter((items) => items.id !== idToDelete));
  };
  return (
    <>
      <h1>To Do List</h1>
      <div className="container">
        <form onSubmit={handleAdd}>
          <input
            className="input-container"
            placeholder="Anything to do today?"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" className="add-btn">
            Add Task
          </button>
        </form>
        <ul className="task-container">
          {tasks.map((item) => (
            <li key={item.id} className={item.completed ? "completed" : ""}>
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleTask(item.id)}
              />
              {item.taskValue}{" "}
              <button
                className="delete-btn"
                onClick={() => deleteTask(item.id)}
              >
                Delete Task
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default ToDoApp;
