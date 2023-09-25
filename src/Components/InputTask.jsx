import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask, updateTask } from "../Redux/Slice";
import { toast } from "react-toastify";
import "./InputTask.css";

function TaskInput({ editTask, onEditCancel }) {
  const [name, setName] = useState(editTask ? editTask.name : "");
  const [description, setDescription] = useState(
    editTask ? editTask.description : ""
  );
  const [dueDate, setDueDate] = useState(editTask ? editTask.dueDate : "");
  const [priority, setPriority] = useState(
    editTask ? editTask.priority : "Medium"
  );

  const [nameError, setNameError] = useState("");
  const [DueDateError, setDueDateError] = useState("");

  const dispatch = useDispatch();

  const validateInputs = () => {
    let isValid = true;

    if (name.trim() === "") {
      setNameError("Task name is required");
      isValid = false;
    } else if (name.length > 50) {
      setNameError("Task name is too long (max 50 characters)");
      isValid = false;
    } else {
      setNameError("");
    }

    if (dueDate.trim() === "") {
      setDueDateError(" Due Date is required");
      isValid = false;
    } else {
      setDueDateError("");
    }
    return isValid;
  };

  const handleAddTask = () => {
    if (validateInputs()) {
      dispatch(
        addTask({
          id: Date.now(),
          name,
          description,
          dueDate,
          priority,
        })
      );
      setName("");
      setDescription("");
      setDueDate("");
      setPriority("Medium");
    } else {
      toast.error("Please fill in the required fields.");
    }
  };

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const handleUpdateTask = () => {
    if (validateInputs()) {
      dispatch(
        updateTask({
          id: editTask.id,
          name,
          description,
          dueDate,
          priority,
        })
      );
      onEditCancel();
    } else {
      toast.error("Please fill in the required fields.");
    }
  };

  return (
    <div className="task-input-container">
      <div className="input-row">
        <label htmlFor="taskName">Task Name:</label>
        <input
          type="text"
          id="taskName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="task-input"
        />
        {nameError && <div className="error-message">{nameError}</div>}
      </div>
      <div className="input-row">
        <label htmlFor="taskDescription">Description:</label>
        <input
          type="text-area"
          id="taskDescription"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="task-input"
          min={getCurrentDate()}
        />
        {DueDateError && <div className="error-message">{DueDateError}</div>}
      </div>
      <div className="input-row">
        <label htmlFor="taskPriority">Priority:</label>
        <select
          id="taskPriority"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="task-input"
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
      {editTask ? (
        <>
          <button onClick={handleUpdateTask} className="update-button">
            Update Task
          </button>
          <button onClick={onEditCancel} className="cancel-button">
            Cancel
          </button>
        </>
      ) : (
        <button onClick={handleAddTask} className="add-button">
          Add Task
        </button>
      )}
    </div>
  );
}

export default TaskInput;
