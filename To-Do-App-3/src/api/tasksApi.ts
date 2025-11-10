import type { Task } from "../components/TaskCard";

const API_URL = "https://localhost:7211/api/Tasks";

export const getTasks = async (): Promise<Task[]> => {
  const response = await fetch(`${API_URL}/GetTasks`);
  if (!response.ok) throw new Error("Failed to fetch tasks");
  return response.json();
};
