import { serve } from 'bun';
import { InventoryItem } from './model/inventoryItem';
import InventoryRepository from './repository/inventoryRepository';
import { TaskListRepository } from './repository/taskListRepository';
import { TaskRepository } from './repository/taskRepository';
import { inventoryItemSchema } from './schema/inventoryItemSchema';
import { CustomResponse } from './utils/customResponse';
import { dateFormatter } from './utils/dates';
import { logger } from './utils/logger';

logger.info(`Server started at: ${dateFormatter.format(Date.now())}`);

const inventoryRepo = new InventoryRepository();
const taskListRepo = new TaskListRepository();
const taskRepo = new TaskRepository();

serve({
  routes: {
    // Static routes
    '/api/status': { GET: () => new CustomResponse('OK') },

    '/api/inventory': {
      GET: async () => {
        const inventoryItems = await inventoryRepo.list();
        return new CustomResponse(JSON.stringify(inventoryItems));
      },
      POST: async (req) => {
        const item = await req.json();
        const validatedItem = inventoryItemSchema.parse(item);
        const inventoryItemInstance = new InventoryItem(validatedItem.name, validatedItem.description, validatedItem.quantity, validatedItem.threshold);
        const added = await inventoryRepo.add(inventoryItemInstance);
        if (added) {
          return new CustomResponse(JSON.stringify({ message: 'Item added successfully' }), { status: 201 });
        } else {
          return new CustomResponse(JSON.stringify({ message: 'Item already exists' }), { status: 409 });
        }
      },
    },

    '/api/inventory/:name': {
      GET: async (req) => {
        const name = req.params.name;
        try {
          const item = await inventoryRepo.getByName(name);
          return new CustomResponse(JSON.stringify(item));
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          return new CustomResponse(JSON.stringify({ error: message }), { status: 404 });
        }
      },
      DELETE: async (req) => {
        const name = req.params.name;
        try {
          await inventoryRepo.delete(name);
          return new CustomResponse(JSON.stringify({ message: 'Item deleted successfully' }));
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          return new CustomResponse(JSON.stringify({ error: message }), { status: 404 });
        }
      },
    },

    '/api/taskLists': {
      GET: async () => {
        const taskLists = await taskListRepo.list();
        return new CustomResponse(JSON.stringify(taskLists));
      },
    },

    '/api/tasks': {
      GET: async () => {
        const tasks = await taskRepo.list();
        return new CustomResponse(JSON.stringify(tasks));
      },
    },

    // Wildcard route for all routes that start with "/api/" and aren't otherwise matched
    '/api/*': CustomResponse.json({ message: 'Not found' }, { status: 404 }),
  },
  error(error) {
    return new CustomResponse(JSON.stringify({ error: error.message }), { status: 500 });
  },
  fetch() {
    return CustomResponse.json({ message: 'Not Found' }, { status: 404 });
  },
  port: 3005,
});
