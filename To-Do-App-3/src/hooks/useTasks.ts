import { useQuery } from "@tanstack/react-query";
import { type Task } from "../components/TaskCard";
import { getTasks } from "../api/tasksApi";

export const useTasks = () => {
  return useQuery<Task[], Error>({
    queryKey: ["tasks"],
    queryFn: getTasks,
    staleTime: 1000 * 60,
  });
};
