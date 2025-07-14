import { tasks_v1 } from 'googleapis';
import GoogleTasksSingleton from '../database/googleTasksSingleton';
import type { IRepository } from '../type/repository';

export class TaskListRepository implements IRepository<tasks_v1.Schema$Task> {
  collection = 'shopping';

  public async getByName(name: string): Promise<tasks_v1.Schema$Task> {
    const tasks = GoogleTasksSingleton.getInstance();
    const {
      data: { items },
    } = await tasks.tasklists.list();

    const tasklist = items?.filter((item) => item.title === name) ?? [];

    return tasklist[0] ?? {};
  }

  public async add(): Promise<boolean> {
    const tasks = GoogleTasksSingleton.getInstance();
    await tasks.tasklists.insert({ requestBody: { title: this.collection } });
    return true;
  }

  public async delete(name: string): Promise<boolean> {
    const tasks = GoogleTasksSingleton.getInstance();
    const taskList = await this.getByName(name);
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
