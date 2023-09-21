import TaskList from "../Components/TaskList";
import "./PendingTask.css";

function PendingTask() {
  return (
    <div className="centered-container">
      <h2>Pending Task</h2>
      <TaskList />
    </div>
  );
}

export default PendingTask;
