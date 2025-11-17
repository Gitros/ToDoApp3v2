import { z } from "zod";
import { taskStatusSchema } from "./taskStatus.schema";

export const taskSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "Title cannot be empty"),
  time: z.string().nullable(),
  description: z.string().nullable(),
  assignee: z.string().nullable(),
  status: taskStatusSchema,
  isDeleted: z.boolean().default(false),
});

export type TaskFromSchema = z.infer<typeof taskSchema>;
