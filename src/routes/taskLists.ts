import { TaskListRepository } from '../repository/taskListRepository';
import { taskListSchema } from '../schema/taskListSchemas';
import { CustomResponse, handleResponse, handleResponseData } from '../utils/customResponse';
import { options } from './options';

const taskListRepo = new TaskListRepository();

export const taskLists = {
  ...options,
  GET: async (): Promise<CustomResponse> =>
    await handleResponseData(
      async () => {
        return await taskListRepo.list();
      },
      200,
      404
    ),
  DELETE: async (req: Request): Promise<CustomResponse> =>
    await handleResponse(
      async () => {
        const { title } = taskListSchema.parse(await req.json());
        await taskListRepo.delete(title);
      },
      'Task list deleted successfully',
      200,
      404
    ),
  POST: async (req: Request): Promise<CustomResponse> =>
    await handleResponse(
      async () => {
        const taskListData = taskListSchema.parse(await req.json());
        await taskListRepo.add(taskListData);
      },
      'Task list created successfully',
      201,
      409
    ),
};
