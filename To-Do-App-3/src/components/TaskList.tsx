import Task from "./Task";

const TaskList = () => {
  return (
    <div className="bg-blue-400 h-64 w-3/4 m-7 rounded-md">
      <h1 className="text-center text-white text-xl">New tasks</h1>
      <div className="flex m-5">
        <ul className="w-full">
          <li>
            <Task />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TaskList;
