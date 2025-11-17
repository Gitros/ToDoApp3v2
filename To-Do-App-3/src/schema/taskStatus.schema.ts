import { z } from "zod";

export const taskStatusSchema = z.union([
  z.literal(0),
  z.literal(1),
  z.literal(2),
]);

export type TaskStatus = z.infer<typeof taskStatusSchema>;
