import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../Redux/Slice";

function TaskInput({}) {
  const [details, setDetails] = useState({
    name: "",
    description: "",
    dueDate: "",
    priority: "Medium",
  });
  const [Error, setError] = useState({ name: "", dueDate: "" });

  const dispatch = useDispatch();

  const validateInputs = () => {
    let isValid = true;

    if (details.name.trim() === "") {
      setError((prevError) => ({
        ...prevError,
        name: "Task name is required",
      }));
      isValid = false;
    } else if (details.name.length > 50) {
      setError((prevError) => ({
        ...prevError,
        name: "Task name is too long (max 50 characters)",
      }));
      isValid = false;
    } else {
      setError((prevError) => ({ ...prevError, name: "" }));
    }

    if (details.dueDate.trim() === "") {
      setError((prevError) => ({
        ...prevError,
        dueDate: " Due Date is required",
      }));
      isValid = false;
    } else {
      setError((prevError) => ({ ...prevError, dueDate: "" }));
    }

    return isValid;
  };

  const handleAddTask = () => {
    if (validateInputs()) {
      dispatch(
        addTask({
          id: Date.now(),
          name: details.name,
          description: details.description,
          dueDate: details.dueDate,
          priority: details.priority,
        })
      );

      setDetails({
        name: "",
        description: "",
        dueDate: "",
        priority: "Medium",
      });
    }
  };

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  return (
    <div className="task-input-container">
      <div className="input-row">
        <label htmlFor="taskName">Task Name:</label>
        <input
          type="text"
          id="taskName"
          value={details.name}
          onChange={(e) => setDetails({ ...details, name: e.target.value })}
          className="task-input"
        />
        {Error.name && <div className="error-message">{Error.name}</div>}
      </div>
      <div className="input-row">
        <label htmlFor="taskDescription">Description:</label>
        <textarea
          id="taskDescription"
          value={details.description}
          onChange={(e) =>
            setDetails({ ...details, description: e.target.value })
          }
          className="task-input"
          style={{
            height: "100px",
          }}
        />
      </div>
      <div className="input-row">
        <label htmlFor="taskDueDate">Due Date:</label>
        <input
          type="date"
          id="taskDueDate"
          value={details.dueDate}
          onChange={(e) => setDetails({ ...details, dueDate: e.target.value })}
          className="task-input"
          min={getCurrentDate()}
        />
        {Error.dueDate && <div className="error-message">{Error.dueDate}</div>}
      </div>
      <div className="input-row">
        <label htmlFor="taskPriority">Priority:</label>
        <select
          id="taskPriority"
          value={details.priority}
          onChange={(e) => setDetails({ ...details, priority: e.target.value })}
          className="task-input"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      <button onClick={handleAddTask} className="add-button">
        Add Task
      </button>
    </div>
  );
}

export default TaskInput;
