import { google, tasks_v1 } from 'googleapis';

import { logger } from '../utils/logger';

type Tasks = tasks_v1.Tasks;

export default class GoogleTasksSingleton {
  private static instance: Tasks;

  private constructor() {}

  static getInstance(): Tasks {
    if (!this.instance) {
      try {
        const auth = new google.auth.GoogleAuth({ keyFile: './keyfile.json', scopes: ['https://www.googleapis.com/auth/tasks'] });

        this.instance = google.tasks({
          version: 'v1',

          auth,
        });
      } catch (error) {
        logger.error(error);
      }
    }

    return this.instance;
  }
}
