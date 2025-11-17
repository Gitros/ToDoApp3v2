import { z } from "zod";
import { taskSchema, type TaskFromSchema } from "../schema/task.schema";

const taskListSchema = z.array(taskSchema);

const API_URL = "https://localhost:7211/api/Tasks";

export const getTasks = async (): Promise<TaskFromSchema[]> => {
  const response = await fetch(`${API_URL}/GetTasks`);
  const json = await response.json();
  return taskListSchema.parse(json);
};
