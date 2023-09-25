import React from "react";
import TaskList from "../Components/TaskList";
import "./TodayPending.css";

function TodayPending() {
  return (
    <div className="TodayList-centered-container">
      <div className="Today-left-side">
        <h2>Tasks for Today</h2>
        <TaskList isToday={true} showSortButtons={false} />
      </div>
      <div className="Today-right-side">
        <h2>Completed Tasks </h2>
        <TaskList isToday={true} isCompleted={true} showSortButtons={false} />
      </div>
    </div>
  );
}

export default TodayPending;
