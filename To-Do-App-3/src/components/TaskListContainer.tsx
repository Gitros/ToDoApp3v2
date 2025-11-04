import React from "react";
import TaskList from "./TaskList";

const TaskListContainer = () => {
  return (
    <div className="flex justify-around">
      <TaskList />
      <TaskList />
      <TaskList />
    </div>
  );
};

export default TaskListContainer;
