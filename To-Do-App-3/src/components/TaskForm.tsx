/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { type Task } from "./TaskCard";
import type { CreateTaskDto } from "../schema/taskCreate.schema";
import type { UpdateTaskDto } from "../schema/taskUpdate.schema";

type CreateProps = {
  mode: "create";
  initial?: never;
  onSubmit: (data: CreateTaskDto) => void;
  onCancel: () => void;
  onDelete?: (id: string) => void;
};

type EditProps = {
  mode: "edit";
  initial?: Task;
  onSubmit: (data: UpdateTaskDto) => void;
  onCancel: () => void;
  onDelete?: (id: string) => void;
};

type TaskFormProps = CreateProps | EditProps;

type TaskInput = Omit<Task, "id"> & { isDeleted?: boolean };

const TaskForm = ({
  mode,
  initial,
  onSubmit,
  onCancel,
  onDelete,
}: TaskFormProps) => {
  const toInput = (t: Task): TaskInput => {
    const { id: _, ...rest } = t;
    return rest;
  };
  const [form, setForm] = useState<TaskInput>(
    initial
      ? toInput(initial)
      : {
          title: "",
          time: null,
          description: null,
          assignee: null,
          status: 0 as 0 | 1 | 2,
          isDeleted: false,
        }
  );

  useEffect(() => {
    if (mode === "edit" && initial) {
      setForm(toInput(initial));
    }
  }, [mode, initial]);

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

    if (mode === "create") {
      onSubmit({ ...form });
    } else {
      onSubmit({ id: initial!.id, ...form });
    }
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
          value={
            form.time ? new Date(form.time).toISOString().slice(11, 16) : ""
          }
          onChange={(e) => {
            const hhmm = e.target.value;
            setForm((prev) => ({
              ...prev,
              time: hhmm
                ? new Date(
                    `${new Date().toISOString().slice(0, 10)}T${hhmm}:00`
                  ).toISOString()
                : null,
            }));
          }}
          className="border p-2 w-full rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Description</label>
        <textarea
          name="description"
          value={form.description ?? ""}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Assignee</label>
        <input
          name="assignee"
          type="text"
          value={form.assignee ?? ""}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Status</label>
        <select
          name="status"
          value={form.status}
          onChange={(e) =>
            setForm((p) => ({
              ...p,
              status: Number(e.target.value) as 0 | 1 | 2,
            }))
          }
          className="border p-2 w-full rounded"
        >
          <option value={0}>New</option>
          <option value={1}>In Progress</option>
          <option value={2}>Completed</option>
        </select>
      </div>

      <div className="flex justify-between items-center pt-2">
        {mode === "edit" && initial && (
          <button
            type="button"
            onClick={() => onDelete?.(initial.id)}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        )}
        <div className="flex gap-2">
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
      </div>
    </form>
  );
};

export default TaskForm;
