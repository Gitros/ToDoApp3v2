import { z } from "zod";
import { taskStatusSchema } from "./taskStatus.schema";

export const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  time: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  assignee: z.string().nullable().optional(),
  status: taskStatusSchema.default(0),
});

export type CreateTaskDto = z.infer<typeof createTaskSchema>;
