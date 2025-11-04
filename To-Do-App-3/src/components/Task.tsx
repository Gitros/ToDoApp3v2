type TaskProps = {
  title?: string;
  time?: string;
  description?: string;
  assignee?: string;
};

const Task = ({
  title = "Nazwa taska",
  time = "12:00",
  description = "Opis Taska",
  assignee = "Owca",
}: TaskProps) => {
  return (
    <div className="w-full max-w-xl bg-white rounded-2xl border shadow-sm p-4 min-h-24">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold leading-none">{title}</h3>
        <p className="text-sm text-gray-500 shrink-0">{time}</p>
      </div>
      <div className="mt-2 grid grid-cols-[1fr_auto] items-start gap-3">
        <p className="text-sm text-gray-700 overflow-hidden text-ellipsis">
          {description}
        </p>
        <p className="text-sm text-gray-600 text-right w-24 truncate">
          {assignee}
        </p>
      </div>
    </div>
  );
};

export default Task;
