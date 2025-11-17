import { z } from "zod";
import { taskSchema, type TaskFromSchema } from "../schema/task.schema";
import keycloak from "../keycloak";

const taskListSchema = z.array(taskSchema);

const API_URL = "https://localhost:7211/api/Tasks";

export const getTasks = async (): Promise<TaskFromSchema[]> => {
  const token = keycloak.token;

  const response = await fetch(`${API_URL}/GetTasks`, {
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const text = await response.text();
    console.error("Request failed", response.status, text);
    throw new Error(`Failed to fetch tasks: ${response.status}`);
  }

  const json = await response.json();
  return taskListSchema.parse(json);
};
