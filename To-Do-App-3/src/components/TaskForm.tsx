import { useEffect, useState } from "react";
import type { Task } from "./TaskCard";

type TaskFormProps = {
  mode: "create" | "edit";
  initial?: Task;
  onSubmit: (data: Task) => void;
  onCancel: () => void;
};

type TaskInput = Omit<Task, "id">;

const TaskForm = ({ mode, initial, onSubmit, onCancel }: TaskFormProps) => {
  const [form, setForm] = useState<TaskInput>(
    initial ?? {
      title: "",
      time: "",
      description: "",
      assignee: "",
      status: "new",
    }
  );

  useEffect(() => {
    if (initial) setForm(initial);
  }, [initial]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: mode === "edit" && initial ? initial.id : crypto.randomUUID(),
      ...form,
    });
    onCancel();
  };
  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block font-medium">Title</label>
        <input
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Time</label>
        <input
          name="time"
          type="time"
          value={form.time}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Assignee</label>
        <input
          name="assignee"
          type="text"
          value={form.assignee}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Status</label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        >
          <option value="new">New</option>
          <option value="inProgress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border rounded hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
