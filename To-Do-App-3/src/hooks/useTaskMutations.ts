import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Task } from "../components/TaskCard";

const API = "https://localhost:7211/api/Tasks";

export const useCreateTask = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (data: Omit<Task, "id">) => {
      const res = await fetch(`${API}/CreateTask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to create");
      return (await res.json()) as Task;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const useUpdateTask = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (task: Task) => {
      const res = await fetch(`${API}/UpdateTask/${task.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      });
      if (!res.ok) throw new Error("Failed to update");
      return;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
