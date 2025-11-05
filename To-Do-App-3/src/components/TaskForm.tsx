import { useState } from "react";
import type { Task } from "./TaskCard";

type TaskFormProps = {
  onSubmit: (data: Task) => void;
  onCancel: () => void;
};

const TaskForm = ({ onSubmit, onCancel }: TaskFormProps) => {
  const [form, setForm] = useState({
    title: "",
    time: "",
    description: "",
    assignee: "",
    isCompleted: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    const newValue =
      e.target instanceof HTMLInputElement && e.target.type === "checkbox"
        ? e.target.checked
        : value;

    setForm((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      id: crypto.randomUUID(),
      ...form,
    });
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

      <div className="flex items-center gap-2">
        <input
          name="isCompleted"
          type="checkbox"
          checked={form.isCompleted}
          onChange={handleChange}
        />
        <label>Completed?</label>
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
