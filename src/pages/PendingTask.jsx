import TaskList from "../Components/TaskList";

function PendingTask() {
  return (
    <div className="home-container">
      <div className="home-left-side">
        <h2>Pending Task</h2>
        <div className="scrollable-content">
          <TaskList isCompleted={false} showSortButtons={true} />
        </div>
      </div>
      <div className="home-right-side">
        <h2>Completed Task</h2>
        <div className="scrollable-content">
          <TaskList isCompleted={true} showSortButtons={false} />
        </div>
      </div>
    </div>
  );
}

export default PendingTask;
