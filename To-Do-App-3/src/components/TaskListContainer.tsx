import type { Task } from "./TaskCard";
import TaskList from "./TaskList";

type TaskListContainerProps = {
  tasks: Task[];
  onTaskClick?: (id: string) => void;
};

const TaskListContainer = ({ tasks, onTaskClick }: TaskListContainerProps) => {
  return (
    <div className="flex justify-around">
      <TaskList status={0} tasks={tasks} onTaskClick={onTaskClick} />
      <TaskList status={1} tasks={tasks} onTaskClick={onTaskClick} />
      <TaskList status={2} tasks={tasks} onTaskClick={onTaskClick} />
    </div>
  );
};

export default TaskListContainer;
