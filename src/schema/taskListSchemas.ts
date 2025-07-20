import z from 'zod';

export const taskListSchema = z.object({
  title: z.string(),
});
