import TaskList from "../Components/TaskList";
import "./PendingTask.css";

function PendingTask() {
  return (
    <div className="home-container">
      <div className="home-left-side">
        <h2>Pending Task</h2>
        <TaskList isCompleted={false} showSortButtons={true} />
      </div>
      <div className="home-right-side">
        <h2>Completed Task</h2>
        <TaskList isCompleted={true} showSortButtons={false} />
      </div>
    </div>
  );
}

export default PendingTask;
