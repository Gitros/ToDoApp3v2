import type { Task } from "./TaskCard";
import TaskList from "./TaskList";

type TaskListContainerProps = {
  tasks: Task[];
  onTaskClick?: (id: string) => void;
};

const TaskListContainer = ({ tasks, onTaskClick }: TaskListContainerProps) => {
  return (
    <div className="flex justify-around">
      <TaskList status="new" tasks={tasks} onTaskClick={onTaskClick} />
      <TaskList status="inProgress" tasks={tasks} onTaskClick={onTaskClick} />
      <TaskList status="completed" tasks={tasks} onTaskClick={onTaskClick} />
    </div>
  );
};

export default TaskListContainer;
