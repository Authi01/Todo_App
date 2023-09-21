import React from "react";
import TodayList from "../Components/TaskList";
import "./TodayPending.css";

function PendingTask() {
  return (
    <div className="TodayList-centered-container">
      <h2>Today Pending</h2>
      <TodayList isToday={true} />
    </div>
  );
}

export default PendingTask;
