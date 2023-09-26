import React from "react";

function TaskItem({
  task,
  editingTask,
  editedTask,
  editError,
  handleEditClick,
  handleSaveEdit,
  handleCancelEdit,
  handleToggleTaskCompletion,
  getCurrentDate,
  handleDeleteTask,
  handleEditChange,
}) {
  return (
    <li key={task.id} className="tasklist-home-task-item">
      {editingTask === task ? (
        <div>
          <input
            type="text"
            value={editedTask.name}
            onChange={(e) => handleEditChange("name", e.target.value)}
            className="tasklist-edit-input"
          />
          {editError.name && (
            <div className="error-message">{editError.name}</div>
          )}
          <input
            type="text"
            value={editedTask.description}
            onChange={(e) => handleEditChange("description", e.target.value)}
            className="tasklist-edit-input"
          />
          <input
            type="date"
            id="taskDueDate"
            value={editedTask.dueDate}
            onChange={(e) => handleEditChange("dueDate", e.target.value)}
            className="tasklist-edit-input"
            min={getCurrentDate()}
          />
          {editError.dueDate && (
            <div className="error-message">{editError.dueDate}</div>
          )}
          <select
            value={editedTask.priority}
            onChange={(e) => handleEditChange("priority", e.target.value)}
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
            <div className="tasklist-item-description">{task.description}</div>
            <div className="tasklist-item-name tasklist-name-bold">
              Due Date: {task.dueDate}
              {new Date(task.dueDate) < new Date(task.creationDate) && (
                <span className="invalid-due-date">
                  Due date cannot be earlier than creation date.
                </span>
              )}
            </div>
            <div className="tasklist-item-name tasklist-name-bold">
              Priority: {task.priority}
            </div>
          </div>

          <div className="tasklist-item-buttons">
            <div className="tasklist-item-completed">
              <label>
                Completed:{" "}
                <input
                  type="checkbox"
                  checked={task.isCompleted}
                  onChange={() => handleToggleTaskCompletion(task.id)}
                />
              </label>
            </div>
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
  );
}

export default TaskItem;
