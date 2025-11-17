import type { TaskFromSchema } from "../schema/task.schema";

export type Task = TaskFromSchema;

type TaskProps = {
  task: Task;
};

const TaskCard = ({ task }: TaskProps) => {
  const formattedTime = task.time
    ? new Date(task.time).toLocaleString("pl-PL", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "No time";
  return (
    <div className="w-full max-w-xl bg-white rounded-2xl border shadow-sm p-4 min-h-24 transition-transform hover:scale-[1.02]">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold leading-none">{task.title}</h3>
        <p className="text-sm text-gray-500 shrink-0">{formattedTime}</p>
      </div>
      <div className="mt-2 grid grid-cols-[1fr_auto] items-start gap-4">
        <p className="text-sm text-gray-700 overflow-hidden text-ellipsis">
          {task.description ?? "No description"}
        </p>
        <p className="text-sm text-gray-600 text-right w-24 truncate">
          {task.assignee ?? "Unassigned"}
        </p>
      </div>
    </div>
  );
};

export default TaskCard;
