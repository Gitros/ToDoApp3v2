import { z } from "zod";
import { createTaskSchema } from "./taskCreate.schema";

export const updateTaskSchema = createTaskSchema.partial().extend({
  id: z.string(),
  isDeleted: z.boolean().optional(),
});

export type UpdateTaskDto = z.infer<typeof updateTaskSchema>;
