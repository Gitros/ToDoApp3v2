import { TASK_STATUS } from "../lib/types/TaskStatus";
import TaskCard, { type Task } from "./TaskCard";

type TaskListProps = {
  status: Task["status"];
  tasks: Task[];
  onTaskClick?: (id: string) => void;
};

const TaskList = ({ status, tasks, onTaskClick }: TaskListProps) => {
  const { label, bgColor } = TASK_STATUS[status];

  const visible = tasks.filter((t) => t.status === status);
  return (
    <div className={`${bgColor} min-h-64 w-80 rounded-xl shadow-lg p-4`}>
      <h2 className="text-center text-white text-xl mb-2">{label}</h2>
      <ul className="space-y-4">
        {visible.map((task) => (
          <li key={task.id}>
            <button
              type="button"
              onClick={() => onTaskClick?.(task.id)}
              className="block text-left w-full"
            >
              <TaskCard task={task} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
