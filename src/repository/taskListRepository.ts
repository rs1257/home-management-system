import { tasks_v1 } from 'googleapis';
import GoogleTasksSingleton from '../database/googleTasksSingleton';
import type { IRepository } from '../type/repository';
import { logger } from '../utils/logger';

export class TaskListRepository implements IRepository<tasks_v1.Schema$TaskList> {
  collection = 'shopping';

  public async getByTitle(title: string): Promise<tasks_v1.Schema$Task> {
    const tasks = GoogleTasksSingleton.getInstance();
    const {
      data: { items },
    } = await tasks.tasklists.list();

    const tasklist = items?.filter((item) => item.title === title) ?? [];

    return tasklist[0] ?? {};
  }

  public async add(taskList: tasks_v1.Schema$TaskList): Promise<boolean> {
    const tasks = GoogleTasksSingleton.getInstance();
    const existing = await this.getByTitle(taskList.title ?? '');
    logger.info(`Existing task list: ${JSON.stringify(existing)}`);
    if (existing?.id) {
      return true;
    }

    await tasks.tasklists.insert({ requestBody: { title: taskList.title } });

    return true;
  }

  public async delete(title: string): Promise<boolean> {
    const tasks = GoogleTasksSingleton.getInstance();
    const taskList = await this.getByTitle(title);
    await tasks.tasklists.delete({ tasklist: String(taskList.id) });
    return true;
  }

  public async list(): Promise<tasks_v1.Schema$TaskList[]> {
    const tasks = GoogleTasksSingleton.getInstance();
    const {
      data: { items },
    } = await tasks.tasklists.list();

    if (!items) {
      return [];
    }
    return items;
  }
}
