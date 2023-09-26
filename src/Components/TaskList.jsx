import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask, updateTask, toggleTaskCompletion } from "../Redux/Slice";
import TaskItem from "./TaskItem";

function TaskList({
  isToday = false,
  isCompleted = false,
  showSortButtons = true,
}) {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const [editingTask, setEditingTask] = useState(null);
  const [dueDateFilteredTasks, setDueDateFilteredTasks] = useState([]);
  const [sortBy, setSortBy] = useState({ dueDate: false, priority: false });
  const [editError, setEditError] = useState({ name: "", dueDate: "" });
  const [editedTask, setEditedTask] = useState({
    name: "",
    description: "",
    dueDate: "",
    priority: "Medium",
  });
  const [dateRange, setDateRange] = useState({
    startDate: "2023-01-01",
    endDate: "2023-12-31",
  });

  const handleDeleteTask = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setEditedTask({
      name: task.name,
      description: task.description,
      dueDate: task.dueDate,
      priority: task.priority,
    });
  };
  const handleSaveEdit = () => {
    if (editedTask.name.trim() === "") {
      setEditError({ ...editError, name: "Task name is required" });
      isValid = false;
    } else {
      setEditError({ ...editError, name: "" });
    }

    if (editedTask.dueDate.trim() === "") {
      setEditError({ ...editError, dueDate: "Due Date is required" });
      isValid = false;
    } else {
      setEditError({ ...editError, dueDate: "" });
    }

    if (new Date(editedTask.dueDate) < new Date(editingTask.creationDate)) {
      alert("Due date cannot be earlier than creation date.");
      return;
    }

    dispatch(
      updateTask({
        ...editingTask,
        name: editedTask.name,
        description: editedTask.description,
        dueDate: editedTask.dueDate,
        priority: editedTask.priority,
      })
    );
    setEditingTask(null);
  };
  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const sortTasksByDueDate = (tasks) => {
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

  const handleEditChange = (field, value) => {
    setEditedTask((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleSortByDueDate = () => {
    setSortBy({ ...sortBy, dueDate: true, priority: false });
  };

  const handleSortByPriority = () => {
    setSortBy({ ...sortBy, dueDate: false, priority: true });
  };
  const filterTasksByDueDate = (tasks, startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    return tasks.filter((task) => {
      const dueDate = new Date(task.dueDate);
      return dueDate >= start && dueDate <= end;
    });
  };
  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const filteredTasks = filterTasksByDueDate(
        tasks,
        dateRange.startDate,
        dateRange.endDate
      );
      setDueDateFilteredTasks(filteredTasks);
    }
  }, [dateRange.startDate, dateRange.endDate, tasks]);

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const today = new Date();
  today.setHours(5, 30, 0, 0);

  let filteredTasks = tasks;

  if (isToday && isCompleted) {
    filteredTasks = tasks.filter((task) => {
      const dueDate = new Date(task.dueDate);
      return dueDate.getTime() === today.getTime() && task.isCompleted;
    });
  } else if (isToday) {
    filteredTasks = tasks.filter((task) => {
      const dueDate = new Date(task.dueDate);
      return dueDate.getTime() === today.getTime() && !task.isCompleted;
    });
  } else if (isCompleted) {
    filteredTasks = tasks.filter((task) => task.isCompleted);
  }

  const handleToggleTaskCompletion = (taskId) => {
    dispatch(toggleTaskCompletion(taskId));
  };

  const sortedTasksArray = sortBy.dueDate
    ? sortTasksByDueDate(dueDateFilteredTasks)
    : sortBy.priority
    ? sortTasksByPriority()
    : filteredTasks;

  return (
    <div className="tasklist-home-task-list">
      <div className="tasklist-sort-buttons">
        {showSortButtons && (
          <>
            <input
              type="date"
              id="startDate"
              value={dateRange.startDate}
              onChange={(e) =>
                setDateRange({ ...dateRange, startDate: e.target.value })
              }
              className="tasklist-filter-input"
              placeholder="From Due Date"
            />
            <input
              type="date"
              id="endDate"
              value={dateRange.endDate}
              onChange={(e) =>
                setDateRange({ ...dateRange, endDate: e.target.value })
              }
              className="tasklist-filter-input"
              placeholder="To Due Date"
            />

            <button
              onClick={handleSortByDueDate}
              className="tasklist-sort-button"
              style={sortBy.dueDate ? { backgroundColor: "#0056b3" } : {}}
            >
              Sort by Due Date
            </button>
            <button
              onClick={handleSortByPriority}
              className="tasklist-sort-button"
              style={sortBy.priority ? { backgroundColor: "#0056b3" } : {}}
            >
              Sort by Priority
            </button>
          </>
        )}
      </div>
      {sortedTasksArray.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          editingTask={editingTask}
          editedTask={editedTask}
          editError={editError}
          handleEditClick={handleEditClick}
          handleSaveEdit={handleSaveEdit}
          handleCancelEdit={handleCancelEdit}
          handleToggleTaskCompletion={handleToggleTaskCompletion}
          getCurrentDate={getCurrentDate}
          handleDeleteTask={handleDeleteTask}
          handleEditChange={handleEditChange}
        />
      ))}
    </div>
  );
}

export default TaskList;
