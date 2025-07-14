import { tasks_v1 } from 'googleapis';
import GoogleTasksSingleton from '../database/googleTasksSingleton';
import type { IRepository } from '../type/repository';
import { logger } from '../utils/logger';
import { TaskListRepository } from './taskListRepository';

export class TaskRepository implements IRepository<tasks_v1.Schema$Task> {
  collection = 'shopping';
  repo = new TaskListRepository();

  public async getByName(name: string): Promise<tasks_v1.Schema$Task> {
    const tasks = GoogleTasksSingleton.getInstance();
    const taskListId = await this.repo.getByName(this.collection);
    const {
      data: { items },
    } = await tasks.tasks.list({ tasklist: String(taskListId.id) });

    const task = items?.filter((item) => item.title === name) ?? [];

    return task[0] ?? {};
  }

  public async add(item: tasks_v1.Schema$Task): Promise<boolean> {
    const existing = await this.getByName(item.title ?? '');
    if (existing?.id) {
      logger.warn(`Task with name '${item.title}' already exists.`);
      return false;
    }

    const tasks = GoogleTasksSingleton.getInstance();
    const taskListId = await this.repo.getByName(String(this.collection));
    const res = await tasks.tasks.insert({ tasklist: String(taskListId.id), requestBody: item });
    logger.info(res);
    return true;
  }

  public async delete(name: string): Promise<boolean> {
    const tasks = GoogleTasksSingleton.getInstance();
    const taskListId = await this.repo.getByName(this.collection);
    const {
      data: { items },
    } = await tasks.tasks.list({ tasklist: String(taskListId.id) });

    const task = items?.find((item) => item.title === name);
    if (!task?.id) {
      logger.warn(`Task with name '${name}' not found.`);
      return false;
    }

    await tasks.tasks.delete({ tasklist: String(taskListId.id), task: task.id });
    logger.info(`Deleted task '${name}' with id '${task.id}'.`);
    return true;
  }

  public async list(): Promise<tasks_v1.Schema$Task[]> {
    const tasks = GoogleTasksSingleton.getInstance();
    const taskListId = await this.repo.getByName(this.collection);
    const {
      data: { items },
    } = await tasks.tasks.list({ tasklist: String(taskListId.id) });

    if (!items) {
      return [];
    }
    return items;
  }
}
