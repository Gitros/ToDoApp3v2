import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../api/tasksApi";
import type { TaskFromSchema } from "../schema/task.schema";

export const useTasks = () => {
  return useQuery<TaskFromSchema[], Error>({
    queryKey: ["tasks"],
    queryFn: getTasks,
    staleTime: 1000 * 60,
  });
};
