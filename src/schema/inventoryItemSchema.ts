import z from 'zod';

export const inventoryItemSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  quantity: z.number().int().nonnegative(),
  threshold: z.number().nonnegative(),
});
