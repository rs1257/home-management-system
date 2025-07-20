import { InventoryItem } from '../model/inventoryItem';
import InventoryRepository from '../repository/inventoryRepository';
import { TaskRepository } from '../repository/taskRepository';
import { deleteInventoryItemSchema, inventoryItemSchema, replaceInventoryItemSchema } from '../schema/inventoryItemSchemas';
import { CustomResponse, handleResponse, handleResponseData } from '../utils/customResponse';
import { options } from './options';

const inventoryRepo = new InventoryRepository();
const taskRepo = new TaskRepository();

export const inventory = {
  ...options,
  GET: async (): Promise<CustomResponse> =>
    await handleResponseData(
      async () => {
        return await inventoryRepo.list();
      },
      200,
      404
    ),
  POST: async (req: Request): Promise<CustomResponse> =>
    await handleResponse(
      async () => {
        const validatedItem = inventoryItemSchema.parse(await req.json());
        const inventoryItemInstance = new InventoryItem(validatedItem.name, validatedItem.description, validatedItem.quantity, validatedItem.threshold);
        if (inventoryItemInstance.getQuantity() <= inventoryItemInstance.getThreshold()) {
          taskRepo.add({ title: inventoryItemInstance.getName() });
        }

        await inventoryRepo.add(inventoryItemInstance);
      },
      'Inventory item added successfully',
      201,
      409
    ),
  PUT: async (req: Request): Promise<CustomResponse> =>
    await handleResponse(
      async () => {
        const { originalName, name, description, quantity, threshold } = replaceInventoryItemSchema.parse(await req.json());
        const inventoryItemInstance = new InventoryItem(name, description, quantity, threshold);

        if (inventoryItemInstance.getQuantity() <= inventoryItemInstance.getThreshold()) {
          await taskRepo.add({ title: inventoryItemInstance.getName() });
        }

        await inventoryRepo.update(originalName, inventoryItemInstance);
      },
      'Inventory item updated successfully',
      200,
      404
    ),
  DELETE: async (req: Request): Promise<CustomResponse> =>
    await handleResponse(
      async () => {
        const { name } = deleteInventoryItemSchema.parse(await req.json());
        await taskRepo.delete(name);
        await inventoryRepo.delete(name);
      },
      'Item deleted successfully',
      200,
      404
    ),
};
