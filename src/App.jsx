import { useState } from "react";
import "./App.css";

function Header() {
  return (
    <header>
      <h1>Task Manager</h1>
      <p>Add, complete, and delete your tasks.</p>
    </header>
  );
}

function TaskForm({ addTask }) {
  const [taskText, setTaskText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (taskText.trim() === "") return;

    addTask(taskText);
    setTaskText("");
  }

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Enter a task..."
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
}

function TaskItem({ task, toggleComplete, deleteTask }) {
  return (
    <li className={task.completed ? "task completed" : "task"}>
      <span onClick={() => toggleComplete(task.id)}>{task.text}</span>

      <div>
        <button onClick={() => toggleComplete(task.id)}>
          {task.completed ? "Undo" : "Complete"}
        </button>

        <button className="delete-btn" onClick={() => deleteTask(task.id)}>
          Delete
        </button>
      </div>
    </li>
  );
}

function TaskList({ tasks, toggleComplete, deleteTask }) {
  if (tasks.length === 0) {
    return <p className="empty-message">No tasks yet. Add one above!</p>;
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          toggleComplete={toggleComplete}
          deleteTask={deleteTask}
        />
      ))}
    </ul>
  );
}

function App() {
  const [tasks, setTasks] = useState([]);

  function addTask(text) {
    const newTask = {
      id: Date.now(),
      text: text,
      completed: false,
    };

    setTasks([...tasks, newTask]);
  }

  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function toggleComplete(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  const completedTasks = tasks.filter((task) => task.completed).length;

  return (
    <div className="app">
      <Header />

      <TaskForm addTask={addTask} />

      <div className="counter">
        <p>Total Tasks: {tasks.length}</p>
        <p>Completed Tasks: {completedTasks}</p>
      </div>

      <TaskList
        tasks={tasks}
        toggleComplete={toggleComplete}
        deleteTask={deleteTask}
      />
    </div>
  );
}

export default App;