import React from "react";
import TaskList from "./TaskList";

const TaskListContainer = () => {
  return (
    <div className="flex justify-around">
      <TaskList status="new" />
      <TaskList status="inProgress" />
      <TaskList status="completed" />
    </div>
  );
};

export default TaskListContainer;
