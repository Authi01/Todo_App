import React, { useState } from "react";
import TaskInput from "../Components/InputTask";
import TaskList from "../Components/TaskList";

import "./Home.css";

function Home() {
  const [editTask, setEditTask] = useState(null);

  const handleEditTask = (task) => {
    setEditTask(task);
  };

  return (
    <div className="home-container">
      <div className="home-left-side">
        <h2>Add your Task here </h2>
        <TaskInput editTask={editTask} />
      </div>
      <div className="home-right-side">
        <h2>Task List</h2>
        <TaskList handleEditTask={handleEditTask} />
      </div>
    </div>
  );
}

export default Home;
