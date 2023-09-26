import React from "react";
import TaskList from "../Components/TaskList";

function TodayPending() {
  return (
    <div className="home-container">
      <div className="home-left-side">
        <h2>Tasks for Today</h2>
        <TaskList isToday={true} showSortButtons={false} />
      </div>
      <div className="home-right-side">
        <h2>Completed Tasks </h2>
        <TaskList isToday={true} isCompleted={true} showSortButtons={false} />
      </div>
    </div>
  );
}

export default TodayPending;
