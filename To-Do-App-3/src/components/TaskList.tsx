import TaskCard, { type Task } from "./TaskCard";

const taskList: Task[] = [
  {
    id: "1",
    title: "Zrobić obiad",
    time: "12:00",
    description: "Ugotować makaron i podgrzać zupę",
    assignee: "Owca",
  },
  {
    id: "2",
    title: "Praca domowa",
    time: "15:00",
    description: "Zrobić zadania z matmy",
    assignee: "Kimi",
  },
  {
    id: "3",
    title: "Praca domowa",
    time: "15:00",
    description: "Zrobić zadania z matmy",
    assignee: "Mistrzunio",
  },
];

type TaskListProps = {
  status: "new" | "inProgress" | "completed";
};

const TaskList = ({ status }: TaskListProps) => {
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

  return (
    <div className={`${color} min-h-64 w-80 rounded-xl shadow-lg p-4`}>
      <h2 className="text-center text-white text-xl mb-2">{title}</h2>
      <ul className="space-y-4">
        {taskList.map((task) => (
          <li key={task.id}>
            <TaskCard task={task} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
