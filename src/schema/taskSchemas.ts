import z from 'zod';

export const taskSchema = z.object({
  name: z.string(),
});
