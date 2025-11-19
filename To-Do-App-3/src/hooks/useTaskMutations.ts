import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type TaskFromSchema, taskSchema } from "../schema/task.schema";
import {
  type CreateTaskDto,
  createTaskSchema,
} from "../schema/taskCreate.schema";
import {
  updateTaskSchema,
  type UpdateTaskDto,
} from "../schema/taskUpdate.schema";
import keycloak from "../keycloak";

const API = "https://localhost:7211/api/Tasks";

export const useCreateTask = () => {
  const qc = useQueryClient();
  const token = keycloak.token;

  return useMutation<TaskFromSchema, Error, CreateTaskDto>({
    mutationFn: async (data) => {
      const validBody = createTaskSchema.parse(data);
      const res = await fetch(`${API}/CreateTask`, {
        method: "POST",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validBody),
      });
      if (!res.ok) throw new Error("Falied to create");

      const json = await res.json();
      console.log("CreateTask response:", json);
      return taskSchema.parse(json);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const useUpdateTask = () => {
  const qc = useQueryClient();
  const token = keycloak.token;

  return useMutation<void, Error, UpdateTaskDto>({
    mutationFn: async (task) => {
      const validBody = updateTaskSchema.parse(task);

      const res = await fetch(`${API}/UpdateTask/${validBody.id}`, {
        method: "PUT",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validBody),
      });

      if (!res.ok) throw new Error("Failed to update");
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const useDeleteTask = () => {
  const qc = useQueryClient();
  const token = keycloak.token;

  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      const res = await fetch(`${API}/DeleteTask/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      if (!res.ok) throw new Error("Failed to delete");
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
