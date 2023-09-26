import TaskList from "../Components/TaskList";
import React from "react";

function CompletedTask() {
  return (
    <div className="centered-container">
      <h2>Completed Tasks</h2>
      <TaskList isCompleted={true} showSortButtons={false} />
    </div>
  );
}

export default CompletedTask;
