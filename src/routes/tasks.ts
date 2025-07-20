import { TaskRepository } from '../repository/taskRepository';
import { taskSchema } from '../schema/taskSchemas';
import { CustomResponse, handleResponse, handleResponseData } from '../utils/customResponse';
import { options } from './options';

const taskRepo = new TaskRepository();

export const tasks = {
  ...options,
  GET: async (): Promise<CustomResponse> =>
    await handleResponseData(
      async () => {
        return await taskRepo.list();
      },
      200,
      404
    ),
  DELETE: async (req: Request): Promise<CustomResponse> =>
    await handleResponse(
      async () => {
        const { name } = taskSchema.parse(await req.json());
        await taskRepo.delete(name);
      },
      'Task deleted successfully',
      200,
      404
    ),
};
