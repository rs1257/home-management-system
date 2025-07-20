import z from 'zod';

export const inventoryItemSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
  quantity: z.number().int().nonnegative(),
  threshold: z.number().nonnegative(),
});

export const replaceInventoryItemSchema = z.object({
  originalName: z.string(),
  name: z.string(),
  description: z.string().optional(),
  quantity: z.number().int().nonnegative(),
  threshold: z.number().nonnegative(),
});

export const deleteInventoryItemSchema = z.object({
  name: z.string(),
});

// export type InventoryItemSchema = z.infer<typeof inventoryItemSchema>;
