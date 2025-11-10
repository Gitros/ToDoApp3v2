import type { TASK_STATUS } from "../lib/types/TaskStatus";

export type Task = {
  id: string;
  title: string;
  time: string | null;
  description: string | null;
  assignee: string | null;
  status: keyof typeof TASK_STATUS;
  isDeleted: boolean;
};

type TaskProps = {
  task: Task;
};

const TaskCard = ({ task }: TaskProps) => {
  return (
    <div className="w-full max-w-xl bg-white rounded-2xl border shadow-sm p-4 min-h-24 transition-transform hover:scale-[1.02]">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold leading-none">{task.title}</h3>
        <p className="text-sm text-gray-500 shrink-0">{task.time}</p>
      </div>
      <div className="mt-2 grid grid-cols-[1fr_auto] items-start gap-3">
        <p className="text-sm text-gray-700 overflow-hidden text-ellipsis">
          {task.description}
        </p>
        <p className="text-sm text-gray-600 text-right w-24 truncate">
          {task.assignee}
        </p>
      </div>
    </div>
  );
};

export default TaskCard;
