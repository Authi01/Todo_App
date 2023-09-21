import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, updateTask } from "../Redux/Slice";
import "./TaskList.css";

function TaskList({ isToday = false }) {
  const tasks = useSelector((state) => state.tasks);

  const dispatch = useDispatch();

  const [editingTask, setEditingTask] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [editedDueDate, setEditedDueDate] = useState("");
  const [editedPriority, setEditedPriority] = useState("Medium");

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setEditedName(task.name);
    setEditedDescription(task.description);
    setEditedDueDate(task.dueDate);
    setEditedPriority(task.priority);
  };

  const handleSaveEdit = () => {
    if (new Date(editedDueDate) < new Date(editingTask.creationDate)) {
      alert("Due date cannot be earlier than creation date.");
      return;
    }

    dispatch(
      updateTask({
        ...editingTask,
        name: editedName,
        description: editedDescription,
        dueDate: editedDueDate,
        priority: editedPriority,
      })
    );
    setEditingTask(null);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const sortTasksByDueDate = () => {
    const sortedTasks = [...tasks];
    sortedTasks.sort((a, b) => {
      if (!a.dueDate || !b.dueDate) return 0;
      return new Date(a.dueDate) - new Date(b.dueDate);
    });
    return sortedTasks;
  };

  const sortTasksByPriority = () => {
    const sortedTasks = [...tasks];
    const priorityValues = { High: 3, Medium: 2, Low: 1 };
    sortedTasks.sort(
      (a, b) => priorityValues[b.priority] - priorityValues[a.priority]
    );
    return sortedTasks;
  };

  const [sortByDueDate, setSortByDueDate] = useState(false);
  const [sortByPriority, setSortByPriority] = useState(false);

  const handleSortByDueDate = () => {
    setSortByDueDate(true);
    setSortByPriority(false);
  };

  const handleSortByPriority = () => {
    setSortByDueDate(false);
    setSortByPriority(true);
  };

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  let filterTodayTasks = tasks;
  const today = new Date();
  today.setHours(5, 30, 0, 0);
  if (isToday) {
    filterTodayTasks = tasks.filter((task) => {
      const dueDate = new Date(task.dueDate);
      return dueDate.getTime() === today.getTime();
    });
  }
  const sortedTasksArray = sortByDueDate
    ? sortTasksByDueDate()
    : sortByPriority
    ? sortTasksByPriority()
    : filterTodayTasks;

  return (
    <div>
      <div className="tasklist-sort-buttons">
        <button
          onClick={handleSortByDueDate}
          className="tasklist-sort-button"
          style={sortByDueDate ? { backgroundColor: "#0056b3" } : {}}
        >
          Sort by Due Date
        </button>
        <button
          onClick={handleSortByPriority}
          className="tasklist-sort-button"
          style={sortByPriority ? { backgroundColor: "#0056b3" } : {}}
        >
          Sort by Priority
        </button>
      </div>
      <ul className="tasklist-home-task-list">
        {sortedTasksArray.map((task) => (
          <li key={task.id} className="tasklist-home-task-item">
            {editingTask === task ? (
              <div>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="tasklist-edit-input"
                />
                <input
                  type="text"
                  value={editedDescription}
                  onChange={(e) => setEditedDescription(e.target.value)}
                  className="tasklist-edit-input"
                />
                <input
                  type="date"
                  id="taskDueDate"
                  value={editedDueDate}
                  onChange={(e) => setEditedDueDate(e.target.value)}
                  className="tasklist-edit-input"
                  min={getCurrentDate()}
                />
                <select
                  value={editedPriority}
                  onChange={(e) => setEditedPriority(e.target.value)}
                  className="tasklist-edit-input"
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                <button
                  onClick={handleSaveEdit}
                  className="tasklist-common-button tasklist-save-button"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="tasklist-common-button tasklist-cancel-button"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <div className="tasklist-item-details">
                  <div className="tasklist-item-name tasklist-name-bold">
                    {task.name}
                  </div>
                  <div className="tasklist-item-description">
                    {task.description}
                  </div>
                  <div className="tasklist-item-due-date">
                    Due Date: {task.dueDate}
                    {new Date(task.dueDate) < new Date(task.creationDate) && (
                      <span className="invalid-due-date">
                        Due date cannot be earlier than creation date.
                      </span>
                    )}
                  </div>
                  <div className="tasklist-item-priority">
                    Priority: {task.priority}
                  </div>
                </div>
                <div className="tasklist-item-buttons">
                  <button
                    onClick={() => handleEditClick(task)}
                    className="tasklist-home-edit-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="tasklist-home-delete-button"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
