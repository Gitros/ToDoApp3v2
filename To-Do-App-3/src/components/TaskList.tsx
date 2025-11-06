import TaskCard, { type Task } from "./TaskCard";

type TaskListProps = {
  status: "new" | "inProgress" | "completed";
  tasks: Task[];
  onTaskClick?: (id: string) => void;
};

const TaskList = ({ status, tasks, onTaskClick }: TaskListProps) => {
  const title =
    status === "new"
      ? "New Tasks"
      : status === "inProgress"
      ? "In Progress"
      : "Completed";

  const color =
    status === "new"
      ? "bg-blue-400"
      : status === "inProgress"
      ? "bg-yellow-500"
      : "bg-green-500";

  const visible = tasks.filter((t) => t.status === status);
  return (
    <div className={`${color} min-h-64 w-80 rounded-xl shadow-lg p-4`}>
      <h2 className="text-center text-white text-xl mb-2">{title}</h2>
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
