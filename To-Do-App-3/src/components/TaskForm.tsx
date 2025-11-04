import type { Task } from "./TaskCard";

type TaskFormProps = {
  mode: "create" | "edit";
  initial?: Partial<Task>;
  onSubmit: (data: Task) => void;
  onCancel: () => void;
};

const TaskForm = ({ mode, initial, onSubmit, onCancel }: TaskFormProps) => {
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: initial?.id ?? crypto.randomUUID(),
      title: initial?.title ?? "Sample task",
      time: initial?.time ?? "12:00",
      description: initial?.description ?? "Opis",
      assignee: initial?.assignee ?? "Owca",
    });
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      {/* You’ll add inputs here later */}
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded border hover:bg-gray-50 cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
        >
          {mode === "create" ? "Create" : "Save"}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
